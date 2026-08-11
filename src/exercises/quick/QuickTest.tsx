import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/useLanguage.ts';
import { LanguageToggle } from '../../components/LanguageToggle.tsx';
import { shuffle } from '../shuffle.ts';
import {
  buildQuickTest,
  isScorable,
  SECTION_LABEL,
  type QuickItem,
  type QuickSection,
} from '../../data/quickTest.ts';
import { bandFor, CEFR_MIN_ATTEMPTED, CEFR_NAME, type CefrBand } from '../../data/cefr.ts';
import { CTestParagraph, CTestReview } from '../reading/CTestParagraph.tsx';
import { ReadingQuestion } from '../reading/ReadingQuestion.tsx';
import { SentenceBuilder, sentenceText } from '../writing/SentenceBuilder.tsx';
import { useAudioClip } from '../useAudioClip.ts';
import { ReviewModal, ReviewContext, ReviewOptions } from '../ReviewModal.tsx';
import '../reading/CompleteTheWords.css';
import './QuickTest.css';


type Answer =
  | { kind: 'mc'; selected: number }
  | { kind: 'letters'; inputs: string[] }
  | { kind: 'order'; placed: string[]; bank: string[] }
  | { kind: 'write'; text: string }
  | { kind: 'speak'; done: boolean };

function blankAnswer(item: QuickItem): Answer {
  switch (item.kind) {
    case 'mc':
      return { kind: 'mc', selected: -1 };
    case 'letters':
      return { kind: 'letters', inputs: item.blanks.map(() => '') };
    case 'order':
      return { kind: 'order', placed: [], bank: shuffle([...item.correct, ...item.distractors]) };
    case 'write':
      return { kind: 'write', text: '' };
    case 'speak':
      return { kind: 'speak', done: false };
  }
}

/**
 * Points earned and available. Word building is marked per blank — one wrong
 * letter should not throw away credit for the other nine words.
 */
function scoreOf(item: QuickItem, a: Answer): { got: number; max: number } {
  if (item.kind === 'letters' && a.kind === 'letters') {
    const got = item.blanks.filter((b, i) => (a.inputs[i] || '').toLowerCase() === b.answer.toLowerCase()).length;
    return { got, max: item.blanks.length };
  }
  if (item.kind === 'mc' && a.kind === 'mc') return { got: a.selected === item.answer ? 1 : 0, max: 1 };
  if (item.kind === 'order' && a.kind === 'order')
    return { got: a.placed.join(' ') === item.correct.join(' ') ? 1 : 0, max: 1 };
  return { got: 0, max: 0 };
}

/** How much of an item was engaged with — the guard on the CEFR estimate. */
function attemptedOf(item: QuickItem, a: Answer): number {
  if (item.kind === 'letters' && a.kind === 'letters')
    return item.blanks.filter((_, i) => (a.inputs[i] || '').trim().length > 0).length;
  if (item.kind === 'mc' && a.kind === 'mc') return a.selected >= 0 ? 1 : 0;
  if (item.kind === 'order' && a.kind === 'order') return a.placed.length > 0 ? 1 : 0;
  return 0;
}

function countWords(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/** A one-line label for an item, whatever kind it is. */
function stemOf(item: QuickItem): string {
  if (item.kind === 'mc') return item.stem;
  if (item.kind === 'order') return `“${item.question}”`;
  if (item.kind === 'letters') return item.title;
  if (item.kind === 'write') return item.task;
  return item.prompt;
}

export function QuickTest() {
  const { t } = useLanguage();
  const [items, setItems] = useState<QuickItem[]>(buildQuickTest);
  const [answers, setAnswers] = useState<Answer[]>(() => items.map(blankAnswer));
  const [idx, setIdx] = useState(0);
  const [finished, setFinished] = useState(false);
  /** How far they got, so an early exit only grades what was seen. */
  const [reached, setReached] = useState(0);
  /** The missed question currently open for review, if any. */
  const [review, setReview] = useState<{ item: QuickItem; answer: Answer; number: number } | null>(null);

  const item = items[idx];
  const answer = answers[idx];

  const clip = useAudioClip(item.kind === 'mc' ? item.audioFile : undefined);

  function patch(next: Answer) {
    setAnswers((prev) => prev.map((a, i) => (i === idx ? next : a)));
  }

  // Both of these read prev inside the updater: two keystrokes or two chip taps
  // landing in one React batch must not overwrite each other.
  function setLetter(blankIdx: number, letterIdx: number, value: string) {
    const cur = items[idx];
    if (cur.kind !== 'letters') return;
    const width = cur.blanks[blankIdx].answer.length;
    setAnswers((prev) =>
      prev.map((a, i) => {
        if (i !== idx || a.kind !== 'letters') return a;
        const chars = (a.inputs[blankIdx] || '').padEnd(width, ' ').split('');
        chars[letterIdx] = value || ' ';
        return {
          kind: 'letters',
          inputs: a.inputs.map((w, k) => (k === blankIdx ? chars.join('').replace(/ +$/, '') : w)),
        };
      }),
    );
  }

  function placeWord(word: string) {
    const cur = items[idx];
    if (cur.kind !== 'order') return;
    setAnswers((prev) =>
      prev.map((a, i) => {
        if (i !== idx || a.kind !== 'order') return a;
        if (a.placed.length >= cur.correct.length) return a;
        const inBank = a.bank.filter((w) => w === word).length;
        if (a.placed.filter((w) => w === word).length >= inBank) return a;
        return { ...a, placed: [...a.placed, word] };
      }),
    );
  }

  function undoWord() {
    setAnswers((prev) =>
      prev.map((a, i) => (i === idx && a.kind === 'order' ? { ...a, placed: a.placed.slice(0, -1) } : a)),
    );
  }

  function go(next: number) {
    clip.stop();
    setReached((r) => Math.max(r, next));
    setIdx(next);
  }

  function restart() {
    const fresh = buildQuickTest();
    setItems(fresh);
    setAnswers(fresh.map(blankAnswer));
    setIdx(0);
    setReached(0);
    setFinished(false);
  }


  type TypeRow = { name: string; correct: number; total: number };
  type Missed = { item: QuickItem; answer: Answer; number: number };
  type ExerciseRow = {
    skill: string;
    href: string;
    correct: number;
    total: number;
    types: TypeRow[];
    /** The questions that were got wrong, for the review list. */
    missed: Missed[];
  };
  type SectionRow = {
    section: QuickSection;
    correct: number;
    total: number;
    exercises: ExerciseRow[];
    teacher: { item: QuickItem; answer: Answer }[];
  };

  /** Grouped section → exercise → question type, in the order they were sat. */
  const results = useMemo(() => {
    // Only what was actually reached counts, so quitting early is not punished.
    const seen = items.slice(0, reached + 1);
    const order: QuickSection[] = ['reading', 'listening', 'writing', 'speaking'];
    const sections = new Map<QuickSection, SectionRow>();
    let correct = 0;
    let scored = 0;

    seen.forEach((it, i) => {
      const sec =
        sections.get(it.section) ??
        ({ section: it.section, correct: 0, total: 0, exercises: [], teacher: [] } as SectionRow);
      sections.set(it.section, sec);

      if (!isScorable(it)) {
        sec.teacher.push({ item: it, answer: answers[i] });
        return;
      }

      const { got, max } = scoreOf(it, answers[i]);
      const ok = got === max;
      scored += max;
      correct += got;
      sec.total += max;
      sec.correct += got;

      let ex = sec.exercises.find((e) => e.skill === it.skill);
      if (!ex) {
        ex = { skill: it.skill, href: it.practiceHref, correct: 0, total: 0, types: [], missed: [] };
        sec.exercises.push(ex);
      }
      ex.total += max;
      ex.correct += got;
      if (!ok) ex.missed.push({ item: it, answer: answers[i], number: i + 1 });

      // Only some sources label their questions; skip the row rather than invent one.
      if (it.type) {
        let ty = ex.types.find((tt) => tt.name === it.type);
        if (!ty) {
          ty = { name: it.type, correct: 0, total: 0 };
          ex.types.push(ty);
        }
        ty.total += max;
        ty.correct += got;
      }
    });

    const list = order.map((s) => sections.get(s)).filter((s): s is SectionRow => Boolean(s));

    // A band is only offered once enough of the auto-marked test was engaged
    // with — three answered questions cannot place anyone.
    let maxPoints = 0;
    let attempted = 0;
    items.forEach((it, i) => {
      maxPoints += scoreOf(it, answers[i]).max;
      attempted += attemptedOf(it, answers[i]);
    });
    const enough = maxPoints > 0 && attempted / maxPoints >= CEFR_MIN_ATTEMPTED;
    const skills = list
      .filter((s) => s.total > 0)
      .map((s) => ({
        section: s.section,
        pct: Math.round((s.correct / s.total) * 100),
        band: bandFor((s.correct / s.total) * 100),
      }));
    const cefr =
      enough && scored > 0
        ? { overall: bandFor((correct / scored) * 100), pct: Math.round((correct / scored) * 100), skills }
        : null;

    return { correct, scored, sections: list, seenCount: seen.length, cefr, attempted, maxPoints };
  }, [items, answers, reached]);

  if (finished) {
    return (
      <div className="section-reading">
        <LanguageToggle />
        <div className="app score-screen" style={{ display: 'block' }}>
          <div className="score-hero">
            <div className="score-circle">
              <span className="big">
                {results.correct}/{results.scored}
              </span>
              <span className="small">points</span>
            </div>
            <p className="score-msg">
              {results.seenCount < items.length
                ? `Stopped after ${results.seenCount} of ${items.length} questions.`
                : results.correct === results.scored
                  ? 'Perfect on everything that could be marked.'
                  : 'Here is what to work on.'}
            </p>
            <button className="btn btn-primary" onClick={restart}>
              New quick test
            </button>
          </div>

          <CefrPanel cefr={results.cefr} />

          {results.sections.map((sec) => {
            const pct = sec.total ? Math.round((sec.correct / sec.total) * 100) : 0;
            return (
              <div className={`card qt-section section-${sec.section}`} key={sec.section}>
                <div className="qt-sec-head">
                  <span className="qt-sec-name">{SECTION_LABEL[sec.section]}</span>
                  {sec.total > 0 ? (
                    <span className="qt-sec-score">
                      {sec.correct}<span className="qt-sec-of">/{sec.total}</span>
                    </span>
                  ) : (
                    <span className="qt-sec-pending">Teacher marked</span>
                  )}
                </div>
                {sec.total > 0 && (
                  <div className="qt-sec-bar">
                    <div className="qt-sec-bar-fill" style={{ width: `${pct}%` }} />
                  </div>
                )}

                {sec.exercises.map((ex) => {
                  const done = ex.correct === ex.total;
                  return (
                    <div className="qt-ex" key={ex.skill}>
                      <div className="qt-ex-head">
                        <span className={`qt-dot ${done ? 'ok' : 'bad'}`} aria-hidden="true" />
                        <span className="qt-ex-name">{ex.skill}</span>
                        <span className="qt-ex-score">
                          {ex.correct}/{ex.total}
                        </span>
                      </div>

                      {ex.types.length > 0 && (
                        <div className="qt-types">
                          {ex.types.map((ty) => (
                            <span
                              className={`qt-type-chip${ty.correct === ty.total ? ' ok' : ''}`}
                              key={ty.name}
                            >
                              {ty.name} <strong>{ty.correct}/{ty.total}</strong>
                            </span>
                          ))}
                        </div>
                      )}

                      {ex.missed.length > 0 && (
                        <ul className="qt-missed">
                          {ex.missed.map((m) => (
                            <li key={m.number}>
                              <button className="qt-missed-row" onClick={() => setReview(m)}>
                                <span className="qt-missed-num">Q{m.number}</span>
                                <span className="qt-missed-stem">{stemOf(m.item)}</span>
                                <span className="qt-missed-see">See ↗</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}

                      {!done && (
                        <Link className="qt-practise" to={ex.href}>
                          Practise this →
                        </Link>
                      )}
                    </div>
                  );
                })}

                {sec.teacher.map(({ item: it, answer: a }, i) => (
                  <div className="qt-ex" key={`t${i}`}>
                    <div className="qt-ex-head">
                      <span className="qt-dot pending" aria-hidden="true" />
                      <span className="qt-ex-name">{it.skill}</span>
                      <span className="qt-ex-score qt-ex-pending">
                        {(a.kind === 'write' && a.text.trim()) || (a.kind === 'speak' && a.done)
                          ? 'Attempted'
                          : 'Not attempted'}
                      </span>
                    </div>
                    {it.kind === 'write' && a.kind === 'write' && a.text.trim() && (
                      <div className="qt-teacher-answer">
                        <span className="qt-teacher-count">{countWords(a.text)} words</span>
                        <div className="qt-teacher-text">{a.text}</div>
                      </div>
                    )}
                    {it.kind === 'speak' && (
                      <div className="qt-teacher-answer">
                        <div className="qt-teacher-text">"{it.prompt}"</div>
                      </div>
                    )}
                  </div>
                ))}

                {sec.teacher.length > 0 && (
                  <p className="qt-teacher-note">
                    Writing and speaking are not marked automatically — show these to your teacher.
                  </p>
                )}
              </div>
            );
          })}

          <div className="restart-row" style={{ marginTop: '1rem' }}>
            <button className="btn btn-primary" onClick={restart}>
              New quick test
            </button>
          </div>
        </div>

        {review && <QuickReview {...review} onClose={() => setReview(null)} />}
      </div>
    );
  }

  const last = idx === items.length - 1;
  const sectionStart = idx === 0 || items[idx - 1].section !== item.section;
  /** Same chips whichever kind of item this is. */
  const head = (
    <>
      <span className="topic-tag">{item.skill}</span>
      {item.type && <span className="rq-type">{item.type}</span>}
      {!isScorable(item) && <span className="qt-teacher-flag">Teacher marked</span>}
    </>
  );

  return (
    <div className={`section-${item.section}`}>
      <LanguageToggle />
      <div className="app">
        <div className="topbar">
          <Link to="/sections" className="back-btn">
            {t('back_home')}
          </Link>
          <div className="exam-label">{t('quick_test')}</div>
          <div className="q-counter">
            {idx + 1} / {items.length}
          </div>
        </div>
        <div className="progress-wrap" style={{ marginBottom: '1rem' }}>
          <div className="progress-fill" style={{ width: `${((idx + 1) / items.length) * 100}%` }} />
        </div>

        {sectionStart && <div className="qt-section-banner">{SECTION_LABEL[item.section]}</div>}

        <div className="card">
          {item.kind !== 'mc' && <div className="qt-source">{head}</div>}

          {item.kind === 'mc' && answer.kind === 'mc' && (
            <ReadingQuestion
              context={item.context}
              // With audio, the transcript is a crutch; without it, the text is
              // the only way to answer, so it stays open.
              collapsibleContext={Boolean(item.audioFile)}
              head={head}
              step={item.step}
              stem={item.stem}
              options={item.options}
              selected={answer.selected}
              onSelect={(oi) => patch({ kind: 'mc', selected: oi })}
            >
              {clip.hasClip && (
                <div className="tts-bar">
                  <button className="tts-play" onClick={clip.play} disabled={clip.status !== 'idle'}>
                    {clip.status === 'loading' ? '…' : clip.status === 'playing' ? '⏹' : '▶'}
                  </button>
                  <div className="tts-info">
                    <div className="tts-title">Listen to the sentence</div>
                    <div className="tts-sub">
                      {clip.status === 'loading' ? 'Loading audio…' : 'Press play, then choose the best reply'}
                    </div>
                  </div>
                </div>
              )}
            </ReadingQuestion>
          )}

          {item.kind === 'letters' && answer.kind === 'letters' && (
            <>
              <div className="q-number">Fill in the missing letters.</div>
              <CTestParagraph
                paragraph={item.paragraph}
                blanks={item.blanks}
                inputs={answer.inputs}
                onLetter={setLetter}
              />
            </>
          )}

          {item.kind === 'order' && answer.kind === 'order' && (
            <SentenceBuilder
              question={item.question}
              prompt={item.prompt}
              correct={item.correct}
              bank={answer.bank}
              placed={answer.placed}
              isQuestion={item.isQuestion}
              onPlace={placeWord}
              onUndo={undoWord}
            />
          )}

          {item.kind === 'write' && answer.kind === 'write' && (
            <>
              <div className="q-number">Situation</div>
              <div className="passage-box" style={{ marginBottom: '1rem' }}>
                {item.brief}
              </div>
              <div className="q-number">Your task</div>
              <div className="qt-task">{item.task}</div>
              <textarea
                className="write-area"
                placeholder="Write your response here…"
                value={answer.text}
                onChange={(e) => patch({ kind: 'write', text: e.target.value })}
              />
              <div className="word-count-bar">
                <span className={`word-count${countWords(answer.text) >= item.minWords ? ' met' : ''}`}>
                  {countWords(answer.text)} words
                </span>
                <span className="word-min-note">Minimum: {item.minWords} words</span>
              </div>
            </>
          )}

          {item.kind === 'speak' && answer.kind === 'speak' && (
            <>
              <div className="q-number">{item.instruction}</div>
              <div className="qt-speak-prompt">{item.prompt}</div>
              <div className="btn-row">
                <button
                  className={`btn${answer.done ? ' btn-primary' : ''}`}
                  onClick={() => patch({ kind: 'speak', done: !answer.done })}
                >
                  {answer.done ? 'Answered ✓' : 'I answered this aloud'}
                </button>
              </div>
              <div className="info-strip" style={{ marginTop: '1rem' }}>
                <span>🎤</span>
                <span>Nothing is recorded. Say your answer aloud and review it with your teacher.</span>
              </div>
            </>
          )}
        </div>

        <div className="nav-row">
          <button className="btn" disabled={idx === 0} onClick={() => go(idx - 1)}>
            ← Previous
          </button>
          <div className="qt-nav-right">
            <button className="btn qt-quit" onClick={() => setFinished(true)}>
              Finish early
            </button>
            <button className="btn btn-primary" onClick={() => (last ? setFinished(true) : go(idx + 1))}>
              {last ? 'See results ✓' : 'Next →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

type CefrResult = {
  overall: CefrBand;
  pct: number;
  skills: { section: QuickSection; pct: number; band: CefrBand }[];
} | null;

/**
 * Reading, Listening and Build a Sentence are the parts that mark themselves,
 * so they are the parts that can carry a level.
 */
function CefrPanel({ cefr }: { cefr: CefrResult }) {
  if (!cefr) {
    return (
      <div className="card qt-cefr is-thin">
        <div className="qt-cefr-thin">Not enough answered to estimate a level.</div>
      </div>
    );
  }
  return (
    <div className="card qt-cefr">
      <div className="qt-cefr-head">
        <div className="qt-cefr-band">{cefr.overall}</div>
        <div>
          <div className="qt-cefr-name">{CEFR_NAME[cefr.overall]}</div>
          <div className="qt-cefr-sub">{cefr.pct}% on the auto-marked questions</div>
        </div>
      </div>
      <div className="qt-cefr-skills">
        {cefr.skills.map((s) => (
          <div className={`qt-cefr-skill section-${s.section}`} key={s.section}>
            <span className="qt-cefr-skill-name">{SECTION_LABEL[s.section]}</span>
            <span className="qt-cefr-skill-band">{s.band}</span>
            <span className="qt-cefr-skill-pct">{s.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** The exact question as it was sat, with the learner's answer against the key. *//** The exact question as it was sat, with the learner's answer against the key. */
function QuickReview({
  item,
  answer,
  number,
  onClose,
}: {
  item: QuickItem;
  answer: Answer;
  number: number;
  onClose: () => void;
}) {
  return (
    <ReviewModal
      title={`Question ${number}`}
      tag={`${item.skill}${item.type ? ` · ${item.type}` : ''}`}
      sectionClass={`section-${item.section}`}
      onClose={onClose}
    >
      {item.kind === 'mc' && answer.kind === 'mc' && (
        <>
          {item.context && <ReviewContext title={item.context.title} body={item.context.body} />}
          {item.audioFile && <div className="rm-note">This question was played as audio.</div>}
          <div className="rm-stem">{item.stem}</div>
          <ReviewOptions options={item.options} answer={item.answer} chosen={answer.selected} />
        </>
      )}

      {item.kind === 'letters' && answer.kind === 'letters' && (
        <>
          <div className="rm-stem">{item.title}</div>
          <CTestReview paragraph={item.paragraph} blanks={item.blanks} inputs={answer.inputs} />
        </>
      )}

      {item.kind === 'order' && answer.kind === 'order' && (
        <>
          <ReviewContext body={`“${item.question}”`} />
          <div className="rm-line is-wrong">
            <span className="rm-line-label">Your answer</span>
            <span>
              {answer.placed.length ? sentenceText(item.prompt, answer.placed, item.isQuestion) : '(nothing placed)'}
            </span>
          </div>
          <div className="rm-line is-right">
            <span className="rm-line-label">Correct</span>
            <span>{sentenceText(item.prompt, item.correct, item.isQuestion)}</span>
          </div>
          <div className="rm-note">Not needed: {item.distractors.join(', ')}</div>
        </>
      )}
    </ReviewModal>
  );
}

import { useMemo, useRef, useState } from 'react';
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
import '../reading/CompleteTheWords.css';
import './QuickTest.css';

const LETTERS = ['A', 'B', 'C', 'D'];

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

function isCorrect(item: QuickItem, a: Answer): boolean {
  if (item.kind === 'mc' && a.kind === 'mc') return a.selected === item.answer;
  if (item.kind === 'letters' && a.kind === 'letters')
    return item.blanks.every((b, i) => (a.inputs[i] || '').toLowerCase() === b.answer.toLowerCase());
  if (item.kind === 'order' && a.kind === 'order') return a.placed.join(' ') === item.correct.join(' ');
  return false;
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
  const [playing, setPlaying] = useState(false);
  /** The missed question currently open for review, if any. */
  const [review, setReview] = useState<{ item: QuickItem; answer: Answer; number: number } | null>(null);
  const audio = useRef<HTMLAudioElement | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const item = items[idx];
  const answer = answers[idx];

  function patch(next: Answer) {
    setAnswers((prev) => prev.map((a, i) => (i === idx ? next : a)));
  }

  function go(next: number) {
    audio.current?.pause();
    setPlaying(false);
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

  function playAudio(src: string) {
    audio.current?.pause();
    const el = new Audio(encodeURI(src));
    audio.current = el;
    setPlaying(true);
    el.onended = () => setPlaying(false);
    el.onerror = () => setPlaying(false);
    void el.play().catch(() => setPlaying(false));
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

      const ok = isCorrect(it, answers[i]);
      scored++;
      if (ok) correct++;
      sec.total++;
      if (ok) sec.correct++;

      let ex = sec.exercises.find((e) => e.skill === it.skill);
      if (!ex) {
        ex = { skill: it.skill, href: it.practiceHref, correct: 0, total: 0, types: [], missed: [] };
        sec.exercises.push(ex);
      }
      ex.total++;
      if (ok) ex.correct++;
      else ex.missed.push({ item: it, answer: answers[i], number: i + 1 });

      // Only some sources label their questions; skip the row rather than invent one.
      if (it.type) {
        let ty = ex.types.find((tt) => tt.name === it.type);
        if (!ty) {
          ty = { name: it.type, correct: 0, total: 0 };
          ex.types.push(ty);
        }
        ty.total++;
        if (ok) ty.correct++;
      }
    });

    const list = order.map((s) => sections.get(s)).filter((s): s is SectionRow => Boolean(s));
    return { correct, scored, sections: list, seenCount: seen.length };
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
              <span className="small">scored</span>
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

        {review && <ReviewModal {...review} onClose={() => setReview(null)} />}
      </div>
    );
  }

  const last = idx === items.length - 1;
  const sectionStart = idx === 0 || items[idx - 1].section !== item.section;
  inputRefs.current = [];

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
          <div className="qt-source">
            <span className="topic-tag">{item.skill}</span>
            {item.type && <span className="qt-type">{item.type}</span>}
            {!isScorable(item) && <span className="qt-teacher-flag">Teacher marked</span>}
          </div>

          {item.kind === 'mc' && (
            <>
              {item.context && (
                <div className="qt-context">
                  {item.context.title && <div className="qt-context-title">{item.context.title}</div>}
                  <div className="qt-context-body">{item.context.body}</div>
                </div>
              )}

              {item.audioFile && (
                <div className="tts-bar">
                  <button className="tts-play" onClick={() => playAudio(item.audioFile!)} disabled={playing}>
                    {playing ? '⏹' : '▶'}
                  </button>
                  <div className="tts-info">
                    <div className="tts-title">Listen to the sentence</div>
                    <div className="tts-sub">Press play, then choose the best reply</div>
                  </div>
                </div>
              )}

              <div className="q-stem">{item.stem}</div>
              <div className="options">
                {item.options.map((opt, oi) => (
                  <button
                    key={oi}
                    className={`option${answer.kind === 'mc' && answer.selected === oi ? ' selected' : ''}`}
                    onClick={() => patch({ kind: 'mc', selected: oi })}
                  >
                    <span className="option-letter">{LETTERS[oi]})</span>
                    {opt}
                  </button>
                ))}
              </div>
            </>
          )}

          {item.kind === 'letters' && answer.kind === 'letters' && (
            <LettersItem item={item} answer={answer} onChange={patch} inputRefs={inputRefs} />
          )}

          {item.kind === 'order' && answer.kind === 'order' && (
            <OrderItem item={item} answer={answer} onChange={patch} />
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

/** The exact question as it was sat, with the learner's answer against the key. */
function ReviewModal({
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
    <div className="qt-modal" role="dialog" aria-modal="true" aria-label={`Question ${number}`}>
      <button className="qt-modal-scrim" onClick={onClose} aria-label="Close" />
      <div className={`qt-modal-card section-${item.section}`}>
        <div className="qt-modal-head">
          <span className="qt-modal-num">Question {number}</span>
          <span className="qt-modal-tag">
            {item.skill}
            {item.type ? ` · ${item.type}` : ''}
          </span>
          <button className="qt-modal-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div className="qt-modal-body">
          {item.kind === 'mc' && (
            <>
              {item.context && (
                <div className="qt-modal-context">
                  {item.context.title && <div className="qt-modal-context-title">{item.context.title}</div>}
                  <div className="qt-modal-context-body">{item.context.body}</div>
                </div>
              )}
              {item.audioFile && <div className="qt-modal-note">This question was played as audio.</div>}
              <div className="qt-modal-stem">{item.stem}</div>
              <ul className="qt-modal-options">
                {item.options.map((opt, oi) => {
                  const chose = answer.kind === 'mc' && answer.selected === oi;
                  const right = oi === item.answer;
                  return (
                    <li
                      key={oi}
                      className={`qt-opt${right ? ' is-right' : ''}${chose && !right ? ' is-wrong' : ''}`}
                    >
                      <span className="qt-opt-letter">{LETTERS[oi]})</span>
                      <span className="qt-opt-text">{opt}</span>
                      {chose && <span className="qt-opt-mark">your answer</span>}
                      {right && <span className="qt-opt-mark">correct</span>}
                    </li>
                  );
                })}
              </ul>
              {answer.kind === 'mc' && answer.selected === -1 && (
                <div className="qt-modal-note">You did not answer this one.</div>
              )}
            </>
          )}

          {item.kind === 'letters' && answer.kind === 'letters' && (
            <>
              <div className="qt-modal-stem">{item.title}</div>
              <ul className="qt-modal-blanks">
                {item.blanks.map((b, bi) => {
                  const given = answer.inputs[bi] || '';
                  const right = given.toLowerCase() === b.answer.toLowerCase();
                  return (
                    <li key={bi} className={right ? 'is-right' : 'is-wrong'}>
                      <span className="qt-blank-num">Blank {bi + 1}</span>
                      <span className="qt-blank-given">{given || '(empty)'}</span>
                      {!right && <span className="qt-blank-answer">→ {b.answer}</span>}
                    </li>
                  );
                })}
              </ul>
            </>
          )}

          {item.kind === 'order' && answer.kind === 'order' && (
            <>
              <div className="qt-modal-context">
                <div className="qt-modal-context-body">“{item.question}”</div>
              </div>
              <div className="qt-modal-line is-wrong">
                <span className="qt-line-label">Your answer</span>
                <span>
                  {item.prompt ? `${item.prompt} ` : ''}
                  {answer.placed.join(' ') || '(nothing placed)'}
                  {item.isQuestion ? '?' : '.'}
                </span>
              </div>
              <div className="qt-modal-line is-right">
                <span className="qt-line-label">Correct</span>
                <span>
                  {item.prompt ? `${item.prompt} ` : ''}
                  {item.correct.join(' ')}
                  {item.isQuestion ? '?' : '.'}
                </span>
              </div>
              <div className="qt-modal-note">Not needed: {item.distractors.join(', ')}</div>
            </>
          )}
        </div>

      </div>
    </div>
  );
}

function LettersItem({
  item,
  answer,
  onChange,
  inputRefs,
}: {
  item: Extract<QuickItem, { kind: 'letters' }>;
  answer: Extract<Answer, { kind: 'letters' }>;
  onChange: (a: Answer) => void;
  inputRefs: React.RefObject<(HTMLInputElement | null)[]>;
}) {
  const parts = item.paragraph.split('__BLANK__');

  const flatIndex = useMemo(() => {
    const map: Record<string, number> = {};
    let n = 0;
    item.blanks.forEach((b, bi) => {
      for (let li = 0; li < b.answer.length; li++) map[`${bi}-${li}`] = n++;
    });
    return map;
  }, [item]);

  function setLetter(bi: number, li: number, value: string) {
    const width = item.blanks[bi].answer.length;
    const chars = (answer.inputs[bi] || '').padEnd(width, ' ').split('');
    chars[li] = value || ' ';
    onChange({
      kind: 'letters',
      inputs: answer.inputs.map((w, k) => (k === bi ? chars.join('').replace(/ +$/, '') : w)),
    });
  }

  function focusFirstGap(bi: number) {
    const typed = answer.inputs[bi] || '';
    const width = item.blanks[bi].answer.length;
    let target = 0;
    for (let i = 0; i < width; i++) {
      if (!typed[i] || typed[i] === ' ') {
        target = i;
        break;
      }
      if (i === width - 1) target = 0;
    }
    inputRefs.current[flatIndex[`${bi}-${target}`]]?.focus();
  }

  return (
    <>
      <div className="q-number">Fill in the missing letters.</div>
      <p className="para">
        {parts.map((part, pi) => {
          const isLast = pi === parts.length - 1;
          const blank = isLast ? null : item.blanks[pi];
          let before = part;
          let prefix = '';
          if (!isLast && part) {
            const lastSpace = part.lastIndexOf(' ');
            before = part.substring(0, lastSpace + 1);
            prefix = part.substring(lastSpace + 1);
          }
          if (!blank) return <span key={pi}>{before}</span>;
          return (
            <span key={pi}>
              {before}
              <span
                className="word-chip"
                onMouseDown={(e) => {
                  e.preventDefault();
                  focusFirstGap(pi);
                }}
              >
                {prefix && <strong className="chip-prefix">{prefix}</strong>}
                {Array.from({ length: blank.answer.length }).map((_, li) => (
                  <input
                    key={li}
                    ref={(el) => {
                      inputRefs.current[flatIndex[`${pi}-${li}`]] = el;
                    }}
                    type="text"
                    maxLength={1}
                    className="letter-input"
                    tabIndex={li === 0 ? 0 : -1}
                    aria-label={`${prefix || 'Blank'} — letter ${li + 1} of ${blank.answer.length}`}
                    value={(answer.inputs[pi] || '')[li]?.trim() || ''}
                    onChange={(e) => {
                      const v = e.target.value.slice(-1);
                      setLetter(pi, li, v);
                      if (v) inputRefs.current[flatIndex[`${pi}-${li}`] + 1]?.focus();
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Backspace' && !e.currentTarget.value)
                        inputRefs.current[flatIndex[`${pi}-${li}`] - 1]?.focus();
                    }}
                  />
                ))}
              </span>
            </span>
          );
        })}
      </p>
    </>
  );
}

function OrderItem({
  item,
  answer,
  onChange,
}: {
  item: Extract<QuickItem, { kind: 'order' }>;
  answer: Extract<Answer, { kind: 'order' }>;
  onChange: (a: Answer) => void;
}) {
  const total = item.correct.length;
  const usedCounts: Record<string, number> = {};
  answer.placed.forEach((w) => (usedCounts[w] = (usedCounts[w] || 0) + 1));

  return (
    <>
      <div className="q-number">Complete the response to this question:</div>
      <div className="qt-quote">"{item.question}"</div>

      <div className="qt-slots">
        {item.prompt && <span className="qt-prompt">{item.prompt}</span>}
        {Array.from({ length: total }).map((_, i) => {
          const word = answer.placed[i];
          return (
            <div className={`blank-box ${word === undefined ? 'empty' : 'filled'}`} key={i}>
              {word ?? '—'}
            </div>
          );
        })}
      </div>

      <div className="word-bank">
        {answer.bank.map((word, ci) => {
          const before = answer.bank.slice(0, ci).filter((w) => w === word).length;
          const used = before < (usedCounts[word] || 0);
          return (
            <button
              key={ci}
              className={`bank-chip${used ? ' used' : ''}`}
              onClick={() => {
                if (answer.placed.length >= total) return;
                const inBank = answer.bank.filter((w) => w === word).length;
                if ((usedCounts[word] || 0) >= inBank) return;
                onChange({ ...answer, placed: [...answer.placed, word] });
              }}
            >
              {word}
            </button>
          );
        })}
      </div>

      {answer.placed.length > 0 && (
        <div className="btn-row" style={{ marginTop: '1rem' }}>
          <button className="btn" onClick={() => onChange({ ...answer, placed: answer.placed.slice(0, -1) })}>
            ↩ Undo
          </button>
        </div>
      )}
    </>
  );
}

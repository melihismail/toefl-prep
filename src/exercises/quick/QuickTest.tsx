import { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/useLanguage.ts';
import { LanguageToggle } from '../../components/LanguageToggle.tsx';
import { shuffle } from '../shuffle.ts';
import {
  buildQuickTest,
  categoryOf,
  isScorable,
  SECTION_LABEL,
  type QuickItem,
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
      return { kind: 'order', placed: [], bank: shuffle([...item.correct, item.distractor]) };
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

export function QuickTest() {
  const { t } = useLanguage();
  const [items, setItems] = useState<QuickItem[]>(buildQuickTest);
  const [answers, setAnswers] = useState<Answer[]>(() => items.map(blankAnswer));
  const [idx, setIdx] = useState(0);
  const [finished, setFinished] = useState(false);
  /** How far they got, so an early exit only grades what was seen. */
  const [reached, setReached] = useState(0);
  const [playing, setPlaying] = useState(false);
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

  const results = useMemo(() => {
    // Only what was actually reached counts, so quitting early is not punished.
    const seen = items.slice(0, reached + 1);
    const byCategory = new Map<string, { correct: number; total: number; href: string }>();
    let correct = 0;
    let scored = 0;
    seen.forEach((it, i) => {
      if (!isScorable(it)) return;
      scored++;
      const ok = isCorrect(it, answers[i]);
      if (ok) correct++;
      const key = categoryOf(it);
      const row = byCategory.get(key) ?? { correct: 0, total: 0, href: it.practiceHref };
      row.total++;
      if (ok) row.correct++;
      byCategory.set(key, row);
    });
    const review = seen
      .map((it, i) => ({ it, a: answers[i] }))
      .filter(({ it }) => !isScorable(it));
    return { correct, scored, byCategory: [...byCategory.entries()], review, seenCount: seen.length };
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

          <div className="card">
            <div className="review-title">What you missed</div>
            {results.byCategory.length === 0 && <div className="qt-cat-score">Nothing scored yet.</div>}
            {results.byCategory.map(([name, r]) => {
              const ok = r.correct === r.total;
              return (
                <div className="qt-cat" key={name}>
                  <div className="qt-cat-head">
                    <span className={`qt-dot ${ok ? 'ok' : 'bad'}`} aria-hidden="true" />
                    <span className="qt-cat-name">{name}</span>
                    <span className="qt-cat-score">
                      {r.correct}/{r.total}
                    </span>
                  </div>
                  {!ok && (
                    <Link className="qt-practise" to={r.href}>
                      Practise this →
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          {results.review.length > 0 && (
            <div className="card qt-teacher" style={{ marginTop: '1rem' }}>
              <div className="review-title">Needs your teacher</div>
              <p className="qt-teacher-note">
                Writing and speaking cannot be marked automatically. Show these answers to your teacher for
                feedback.
              </p>
              {results.review.map(({ it, a }, i) => (
                <div className="qt-cat" key={i}>
                  <div className="qt-cat-head">
                    <span className="qt-dot pending" aria-hidden="true" />
                    <span className="qt-cat-name">{it.skill}</span>
                    <span className="qt-cat-score">{SECTION_LABEL[it.section]}</span>
                  </div>
                  {it.kind === 'write' && (
                    <div className="qt-teacher-answer">
                      {a.kind === 'write' && a.text.trim() ? (
                        <>
                          <span className="qt-teacher-count">{countWords(a.text)} words</span>
                          <div className="qt-teacher-text">{a.text}</div>
                        </>
                      ) : (
                        <span className="qt-cat-score">Not attempted</span>
                      )}
                    </div>
                  )}
                  {it.kind === 'speak' && (
                    <div className="qt-teacher-answer">
                      <div className="qt-teacher-text">"{it.prompt}"</div>
                      <span className="qt-cat-score">
                        {a.kind === 'speak' && a.done ? 'Marked as answered aloud' : 'Not attempted'}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="restart-row" style={{ marginTop: '1rem' }}>
            <button className="btn btn-primary" onClick={restart}>
              New quick test
            </button>
          </div>
        </div>
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

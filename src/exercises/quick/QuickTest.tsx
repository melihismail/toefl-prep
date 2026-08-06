import { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/useLanguage.ts';
import { LanguageToggle } from '../../components/LanguageToggle.tsx';
import { shuffle } from '../shuffle.ts';
import { buildQuickTest, categoryOf, QUICK_TEST_SIZE, type QuickItem } from '../../data/quickTest.ts';
import '../reading/CompleteTheWords.css';
import './QuickTest.css';

const LETTERS = ['A', 'B', 'C', 'D'];

type Answer =
  | { kind: 'mc'; selected: number }
  | { kind: 'letters'; inputs: string[] }
  | { kind: 'order'; placed: string[]; bank: string[] };

function blankAnswer(item: QuickItem): Answer {
  if (item.kind === 'mc') return { kind: 'mc', selected: -1 };
  if (item.kind === 'letters') return { kind: 'letters', inputs: item.blanks.map(() => '') };
  return { kind: 'order', placed: [], bank: shuffle([...item.correct, item.distractor]) };
}

function isCorrect(item: QuickItem, a: Answer): boolean {
  if (item.kind === 'mc' && a.kind === 'mc') return a.selected === item.answer;
  if (item.kind === 'letters' && a.kind === 'letters')
    return item.blanks.every((b, i) => (a.inputs[i] || '').toLowerCase() === b.answer.toLowerCase());
  if (item.kind === 'order' && a.kind === 'order') return a.placed.join(' ') === item.correct.join(' ');
  return false;
}

function answered(item: QuickItem, a: Answer): boolean {
  if (a.kind === 'mc') return a.selected !== -1;
  if (a.kind === 'letters' && item.kind === 'letters')
    return item.blanks.every((b, i) => (a.inputs[i] || '').replace(/ /g, '').length === b.answer.length);
  if (a.kind === 'order' && item.kind === 'order') return a.placed.length === item.correct.length;
  return false;
}

export function QuickTest() {
  const { t } = useLanguage();
  const [items, setItems] = useState<QuickItem[]>(buildQuickTest);
  const [answers, setAnswers] = useState<Answer[]>(() => items.map(blankAnswer));
  const [idx, setIdx] = useState(0);
  const [finished, setFinished] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audio = useRef<HTMLAudioElement | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const item = items[idx];
  const answer = answers[idx];

  function patch(next: Answer) {
    setAnswers((prev) => prev.map((a, i) => (i === idx ? next : a)));
  }

  function restart() {
    const fresh = buildQuickTest();
    setItems(fresh);
    setAnswers(fresh.map(blankAnswer));
    setIdx(0);
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
    const byCategory = new Map<string, { correct: number; total: number; href: string; section: string }>();
    let correct = 0;
    items.forEach((it, i) => {
      const ok = isCorrect(it, answers[i]);
      if (ok) correct++;
      const key = categoryOf(it);
      const row = byCategory.get(key) ?? { correct: 0, total: 0, href: it.practiceHref, section: it.section };
      row.total++;
      if (ok) row.correct++;
      byCategory.set(key, row);
    });
    return { correct, total: items.length, byCategory: [...byCategory.entries()] };
  }, [items, answers]);

  if (finished) {
    const weak = results.byCategory.filter(([, r]) => r.correct < r.total);
    return (
      <div className="section-reading">
        <LanguageToggle />
        <div className="app score-screen" style={{ display: 'block' }}>
          <div className="score-hero">
            <div className="score-circle">
              <span className="big">
                {results.correct}/{results.total}
              </span>
              <span className="small">correct</span>
            </div>
            <p className="score-msg">
              {results.correct === results.total
                ? 'Perfect — nothing to review.'
                : `${weak.length} area${weak.length === 1 ? '' : 's'} to work on.`}
            </p>
            <button className="btn btn-primary" onClick={restart}>
              New quick test
            </button>
          </div>

          <div className="card">
            <div className="review-title">What you missed</div>
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

          <div className="card" style={{ marginTop: '1rem' }}>
            <div className="review-title">Answers</div>
            {items.map((it, i) => {
              const ok = isCorrect(it, answers[i]);
              const a = answers[i];
              let given = '(not answered)';
              let correctText = '';
              if (it.kind === 'mc' && a.kind === 'mc') {
                given = a.selected === -1 ? given : `${LETTERS[a.selected]}) ${it.options[a.selected]}`;
                correctText = `${LETTERS[it.answer]}) ${it.options[it.answer]}`;
              } else if (it.kind === 'letters' && a.kind === 'letters') {
                given = a.inputs.filter(Boolean).join(', ') || given;
                correctText = it.blanks.map((b) => b.answer).join(', ');
              } else if (it.kind === 'order' && a.kind === 'order') {
                given = a.placed.join(' ') || given;
                correctText = it.correct.join(' ');
              }
              return (
                <div className={`review-item ${ok ? 'correct-item' : 'wrong-item'}`} key={i}>
                  <div className={`tag ${ok ? 'tag-correct' : 'tag-wrong'}`} style={{ marginBottom: 6 }}>
                    {ok ? '✓ Correct' : '✗ Incorrect'} · {categoryOf(it)}
                  </div>
                  <div className="review-q-text">
                    Q{i + 1}: {it.kind === 'mc' ? it.stem : it.kind === 'order' ? `"${it.question}"` : it.title}
                  </div>
                  <div className="review-row">
                    <span className="label">Your answer:</span>{' '}
                    <span className={ok ? 'ok' : 'given'}>{given}</span>
                  </div>
                  {!ok && (
                    <div className="review-row">
                      <span className="label">Correct:</span> <span className="correct">{correctText}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

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
        <div className="progress-wrap" style={{ marginBottom: '1.5rem' }}>
          <div className="progress-fill" style={{ width: `${((idx + 1) / items.length) * 100}%` }} />
        </div>

        <div className="card">
          <div className="qt-source">
            <span className="topic-tag">{item.skill}</span>
            {item.type && <span className="qt-type">{item.type}</span>}
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
        </div>

        <div className="nav-row">
          <button className="btn" disabled={idx === 0} onClick={() => setIdx(idx - 1)}>
            ← Previous
          </button>
          <button
            className="btn btn-primary"
            onClick={() => (last ? setFinished(true) : setIdx(idx + 1))}
            title={answered(item, answer) ? undefined : 'You can skip and come back'}
          >
            {last ? 'See results ✓' : 'Next →'}
          </button>
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

export { QUICK_TEST_SIZE };

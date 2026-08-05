import { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/useLanguage.ts';
import { LanguageToggle } from '../../components/LanguageToggle.tsx';
import { shuffle } from '../shuffle.ts';
import { missingQuestions } from '../../data/reading/completeTheWords.ts';
import type { MissingWordsQuestion } from '../../data/reading/types.ts';

const EXAM_SIZE = 10;

type QState = {
  /** One typed string per blank. */
  inputs: string[];
  checked: boolean;
  revealed: boolean;
  isCorrect: boolean | null;
};

function freshState(exam: MissingWordsQuestion[]): QState[] {
  return exam.map((q) => ({ inputs: q.blanks.map(() => ''), checked: false, revealed: false, isCorrect: null }));
}

function gradeOne(q: MissingWordsQuestion, inputs: string[]) {
  return q.blanks.every((b, bi) => (inputs[bi] || '').toLowerCase() === b.answer.toLowerCase());
}

export function CompleteTheWords() {
  const { t } = useLanguage();
  const [exam, setExam] = useState<MissingWordsQuestion[]>(() => shuffle(missingQuestions).slice(0, EXAM_SIZE));
  const [state, setState] = useState<QState[]>(() => freshState(exam));
  const [currentIdx, setCurrentIdx] = useState(0);
  const [finished, setFinished] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const size = exam.length;
  const q = exam[currentIdx];
  const s = state[currentIdx];
  const locked = s.checked || s.revealed;

  function patch(change: Partial<QState>) {
    setState((prev) => prev.map((v, i) => (i === currentIdx ? { ...v, ...change } : v)));
  }

  // Reads prev inside the updater: typing fast enough to batch two keystrokes
  // would otherwise drop a letter.
  function setLetter(blankIdx: number, letterIdx: number, value: string) {
    const width = exam[currentIdx].blanks[blankIdx].answer.length;
    setState((prev) =>
      prev.map((v, i) => {
        if (i !== currentIdx) return v;
        const chars = (v.inputs[blankIdx] || '').padEnd(width, ' ').split('');
        chars[letterIdx] = value || ' ';
        const inputs = v.inputs.map((w, k) => (k === blankIdx ? chars.join('').replace(/ +$/, '') : w));
        return { ...v, inputs };
      }),
    );
  }

  /** Flat DOM order of the letter inputs, so focus can move across blanks. */
  const flatIndex = useMemo(() => {
    const map: Record<string, number> = {};
    let n = 0;
    q.blanks.forEach((b, bi) => {
      for (let li = 0; li < b.answer.length; li++) map[`${bi}-${li}`] = n++;
    });
    return map;
  }, [q]);

  function focusOffset(blankIdx: number, letterIdx: number, delta: number) {
    const target = flatIndex[`${blankIdx}-${letterIdx}`] + delta;
    inputRefs.current[target]?.focus();
  }

  const score = useMemo(() => {
    const correct = state.filter((v) => v.isCorrect === true).length;
    return { correct, pct: Math.round((correct / size) * 100) };
  }, [state, size]);

  function finish() {
    // Grade anything the learner never checked, same as the original.
    setState((prev) =>
      prev.map((v, i) => (v.checked || v.revealed ? v : { ...v, isCorrect: gradeOne(exam[i], v.inputs) })),
    );
    setFinished(true);
  }

  function restart() {
    const fresh = shuffle(missingQuestions).slice(0, EXAM_SIZE);
    setExam(fresh);
    setState(freshState(fresh));
    setCurrentIdx(0);
    setFinished(false);
  }

  if (finished) {
    return (
      <div className="section-reading">
        <LanguageToggle />
        <div className="app score-screen" style={{ display: 'block' }}>
          <div className="score-hero">
            <div className="score-circle">
              <span className="big">
                {score.correct}/{size}
              </span>
              <span className="small">correct</span>
            </div>
            <p className="score-msg">
              {score.pct === 100
                ? 'Perfect score! Outstanding.'
                : score.pct >= 80
                  ? 'Great job! A few to review.'
                  : score.pct >= 60
                    ? 'Good effort — keep practicing!'
                    : 'Keep going — practice makes perfect!'}
            </p>
            <button className="btn btn-primary" onClick={restart}>
              New exam
            </button>
          </div>

          <div className="card">
            <div className="review-title">Your answers</div>
            {exam.map((qq, i) => {
              const ok = state[i].isCorrect === true;
              return (
                <div key={i} className={`review-item ${ok ? 'correct-item' : 'wrong-item'}`}>
                  <div className={`tag ${ok ? 'tag-correct' : 'tag-wrong'}`} style={{ marginBottom: 6 }}>
                    {ok ? '✓ Correct' : '✗ Incorrect'}
                  </div>
                  <div className="review-q-text">
                    Q{i + 1}: {qq.title}
                  </div>
                  {qq.blanks.map((b, bi) => {
                    const given = state[i].inputs[bi] || '(empty)';
                    const match = given.toLowerCase() === b.answer.toLowerCase();
                    return (
                      <div className="review-row" key={bi}>
                        <span className="label">Blank {bi + 1}:</span>{' '}
                        {match ? (
                          <span className="ok">{given} ✓</span>
                        ) : (
                          <>
                            <span className="given">{given}</span> → <span className="correct">{b.answer}</span>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>

          <div className="restart-row" style={{ marginTop: '1rem' }}>
            <button className="btn btn-primary" onClick={restart}>
              New exam
            </button>
          </div>
        </div>
      </div>
    );
  }

  // The paragraph is prose split on __BLANK__; the word fragment immediately
  // before each marker is bolded as the visible prefix.
  const parts = q.paragraph.split('__BLANK__');
  inputRefs.current = [];

  return (
    <div className="section-reading">
      <LanguageToggle />
      <div className="app">
        <div className="topbar">
          <Link to="/sections/reading" className="back-btn">
            {t('back_reading')}
          </Link>
          <div className="exam-label">{t('complete_the_words')}</div>
          <div className="q-counter">
            {currentIdx + 1} / {size}
          </div>
        </div>
        <div className="progress-wrap" style={{ marginBottom: '1.5rem' }}>
          <div className="progress-fill" style={{ width: `${((currentIdx + 1) / size) * 100}%` }} />
        </div>

        <div className="card">
          <div className="q-number">Fill in the missing letters in the paragraph.</div>

          <p className="para">
            {parts.map((part, pi) => {
              const isLast = pi === parts.length - 1;
              let lead: React.ReactNode = part;
              if (!isLast && part) {
                const lastSpace = part.lastIndexOf(' ');
                const before = part.substring(0, lastSpace + 1);
                const prefix = part.substring(lastSpace + 1);
                lead = (
                  <>
                    {before}
                    {prefix && <strong className="word-shown">{prefix}</strong>}
                  </>
                );
              }
              const blank = isLast ? null : q.blanks[pi];
              return (
                <span key={pi}>
                  {lead}
                  {blank &&
                    Array.from({ length: blank.answer.length }).map((_, li) => {
                      const typed = s.inputs[pi] || '';
                      let cls = 'letter-input';
                      let value = typed[li] || '';
                      if (s.revealed) {
                        value = blank.answer[li];
                        cls += ' correct';
                      } else if (s.checked) {
                        cls += typed[li]?.toLowerCase() === blank.answer[li].toLowerCase() ? ' correct' : ' wrong';
                      }
                      return (
                        <input
                          key={li}
                          ref={(el) => {
                            inputRefs.current[flatIndex[`${pi}-${li}`]] = el;
                          }}
                          type="text"
                          maxLength={1}
                          className={cls}
                          disabled={locked}
                          value={value.trim()}
                          onChange={(e) => {
                            const v = e.target.value.slice(-1);
                            setLetter(pi, li, v);
                            if (v) focusOffset(pi, li, 1);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Backspace' && !e.currentTarget.value) focusOffset(pi, li, -1);
                          }}
                        />
                      );
                    })}
                </span>
              );
            })}
          </p>

          <div className="btn-row">
            <button
              className="btn btn-primary"
              disabled={locked}
              onClick={() => patch({ checked: true, isCorrect: gradeOne(q, s.inputs) })}
            >
              {s.checked ? (s.isCorrect ? 'Correct ✓' : 'Wrong ✗') : 'Check answer ↗'}
            </button>
            <button
              className="btn btn-outline"
              disabled={s.revealed}
              onClick={() => patch({ revealed: true, isCorrect: s.isCorrect ?? false })}
            >
              {s.revealed ? 'Answer shown' : 'Show answer'}
            </button>
            <button
              className="btn"
              disabled={locked}
              onClick={() => patch({ inputs: q.blanks.map(() => ''), checked: false, revealed: false, isCorrect: null })}
            >
              Reset
            </button>
          </div>

          {s.checked && (
            <div className={`feedback ${s.isCorrect ? 'correct' : 'wrong'}`} style={{ display: 'block' }}>
              {s.isCorrect ? (
                <>
                  <strong>All correct!</strong> Great work.
                </>
              ) : (
                <>
                  <strong>Not quite.</strong> Wrong letters are highlighted in red. Try "Show answer" to see the full
                  solution.
                </>
              )}
            </div>
          )}

          {s.revealed && (
            <div className="feedback reveal" style={{ display: 'block' }}>
              <strong>Correct answers:</strong>{' '}
              {q.blanks.map((b, i) => (
                <span key={i}>
                  {i > 0 && ', '}
                  <strong>{b.answer}</strong>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="nav-row">
          <button className="btn" disabled={currentIdx === 0} onClick={() => setCurrentIdx(currentIdx - 1)}>
            ← Previous
          </button>
          <button
            className="btn btn-primary"
            onClick={() => (currentIdx < size - 1 ? setCurrentIdx(currentIdx + 1) : finish())}
          >
            {currentIdx === size - 1 ? 'Finish exam ✓' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  );
}

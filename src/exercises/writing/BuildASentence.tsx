import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/useLanguage.ts';
import { LanguageToggle } from '../../components/LanguageToggle.tsx';
import { shuffle } from '../shuffle.ts';
import { sentenceQuestions } from '../../data/writing/buildASentence.ts';
import type { SentenceQuestion } from '../../data/writing/types.ts';

const EXAM_SIZE = 16;

type QState = {
  /** Correct words plus one distractor, shuffled. */
  bank: string[];
  placed: string[];
  checked: boolean;
  revealed: boolean;
  isCorrect: boolean | null;
};

function freshState(exam: SentenceQuestion[]): QState[] {
  return exam.map((q) => ({
    bank: shuffle([...q.correct, q.distractor]),
    placed: [],
    checked: false,
    revealed: false,
    isCorrect: null,
  }));
}

function fullAnswer(q: SentenceQuestion) {
  return q.prompt ? `${q.prompt} ${q.correct.join(' ')}` : q.correct.join(' ');
}

export function BuildASentence() {
  const { t } = useLanguage();
  const [exam, setExam] = useState<SentenceQuestion[]>(() => shuffle(sentenceQuestions).slice(0, EXAM_SIZE));
  const [state, setState] = useState<QState[]>(() => freshState(exam));
  const [currentIdx, setCurrentIdx] = useState(0);
  const [finished, setFinished] = useState(false);

  const size = exam.length;
  const q = exam[currentIdx];
  const s = state[currentIdx];
  const locked = s.checked || s.revealed;
  const totalWords = q.correct.length;

  function patch(change: Partial<QState>) {
    setState((prev) => prev.map((v, i) => (i === currentIdx ? { ...v, ...change } : v)));
  }

  /** Functional update: two quick chip taps in one batch must both land. */
  function placeWord(word: string) {
    setState((prev) =>
      prev.map((v, i) => {
        if (i !== currentIdx) return v;
        if (v.placed.length >= totalWords) return v;
        const inBank = v.bank.filter((w) => w === word).length;
        const alreadyPlaced = v.placed.filter((w) => w === word).length;
        if (alreadyPlaced >= inBank) return v;
        return { ...v, placed: [...v.placed, word] };
      }),
    );
  }

  function undo() {
    setState((prev) => prev.map((v, i) => (i === currentIdx ? { ...v, placed: v.placed.slice(0, -1) } : v)));
  }

  /** A chip is spent once as many copies are placed as the bank holds. */
  const usedCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    s.placed.forEach((w) => (counts[w] = (counts[w] || 0) + 1));
    return counts;
  }, [s.placed]);

  const score = useMemo(() => {
    const correct = state.filter((v) => v.isCorrect === true).length;
    return { correct, pct: Math.round((correct / size) * 100) };
  }, [state, size]);

  function finish() {
    setState((prev) =>
      prev.map((v, i) =>
        v.checked || v.revealed ? v : { ...v, isCorrect: v.placed.join(' ') === exam[i].correct.join(' ') },
      ),
    );
    setFinished(true);
  }

  function restart() {
    const fresh = shuffle(sentenceQuestions).slice(0, EXAM_SIZE);
    setExam(fresh);
    setState(freshState(fresh));
    setCurrentIdx(0);
    setFinished(false);
  }

  if (finished) {
    return (
      <div className="section-writing">
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
              const placed = state[i].placed;
              const given =
                placed.length > 0
                  ? qq.prompt
                    ? `${qq.prompt} ${placed.join(' ')}`
                    : placed.join(' ')
                  : '(no answer)';
              return (
                <div key={i} className={`review-item ${ok ? 'correct-item' : 'wrong-item'}`}>
                  <div className={`tag ${ok ? 'tag-correct' : 'tag-wrong'}`} style={{ marginBottom: 6 }}>
                    {ok ? '✓ Correct' : '✗ Incorrect'}
                  </div>
                  <div className="review-q-text" style={{ fontStyle: 'italic', marginBottom: 4 }}>
                    "{qq.question}"
                  </div>
                  <div className="review-row">
                    <span className="label">Your answer:</span>
                    <span className={ok ? 'ok' : 'given'}>{given}</span>
                  </div>
                  {!ok && (
                    <div className="review-row">
                      <span className="label">Correct:</span>
                      <span className="correct">{fullAnswer(qq)}</span>
                    </div>
                  )}
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

  return (
    <div className="section-writing">
      <LanguageToggle />
      <div className="app">
        <div className="topbar">
          <Link to="/sections/writing" className="back-btn">
            {t('back_writing')}
          </Link>
          <div className="exam-label">{t('build_a_sentence')}</div>
          <div className="q-counter">
            {currentIdx + 1} / {size}
          </div>
        </div>
        <div className="progress-wrap" style={{ marginBottom: '1.5rem' }}>
          <div className="progress-fill" style={{ width: `${((currentIdx + 1) / size) * 100}%` }} />
        </div>

        <div className="card">
          <div className="q-number">Complete the response to this question:</div>

          <div
            style={{
              background: 'var(--accent-light)',
              border: '1px solid var(--accent-mid)',
              borderRadius: 'var(--radius-sm)',
              padding: '10px 14px',
              marginBottom: '1rem',
              fontSize: 15,
              fontWeight: 500,
              color: 'var(--text)',
              fontStyle: 'italic',
            }}
          >
            "{q.question}"
          </div>

          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 6, marginBottom: '1rem' }}>
            {q.prompt && (
              <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--accent)', marginRight: 2 }}>
                {q.prompt}
              </span>
            )}
            {Array.from({ length: totalWords }).map((_, i) => {
              const word = s.placed[i];
              if (word === undefined) {
                return (
                  <div className="blank-box empty" key={i}>
                    —
                  </div>
                );
              }
              const ok = word === q.correct[i];
              const colour = locked ? (ok ? 'var(--success-text)' : 'var(--error-text)') : undefined;
              return (
                <div
                  className="blank-box filled"
                  key={i}
                  style={locked ? { color: colour, borderBottomColor: colour } : undefined}
                >
                  {word}
                </div>
              );
            })}
          </div>

          <div className="word-bank">
            {s.bank.map((word, ci) => {
              const copiesBefore = s.bank.slice(0, ci).filter((w) => w === word).length;
              const used = copiesBefore < (usedCounts[word] || 0);
              return (
                <button
                  key={ci}
                  className={`bank-chip${used ? ' used' : ''}`}
                  disabled={locked}
                  onClick={() => placeWord(word)}
                >
                  {word}
                </button>
              );
            })}
          </div>

          <div className="btn-row">
            <button
              className="btn btn-primary"
              disabled={s.placed.length !== totalWords || locked}
              onClick={() => patch({ checked: true, isCorrect: s.placed.join(' ') === q.correct.join(' ') })}
            >
              {s.checked ? (s.isCorrect ? 'Correct ✓' : 'Wrong ✗') : 'Check answer ↗'}
            </button>
            <button className="btn btn-outline" disabled={s.revealed} onClick={() => patch({ revealed: true })}>
              {s.revealed ? 'Answer shown' : 'Show answer'}
            </button>
            <button
              className="btn"
              disabled={locked}
              onClick={() =>
                patch({
                  bank: shuffle([...q.correct, q.distractor]),
                  placed: [],
                  checked: false,
                  revealed: false,
                  isCorrect: null,
                })
              }
            >
              Reset
            </button>
            {!locked && s.placed.length > 0 && (
              <button className="btn" onClick={undo}>
                ↩ Undo
              </button>
            )}
          </div>

          {s.checked && (
            <div className={`feedback ${s.isCorrect ? 'correct' : 'wrong'}`} style={{ display: 'block' }}>
              {s.isCorrect ? (
                <>
                  <strong>Correct!</strong> "{fullAnswer(q)}"
                </>
              ) : (
                <>
                  <strong>Not quite.</strong> Correct: <em>{fullAnswer(q)}</em>
                </>
              )}
            </div>
          )}

          {s.revealed && (
            <div className="feedback reveal" style={{ display: 'block' }}>
              <strong>Answer:</strong> <em>{fullAnswer(q)}</em> &nbsp;|&nbsp; <strong>Distractor:</strong>{' '}
              <span style={{ color: 'var(--error-text)' }}>{q.distractor}</span>
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

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/useLanguage.ts';
import { LanguageToggle } from '../../components/LanguageToggle.tsx';
import { shuffle } from '../shuffle.ts';
import { sentenceQuestions } from '../../data/writing/buildASentence.ts';
import type { SentenceQuestion } from '../../data/writing/types.ts';
import { SentenceBuilder } from './SentenceBuilder.tsx';

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
    bank: shuffle([...q.correct, ...q.distractors]),
    placed: [],
    checked: false,
    revealed: false,
    isCorrect: null,
  }));
}

function fullAnswer(q: SentenceQuestion) {
  const body = q.prompt ? `${q.prompt} ${q.correct.join(' ')}` : q.correct.join(' ');
  // The mark is never a chip — it sits in place, as the task describes.
  return q.isQuestion ? `${body}?` : `${body}.`;
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

  const correctCount = state.filter((v) => v.isCorrect === true).length;
  const score = { correct: correctCount, pct: Math.round((correctCount / size) * 100) };

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
          <SentenceBuilder
            question={q.question}
            prompt={q.prompt}
            correct={q.correct}
            bank={s.bank}
            placed={s.placed}
            isQuestion={q.isQuestion}
            locked={locked}
            mark={s.checked}
            reveal={s.revealed}
            onPlace={placeWord}
            onUndo={undo}
          />

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
                  bank: shuffle([...q.correct, ...q.distractors]),
                  placed: [],
                  checked: false,
                  revealed: false,
                  isCorrect: null,
                })
              }
            >
              Reset
            </button>
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
              <span style={{ color: 'var(--error-text)' }}>{q.distractors.join(', ')}</span>
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

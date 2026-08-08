import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/useLanguage.ts';
import { LanguageToggle } from '../../components/LanguageToggle.tsx';
import { shuffle } from '../shuffle.ts';
import { cTestTexts } from '../../data/reading/cTestTexts.ts';
import { buildCTest } from '../../data/reading/ctest.ts';
import type { MissingWordsQuestion } from '../../data/reading/types.ts';
import { CTestParagraph, CTestReview } from './CTestParagraph.tsx';
import { AnswerControls } from '../AnswerControls.tsx';
import './CompleteTheWords.css';

const EXAM_SIZE = 10;

/** Truncation is derived from the source text, so every exam is spec-shaped. */
function buildExam(): MissingWordsQuestion[] {
  return shuffle(cTestTexts)
    .slice(0, EXAM_SIZE)
    .map((t) => ({ title: t.title, ...buildCTest(t.text) }));
}

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
  const [exam, setExam] = useState<MissingWordsQuestion[]>(buildExam);
  const [state, setState] = useState<QState[]>(() => freshState(exam));
  const [currentIdx, setCurrentIdx] = useState(0);
  const [finished, setFinished] = useState(false);

  const size = exam.length;
  const q = exam[currentIdx];
  const s = state[currentIdx];

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

  /**
   * Scored per blank, not per paragraph. Counting only flawless paragraphs
   * meant one wrong letter threw away credit for every other word in it.
   */
  const score = useMemo(() => {
    let total = 0;
    let correct = 0;
    exam.forEach((qq, i) => {
      qq.blanks.forEach((b, bi) => {
        total++;
        if ((state[i]?.inputs[bi] || '').toLowerCase() === b.answer.toLowerCase()) correct++;
      });
    });
    return { correct, total, pct: total ? Math.round((correct / total) * 100) : 0 };
  }, [exam, state]);

  /** A blank counts as done once every letter cell in it holds a character. */
  const filledCount = useMemo(
    () =>
      q.blanks.filter((b, bi) => {
        const typed = s.inputs[bi] || '';
        return typed.length === b.answer.length && !typed.includes(' ');
      }).length,
    [q, s],
  );

  function finish() {
    // Grade anything the learner never checked, same as the original.
    setState((prev) =>
      prev.map((v, i) => (v.checked || v.revealed ? v : { ...v, isCorrect: gradeOne(exam[i], v.inputs) })),
    );
    setFinished(true);
  }

  function restart() {
    const fresh = buildExam();
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
                {score.correct}/{score.total}
              </span>
              <span className="small">words</span>
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
              const right = qq.blanks.filter(
                (b, bi) => (state[i].inputs[bi] || '').toLowerCase() === b.answer.toLowerCase(),
              ).length;
              return (
                <div key={i} className="ctw-review-item">
                  <div className="review-q-text">
                    Q{i + 1}: {qq.title} — {right}/{qq.blanks.length}
                  </div>
                  <CTestReview paragraph={qq.paragraph} blanks={qq.blanks} inputs={state[i].inputs} />
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
          <div className="ctw-head">
            <div className="q-number" style={{ marginBottom: 0 }}>
              Fill in the missing letters in the paragraph.
            </div>
            <div className="ctw-progress">
              {filledCount} of {q.blanks.length} done
            </div>
          </div>

          <CTestParagraph
            paragraph={q.paragraph}
            blanks={q.blanks}
            inputs={s.inputs}
            checked={s.checked}
            revealed={s.revealed}
            onLetter={setLetter}
          />

          <AnswerControls
            complete={filledCount === q.blanks.length}
            attempted={s.inputs.some((w) => w.trim().length > 0)}
            checked={s.checked}
            revealed={s.revealed}
            correct={s.isCorrect === true}
            onCheck={() => patch({ checked: true, isCorrect: gradeOne(q, s.inputs) })}
            onReveal={() => patch({ revealed: true, isCorrect: s.isCorrect ?? false })}
            onRetry={() =>
              patch({ inputs: q.blanks.map(() => ''), checked: false, revealed: false, isCorrect: null })
            }
          />

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

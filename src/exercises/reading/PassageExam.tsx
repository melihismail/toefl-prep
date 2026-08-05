import { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/useLanguage.ts';
import { LanguageToggle } from '../../components/LanguageToggle.tsx';
import { shuffle } from '../shuffle.ts';
import type { ReadingPassage } from '../../data/reading/types.ts';
import type { TranslationKey } from '../../i18n/translations.ts';
import './PassageExam.css';

const LETTERS = ['A', 'B', 'C', 'D'];

type PassageState = {
  selected: number[];
  checked: boolean;
  revealed: boolean;
  passageOpen: boolean;
};

function freshState(exam: ReadingPassage[]): PassageState[] {
  return exam.map((p) => ({
    selected: p.questions.map(() => -1),
    checked: false,
    revealed: false,
    passageOpen: false,
  }));
}

type Props = {
  data: ReadingPassage[];
  examSize: number;
  titleKey: TranslationKey;
  backTo: string;
  backLabelKey: TranslationKey;
  /** Academic Passage expands further than the shorter Daily Life texts. */
  expandedMaxHeight: string;
  /** Academic Passage shows the title above the text and a type badge per question. */
  variant: 'daily-life' | 'academic';
};

export function PassageExam({
  data,
  examSize,
  titleKey,
  backTo,
  backLabelKey,
  expandedMaxHeight,
  variant,
}: Props) {
  const { t } = useLanguage();
  const [exam, setExam] = useState<ReadingPassage[]>(() => shuffle(data).slice(0, examSize));
  const [state, setState] = useState<PassageState[]>(() => freshState(exam));
  const [currentIdx, setCurrentIdx] = useState(0);
  const [finished, setFinished] = useState(false);

  const size = exam.length;
  const p = exam[currentIdx];
  const s = state[currentIdx];

  const patch = useCallback((idx: number, change: Partial<PassageState>) => {
    setState((prev) => prev.map((v, i) => (i === idx ? { ...v, ...change } : v)));
  }, []);

  // Reads prev inside the updater: a closure snapshot would make two selections
  // in the same batch overwrite each other.
  const selectOption = useCallback((idx: number, qi: number, oi: number) => {
    setState((prev) =>
      prev.map((v, i) => (i === idx ? { ...v, selected: v.selected.map((x, k) => (k === qi ? oi : x)) } : v)),
    );
  }, []);

  const countCorrect = useCallback(
    (idx: number) => exam[idx].questions.filter((q, qi) => state[idx].selected[qi] === q.answer).length,
    [exam, state],
  );
  const isAllCorrect = useCallback(
    (idx: number) => countCorrect(idx) === exam[idx].questions.length,
    [countCorrect, exam],
  );

  const score = useMemo(() => {
    let total = 0;
    let correct = 0;
    exam.forEach((pa, i) => {
      total += pa.questions.length;
      correct += pa.questions.filter((q, qi) => state[i].selected[qi] === q.answer).length;
    });
    return { total, correct, pct: total ? Math.round((correct / total) * 100) : 0 };
  }, [exam, state]);

  function finish() {
    // Matches the original: unchecked passages are marked checked on finish.
    setState((prev) => prev.map((v) => (v.checked || v.revealed ? v : { ...v, checked: true })));
    setFinished(true);
  }

  function restart() {
    const fresh = shuffle(data).slice(0, examSize);
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
              <span className="small">correct</span>
            </div>
            <p className="score-msg">
              {score.pct === 100
                ? 'Perfect!'
                : score.pct >= 80
                  ? 'Great job!'
                  : score.pct >= 60
                    ? 'Good effort!'
                    : 'Keep going!'}
            </p>
            <button className="btn btn-primary" onClick={restart}>
              New exam
            </button>
          </div>

          <div className="card">
            <div className="review-title">Your answers</div>
            <div>
              {exam.map((pa, pi) => {
                const ok = pa.questions.every((q, qi) => state[pi].selected[qi] === q.answer);
                const label = variant === 'academic' ? pa.topic : pa.textType;
                return (
                  <div key={pi} className={`review-item ${ok ? 'correct-item' : 'wrong-item'}`}>
                    <div className={`tag ${ok ? 'tag-correct' : 'tag-wrong'}`} style={{ marginBottom: 6 }}>
                      {ok ? '✓ All correct' : '✗ Some incorrect'}
                    </div>
                    <div className="review-passage">
                      Passage {pi + 1} — {label}: {pa.title}
                    </div>
                    {pa.questions.map((q, qi) => {
                      const chosen = state[pi].selected[qi];
                      const match = chosen === q.answer;
                      const given = chosen === -1 ? '(not answered)' : `${LETTERS[chosen]}) ${q.options[chosen]}`;
                      return (
                        <div key={qi}>
                          <div className="review-q-text">
                            Q{qi + 1}: {q.stem}
                          </div>
                          <div className="review-row">
                            <span className="label">Your answer:</span>{' '}
                            {match ? (
                              <span className="ok">{given} ✓</span>
                            ) : (
                              <>
                                <span className="given">{given}</span>
                                <br />
                                <span className="label">Correct:</span>{' '}
                                <span className="correct">
                                  {LETTERS[q.answer]}) {q.options[q.answer]}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
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

  const locked = s.checked || s.revealed;
  const allAnswered = s.selected.every((v) => v !== -1);
  const maskImage = s.passageOpen ? 'none' : 'linear-gradient(to bottom, black 60%, transparent 100%)';

  return (
    <div className="section-reading">
      <LanguageToggle />
      <div className="app" style={{ paddingBottom: 0, paddingTop: '1rem' }}>
        <div className="topbar">
          <Link to={backTo} className="back-btn">
            {t(backLabelKey)}
          </Link>
          <div className="exam-label">{t(titleKey)}</div>
          <div className="q-counter">
            Passage {currentIdx + 1} of {size}
          </div>
        </div>
        <div className="progress-wrap">
          <div className="progress-fill" style={{ width: `${((currentIdx + 1) / size) * 100}%` }} />
        </div>
      </div>

      <div className="app">
        <div className="card sticky-passage" style={{ marginBottom: '1rem' }}>
          <div className="topic-tag" style={{ marginBottom: 6 }}>
            {variant === 'academic' ? p.topic || 'Academic' : p.textType}
          </div>

          {variant === 'academic' && p.title && (
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: 'var(--text)' }}>{p.title}</div>
          )}

          <div
            style={{
              overflow: 'hidden',
              transition: 'max-height .3s ease',
              maxHeight: s.passageOpen ? expandedMaxHeight : '4.5em',
              lineHeight: 1.85,
              fontSize: 14,
              color: 'var(--text)',
              WebkitMaskImage: maskImage,
              maskImage,
            }}
          >
            {variant === 'daily-life' && p.textType === 'Email' && (
              <>
                {p.subject && <div className="email-subject">Subject: {p.subject}</div>}
                {p.from && <div className="email-from">From: {p.from}</div>}
              </>
            )}
            <div style={{ whiteSpace: 'pre-wrap' }}>{p.passage}</div>
          </div>

          <button
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--accent)',
              fontSize: 12,
              fontWeight: 700,
              cursor: 'pointer',
              padding: '6px 0 0',
              fontFamily: 'inherit',
              display: 'block',
            }}
            onClick={() => patch(currentIdx, { passageOpen: !s.passageOpen })}
          >
            {s.passageOpen ? '▲ Collapse' : '▼ Expand passage'}
          </button>
        </div>

        <div className="card">
          {p.questions.map((q, qi) => (
            <div key={qi}>
              {qi > 0 && <hr className="divider" />}
              <div className="q-number">
                Question {qi + 1}
                {variant === 'academic' && q.type && <span className="q-type-badge">{q.type}</span>}
              </div>
              <div className="q-stem">{q.stem}</div>
              <div className="options">
                {q.options.map((opt, oi) => {
                  const isSel = s.selected[qi] === oi;
                  const isCorr = q.answer === oi;
                  const cls = ['option'];
                  if (locked) {
                    cls.push('disabled');
                    if (isCorr) cls.push('correct-answer');
                    else if (isSel) cls.push('wrong-answer');
                  } else if (isSel) {
                    cls.push('selected');
                  }
                  return (
                    <button
                      key={oi}
                      className={cls.join(' ')}
                      disabled={locked}
                      onClick={() => selectOption(currentIdx, qi, oi)}
                    >
                      <span className="option-letter">{LETTERS[oi]})</span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="btn-row" style={{ marginTop: '1.5rem' }}>
            <button
              className="btn btn-primary"
              disabled={!allAnswered || locked}
              onClick={() => patch(currentIdx, { checked: true })}
            >
              {s.checked ? (isAllCorrect(currentIdx) ? 'All correct ✓' : 'Wrong ✗') : 'Check answer ↗'}
            </button>
            <button
              className="btn btn-outline"
              disabled={s.revealed}
              onClick={() => patch(currentIdx, { selected: p.questions.map((q) => q.answer), revealed: true })}
            >
              {s.revealed ? 'Answer shown' : 'Show answer'}
            </button>
            <button
              className="btn"
              disabled={locked}
              onClick={() =>
                patch(currentIdx, { selected: p.questions.map(() => -1), checked: false, revealed: false })
              }
            >
              Reset
            </button>
          </div>

          {s.checked && (
            <div
              className={`feedback ${isAllCorrect(currentIdx) ? 'correct' : 'wrong'}`}
              style={{ display: 'block' }}
            >
              {isAllCorrect(currentIdx) ? (
                <strong>All correct!</strong>
              ) : (
                <>
                  <strong>
                    {countCorrect(currentIdx)} of {p.questions.length} correct.
                  </strong>{' '}
                  Wrong answers highlighted.
                </>
              )}
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

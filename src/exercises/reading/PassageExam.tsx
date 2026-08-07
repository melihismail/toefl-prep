import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/useLanguage.ts';
import { LanguageToggle } from '../../components/LanguageToggle.tsx';
import { shuffle } from '../shuffle.ts';
import type { ReadingPassage } from '../../data/reading/types.ts';
import type { TranslationKey } from '../../i18n/translations.ts';
import './PassageExam.css';

const LETTERS = ['A', 'B', 'C', 'D'];

/** Answers only — the exam gives no per-passage feedback, so there is no
    checked/revealed state to track. Everything is graded on the results screen. */
type PassageState = {
  selected: number[];
};

function freshState(exam: ReadingPassage[]): PassageState[] {
  return exam.map((p) => ({ selected: p.questions.map(() => -1) }));
}

/** Step the passage down a size at a time rather than let it scroll. */
const MAX_PASSAGE_PX = 15;
const MIN_PASSAGE_PX = 13;

type Props = {
  data: ReadingPassage[];
  examSize: number;
  titleKey: TranslationKey;
  backTo: string;
  backLabelKey: TranslationKey;
  /** Academic Passage shows the title above the text and a type badge per question. */
  variant: 'daily-life' | 'academic';
};

export function PassageExam({ data, examSize, titleKey, backTo, backLabelKey, variant }: Props) {
  const { t } = useLanguage();
  const [exam, setExam] = useState<ReadingPassage[]>(() => shuffle(data).slice(0, examSize));
  const [state, setState] = useState<PassageState[]>(() => freshState(exam));
  const [currentIdx, setCurrentIdx] = useState(0);
  const [finished, setFinished] = useState(false);

  const size = exam.length;
  const p = exam[currentIdx];
  const s = state[currentIdx];
  const passageRef = useRef<HTMLDivElement | null>(null);

  /**
   * Shrink the passage a step at a time until it fits its pane, so the whole
   * text is visible without scrolling. Stops at MIN_PASSAGE_PX and lets it
   * scroll rather than becoming unreadable — which is what happens on phones,
   * where a 220-word passage is simply taller than the screen.
   */
  useLayoutEffect(() => {
    const el = passageRef.current;
    if (!el) return;
    let fitting = false;
    const fit = () => {
      // The pane is flex-sized, so changing the font never resizes its box —
      // but guard anyway so the observer cannot feed itself.
      if (fitting || el.clientHeight === 0) return;
      fitting = true;
      // Leading tightens along with the size; emails carry hard line breaks
      // and run taller than their word count suggests.
      const apply = (px: number) => {
        el.style.fontSize = `${px}px`;
        el.style.lineHeight = px >= 15 ? '1.85' : px === 14 ? '1.75' : '1.65';
      };
      let px = MAX_PASSAGE_PX;
      apply(px);
      while (px > MIN_PASSAGE_PX && el.scrollHeight > el.clientHeight) {
        px -= 1;
        apply(px);
      }
      // Shrinking only earns its keep if it removes the scroll. Where the text
      // cannot fit at any size — a 220-word passage on a phone — go back to the
      // largest, since it scrolls either way and should at least read well.
      if (el.scrollHeight > el.clientHeight) apply(MAX_PASSAGE_PX);
      fitting = false;
    };
    fit();
    // Observing the pane catches the viewport changing and, in dev, the
    // stylesheet arriving after mount — measuring before either leaves the
    // text stuck at the smallest size.
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [currentIdx, p]);

  // Reads prev inside the updater: a closure snapshot would make two selections
  // in the same batch overwrite each other.
  const selectOption = useCallback((idx: number, qi: number, oi: number) => {
    setState((prev) =>
      prev.map((v, i) => (i === idx ? { ...v, selected: v.selected.map((x, k) => (k === qi ? oi : x)) } : v)),
    );
  }, []);

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

  const allAnswered = s.selected.every((v) => v !== -1);

  return (
    <div className="section-reading rx-page">
      <LanguageToggle />
      <div className="rx-top">
        <div className="topbar">
          <Link to={backTo} className="back-btn" aria-label={t(backLabelKey)}>
            <span className="rx-back-full">{t(backLabelKey)}</span>
            <span className="rx-back-short" aria-hidden="true">←</span>
          </Link>
          <div className="exam-label">{t(titleKey)}</div>
          <div className="q-counter">
            <span className="rx-count-full">Passage {currentIdx + 1} of {size}</span>
            <span className="rx-count-short" aria-hidden="true">
              {currentIdx + 1} / {size}
            </span>
          </div>
        </div>
        <div className="progress-wrap">
          <div className="progress-fill" style={{ width: `${((currentIdx + 1) / size) * 100}%` }} />
        </div>
      </div>

      <div className="rx-split">
        <section className="rx-passage" aria-label="Passage">
          <div className="topic-tag" style={{ marginBottom: 6 }}>
            {variant === 'academic' ? p.topic || 'Academic' : p.textType}
          </div>

          {variant === 'academic' && p.title && <div className="rx-passage-title">{p.title}</div>}

          <div className="rx-passage-body" ref={passageRef}>
            {variant === 'daily-life' && p.textType === 'Email' && (
              <>
                {p.subject && <div className="email-subject">Subject: {p.subject}</div>}
                {p.from && <div className="email-from">From: {p.from}</div>}
              </>
            )}
            <div style={{ whiteSpace: 'pre-wrap' }}>{p.passage}</div>
          </div>
        </section>

        <section className="rx-questions" aria-label="Questions">
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
                  // Answers stay changeable until the exam is finished.
                  const isSel = s.selected[qi] === oi;
                  return (
                    <button
                      key={oi}
                      className={`option${isSel ? ' selected' : ''}`}
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

        </section>
      </div>

      <div className="rx-nav">
        <div className="nav-row">
          <button
            className="btn rx-prev"
            disabled={currentIdx === 0}
            onClick={() => setCurrentIdx(currentIdx - 1)}
            aria-label="Previous passage"
          >
            <span className="rx-label">← Previous</span>
            <span className="rx-arrow" aria-hidden="true">
              ←
            </span>
          </button>
          {/* Muted until every question is answered, then it fills in as the
              clear next step. Never hidden and never labelled "Skip": TOEFL has
              no penalty for a wrong answer, so guessing always beats leaving one
              blank and the wording should not suggest otherwise. */}
          <button
            className={`btn btn-primary rx-next${allAnswered ? ' is-ready' : ''}`}
            onClick={() => (currentIdx < size - 1 ? setCurrentIdx(currentIdx + 1) : finish())}
            aria-label={currentIdx === size - 1 ? 'Finish exam' : 'Next passage'}
            title={allAnswered ? undefined : 'Some questions are unanswered — a guess costs nothing'}
          >
            <span className="rx-label">{currentIdx === size - 1 ? 'Finish exam ✓' : 'Next →'}</span>
            <span className="rx-arrow" aria-hidden="true">
              {currentIdx === size - 1 ? '✓' : '→'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

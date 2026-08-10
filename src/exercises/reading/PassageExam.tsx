import { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/useLanguage.ts';
import { LanguageToggle } from '../../components/LanguageToggle.tsx';
import { shuffle } from '../shuffle.ts';
import type { ReadingPassage } from '../../data/reading/types.ts';
import type { TranslationKey } from '../../i18n/translations.ts';
import { ReadingQuestion, type ReadingContext } from './ReadingQuestion.tsx';
import './PassageExam.css';

const LETTERS = ['A', 'B', 'C', 'D'];

type Props = {
  data: ReadingPassage[];
  examSize: number;
  titleKey: TranslationKey;
  backTo: string;
  backLabelKey: TranslationKey;
  /** Academic Passage shows the title above the text and a type badge per question. */
  variant: 'daily-life' | 'academic';
};

/** One screen: the passage it belongs to, plus the single question being asked. */
type Item = {
  passageIdx: number;
  questionIdx: number;
  context: ReadingContext;
  type?: string;
  stem: string;
  options: string[];
  answer: number;
};

function buildItems(exam: ReadingPassage[], variant: Props['variant']): Item[] {
  const items: Item[] = [];
  exam.forEach((p, pi) => {
    const context: ReadingContext = {
      label: variant === 'academic' ? p.topic || 'Academic' : p.textType || 'Text',
      title: p.title,
      body: p.passage,
      // Only an email has these, and only the daily-life variant has emails.
      subject: variant === 'daily-life' && p.textType === 'Email' ? p.subject : undefined,
      from: variant === 'daily-life' && p.textType === 'Email' ? p.from : undefined,
    };
    p.questions.forEach((q, qi) => {
      items.push({
        passageIdx: pi,
        questionIdx: qi,
        context,
        type: variant === 'academic' ? q.type : undefined,
        stem: q.stem,
        options: q.options,
        answer: q.answer,
      });
    });
  });
  return items;
}

export function PassageExam({ data, examSize, titleKey, backTo, backLabelKey, variant }: Props) {
  const { t } = useLanguage();
  const [exam, setExam] = useState<ReadingPassage[]>(() => shuffle(data).slice(0, examSize));
  const items = useMemo(() => buildItems(exam, variant), [exam, variant]);
  /** One answer per item, in the same order. */
  const [selected, setSelected] = useState<number[]>(() => items.map(() => -1));
  const [idx, setIdx] = useState(0);
  const [finished, setFinished] = useState(false);

  const size = items.length;
  const item = items[idx];

  // Reads prev inside the updater: a closure snapshot would make two selections
  // in the same batch overwrite each other.
  const selectOption = useCallback((at: number, oi: number) => {
    setSelected((prev) => prev.map((v, i) => (i === at ? oi : v)));
  }, []);

  const score = useMemo(() => {
    const correct = items.filter((it, i) => selected[i] === it.answer).length;
    return { total: size, correct, pct: size ? Math.round((correct / size) * 100) : 0 };
  }, [items, selected, size]);

  function restart() {
    const fresh = shuffle(data).slice(0, examSize);
    const freshItems = buildItems(fresh, variant);
    setExam(fresh);
    setSelected(freshItems.map(() => -1));
    setIdx(0);
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
                // The flat answer list is grouped back up, so review still reads
                // passage by passage.
                const rows = items
                  .map((it, i) => ({ it, i }))
                  .filter(({ it }) => it.passageIdx === pi);
                const ok = rows.every(({ it, i }) => selected[i] === it.answer);
                const label = variant === 'academic' ? pa.topic : pa.textType;
                return (
                  <div key={pi} className={`review-item ${ok ? 'correct-item' : 'wrong-item'}`}>
                    <div className={`tag ${ok ? 'tag-correct' : 'tag-wrong'}`} style={{ marginBottom: 6 }}>
                      {ok ? '✓ All correct' : '✗ Some incorrect'}
                    </div>
                    <div className="review-passage">
                      Passage {pi + 1} — {label}: {pa.title}
                    </div>
                    {rows.map(({ it, i }) => {
                      const chosen = selected[i];
                      const match = chosen === it.answer;
                      const given = chosen === -1 ? '(not answered)' : `${LETTERS[chosen]}) ${it.options[chosen]}`;
                      return (
                        <div key={i}>
                          <div className="review-q-text">
                            Q{it.questionIdx + 1}: {it.stem}
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
                                  {LETTERS[it.answer]}) {it.options[it.answer]}
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

  const last = idx === size - 1;
  // A new passage starts here, so the reader is told rather than left to notice.
  const passageStart = idx === 0 || items[idx - 1].passageIdx !== item.passageIdx;
  const passageCount = exam.length;

  return (
    <div className="section-reading">
      <LanguageToggle />
      <div className="app">
        <div className="topbar">
          <Link to={backTo} className="back-btn">
            {t(backLabelKey)}
          </Link>
          <div className="exam-label">{t(titleKey)}</div>
          <div className="q-counter">
            {idx + 1} / {size}
          </div>
        </div>
        <div className="progress-wrap" style={{ marginBottom: '1rem' }}>
          <div className="progress-fill" style={{ width: `${((idx + 1) / size) * 100}%` }} />
        </div>

        {passageStart && (
          <div className="rx-passage-banner">
            Passage {item.passageIdx + 1} of {passageCount}
          </div>
        )}

        <div className="card">
          <ReadingQuestion
            context={item.context}
            head={
              <>
                <span className="topic-tag">{item.context.label}</span>
                {item.type && <span className="rq-type">{item.type}</span>}
              </>
            }
            stem={item.stem}
            options={item.options}
            selected={selected[idx]}
            onSelect={(oi) => selectOption(idx, oi)}
          />
        </div>

        <div className="nav-row">
          <button className="btn" disabled={idx === 0} onClick={() => setIdx(idx - 1)}>
            ← Previous
          </button>
          {/* Never labelled "Skip": TOEFL has no penalty for a wrong answer, so
              guessing always beats leaving one blank. */}
          <button
            className="btn btn-primary"
            onClick={() => (last ? setFinished(true) : setIdx(idx + 1))}
            title={selected[idx] === -1 ? 'Unanswered — a guess costs nothing' : undefined}
          >
            {last ? 'Finish exam ✓' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  );
}

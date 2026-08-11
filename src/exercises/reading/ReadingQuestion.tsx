import { useEffect, useState } from 'react';
import './ReadingQuestion.css';

const LETTERS = ['A', 'B', 'C', 'D'];

export type ReadingContext = {
  /** Passage type or subject — "Notice", "Email", "Biology". */
  label: string;
  title?: string;
  body: string;
  /** Emails carry a header of their own. */
  subject?: string;
  from?: string;
};

export type ReadingQuestionProps = {
  /** Absent for a question with nothing to read — a listening item. */
  context?: ReadingContext;
  /**
   * Hide the context behind a toggle. A listening transcript left open is just
   * a reading question, so anything with audio collapses it.
   */
  collapsibleContext?: boolean;
  /** The chips above the passage. Each caller labels its own. */
  head?: React.ReactNode;
  /**
   * Position within the questions on this passage, 0-based. Omitted where the
   * question stands alone, as in the quick test.
   */
  step?: { index: number; total: number };
  stem: string;
  options: string[];
  /** -1 for unanswered. */
  selected: number;
  onSelect: (oi: number) => void;
  /** Sits between the passage and the question — the audio bar, for listening. */
  children?: React.ReactNode;
};

/**
 * The passage stays on screen while the question is answered, which is how the
 * exam is actually sat — you read, then look back. One question per screen so
 * the pair fits a phone without a split pane.
 */
export function ReadingQuestion({
  context,
  collapsibleContext,
  head,
  step,
  stem,
  options,
  selected,
  onSelect,
  children,
}: ReadingQuestionProps) {
  const [open, setOpen] = useState(false);
  // A new question starts closed, however the last one was left.
  useEffect(() => setOpen(false), [stem]);
  const showContext = context && (!collapsibleContext || open);

  return (
    <>
      {head && <div className="rq-head">{head}</div>}

      {context && collapsibleContext && (
        <button className="rq-context-toggle" onClick={() => setOpen((v) => !v)}>
          {open ? 'Hide transcript' : 'Show transcript'}
        </button>
      )}

      {showContext && (
        <div className="rq-context">
          {context.title && <div className="rq-context-title">{context.title}</div>}
          {context.subject && <div className="rq-context-meta">Subject: {context.subject}</div>}
          {context.from && <div className="rq-context-meta">From: {context.from}</div>}
          <div className="rq-context-body">{context.body}</div>
        </div>
      )}

      {children}

      {/* Labels the question below it, so it sits with what it describes rather
          than beside Previous/Next, which would suggest it can be tapped. */}
      {step && step.total > 1 && (
        <div className="rq-step">
          <span className="rq-step-label">
            Question {step.index + 1} of {step.total}
          </span>
          <span className="rq-step-rail" aria-hidden="true">
            {Array.from({ length: step.total }).map((_, i) => (
              <i
                key={i}
                className={`rq-tick${i < step.index ? ' is-done' : i === step.index ? ' is-current' : ''}`}
              />
            ))}
          </span>
        </div>
      )}

      <div className="q-stem">{stem}</div>
      <div className="options">
        {options.map((opt, oi) => (
          <button key={oi} className={`option${selected === oi ? ' selected' : ''}`} onClick={() => onSelect(oi)}>
            <span className="option-letter">{LETTERS[oi]})</span>
            <span>{opt}</span>
          </button>
        ))}
      </div>
    </>
  );
}

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
  /** The chips above the passage. Each caller labels its own. */
  head?: React.ReactNode;
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
export function ReadingQuestion({ context, head, stem, options, selected, onSelect, children }: ReadingQuestionProps) {
  return (
    <>
      {head && <div className="rq-head">{head}</div>}

      {context && (
        <div className="rq-context">
          {context.title && <div className="rq-context-title">{context.title}</div>}
          {context.subject && <div className="rq-context-meta">Subject: {context.subject}</div>}
          {context.from && <div className="rq-context-meta">From: {context.from}</div>}
          <div className="rq-context-body">{context.body}</div>
        </div>
      )}

      {children}

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

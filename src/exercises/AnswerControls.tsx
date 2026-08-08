import './AnswerControls.css';

export type AnswerControlsProps = {
  /** Enough input to be marked — every blank filled, every slot placed. */
  complete: boolean;
  /** Any input at all. Revealing before this is just skipping the question. */
  attempted: boolean;
  checked: boolean;
  revealed: boolean;
  /** Only read once checked. */
  correct: boolean;
  onCheck: () => void;
  onReveal: () => void;
  /** Clear this item and unlock it. */
  onRetry: () => void;
  /** Smaller buttons, for the per-question rows inside a listening passage. */
  compact?: boolean;
};

/**
 * The Check / Show / Try again row, shared so the exercises cannot drift apart.
 *
 * Only what is currently useful is on screen: Check until there is a verdict,
 * Show answer once something has been attempted, and Try again only after a
 * wrong answer. A right answer or a revealed one leaves no buttons at all —
 * the feedback below already says everything, and Next is what comes next.
 */
export function AnswerControls({
  complete,
  attempted,
  checked,
  revealed,
  correct,
  onCheck,
  onReveal,
  onRetry,
  compact,
}: AnswerControlsProps) {
  const settled = revealed || (checked && correct);
  if (settled) return null;

  const cls = `btn-row ac-row${compact ? ' ac-compact' : ''}`;

  if (checked) {
    return (
      <div className={cls}>
        <button className="btn btn-outline" onClick={onReveal}>
          Show answer
        </button>
        <button className="btn" onClick={onRetry}>
          ↺ Try again
        </button>
      </div>
    );
  }

  return (
    <div className={cls}>
      <button className="btn btn-primary" disabled={!complete} onClick={onCheck}>
        Check answer ↗
      </button>
      {attempted && (
        <button className="btn btn-outline" onClick={onReveal}>
          Show answer
        </button>
      )}
    </div>
  );
}

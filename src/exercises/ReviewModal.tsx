import { useEffect } from 'react';
import './ReviewModal.css';

const LETTERS = ['A', 'B', 'C', 'D'];

export type ReviewModalProps = {
  /** Shown in the header — "Question 3". */
  title: string;
  /** Muted line beside it: the exercise, the question type. */
  tag?: string;
  /** Section class, so the header picks up that skill's accent. */
  sectionClass?: string;
  onClose: () => void;
  children: React.ReactNode;
};

/** The shell: scrim, header, scrolling body. Callers fill in the body. */
export function ReviewModal({ title, tag, sectionClass, onClose, children }: ReviewModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="rm" role="dialog" aria-modal="true" aria-label={title}>
      <button className="rm-scrim" onClick={onClose} aria-label="Close" />
      <div className={`rm-card${sectionClass ? ` ${sectionClass}` : ''}`}>
        <div className="rm-head">
          <span className="rm-num">{title}</span>
          {tag && <span className="rm-tag">{tag}</span>}
          <button className="rm-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <div className="rm-body">{children}</div>
      </div>
    </div>
  );
}

/** The passage or transcript the question was asked about. */
export function ReviewContext({ title, body }: { title?: string; body: string }) {
  return (
    <div className="rm-context">
      {title && <div className="rm-context-title">{title}</div>}
      <div className="rm-context-body">{body}</div>
    </div>
  );
}

/** The options, with the key and the learner's pick marked. */
export function ReviewOptions({ options, answer, chosen }: { options: string[]; answer: number; chosen: number }) {
  return (
    <>
      <ul className="rm-options">
        {options.map((opt, oi) => {
          const picked = chosen === oi;
          const right = oi === answer;
          return (
            <li key={oi} className={`rm-opt${right ? ' is-right' : ''}${picked && !right ? ' is-wrong' : ''}`}>
              <span className="rm-opt-letter">{LETTERS[oi]})</span>
              <span className="rm-opt-text">{opt}</span>
              {picked && <span className="rm-opt-mark">your answer</span>}
              {right && <span className="rm-opt-mark">correct</span>}
            </li>
          );
        })}
      </ul>
      {chosen === -1 && <div className="rm-note">You did not answer this one.</div>}
    </>
  );
}

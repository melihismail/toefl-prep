import './SentenceBuilder.css';

/**
 * Every word in the bank is stored lower-case, or the one capital would point
 * straight at the opening word. The capital is put back only on the way out.
 */
export function capitaliseFirst(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/** The finished sentence, with the mark already in position. */
export function sentenceText(prompt: string | undefined, words: string[], isQuestion?: boolean) {
  const body = prompt ? `${prompt} ${words.join(' ')}` : capitaliseFirst(words.join(' '));
  return `${body}${isQuestion ? '?' : '.'}`;
}

export type SentenceBuilderProps = {
  question: string;
  /** Fixed opening words shown before the slots. */
  prompt?: string;
  correct: string[];
  /** Correct words plus distractors, already shuffled. */
  bank: string[];
  placed: string[];
  isQuestion?: boolean;
  /** No further edits — used once the answer has been checked or revealed. */
  locked?: boolean;
  /** Colour each filled slot against the key. */
  mark?: boolean;
  /** Show the key in the slots instead of what was placed. */
  reveal?: boolean;
  onPlace: (word: string) => void;
  onUndo: () => void;
};

/**
 * The word-bank task itself: quote, slots, bank, undo. Callers add whatever
 * surrounds it — Check/Show/Reset on the practice page, nothing in the quick
 * test — so both drive the same mechanics.
 */
export function SentenceBuilder({
  question,
  prompt,
  correct,
  bank,
  placed,
  isQuestion,
  locked,
  mark,
  reveal,
  onPlace,
  onUndo,
}: SentenceBuilderProps) {
  const total = correct.length;
  const usedCounts: Record<string, number> = {};
  placed.forEach((w) => (usedCounts[w] = (usedCounts[w] || 0) + 1));

  return (
    <>
      <div className="q-number">Complete the response to this question:</div>
      <div className="sb-quote">"{question}"</div>

      <div className="sb-slots">
        {prompt && <span className="sb-prompt">{prompt}</span>}
        {Array.from({ length: total }).map((_, i) => {
          const word = reveal ? correct[i] : placed[i];
          if (word === undefined) {
            return (
              <div className="blank-box empty" key={i}>
                —
              </div>
            );
          }
          const ok = word === correct[i];
          const colour = reveal
            ? 'var(--success-text)'
            : mark
              ? ok
                ? 'var(--success-text)'
                : 'var(--error-text)'
              : undefined;
          return (
            <div
              className="blank-box filled"
              key={i}
              style={colour ? { color: colour, borderBottomColor: colour } : undefined}
            >
              {i === 0 && !prompt ? capitaliseFirst(word) : word}
            </div>
          );
        })}
        <span className="sb-mark">{isQuestion ? '?' : '.'}</span>
      </div>

      <div className="word-bank">
        {bank.map((word, ci) => {
          const copiesBefore = bank.slice(0, ci).filter((w) => w === word).length;
          const used = copiesBefore < (usedCounts[word] || 0);
          return (
            <button
              key={ci}
              className={`bank-chip${used ? ' used' : ''}`}
              disabled={locked}
              onClick={() => onPlace(word)}
            >
              {word}
            </button>
          );
        })}
      </div>

      {!locked && placed.length > 0 && (
        <div className="btn-row" style={{ marginTop: '1rem' }}>
          <button className="btn" onClick={onUndo}>
            ↩ Undo
          </button>
        </div>
      )}
    </>
  );
}

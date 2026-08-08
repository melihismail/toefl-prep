import { useMemo, useRef } from 'react';
import './CompleteTheWords.css';

export type Blank = { answer: string };

/**
 * The paragraph is prose split on __BLANK__; the word fragment immediately
 * before each marker is the visible prefix and belongs inside the chip, so a
 * word never breaks across lines.
 */
function splitParts(paragraph: string) {
  return paragraph.split('__BLANK__').map((part, pi, all) => {
    const isLast = pi === all.length - 1;
    if (isLast || !part) return { before: part, prefix: '', isLast };
    const lastSpace = part.lastIndexOf(' ');
    return { before: part.substring(0, lastSpace + 1), prefix: part.substring(lastSpace + 1), isLast };
  });
}

function isBlankRight(typed: string, answer: string) {
  return typed.toLowerCase() === answer.toLowerCase();
}

export type CTestParagraphProps = {
  paragraph: string;
  blanks: Blank[];
  /** One typed string per blank. */
  inputs: string[];
  /** Colour each letter against the key. */
  checked?: boolean;
  /** Fill the key in and disable editing. */
  revealed?: boolean;
  onLetter: (blankIdx: number, letterIdx: number, value: string) => void;
};

/** The typing surface, shared by the practice page and the quick test. */
export function CTestParagraph({ paragraph, blanks, inputs, checked, revealed, onLetter }: CTestParagraphProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const locked = Boolean(revealed);

  /** Flat DOM order of the letter cells, so focus can move across blanks. */
  const flatIndex = useMemo(() => {
    const map: Record<string, number> = {};
    let n = 0;
    blanks.forEach((b, bi) => {
      for (let li = 0; li < b.answer.length; li++) map[`${bi}-${li}`] = n++;
    });
    return map;
  }, [blanks]);

  function focusOffset(bi: number, li: number, delta: number) {
    inputRefs.current[flatIndex[`${bi}-${li}`] + delta]?.focus();
  }

  /**
   * Clicking a chip always lands on its leftmost unfilled letter, never on
   * whichever cell happened to be under the cursor — typing mid-word and
   * leaving earlier gaps empty is not something the exercise should allow.
   */
  function focusFirstGap(bi: number) {
    const typed = inputs[bi] || '';
    const width = blanks[bi].answer.length;
    let letterIdx = 0;
    for (let i = 0; i < width; i++) {
      if (!typed[i] || typed[i] === ' ') {
        letterIdx = i;
        break;
      }
      // Every cell is filled — go back to the start so a retype overwrites.
      if (i === width - 1) letterIdx = 0;
    }
    inputRefs.current[flatIndex[`${bi}-${letterIdx}`]]?.focus();
  }

  inputRefs.current = [];

  return (
    <p className="para">
      {splitParts(paragraph).map(({ before, prefix, isLast }, pi) => {
        if (isLast) return <span key={pi}>{before}</span>;
        const blank = blanks[pi];
        const typed = inputs[pi] || '';
        const chipCls = ['word-chip'];
        if (revealed) chipCls.push('is-correct');
        else if (checked) chipCls.push(isBlankRight(typed, blank.answer) ? 'is-correct' : 'is-wrong');

        return (
          <span key={pi}>
            {before}
            <span
              className={chipCls.join(' ')}
              onMouseDown={
                locked
                  ? undefined
                  : (e) => {
                      // Cancels the browser's own caret placement, then we choose the cell.
                      e.preventDefault();
                      focusFirstGap(pi);
                    }
              }
            >
              {prefix && <strong className="chip-prefix">{prefix}</strong>}
              {Array.from({ length: blank.answer.length }).map((_, li) => {
                let cls = 'letter-input';
                let value = typed[li] || '';
                if (revealed) {
                  value = blank.answer[li];
                  cls += ' correct';
                } else if (checked) {
                  cls += typed[li]?.toLowerCase() === blank.answer[li].toLowerCase() ? ' correct' : ' wrong';
                }
                return (
                  <input
                    key={li}
                    ref={(el) => {
                      inputRefs.current[flatIndex[`${pi}-${li}`]] = el;
                    }}
                    type="text"
                    maxLength={1}
                    className={cls}
                    disabled={locked}
                    // Tab moves between words; letters are reached by typing,
                    // which advances on its own.
                    tabIndex={li === 0 ? 0 : -1}
                    aria-label={`${prefix || 'Blank'} — letter ${li + 1} of ${blank.answer.length}`}
                    value={value.trim()}
                    onChange={(e) => {
                      const v = e.target.value.slice(-1);
                      onLetter(pi, li, v);
                      if (v) focusOffset(pi, li, 1);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Backspace' && !e.currentTarget.value) focusOffset(pi, li, -1);
                    }}
                  />
                );
              })}
            </span>
          </span>
        );
      })}
    </p>
  );
}

/**
 * The same paragraph after the fact: every letter the learner typed, coloured
 * against the key, with the right completion shown beside each wrong word.
 * Seeing the mistakes in their sentences beats a bare list of blanks.
 */
export function CTestReview({
  paragraph,
  blanks,
  inputs,
}: {
  paragraph: string;
  blanks: Blank[];
  inputs: string[];
}) {
  return (
    <p className="para ctw-review-para">
      {splitParts(paragraph).map(({ before, prefix, isLast }, pi) => {
        if (isLast) return <span key={pi}>{before}</span>;
        const blank = blanks[pi];
        const typed = inputs[pi] || '';
        const ok = isBlankRight(typed, blank.answer);
        return (
          <span key={pi}>
            {before}
            <span className={`review-chip ${ok ? 'is-correct' : 'is-wrong'}`}>
              {prefix && <strong className="chip-prefix">{prefix}</strong>}
              {Array.from({ length: blank.answer.length }).map((_, li) => {
                const ch = typed[li]?.trim();
                const right = ch?.toLowerCase() === blank.answer[li].toLowerCase();
                return (
                  <span key={li} className={`review-letter ${right ? 'correct' : 'wrong'}`}>
                    {ch || '·'}
                  </span>
                );
              })}
              {!ok && <span className="review-fix">{blank.answer}</span>}
            </span>
          </span>
        );
      })}
    </p>
  );
}

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

  /** -1 once every cell in the blank holds a character. */
  function firstGap(bi: number) {
    const typed = inputs[bi] || '';
    const width = blanks[bi].answer.length;
    for (let i = 0; i < width; i++) if (!typed[i] || typed[i] === ' ') return i;
    return -1;
  }

  function focusCell(bi: number, li: number) {
    inputRefs.current[flatIndex[`${bi}-${li}`]]?.focus();
  }

  /**
   * While a blank still has gaps, tapping it lands on the leftmost one — typing
   * mid-word and leaving earlier gaps empty is not something the exercise should
   * allow. Once it is full there is no gap left to protect, so the tap keeps the
   * letter it was aimed at and a typo can be fixed in place.
   */
  function onChipDown(bi: number, clientX: number) {
    const gap = firstGap(bi);
    if (gap >= 0) {
      focusCell(bi, gap);
      return;
    }
    // The cells have pointer-events: none, so the chip works out which letter
    // was aimed at from where along its width the tap landed.
    let best = 0;
    let bestDist = Infinity;
    for (let li = 0; li < blanks[bi].answer.length; li++) {
      const el = inputRefs.current[flatIndex[`${bi}-${li}`]];
      if (!el) continue;
      const r = el.getBoundingClientRect();
      const d = Math.abs(clientX - (r.left + r.width / 2));
      if (d < bestDist) {
        bestDist = d;
        best = li;
      }
    }
    focusCell(bi, best);
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
                      onChipDown(pi, e.clientX);
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
                    // Blanks are always mid-word, so a capital is never right —
                    // and mobile keyboards capitalise single-character fields.
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck={false}
                    // Tab moves between words; letters are reached by typing,
                    // which advances on its own.
                    tabIndex={li === 0 ? 0 : -1}
                    aria-label={`${prefix || 'Blank'} — letter ${li + 1} of ${blank.answer.length}`}
                    value={value.trim()}
                    // maxLength is 1, so a filled cell would reject the next
                    // keystroke unless its character is selected first.
                    onFocus={(e) => e.currentTarget.select()}
                    onChange={(e) => {
                      // autoCapitalize is a hint some keyboards ignore, so fold
                      // the character down here too.
                      const v = e.target.value.slice(-1).toLowerCase();
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

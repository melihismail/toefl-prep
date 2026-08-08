/**
 * C-test generator, following the TOEFL iBT technical manual's description of
 * the Reading format:
 *
 *   "Following an intact first sentence, the second half of every second word
 *    is deleted, and the examinee must provide the missing letters. Each text
 *    contains 10 truncated words."
 *
 * Deriving the mutilation rather than storing it keeps every text conformant by
 * construction — the previous hand-authored data drifted from its own rule.
 */

export const C_TEST_BLANKS = 10;

/** A word needs at least three letters to leave a usable stem and a gap. */
const MIN_WORD_LENGTH = 3;

export type CTestBlank = { answer: string };
export type CTest = {
  /** Text with a `__BLANK__` marker after each truncated word's visible stem. */
  paragraph: string;
  blanks: CTestBlank[];
};

/** Letters (and apostrophes) only — punctuation stays outside the truncation. */
function core(token: string): { lead: string; word: string; tail: string } {
  const m = token.match(/^([^A-Za-z]*)([A-Za-z']*)(.*)$/s);
  if (!m) return { lead: '', word: token, tail: '' };
  return { lead: m[1], word: m[2], tail: m[3] };
}

/**
 * @param text  The intact source paragraph.
 * @param count How many words to truncate; fewer if the text cannot supply them.
 */
export function buildCTest(text: string, count: number = C_TEST_BLANKS): CTest {
  // Keep whitespace so the paragraph can be reassembled exactly.
  const tokens = text.split(/(\s+)/);
  const wordIdx: number[] = [];
  tokens.forEach((t, i) => {
    if (i % 2 === 0 && t.length) wordIdx.push(i);
  });

  // The first sentence stays intact, so candidates begin after its terminator.
  let start = 0;
  for (let w = 0; w < wordIdx.length; w++) {
    if (/[.!?]["')\]]?$/.test(tokens[wordIdx[w]])) {
      start = w + 1;
      break;
    }
  }

  const blanks: CTestBlank[] = [];
  // Every second word. A candidate too short to halve is skipped and the next
  // word tried, so the cadence resumes rather than stalling.
  let w = start + 1;
  while (w < wordIdx.length && blanks.length < count) {
    const i = wordIdx[w];
    const { lead, word, tail } = core(tokens[i]);
    if (word.replace(/'/g, '').length >= MIN_WORD_LENGTH) {
      const keep = Math.floor(word.length / 2);
      tokens[i] = `${lead}${word.slice(0, keep)}__BLANK__${tail}`;
      blanks.push({ answer: word.slice(keep) });
      w += 2;
    } else {
      w += 1;
    }
  }

  return { paragraph: tokens.join(''), blanks };
}

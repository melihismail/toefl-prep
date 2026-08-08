/** The six patterns this task tests, ordered easiest to hardest. */
export type SentenceCategory =
  | 'negation'
  | 'inversion'
  | 'wh-auxiliary'
  | 'embedded-question'
  | 'indirect-question'
  | 'relative-clause';

export const SENTENCE_CATEGORY_LABEL: Record<SentenceCategory, string> = {
  negation: 'Negation',
  inversion: 'Question inversion',
  'wh-auxiliary': 'Auxiliary after wh-word',
  'embedded-question': 'Embedded question',
  'indirect-question': 'Indirect question',
  'relative-clause': 'Relative clause',
};

export type SentenceQuestion = {
  /** The stimulus — a question or a plain statement. */
  question: string;
  /** Fixed opening word(s) shown before the blanks; cannot be moved. */
  prompt?: string;
  correct: string[];
  /** Usually one; occasionally two. */
  distractors: string[];
  category: SentenceCategory;
  /** Response is a question, so a "?" sits ready at the end of the blanks. */
  isQuestion?: boolean;
};

export type EmailPrompt = {
  id: number;
  situation: string;
  task: string;
  minWords: number;
  modelAnswer: string;
};

export type DiscussionStudent = { name: string; response: string };

export type DiscussionPrompt = {
  id: number;
  professorName: string;
  question: string;
  studentA: DiscussionStudent;
  studentB: DiscussionStudent;
  minWords: number;
  modelAnswer: string;
};

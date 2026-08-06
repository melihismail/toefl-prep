export type SentenceQuestion = {
  question: string;
  /** Fixed opening word(s) shown before the blanks, e.g. "No,". */
  prompt?: string;
  correct: string[];
  distractor: string;
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

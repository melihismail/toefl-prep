export type ReadingQuestion = {
  stem: string;
  options: string[];
  /** Index into options. */
  answer: number;
  type?: string;
};

/** Shared by Read in Daily Life and Read an Academic Passage. */
export type ReadingPassage = {
  title: string;
  passage: string;
  questions: ReadingQuestion[];
  /** Daily Life: "Email" | "Notice" | "Announcement" | "Social Post" | "Message". */
  textType?: string;
  /** Daily Life, emails only. */
  subject?: string;
  from?: string;
  /** Academic Passage: subject-area label. */
  topic?: string;
};

export type Blank = { answer: string };

export type MissingWordsQuestion = {
  title: string;
  /** Contains one __BLANK__ marker per entry in `blanks`. */
  paragraph: string;
  blanks: Blank[];
};

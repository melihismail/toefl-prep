export type ListeningQuestion = {
  stem: string;
  options: string[];
  /** Index into options. */
  answer: number;
  type: string;
};

export type ChooseResponseQuestion = {
  id: number;
  /** The sentence played to the learner; shown only on the review screen. */
  heard: string;
  audioFile: string;
  options: string[];
  /** Index into options. */
  answer: number;
};

export type ListeningPassage = {
  id: number;
  title: string;
  /** Present on conversations; academic talks carry a subject instead. */
  speakers?: string[];
  subject?: string;
  audioFile: string | null;
  duration: string;
  transcript: string;
  questions: ListeningQuestion[];
};

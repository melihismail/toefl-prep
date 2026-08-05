export type ListeningQuestion = {
  stem: string;
  options: string[];
  /** Index into options. */
  answer: number;
  type: string;
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

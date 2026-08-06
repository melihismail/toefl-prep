import { shuffle } from '../exercises/shuffle.ts';
import { academicPassages } from './reading/academicPassage.ts';
import { dailyLifePassages } from './reading/dailyLife.ts';
import { missingQuestions } from './reading/completeTheWords.ts';
import { conversationPassages } from './listening/conversation.ts';
import { academicTalkPassages } from './listening/academicTalk.ts';
import { chooseResponseQuestions } from './listening/chooseAResponse.ts';
import { sentenceQuestions } from './writing/buildASentence.ts';

export type QuickSection = 'reading' | 'listening' | 'writing';

type Base = {
  /** Exercise it came from — the fallback grouping when a question has no type. */
  skill: string;
  section: QuickSection;
  /** TOEFL question type where the source data provides one. */
  type?: string;
  practiceHref: string;
};

export type QuickItem = Base &
  (
    | {
        kind: 'mc';
        stem: string;
        options: string[];
        answer: number;
        /** Passage or transcript to read before answering. */
        context?: { label: string; title?: string; body: string };
        audioFile?: string;
      }
    | { kind: 'letters'; title: string; paragraph: string; blanks: { answer: string }[] }
    | { kind: 'order'; question: string; prompt?: string; correct: string[]; distractor: string }
  );

function pick<T>(list: readonly T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}

/** One item per source, so a run samples across exercises rather than repeating one. */
const builders: (() => QuickItem)[] = [
  () => {
    const p = pick(academicPassages);
    const q = pick(p.questions);
    return {
      kind: 'mc',
      skill: 'Academic reading',
      section: 'reading',
      type: q.type,
      practiceHref: '/reading/academic-passage',
      stem: q.stem,
      options: q.options,
      answer: q.answer,
      context: { label: p.topic || 'Academic', title: p.title, body: p.passage },
    };
  },
  () => {
    const p = pick(dailyLifePassages);
    const q = pick(p.questions);
    return {
      kind: 'mc',
      skill: 'Everyday reading',
      section: 'reading',
      type: q.type,
      practiceHref: '/reading/daily-life',
      stem: q.stem,
      options: q.options,
      answer: q.answer,
      context: { label: p.textType || 'Text', title: p.title, body: p.passage },
    };
  },
  () => {
    const q = pick(missingQuestions);
    return {
      kind: 'letters',
      skill: 'Word building',
      section: 'reading',
      practiceHref: '/reading/complete-the-words',
      title: q.title,
      paragraph: q.paragraph,
      blanks: q.blanks,
    };
  },
  () => {
    const p = pick(conversationPassages);
    const q = pick(p.questions);
    return {
      kind: 'mc',
      skill: 'Conversation',
      section: 'listening',
      type: q.type,
      practiceHref: '/listening/conversation',
      stem: q.stem,
      options: q.options,
      answer: q.answer,
      context: { label: 'Conversation', title: p.title, body: p.transcript },
    };
  },
  () => {
    const p = pick(academicTalkPassages);
    const q = pick(p.questions);
    return {
      kind: 'mc',
      skill: 'Academic talk',
      section: 'listening',
      type: q.type,
      practiceHref: '/listening/academic-talk',
      stem: q.stem,
      options: q.options,
      answer: q.answer,
      context: { label: p.subject || 'Talk', title: p.title, body: p.transcript },
    };
  },
  () => {
    const q = pick(chooseResponseQuestions);
    return {
      kind: 'mc',
      skill: 'Quick response',
      section: 'listening',
      practiceHref: '/listening/choose-a-response',
      stem: 'Choose the most appropriate response.',
      options: q.options,
      answer: q.answer,
      audioFile: q.audioFile,
    };
  },
  () => {
    const q = pick(sentenceQuestions);
    return {
      kind: 'order',
      skill: 'Sentence structure',
      section: 'writing',
      practiceHref: '/writing/build-a-sentence',
      question: q.question,
      prompt: q.prompt,
      correct: q.correct,
      distractor: q.distractor,
    };
  },
];

export const QUICK_TEST_SIZE = 6;

/** Six of the seven sources each run, so repeat runs cover everything. */
export function buildQuickTest(): QuickItem[] {
  return shuffle(builders)
    .slice(0, QUICK_TEST_SIZE)
    .map((build) => build());
}

/** What the results screen groups a mistake under. */
export function categoryOf(item: QuickItem): string {
  return item.type ?? item.skill;
}

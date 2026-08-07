import { shuffle } from '../exercises/shuffle.ts';
import { academicPassages } from './reading/academicPassage.ts';
import { dailyLifePassages } from './reading/dailyLife.ts';
import { cTestTexts } from './reading/cTestTexts.ts';
import { buildCTest } from './reading/ctest.ts';
import { conversationPassages } from './listening/conversation.ts';
import { academicTalkPassages } from './listening/academicTalk.ts';
import { chooseResponseQuestions } from './listening/chooseAResponse.ts';
import { sentenceQuestions } from './writing/buildASentence.ts';
import { SENTENCE_CATEGORY_LABEL } from './writing/types.ts';
import { emailPrompts } from './writing/writeAnEmail.ts';
import { discussionPrompts } from './writing/academicDiscussion.ts';
import { repeatSentences, interviewQuestions } from './speaking/prompts.ts';

export type QuickSection = 'reading' | 'listening' | 'writing' | 'speaking';

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
    | {
        kind: 'order';
        question: string;
        prompt?: string;
        correct: string[];
        distractors: string[];
        isQuestion?: boolean;
      }
    /** Free writing — no answer key, so a teacher marks it. */
    | { kind: 'write'; brief: string; task: string; minWords: number; modelAnswer: string }
    /** Spoken aloud — nothing is recorded, so a teacher marks it. */
    | { kind: 'speak'; instruction: string; prompt: string }
  );

/** Only the first three kinds can be marked automatically. */
export function isScorable(item: QuickItem): boolean {
  return item.kind === 'mc' || item.kind === 'letters' || item.kind === 'order';
}

function take<T>(list: readonly T[], n: number): T[] {
  return shuffle(list).slice(0, n);
}

/**
 * A quarter-length run of the whole exam, in section order. Every exercise
 * appears; each contributes about a quarter of its usual count, rather than a
 * single token question.
 */
export function buildQuickTest(): QuickItem[] {
  const items: QuickItem[] = [];

  // ── Reading ────────────────────────────────────────────────────────────────
  // One text only: each now yields ten blanks, so three was thirty fields.
  take(cTestTexts, 1).forEach((t) => {
    const { paragraph, blanks } = buildCTest(t.text);
    items.push({
      kind: 'letters',
      skill: 'Word building',
      section: 'reading',
      practiceHref: '/reading/complete-the-words',
      title: t.title,
      paragraph,
      blanks,
    });
  });

  take(dailyLifePassages, 2).forEach((p) =>
    p.questions.forEach((q) =>
      items.push({
        kind: 'mc',
        skill: 'Everyday reading',
        section: 'reading',
        type: q.type,
        practiceHref: '/reading/daily-life',
        stem: q.stem,
        options: q.options,
        answer: q.answer,
        context: { label: p.textType || 'Text', title: p.title, body: p.passage },
      }),
    ),
  );

  take(academicPassages, 2).forEach((p) =>
    p.questions.forEach((q) =>
      items.push({
        kind: 'mc',
        skill: 'Academic reading',
        section: 'reading',
        type: q.type,
        practiceHref: '/reading/academic-passage',
        stem: q.stem,
        options: q.options,
        answer: q.answer,
        context: { label: p.topic || 'Academic', title: p.title, body: p.passage },
      }),
    ),
  );

  // ── Listening ──────────────────────────────────────────────────────────────
  take(chooseResponseQuestions, 2).forEach((q) =>
    items.push({
      kind: 'mc',
      skill: 'Quick response',
      section: 'listening',
      practiceHref: '/listening/choose-a-response',
      stem: 'Choose the most appropriate response.',
      options: q.options,
      answer: q.answer,
      audioFile: q.audioFile,
    }),
  );

  take(conversationPassages, 1).forEach((p) =>
    p.questions.forEach((q) =>
      items.push({
        kind: 'mc',
        skill: 'Conversation',
        section: 'listening',
        type: q.type,
        practiceHref: '/listening/conversation',
        stem: q.stem,
        options: q.options,
        answer: q.answer,
        context: { label: 'Conversation', title: p.title, body: p.transcript },
      }),
    ),
  );

  take(academicTalkPassages, 1).forEach((p) =>
    p.questions.forEach((q) =>
      items.push({
        kind: 'mc',
        skill: 'Academic talk',
        section: 'listening',
        type: q.type,
        practiceHref: '/listening/academic-talk',
        stem: q.stem,
        options: q.options,
        answer: q.answer,
        context: { label: p.subject || 'Talk', title: p.title, body: p.transcript },
      }),
    ),
  );

  // ── Writing ────────────────────────────────────────────────────────────────
  take(sentenceQuestions, 4).forEach((q) =>
    items.push({
      kind: 'order',
      skill: 'Sentence structure',
      section: 'writing',
      // The grammar pattern is the useful grouping on the results screen.
      type: SENTENCE_CATEGORY_LABEL[q.category],
      practiceHref: '/writing/build-a-sentence',
      question: q.question,
      prompt: q.prompt,
      correct: q.correct,
      distractors: q.distractors,
      isQuestion: q.isQuestion,
    }),
  );

  take(emailPrompts, 1).forEach((p) =>
    items.push({
      kind: 'write',
      skill: 'Email writing',
      section: 'writing',
      practiceHref: '/writing/write-an-email',
      brief: p.situation,
      task: p.task,
      minWords: p.minWords,
      modelAnswer: p.modelAnswer,
    }),
  );

  take(discussionPrompts, 1).forEach((p) =>
    items.push({
      kind: 'write',
      skill: 'Academic discussion',
      section: 'writing',
      practiceHref: '/writing/academic-discussion',
      brief: `${p.professorName} ${p.question}`,
      task: 'Write your own contribution to this discussion.',
      minWords: p.minWords,
      modelAnswer: p.modelAnswer,
    }),
  );

  // ── Speaking ───────────────────────────────────────────────────────────────
  take(repeatSentences, 2).forEach((sentence) =>
    items.push({
      kind: 'speak',
      skill: 'Listen and repeat',
      section: 'speaking',
      practiceHref: '/speaking/listen-and-repeat/index.html',
      instruction: 'Read this sentence aloud, clearly and at a natural pace.',
      prompt: sentence,
    }),
  );

  take(interviewQuestions, 1).forEach((question) =>
    items.push({
      kind: 'speak',
      skill: 'Interview',
      section: 'speaking',
      practiceHref: '/speaking/take-an-interview/index.html',
      instruction: 'Answer aloud for about 45 seconds.',
      prompt: question,
    }),
  );

  return items;
}

/** What the results screen groups a mistake under. */
export function categoryOf(item: QuickItem): string {
  return item.type ?? item.skill;
}

export const SECTION_LABEL: Record<QuickSection, string> = {
  reading: 'Reading',
  listening: 'Listening',
  writing: 'Writing',
  speaking: 'Speaking',
};

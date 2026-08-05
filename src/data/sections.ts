import type { TranslationKey } from '../i18n/translations.ts';

export type Task = {
  /** Router path once ported; otherwise the legacy page served from public/. */
  href: string;
  /** True once the exercise is a React route, so the card uses a router link. */
  ported?: boolean;
  icon: string;
  titleKey: TranslationKey;
  countKey: TranslationKey;
  minutes: number;
  badgeKey?: TranslationKey;
};

export type Section = {
  slug: 'reading' | 'writing' | 'listening' | 'speaking';
  icon: string;
  titleKey: TranslationKey;
  headingKey: TranslationKey;
  /** Solid card/hero fill, and the darker step used on hover. */
  color: string;
  colorDark: string;
  totalMinutes: number;
  tasks: Task[];
  noteKey?: TranslationKey;
  noteIcon?: string;
};

export const sections: Section[] = [
  {
    slug: 'reading',
    icon: 'ti-book',
    titleKey: 'reading',
    headingKey: 'reading_section',
    color: '#4f46e5',
    colorDark: '#4338ca',
    totalMinutes: 30,
    tasks: [
      {
        href: '/reading/complete-the-words',
        ported: true,
        icon: 'ti-abc',
        titleKey: 'complete_the_words',
        countKey: 'ctw_short',
        minutes: 5,
      },
      {
        href: '/reading/daily-life',
        ported: true,
        icon: 'ti-mail',
        titleKey: 'read_in_daily_life',
        countKey: 'rdl_short',
        minutes: 10,
      },
      {
        href: '/reading/academic-passage',
        ported: true,
        icon: 'ti-school',
        titleKey: 'read_academic_passage',
        countKey: 'rap_short',
        minutes: 15,
      },
    ],
  },
  {
    slug: 'writing',
    icon: 'ti-pencil',
    titleKey: 'writing',
    headingKey: 'writing_section',
    color: '#b45309',
    colorDark: '#92400e',
    totalMinutes: 23,
    noteKey: 'writing_api_short',
    noteIcon: 'ti-key',
    tasks: [
      {
        href: '/writing/build-a-sentence/index.html',
        icon: 'ti-puzzle',
        titleKey: 'build_a_sentence',
        countKey: 'bas_short',
        minutes: 6,
      },
      {
        href: '/writing/write-an-email/index.html',
        icon: 'ti-mail',
        titleKey: 'write_an_email',
        countKey: 'wae_short',
        minutes: 7,
        badgeKey: 'ai_feedback',
      },
      {
        href: '/writing/academic-discussion/index.html',
        icon: 'ti-messages',
        titleKey: 'academic_discussion',
        countKey: 'ad_short',
        minutes: 10,
        badgeKey: 'ai_feedback',
      },
    ],
  },
  {
    slug: 'listening',
    icon: 'ti-headphones',
    titleKey: 'listening',
    headingKey: 'listening_section',
    color: '#059669',
    colorDark: '#047857',
    totalMinutes: 27,
    noteKey: 'listening_info_short',
    noteIcon: 'ti-headphones',
    tasks: [
      {
        href: '/listening/choose-a-response/index.html',
        icon: 'ti-message-2',
        titleKey: 'choose_a_response',
        countKey: 'car_short',
        minutes: 5,
      },
      {
        href: '/listening/conversation',
        ported: true,
        icon: 'ti-users',
        titleKey: 'conversation',
        countKey: 'conv_short',
        minutes: 10,
      },
      {
        href: '/listening/academic-talk',
        ported: true,
        icon: 'ti-speakerphone',
        titleKey: 'academic_talk',
        countKey: 'at_short',
        minutes: 12,
      },
    ],
  },
  {
    slug: 'speaking',
    icon: 'ti-microphone',
    titleKey: 'speaking',
    headingKey: 'speaking_section',
    color: '#9333ea',
    colorDark: '#7e22ce',
    totalMinutes: 15,
    noteKey: 'speaking_info_short',
    noteIcon: 'ti-microphone',
    tasks: [
      {
        href: '/speaking/listen-and-repeat/index.html',
        icon: 'ti-repeat',
        titleKey: 'listen_and_repeat',
        countKey: 'lar_short',
        minutes: 5,
      },
      {
        href: '/speaking/take-an-interview/index.html',
        icon: 'ti-microphone',
        titleKey: 'take_an_interview',
        countKey: 'tai_short',
        minutes: 10,
      },
    ],
  },
];

export const sectionBySlug = Object.fromEntries(sections.map((s) => [s.slug, s])) as Record<
  Section['slug'],
  Section
>;

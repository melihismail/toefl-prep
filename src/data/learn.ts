// Migrated from the `D` object in public/pages/learn.html — same copy, typed,
// with the bilingual strings kept inline rather than in translations.ts because
// they only ever appear on this page.
import type { QuickSection } from './quickTest.ts';

export type Bilingual = { en: string; tr: string };

export type LearnTask = {
  id: string;
  name: Bilingual;
  time: string;
  count: Bilingual;
  desc: Bilingual;
  /** Which exercise to send the learner to for the real thing. */
  practiceHref: string;
  tips: Bilingual;
  scoring: Bilingual;
};

export type LearnSection = {
  slug: QuickSection;
  icon: string;
  color: string;
  colorDark: string;
  name: Bilingual;
  time: string;
  desc: Bilingual;
  tasks: LearnTask[];
};

export const learnSections: LearnSection[] = [
  {
    slug: 'listening',
    icon: 'ti-headphones',
    color: '#059669',
    colorDark: '#047857',
    name: { en: 'Listening', tr: 'Dinleme' },
    time: '~32 min',
    desc: {
      en: 'Tests your ability to understand spoken English in academic and everyday settings.',
      tr: 'Akademik ve günlük ortamlarda konuşulan İngilizceyi anlama becerinizi test eder.',
    },
    tasks: [
      {
        id: 'l1',
        name: { en: 'Choose a Response', tr: 'Bir Yanıt Seç' },
        time: '~5 min',
        count: { en: '10 questions', tr: '10 soru' },
        desc: {
          en: 'Hear a short statement and choose the best response.',
          tr: 'Kısa bir ifade duyun ve en uygun yanıtı seçin.',
        },
        practiceHref: '/listening/choose-a-response',
        tips: {
          en: 'Listen for the function — is it a request, suggestion, or question? Eliminate answers that repeat words but miss the meaning.',
          tr: 'İfadenin işlevini dinleyin. Kelimeleri tekrarlayan ama anlamı kaçıran cevapları eleyin.',
        },
        scoring: {
          en: 'Each correct answer = 1 point. No penalty for wrong answers. Total: 10 points.',
          tr: 'Her doğru cevap = 1 puan. Yanlış cevap için ceza yok. Toplam: 10 puan.',
        },
      },
      {
        id: 'l2',
        name: { en: 'Conversation', tr: 'Konuşma' },
        time: '~10 min',
        count: { en: '3 passages', tr: '3 metin' },
        desc: {
          en: 'Listen to a conversation and answer comprehension questions.',
          tr: 'Bir konuşmayı dinleyin ve anlama sorularını cevaplayın.',
        },
        practiceHref: '/listening/conversation',
        tips: {
          en: 'Pay attention to tone and attitude. Note the main reason for the conversation.',
          tr: 'Ses tonu ve tutuma dikkat edin. Konuşmanın ana nedenini not edin.',
        },
        scoring: {
          en: 'Multiple choice, each worth 1 point. 3-4 questions per conversation.',
          tr: 'Çoktan seçmeli, her biri 1 puan. Konuşma başına 3-4 soru.',
        },
      },
      {
        id: 'l3',
        name: { en: 'Announcement', tr: 'Duyuru' },
        time: '~5 min',
        count: { en: '4 announcements', tr: '4 duyuru' },
        desc: {
          en: 'Listen to a campus or class announcement and answer questions.',
          tr: 'Bir kampüs veya ders duyurusunu dinleyin ve soruları cevaplayın.',
        },
        practiceHref: '/listening/announcement',
        tips: {
          en: 'Announcements always ask you to do something. Note what changed, and what you are expected to do about it.',
          tr: 'Duyurular her zaman bir eylem ister. Neyin değiştiğini ve sizden ne beklendiğini not edin.',
        },
        scoring: {
          en: 'Multiple choice, each worth 1 point. 5 questions per announcement.',
          tr: 'Çoktan seçmeli, her biri 1 puan. Duyuru başına 5 soru.',
        },
      },
      {
        id: 'l4',
        name: { en: 'Academic Talk', tr: 'Akademik Sunum' },
        time: '~12 min',
        count: { en: '9 passages', tr: '9 metin' },
        desc: {
          en: 'Listen to a short lecture and answer questions.',
          tr: 'Kısa bir dersi dinleyin ve soruları cevaplayın.',
        },
        practiceHref: '/listening/academic-talk',
        tips: {
          en: 'Focus on the topic sentence at the beginning. Note transitions like "however" or "for instance".',
          tr: 'Baştaki konu cümlesine odaklanın. "Ancak" veya "örneğin" gibi geçişlere dikkat edin.',
        },
        scoring: {
          en: 'Multiple choice, each worth 1 point. 4-5 questions per lecture.',
          tr: 'Çoktan seçmeli, her biri 1 puan. Ders başına 4-5 soru.',
        },
      },
    ],
  },
  {
    slug: 'reading',
    icon: 'ti-book',
    color: '#4f46e5',
    colorDark: '#4338ca',
    name: { en: 'Reading', tr: 'Okuma' },
    time: '~30 min',
    desc: {
      en: 'Tests your ability to understand academic and everyday written texts.',
      tr: 'Akademik ve günlük yazılı metinleri anlama becerinizi test eder.',
    },
    tasks: [
      {
        id: 'r1',
        name: { en: 'Complete the Words', tr: 'Kelimeleri Tamamla' },
        time: '~5 min',
        count: { en: '10 paragraphs', tr: '10 paragraf' },
        desc: {
          en: 'Fill in missing letters in academic paragraphs.',
          tr: 'Akademik paragraftaki eksik harfleri doldurun.',
        },
        practiceHref: '/reading/complete-the-words',
        tips: {
          en: 'Read the full sentence first. Think about word families and common academic vocabulary.',
          tr: 'Önce tüm cümleyi okuyun. Kelime aileleri ve akademik kelime bilgisini düşünün.',
        },
        scoring: {
          en: 'Each correctly completed word = 1 point. Spelling must be exact.',
          tr: 'Her doğru tamamlanan kelime = 1 puan. Yazım doğru olmalıdır.',
        },
      },
      {
        id: 'r2',
        name: { en: 'Read in Daily Life', tr: 'Günlük Hayatta Oku' },
        time: '~10 min',
        count: { en: '8 passages', tr: '8 metin' },
        desc: {
          en: 'Read short real-world texts and answer questions.',
          tr: 'Kısa gerçek hayat metinlerini okuyun ve soruları cevaplayın.',
        },
        practiceHref: '/reading/daily-life',
        tips: {
          en: 'Skim the text type first. Focus on who, what, when, where. Answers are directly in the text.',
          tr: 'Önce metin türünü gözden geçirin. Kim, ne, ne zaman, nereye odaklanın.',
        },
        scoring: {
          en: '1 point per correct answer. 2-3 questions per passage, 8 passages total.',
          tr: 'Her doğru cevap için 1 puan. Metin başına 2-3 soru, toplam 8 metin.',
        },
      },
      {
        id: 'r3',
        name: { en: 'Academic Passage', tr: 'Akademik Metin' },
        time: '~15 min',
        count: { en: '5 passages', tr: '5 metin' },
        desc: {
          en: 'Read a ~200-word passage and answer 5 questions.',
          tr: '~200 kelimelik bir metni okuyun ve 5 soruyu cevaplayın.',
        },
        practiceHref: '/reading/academic-passage',
        tips: {
          en: 'Read first and last sentences for main ideas. For vocabulary, use context clues.',
          tr: 'Ana fikirler için ilk ve son cümleleri okuyun. Kelime soruları için bağlam ipuçlarını kullanın.',
        },
        scoring: {
          en: '1 point per answer. 5 questions × 5 passages = 25 points.',
          tr: 'Her cevap için 1 puan. 5 soru × 5 metin = 25 puan.',
        },
      },
    ],
  },
  {
    slug: 'writing',
    icon: 'ti-pencil',
    color: '#b45309',
    colorDark: '#92400e',
    name: { en: 'Writing', tr: 'Yazma' },
    time: '~23 min',
    desc: {
      en: 'Tests grammar, practical writing, and academic argumentation.',
      tr: 'Dilbilgisi, pratik yazma ve akademik argümantasyon becerilerinizi test eder.',
    },
    tasks: [
      {
        id: 'w1',
        name: { en: 'Build a Sentence', tr: 'Cümle Kur' },
        time: '~6 min',
        count: { en: '16 questions', tr: '16 soru' },
        desc: { en: 'Arrange word chips into a correct sentence.', tr: 'Kelime parçalarını doğru sırayla dizin.' },
        practiceHref: '/writing/build-a-sentence',
        tips: {
          en: 'Start with subject, then verb, then object. The distractor word usually breaks grammar if used.',
          tr: 'Önce özne, sonra fiil, sonra nesne. Dikkat dağıtıcı kelime kullanıldığında dilbilgisini bozar.',
        },
        scoring: {
          en: 'Each sentence is fully correct or incorrect. No partial credit. 16 total.',
          tr: 'Her cümle ya tamamen doğru ya da yanlış. Kısmi puan yok. Toplam 16.',
        },
      },
      {
        id: 'w2',
        name: { en: 'Write an Email', tr: 'E-posta Yaz' },
        time: '7 min',
        count: { en: '1 prompt', tr: '1 konu' },
        desc: {
          en: 'Read a situation and write a functional email.',
          tr: 'Bir durumu okuyun ve işlevsel bir e-posta yazın.',
        },
        practiceHref: '/writing/write-an-email',
        tips: {
          en: 'Use a clear subject line. Open with purpose, details in middle, close politely. Under 150 words.',
          tr: 'Net bir konu satırı kullanın. Amacı belirterek açın, kibarca kapatın. 150 kelimenin altında.',
        },
        scoring: {
          en: 'Band 1-6. Criteria: task completion, tone, clarity, grammar, vocabulary.',
          tr: 'Bant 1-6. Kriterler: görev tamamlama, ton, netlik, dilbilgisi, kelime çeşitliliği.',
        },
      },
      {
        id: 'w3',
        name: { en: 'Academic Discussion', tr: 'Akademik Tartışma' },
        time: '10 min',
        count: { en: '1 prompt', tr: '1 konu' },
        desc: {
          en: "Read a professor's question and write your contribution.",
          tr: 'Profesörün sorusunu okuyun ve kendi katkınızı yazın.',
        },
        practiceHref: '/writing/academic-discussion',
        tips: {
          en: 'Take a clear position. Reference other students but add your own reasoning. Give examples.',
          tr: 'Net bir pozisyon alın. Diğer öğrencilere atıfta bulunun ama kendi gerekçenizi ekleyin.',
        },
        scoring: {
          en: 'Band 1-6. Criteria: relevance, argument quality, examples, grammar, academic register.',
          tr: 'Bant 1-6. Kriterler: ilgililik, argüman kalitesi, örnekler, dilbilgisi, akademik kayıt.',
        },
      },
    ],
  },
  {
    slug: 'speaking',
    icon: 'ti-microphone',
    color: '#9333ea',
    colorDark: '#7e22ce',
    name: { en: 'Speaking', tr: 'Konuşma' },
    time: '~15 min',
    desc: { en: 'Tests real-time verbal communication.', tr: 'Gerçek zamanlı sözlü iletişim becerinizi test eder.' },
    tasks: [
      {
        id: 's1',
        name: { en: 'Listen and Repeat', tr: 'Dinle ve Tekrarla' },
        time: '~5 min',
        count: { en: '10 sentences', tr: '10 cümle' },
        desc: {
          en: 'Read a sentence, record yourself, compare pronunciation.',
          tr: 'Bir cümleyi okuyun, kaydedin, telaffuzunuzu karşılaştırın.',
        },
        practiceHref: '/speaking/listen-and-repeat/index.html',
        tips: {
          en: 'Focus on word stress and natural rhythm, not perfect accent. Record multiple times.',
          tr: 'Mükemmel aksan yerine kelime vurgusu ve doğal ritme odaklanın.',
        },
        scoring: {
          en: 'Self-evaluated. Compare recording for pronunciation accuracy and fluency.',
          tr: 'Kendi kendine değerlendirme. Telaffuz doğruluğu ve akıcılık için karşılaştırın.',
        },
      },
      {
        id: 's2',
        name: { en: 'Take an Interview', tr: 'Mülakata Katıl' },
        time: '~10 min',
        count: { en: '5 questions', tr: '5 soru' },
        desc: {
          en: 'Answer interview-style questions about experiences.',
          tr: 'Deneyimler hakkında mülakat sorularını cevaplayın.',
        },
        practiceHref: '/speaking/take-an-interview/index.html',
        tips: {
          en: 'Use the STAR method: Situation, Task, Action, Result. Fluency matters more than accuracy.',
          tr: 'STAR yöntemini kullanın: Durum, Görev, Eylem, Sonuç. Akıcılık doğruluktan önemlidir.',
        },
        scoring: {
          en: 'Band 1-6. Criteria: fluency, pronunciation, vocabulary, grammar, coherence.',
          tr: 'Bant 1-6. Kriterler: akıcılık, telaffuz, kelime çeşitliliği, dilbilgisi, tutarlılık.',
        },
      },
    ],
  },
];

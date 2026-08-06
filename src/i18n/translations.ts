// Migrated subset of public/lang/translations.js — only the keys the React
// shell and section pages need. The legacy exercises still read the full
// JS file from public/lang/, so both copies exist until those are ported.
// Keep the shared keys here in sync with that file.

export const translations = {
  en: {
    landing_title_1: 'TOEFL practice',
    landing_title_2: 'platform.',
    landing_status: 'READY',
    learn_the_exam: 'Learn the Exam',
    exam_samples: 'Exam Samples',
    back_home: '← Home',
    back_listening: '← Listening',
    back_reading: '← Reading',
    back_writing: '← Writing',
    practice_by_section: 'Practice by section',
    task_types: 'Task Types',
    total: 'Total',
    unit_min: 'min',

    reading: 'Reading',
    writing: 'Writing',
    listening: 'Listening',
    speaking: 'Speaking',

    reading_section: 'Reading Section',
    writing_section: 'Writing Section',
    listening_section: 'Listening Section',
    speaking_section: 'Speaking Section',

    complete_the_words: 'Complete the Words',
    read_in_daily_life: 'Read in Daily Life',
    read_academic_passage: 'Read an Academic Passage',
    ctw_short: '10 paragraphs',
    rdl_short: '8 passages',
    rap_short: '5 passages',

    build_a_sentence: 'Build a Sentence',
    write_an_email: 'Write an Email',
    academic_discussion: 'Academic Discussion',
    bas_short: '16 questions',
    wae_short: '1 prompt',
    ad_short: '1 prompt',

    choose_a_response: 'Choose a Response',
    conversation: 'Conversation',
    academic_talk: 'Academic Talk',
    car_short: '10 questions',
    conv_short: '3 conversations',
    at_short: '3 talks',

    listen_and_repeat: 'Listen and Repeat',
    take_an_interview: 'Take an Interview',
    lar_short: '10 sentences',
    tai_short: '5 questions',

    writing_practice_short: 'Practice mode — writing tasks are not scored or saved. Compare with the model answer.',
    listening_info_short: 'Choose a Response has audio. The other two use transcripts — click “Show Transcript”.',
    speaking_info_short: 'Microphone required. Record your answer, then listen back to self-evaluate.',
  },
  tr: {
    landing_title_1: 'TOEFL pratik',
    landing_title_2: 'platformu.',
    landing_status: 'HAZIR',
    learn_the_exam: 'Sınavı Öğren',
    exam_samples: 'Sınav Örnekleri',
    back_home: '← Ana Sayfa',
    back_listening: '← Dinleme',
    back_reading: '← Okuma',
    back_writing: '← Yazma',
    practice_by_section: 'Bölüme göre pratik yap',
    task_types: 'Görev Türü',
    total: 'Toplam',
    unit_min: 'dk',

    reading: 'Okuma',
    writing: 'Yazma',
    listening: 'Dinleme',
    speaking: 'Konuşma',

    reading_section: 'Okuma Bölümü',
    writing_section: 'Yazma Bölümü',
    listening_section: 'Dinleme Bölümü',
    speaking_section: 'Konuşma Bölümü',

    complete_the_words: 'Kelimeleri Tamamla',
    read_in_daily_life: 'Günlük Hayatta Oku',
    read_academic_passage: 'Akademik Metin Oku',
    ctw_short: '10 paragraf',
    rdl_short: '8 metin',
    rap_short: '5 metin',

    build_a_sentence: 'Cümle Kur',
    write_an_email: 'E-posta Yaz',
    academic_discussion: 'Akademik Tartışma',
    bas_short: '16 soru',
    wae_short: '1 görev',
    ad_short: '1 görev',

    choose_a_response: 'Bir Yanıt Seç',
    conversation: 'Konuşma',
    academic_talk: 'Akademik Sunum',
    car_short: '10 soru',
    conv_short: '3 diyalog',
    at_short: '3 konuşma',

    listen_and_repeat: 'Dinle ve Tekrarla',
    take_an_interview: 'Mülakata Katıl',
    lar_short: '10 cümle',
    tai_short: '5 soru',

    writing_practice_short:
      'Alıştırma modu — yazma görevleri puanlanmaz ve kaydedilmez. Örnek cevapla karşılaştırın.',
    listening_info_short: 'Bir Yanıt Seç sesli. Diğer ikisi metin tabanlı — “Metni Göster”e tıklayın.',
    speaking_info_short: 'Mikrofon gerekli. Cevabınızı kaydedin, sonra dinleyip kendinizi değerlendirin.',
  },
} as const;

export type Lang = keyof typeof translations;
export type TranslationKey = keyof (typeof translations)['en'];

const TRANSLATIONS = {
  en: {
    // === LANDING PAGE ===
    "landing_title_1": "Your journey to Band 6",
    "landing_title_2": "begins here.",
    "landing_status": "READY",
    "learn_the_exam": "Learn the Exam",
    "exam_samples": "Exam Samples",

    // === COMMON ===
    "home": "Home",
    "back_home": "← Home",
    "back_reading": "← Reading",
    "back_writing": "← Writing",
    "back_listening": "← Listening",
    "back_speaking": "← Speaking",
    "next": "Next →",
    "previous": "← Previous",
    "start_practicing": "Start practicing →",
    "available": "Available",
    "correct": "correct",
    "your_answers": "Your answers",
    "new_exam": "New exam",
    "start_new_exam": "Start new exam",
    "new_session": "New session",
    "total": "Total",
    "submit": "Submit",
    "choose_a_task": "Choose a task",
    "api_key_btn": "⚙️ API Key",
    "sections": "Sections",
    "task_types": "Task Types",
    "band_scale": "Band Scale",
    "min_total": "Min Total",

    // === INDEX PAGE ===
    "hero_title": "Your TOEFL Prep Hub",
    "hero_desc": "Practice all four sections of the redesigned TOEFL exam — adaptive format, real task types, instant AI feedback.",
    "practice_by_section": "Practice by section",

    // Reading card
    "reading": "Reading",
    "reading_desc": "Academic and everyday texts with comprehension questions. Adaptive format.",
    "complete_the_words": "Complete the Words",
    "read_in_daily_life": "Read in Daily Life",
    "read_academic_passage": "Read an Academic Passage",

    // Writing card
    "writing": "Writing",
    "writing_desc": "Three task types with AI feedback on your open-ended responses.",
    "build_a_sentence": "Build a Sentence",
    "write_an_email": "Write an Email",
    "academic_discussion": "Academic Discussion",

    // Listening card
    "listening": "Listening",
    "listening_desc": "Three task types. Practice with transcripts now — add audio files later.",
    "choose_a_response": "Choose a Response",
    "conversation": "Conversation",
    "academic_talk": "Academic Talk",
    "transcript_mode": "Transcript mode",

    // Speaking card
    "speaking": "Speaking",
    "speaking_desc": "Two tasks with mic recording. Record yourself and listen back to improve.",
    "listen_and_repeat": "Listen and Repeat",
    "take_an_interview": "Take an Interview",
    "record_review": "Record & Review",

    // Score bands
    "score_band_ref": "Score Band Reference (1–6 per section)",
    "beginner": "Beginner",
    "elementary": "Elementary",
    "intermediate": "Intermediate",
    "upper_int": "Upper-Int.",
    "advanced": "Advanced",
    "mastery": "Mastery",

    // Footer
    "footer": "TOEFL Prep · For practice purposes only · Not affiliated with ETS",

    // === READING SECTION PAGE ===
    "reading_section": "Reading Section",
    "reading_section_desc": "Three adaptive task types testing vocabulary, practical reading, and academic comprehension.",
    "ctw_desc": "Fill in the missing letters of partially visible words inside a short academic paragraph. Tests vocabulary and word formation.",
    "ctw_meta1": "📝 10 paragraphs per exam",
    "ctw_meta2": "⏱ ~5 min",
    "rdl_desc": "Read short real-world texts — emails, notices, announcements, social posts — and answer 2–3 multiple choice questions per passage.",
    "rdl_meta1": "📝 8 passages per exam",
    "rdl_meta2": "⏱ ~10 min",
    "rap_desc": "Read a ~200-word academic passage and answer 5 questions testing main idea, detail, vocabulary, inference, and author's purpose.",
    "rap_meta1": "📝 5 passages per exam",
    "rap_meta2": "⏱ ~15 min",
    "reading_timing": "Reading Section — Timing Reference",
    "reading_timing_ctw": "Complete the Words",
    "reading_timing_rdl": "Read in Daily Life",
    "reading_timing_rap": "Read an Academic Passage",

    // === WRITING SECTION PAGE ===
    "writing_section": "Writing Section",
    "writing_section_desc": "Three task types — grammar, practical email writing, and academic discussion. Open-ended tasks scored by AI.",
    "bas_desc": "Tap word chips to arrange them into a grammatically correct sentence. Tests grammar and word order. Objective scoring.",
    "bas_meta1": "📝 16 questions per exam",
    "bas_meta2": "⏱ ~6 min",
    "bas_meta3": "📚 50 sentences in bank",
    "wae_desc": "Read a situation and write a functional email response. AI evaluates your tone, clarity, task completion, and grammar — scored 1–6.",
    "wae_meta1": "📝 1 prompt per session",
    "wae_meta2": "⏱ 7 min",
    "wae_meta3": "🤖 AI scored",
    "ad_desc": "Read a professor's question and two student responses, then write your own contribution. AI evaluates argumentation and academic language.",
    "ad_meta1": "📝 1 prompt per session",
    "ad_meta2": "⏱ 10 min",
    "ad_meta3": "🤖 AI scored",
    "ai_feedback": "AI Feedback",
    "writing_timing": "Writing Section — Timing Reference",
    "writing_timing_bas": "Build a Sentence (10 questions)",
    "writing_timing_wae": "Write an Email",
    "writing_timing_ad": "Academic Discussion",
    "writing_api_info": "AI feedback requires an Anthropic API key. You'll be prompted to enter it the first time you use Write an Email or Academic Discussion. Your key is stored locally and never shared.",

    // === LISTENING SECTION PAGE ===
    "listening_section": "Listening Section",
    "listening_section_desc": "Three task types. Practice with transcripts now — drop in MP3 files later to enable real audio playback.",
    "listening_info": "Transcript mode active. In the real exam you hear audio. Here, click \"Show Transcript\" on each passage to read it, then answer the questions. To add real audio, place MP3 files in each task folder and update the audioFile path in questions.js.",
    "car_desc": "You hear a short statement or question. Choose the most appropriate response from four options. Tests listening comprehension of short exchanges.",
    "car_meta1": "📝 10 questions per exam",
    "car_meta2": "⏱ ~5 min",
    "conv_desc": "Listen to a conversation between two people (student & professor, or two students) and answer comprehension questions.",
    "conv_meta1": "📝 3 passages per exam",
    "conv_meta2": "⏱ ~10 min",
    "at_desc": "Listen to a short academic lecture excerpt and answer questions about the main idea, details, and inferences.",
    "at_meta1": "📝 3 passages per exam",
    "at_meta2": "⏱ ~12 min",

    // === SPEAKING SECTION PAGE ===
    "speaking_section": "Speaking Section",
    "speaking_section_desc": "Two tasks testing real-time verbal communication. Record your responses and listen back to self-evaluate.",
    "speaking_info": "Record & Review mode. Your browser microphone is used to record your responses. Listen back and compare to the target. AI scoring coming in a future update.",
    "lar_desc": "Read a sentence, then record yourself saying it. Play back your recording and compare your pronunciation and fluency to the target text.",
    "lar_meta1": "📝 10 sentences per session",
    "lar_meta2": "⏱ ~5 min",
    "lar_meta3": "🎙️ Mic required",
    "tai_desc": "Answer interview-style questions about personal experiences and opinions. Read the question, think, then record your answer.",
    "tai_meta1": "📝 5 questions per session",
    "tai_meta2": "⏱ ~10 min",
    "tai_meta3": "🎙️ Mic required",
    "speaking_timing": "Speaking Section — Timing Reference",

    // === TASK PAGES ===
    "car_info": "In the real exam you hear a sentence. Here, read it and choose the best reply.",
    "show_transcript": "Show Transcript",
    "hide_transcript": "Hide Transcript",
    "words_correct": "words correct",
    "your_results": "Your results",
    "interview_complete": "Interview Complete!",
    "interview_complete_desc": "You answered all 5 questions. Paste your result code into any AI for detailed feedback.",

    // API Key Modal
    "api_key_title": "🔑 Anthropic API Key",
    "api_key_desc": "Enter your Anthropic API key to enable AI feedback. It is stored in your browser only and never sent to any third party.",
    "api_key_desc_short": "Enter your Anthropic API key to enable AI feedback. Stored in your browser only.",
    "save_key": "Save key",
    "cancel": "Cancel",
    "clear_key": "Clear key",
    "ai_feedback_label": "🤖 AI Feedback",
    "band": "Band",
    "evaluating": "Evaluating your response…",

    // Dynamic JS strings
    "passage_x_of_y": "Passage {0} of {1}",
    "q_x_of_y": "{0} / {1}",
  },

  tr: {
    // === AÇILIŞ SAYFASI ===
    "landing_title_1": "Bant 6'ya yolculuğunuz",
    "landing_title_2": "burada başlıyor.",
    "landing_status": "HAZIR",
    "learn_the_exam": "Sınavı Öğren",
    "exam_samples": "Sınav Örnekleri",

    // === ORTAK ===
    "home": "Ana Sayfa",
    "back_home": "← Ana Sayfa",
    "back_reading": "← Okuma",
    "back_writing": "← Yazma",
    "back_listening": "← Dinleme",
    "back_speaking": "← Konuşma",
    "next": "Sonraki →",
    "previous": "← Önceki",
    "start_practicing": "Alıştırmaya başla →",
    "available": "Mevcut",
    "correct": "doğru",
    "your_answers": "Cevaplarınız",
    "new_exam": "Yeni sınav",
    "start_new_exam": "Yeni sınav başlat",
    "new_session": "Yeni oturum",
    "total": "Toplam",
    "submit": "Gönder",
    "choose_a_task": "Bir görev seçin",
    "api_key_btn": "⚙️ API Anahtarı",
    "sections": "Bölüm",
    "task_types": "Görev Türü",
    "band_scale": "Puan Bandı",
    "min_total": "Dk Toplam",

    // === ANA SAYFA ===
    "hero_title": "TOEFL Hazırlık Merkeziniz",
    "hero_desc": "Yeniden tasarlanan TOEFL sınavının dört bölümünü de pratik edin — uyarlanabilir format, gerçek görev türleri, anında AI geri bildirimi.",
    "practice_by_section": "Bölüme göre pratik yap",

    // Okuma kartı
    "reading": "Okuma",
    "reading_desc": "Akademik ve günlük metinlerle anlama soruları. Uyarlanabilir format.",
    "complete_the_words": "Kelimeleri Tamamla",
    "read_in_daily_life": "Günlük Hayatta Oku",
    "read_academic_passage": "Akademik Metin Oku",

    // Yazma kartı
    "writing": "Yazma",
    "writing_desc": "Açık uçlu yanıtlarınıza AI geri bildirimi ile üç görev türü.",
    "build_a_sentence": "Cümle Kur",
    "write_an_email": "E-posta Yaz",
    "academic_discussion": "Akademik Tartışma",

    // Dinleme kartı
    "listening": "Dinleme",
    "listening_desc": "Üç görev türü. Şimdi transkriptlerle pratik yapın — daha sonra ses dosyaları ekleyin.",
    "choose_a_response": "Bir Yanıt Seç",
    "conversation": "Konuşma",
    "academic_talk": "Akademik Sunum",
    "transcript_mode": "Transkript modu",

    // Konuşma kartı
    "speaking": "Konuşma",
    "speaking_desc": "Mikrofon kaydı ile iki görev. Kendinizi kaydedin ve gelişmek için dinleyin.",
    "listen_and_repeat": "Dinle ve Tekrarla",
    "take_an_interview": "Mülakata Katıl",
    "record_review": "Kaydet ve İncele",

    // Puan bantları
    "score_band_ref": "Puan Bandı Referansı (bölüm başına 1–6)",
    "beginner": "Başlangıç",
    "elementary": "Temel",
    "intermediate": "Orta",
    "upper_int": "Orta-İleri",
    "advanced": "İleri",
    "mastery": "Uzman",

    // Alt bilgi
    "footer": "TOEFL Hazırlık · Sadece pratik amaçlıdır · ETS ile bağlantılı değildir",

    // === OKUMA BÖLÜMÜ SAYFASI ===
    "reading_section": "Okuma Bölümü",
    "reading_section_desc": "Kelime hazinesi, pratik okuma ve akademik anlama becerilerini test eden üç uyarlanabilir görev türü.",
    "ctw_desc": "Kısa bir akademik paragraftaki kısmen görünen kelimelerin eksik harflerini doldurun. Kelime hazinesi ve kelime oluşturma becerilerini test eder.",
    "ctw_meta1": "📝 Sınav başına 10 paragraf",
    "ctw_meta2": "⏱ ~5 dk",
    "rdl_desc": "Kısa gerçek hayat metinlerini okuyun — e-postalar, duyurular, bildirimler, sosyal medya paylaşımları — ve her metin için 2–3 çoktan seçmeli soruyu cevaplayın.",
    "rdl_meta1": "📝 Sınav başına 8 metin",
    "rdl_meta2": "⏱ ~10 dk",
    "rap_desc": "~200 kelimelik bir akademik metni okuyun ve ana fikir, detay, kelime bilgisi, çıkarım ve yazarın amacını test eden 5 soruyu cevaplayın.",
    "rap_meta1": "📝 Sınav başına 5 metin",
    "rap_meta2": "⏱ ~15 dk",
    "reading_timing": "Okuma Bölümü — Süre Referansı",
    "reading_timing_ctw": "Kelimeleri Tamamla",
    "reading_timing_rdl": "Günlük Hayatta Oku",
    "reading_timing_rap": "Akademik Metin Oku",

    // === YAZMA BÖLÜMÜ SAYFASI ===
    "writing_section": "Yazma Bölümü",
    "writing_section_desc": "Üç görev türü — dilbilgisi, pratik e-posta yazımı ve akademik tartışma. Açık uçlu görevler AI tarafından puanlanır.",
    "bas_desc": "Kelime parçalarına dokunarak dilbilgisi açısından doğru bir cümle oluşturun. Dilbilgisi ve kelime sırasını test eder. Objektif puanlama.",
    "bas_meta1": "📝 Sınav başına 16 soru",
    "bas_meta2": "⏱ ~6 dk",
    "bas_meta3": "📚 Bankada 50 cümle",
    "wae_desc": "Bir durumu okuyun ve işlevsel bir e-posta yanıtı yazın. AI ton, netlik, görev tamamlama ve dilbilgisini değerlendirir — 1–6 puan.",
    "wae_meta1": "📝 Oturum başına 1 konu",
    "wae_meta2": "⏱ 7 dk",
    "wae_meta3": "🤖 AI puanlı",
    "ad_desc": "Bir profesörün sorusunu ve iki öğrenci yanıtını okuyun, ardından kendi katkınızı yazın. AI argümantasyon ve akademik dili değerlendirir.",
    "ad_meta1": "📝 Oturum başına 1 konu",
    "ad_meta2": "⏱ 10 dk",
    "ad_meta3": "🤖 AI puanlı",
    "ai_feedback": "AI Geri Bildirimi",
    "writing_timing": "Yazma Bölümü — Süre Referansı",
    "writing_timing_bas": "Cümle Kur (10 soru)",
    "writing_timing_wae": "E-posta Yaz",
    "writing_timing_ad": "Akademik Tartışma",
    "writing_api_info": "AI geri bildirimi için Anthropic API anahtarı gereklidir. E-posta Yaz veya Akademik Tartışma'yı ilk kullandığınızda girmeniz istenecektir. Anahtarınız yerel olarak saklanır ve asla paylaşılmaz.",

    // === DİNLEME BÖLÜMÜ SAYFASI ===
    "listening_section": "Dinleme Bölümü",
    "listening_section_desc": "Üç görev türü. Şimdi transkriptlerle pratik yapın — gerçek ses çalma için daha sonra MP3 dosyaları ekleyin.",
    "listening_info": "Transkript modu aktif. Gerçek sınavda ses duyarsınız. Burada her metinde \"Transkripti Göster\"e tıklayarak okuyun, ardından soruları cevaplayın.",
    "car_desc": "Kısa bir ifade veya soru duyarsınız. Dört seçenek arasından en uygun yanıtı seçin. Kısa diyalogların dinleme anlama becerisini test eder.",
    "car_meta1": "📝 Sınav başına 10 soru",
    "car_meta2": "⏱ ~5 dk",
    "conv_desc": "İki kişi arasındaki bir konuşmayı dinleyin (öğrenci ve profesör veya iki öğrenci) ve anlama sorularını cevaplayın.",
    "conv_meta1": "📝 Sınav başına 3 metin",
    "conv_meta2": "⏱ ~10 dk",
    "at_desc": "Kısa bir akademik ders alıntısını dinleyin ve ana fikir, detaylar ve çıkarımlar hakkındaki soruları cevaplayın.",
    "at_meta1": "📝 Sınav başına 3 metin",
    "at_meta2": "⏱ ~12 dk",

    // === KONUŞMA BÖLÜMÜ SAYFASI ===
    "speaking_section": "Konuşma Bölümü",
    "speaking_section_desc": "Gerçek zamanlı sözlü iletişimi test eden iki görev. Yanıtlarınızı kaydedin ve kendinizi değerlendirmek için dinleyin.",
    "speaking_info": "Kaydet ve İncele modu. Yanıtlarınızı kaydetmek için tarayıcı mikrofonunuz kullanılır. Hedefle karşılaştırmak için dinleyin. AI puanlama gelecek güncellemede eklenecektir.",
    "lar_desc": "Bir cümleyi okuyun, ardından kendinizi söylerken kaydedin. Kaydınızı dinleyin ve telaffuzunuzu hedef metinle karşılaştırın.",
    "lar_meta1": "📝 Oturum başına 10 cümle",
    "lar_meta2": "⏱ ~5 dk",
    "lar_meta3": "🎙️ Mikrofon gerekli",
    "tai_desc": "Kişisel deneyimler ve görüşler hakkında mülakat tarzı soruları cevaplayın. Soruyu okuyun, düşünün, ardından cevabınızı kaydedin.",
    "tai_meta1": "📝 Oturum başına 5 soru",
    "tai_meta2": "⏱ ~10 dk",
    "tai_meta3": "🎙️ Mikrofon gerekli",
    "speaking_timing": "Konuşma Bölümü — Süre Referansı",

    // === GÖREV SAYFALARI ===
    "car_info": "Gerçek sınavda bir cümle duyarsınız. Burada okuyun ve en iyi yanıtı seçin.",
    "show_transcript": "Transkripti Göster",
    "hide_transcript": "Transkripti Gizle",
    "words_correct": "kelime doğru",
    "your_results": "Sonuçlarınız",
    "interview_complete": "Mülakat Tamamlandı!",
    "interview_complete_desc": "5 sorunun tamamını cevapladınız. Ayrıntılı geri bildirim için sonuç kodunuzu herhangi bir AI'ya yapıştırın.",

    // API Anahtarı Modalı
    "api_key_title": "🔑 Anthropic API Anahtarı",
    "api_key_desc": "AI geri bildirimini etkinleştirmek için Anthropic API anahtarınızı girin. Yalnızca tarayıcınızda saklanır ve asla üçüncü taraflarla paylaşılmaz.",
    "api_key_desc_short": "AI geri bildirimini etkinleştirmek için Anthropic API anahtarınızı girin. Yalnızca tarayıcınızda saklanır.",
    "save_key": "Anahtarı kaydet",
    "cancel": "İptal",
    "clear_key": "Anahtarı temizle",
    "ai_feedback_label": "🤖 AI Geri Bildirimi",
    "band": "Bant",
    "evaluating": "Yanıtınız değerlendiriliyor…",

    // Dinamik JS stringleri
    "passage_x_of_y": "Metin {0} / {1}",
    "q_x_of_y": "{0} / {1}",
  }
};

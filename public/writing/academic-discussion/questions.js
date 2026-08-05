const discussionPrompts = [
  {
    id: 1,
    professorName: "Professor Williams asks:",
    question: "Should universities require students to attend all classes, or should attendance be optional? What do you think, and why?",
    studentA: {
      name: "Marcus",
      response: "I think attendance should be mandatory. When students skip class, they miss key discussions and the professor's explanations that can't be replaced by just reading the textbook. Plus, professors invest a lot of time preparing their lectures, and empty seats are disrespectful to that effort."
    },
    studentB: {
      name: "Aisha",
      response: "I disagree. University students are adults and should take responsibility for their own learning. If someone learns better independently, forcing them to attend is a waste of everyone's time. What matters is whether they understand the material, not whether they sit in a room for an hour."
    },
    minWords: 100,
    modelAnswer: `I can see merit in both perspectives, but I believe attendance should be encouraged rather than strictly enforced. Marcus raises a valid point about the irreplaceable nature of classroom discussion — spontaneous questions, peer debate, and a professor's real-time explanations often generate insights that no textbook can replicate. In my experience, the most valuable learning moments happen during class, not from reading alone.

That said, Aisha is right that university students are adults who must develop self-discipline. A rigid attendance policy can feel patronising and may not account for genuine circumstances such as illness, work commitments, or learning differences.

A more balanced approach would be to make attendance strongly recommended but not penalised unless a student falls below a reasonable threshold, such as missing more than 20% of classes. Participation grades can incentivise engagement without punishing those who miss a session for a legitimate reason. Ultimately, the goal is learning, and universities should create conditions that make students want to attend rather than forcing them to.`
  },
  {
    id: 2,
    professorName: "Professor Kim asks:",
    question: "Technology has made it possible for many people to work from home. Do you think remote work is more or less productive than working in an office? Share your perspective and reasoning.",
    studentA: {
      name: "David",
      response: "Remote work is more productive in my opinion. Without the commute and constant office interruptions, people can focus better. Studies I've read show that remote workers often produce more output and report higher job satisfaction than office workers."
    },
    studentB: {
      name: "Sofia",
      response: "I see it differently. Many people struggle to concentrate at home because of family members, household tasks, and the lack of a proper work environment. Also, collaboration and brainstorming are much easier in person, which is critical for creative work and complex problem-solving."
    },
    minWords: 100,
    modelAnswer: `Both David and Sofia raise important points, and I think the truth lies somewhere between their positions. Productivity in remote work depends heavily on the nature of the job and the individual's circumstances.

For tasks that require sustained concentration — writing, coding, data analysis — remote work can indeed be more productive, as David suggests. The elimination of commuting time alone adds hours back to a person's day, and the ability to customise one's environment can significantly reduce distractions.

However, Sofia's point about collaboration is compelling. Creative fields and roles that require frequent teamwork often suffer in a fully remote setting. Non-verbal communication, spontaneous brainstorming, and the informal exchanges that happen around a coffee machine all contribute to innovation in ways that video calls cannot fully replicate.

In my view, a hybrid model is the most productive arrangement for most people: two to three days in the office for collaborative work, and the remainder at home for focused individual tasks. This balances the deep work that remote settings enable with the human connection and spontaneity that offices foster.`
  },
  {
    id: 3,
    professorName: "Professor Nguyen asks:",
    question: "Some people believe that students should be required to study a foreign language throughout their entire time at university, while others think language study should be optional after the first year. What is your view?",
    studentA: {
      name: "Elena",
      response: "I strongly support making foreign language study mandatory throughout university. In a globalised world, the ability to communicate across cultures is not just a skill — it's a necessity. Consistent practice over four years leads to genuine proficiency, which occasional or optional study rarely achieves."
    },
    studentB: {
      name: "James",
      response: "While I value language learning, I don't think it should be compulsory for all four years. Students have limited time, and forcing an engineering or science major to dedicate hours each week to a language they may never use professionally could hinder their core academic development."
    },
    minWords: 100,
    modelAnswer: `This is a genuinely complex issue, and I find myself persuaded by elements of both arguments. Elena is right that sustained, long-term language study produces far better outcomes than a brief compulsory module — language acquisition is a slow process that benefits enormously from consistent exposure over time.

Nevertheless, James makes a practical point that deserves serious consideration. University curricula are already demanding, and students in highly technical fields may find compulsory language courses an unwelcome burden rather than a valuable opportunity. There is also the question of relevance: a student specialising in biochemistry may have little professional need for conversational French, however intellectually enriching it might be.

My own view is that a middle path is most reasonable. All students should be required to complete at least one year of foreign language study, which provides a baseline of cross-cultural competence. After that, language courses could remain compulsory only for students in fields where intercultural communication is a clear professional asset — such as international business, diplomacy, or the humanities — while others could continue voluntarily. This respects both the value of language learning and the diverse academic priorities of students across disciplines.`
  },
  {
    id: 4,
    professorName: "Professor Okafor asks:",
    question: "Social media platforms have transformed how people consume news. Do you think social media is a positive or negative force for how society stays informed? Explain your reasoning.",
    studentA: {
      name: "Priya",
      response: "Social media is largely positive for news consumption. It democratises information — anyone can report on events in real time, which means stories that mainstream media ignores can still reach a wide audience. It also allows direct engagement with news topics, making people more involved citizens."
    },
    studentB: {
      name: "Noah",
      response: "I think the negatives outweigh the positives. Social media algorithms prioritise content that generates emotional reactions, which promotes sensationalism and misinformation over accurate, nuanced reporting. People end up in echo chambers that reinforce their existing beliefs rather than broadening their perspective."
    },
    minWords: 100,
    modelAnswer: `Social media's impact on news consumption is one of the defining issues of our time, and I believe the honest answer is that it is simultaneously a powerful tool for good and a significant source of harm.

Priya correctly identifies the democratising potential of social media. Events that might have been suppressed or ignored by traditional gatekeepers — corrupt local politicians, human rights abuses in remote areas — have come to light because of citizen journalism on platforms like Twitter and Instagram. This is a genuine and important contribution to public accountability.

However, Noah's concern about algorithmic distortion is equally well-founded and, in my view, currently represents the more urgent problem. When platforms are designed to maximise engagement rather than accuracy, the natural result is that outrage and fear spread faster than correction and nuance. Research consistently shows that false news travels further and faster than accurate news on social media, which has real consequences for public understanding of issues from public health to elections.

On balance, I believe social media is a net negative force for informed citizenship in its current form, not because the technology is inherently harmful, but because the business models underlying the major platforms systematically reward misinformation. Meaningful regulation and platform redesign — rather than a rejection of social media altogether — seems to me the most realistic path forward.`
  },
  {
    id: 5,
    professorName: "Professor Reyes asks:",
    question: "Some researchers argue that universities should focus primarily on preparing students for the job market, while others believe that a broader education — including arts, philosophy, and critical thinking — is equally important. Where do you stand on this debate?",
    studentA: {
      name: "Lena",
      response: "Universities should absolutely prioritise career preparation. Students take on significant debt to attend university and deserve a return on that investment in the form of employable skills. Employers consistently report that graduates lack practical, workplace-ready abilities — universities need to address that gap."
    },
    studentB: {
      name: "Carlos",
      response: "A university that only produces workers is not a university — it's a vocational school. The purpose of higher education is to develop whole, thoughtful human beings who can reason critically, understand history, and engage with complex ethical questions. These are the foundations of good citizenship and lifelong adaptability."
    },
    minWords: 100,
    modelAnswer: `Lena and Carlos present this debate as a binary choice, but I think the most defensible position is that career preparation and broad intellectual development are not in conflict — in fact, each enriches the other.

Lena is right that the practical dimension of education matters enormously. The cost of a university degree is substantial, and it would be irresponsible for institutions to ignore the employment realities their graduates will face. Skills such as data literacy, communication, project management, and domain-specific technical knowledge are genuinely valuable and universities should teach them well.

Yet Carlos identifies something equally important: the skills that make someone adaptable over a 40-year career — critical thinking, the ability to evaluate evidence, ethical reasoning, cultural awareness — are precisely the skills cultivated by exposure to the humanities, social sciences, and philosophy. As artificial intelligence increasingly automates routine technical tasks, these distinctly human capacities will become more valuable, not less.

I would argue that the universities most worth attending are those that refuse to accept this false choice. A degree in computer science taught alongside courses in ethics and history produces a more valuable — and more employable — graduate than one trained purely in technical skills. The goal should be graduates who are both practically equipped and intellectually alive, capable of adapting to a world that neither they nor their professors can yet fully predict.`
  }
];

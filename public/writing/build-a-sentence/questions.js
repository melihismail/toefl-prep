// Format:
//   question   — what someone asks in the dialogue
//   prompt     — the opening word(s) already given to the student  
//   correct    — the correct words in order (NOT including the prompt)
//   distractor — exactly ONE extra wroheheng word mixed into the bank

const questions = [
  {
    question: "Did the dining hall managers add more vegetarian meals?",
    prompt: "No,",
    correct: ["they","have","not","changed","the menu"],
    distractor: "tomorrow"
  },
  {
    question: "Has the university published the new research guidelines yet?",
    prompt: "No,",
    correct: ["the","guidelines","have","not","been","released","yet"],
    distractor: "has"
  },
  {
    question: "Will the professor cancel tomorrow's lecture?",
    prompt: "No,",
    correct: ["she","is","not","going","to","cancel","the","lecture"],
    distractor: "will"
  },
  {
    question: "Did the students submit their assignments on time?",
    prompt: "No,",
    correct: ["they","have","not","submitted","their","assignments","on","time"],
    distractor: "did"
  },
  {
    question: "Has the library extended its opening hours this semester?",
    prompt: "No,",
    correct: ["the library","has","not","extended","its","opening","hours"],
    distractor: "have"
  },
  {
    question: "Are the researchers planning to publish their findings soon?",
    prompt: "No,",
    correct: ["they","are","not","planning","to","publish","their","findings"],
    distractor: "were"
  },
  {
    question: "Did the committee approve the budget increase?",
    prompt: "No,",
    correct: ["the committee","has","not","approved","the budget","increase"],
    distractor: "did"
  },
  {
    question: "Will the construction on campus be finished by next month?",
    prompt: "No,",
    correct: ["it","will","not","be","finished","by","next month"],
    distractor: "completed"
  },
  {
    question: "Have the students been informed about the schedule change?",
    prompt: "No,",
    correct: ["the students","have","not","been","informed","about","the change"],
    distractor: "has"
  },
  {
    question: "Is the cafeteria open on weekends?",
    prompt: "No,",
    correct: ["it","is","not","open","on","weekends"],
    distractor: "always"
  },
  {
    question: "Has the new science building been completed yet?",
    prompt: "No,",
    correct: ["it","has","not","been","completed","yet"],
    distractor: "built"
  },
  {
    question: "Did the dean announce the new policy at the meeting?",
    prompt: "No,",
    correct: ["he","did","not","announce","the policy","at","the meeting"],
    distractor: "announced"
  },
  {
    question: "Are students allowed to bring food into the library?",
    prompt: "No,",
    correct: ["they","are","not","allowed","to bring","food","into the library"],
    distractor: "permitted"
  },
  {
    question: "Will the exam results be posted online?",
    prompt: "No,",
    correct: ["they","will","not","be","posted","online"],
    distractor: "distributed"
  },
  {
    question: "Has the professor returned the marked essays yet?",
    prompt: "No,",
    correct: ["she","has","not","returned","the essays","yet"],
    distractor: "given"
  },
  {
    question: "Did the university cancel classes because of the storm?",
    prompt: "No,",
    correct: ["it","did","not","cancel","classes","because of","the storm"],
    distractor: "postpone"
  },
  {
    question: "Are the computer labs available to all students?",
    prompt: "No,",
    correct: ["they","are","not","available","to all students"],
    distractor: "open"
  },
  {
    question: "Has the IT department fixed the Wi-Fi problem yet?",
    prompt: "No,",
    correct: ["the IT department","has","not","fixed","the problem","yet"],
    distractor: "resolved"
  },
  {
    question: "Will the visiting professor give a public lecture?",
    prompt: "No,",
    correct: ["she","will","not","give","a public lecture"],
    distractor: "deliver"
  },
  {
    question: "Did the student council vote on the new proposal?",
    prompt: "No,",
    correct: ["they","did","not","vote","on","the proposal"],
    distractor: "approved"
  },
  {
    question: "Is the sports centre open during the holidays?",
    prompt: "No,",
    correct: ["it","is","not","open","during the holidays"],
    distractor: "closed"
  },
  {
    question: "Have the parking regulations changed this year?",
    prompt: "No,",
    correct: ["they","have","not","changed","this year"],
    distractor: "updated"
  },
  {
    question: "Was the seminar recorded for students who missed it?",
    prompt: "No,",
    correct: ["it","was","not","recorded","for students","who missed it"],
    distractor: "filmed"
  },
  {
    question: "Will the scholarship applications open next week?",
    prompt: "No,",
    correct: ["they","will","not","open","next week"],
    distractor: "start"
  },
  {
    question: "Has the course coordinator responded to your email?",
    prompt: "No,",
    correct: ["she","has","not","responded","to my email","yet"],
    distractor: "replied"
  },

  // ── TOEFL iBT Practice Test 1 ──
  {
    question: "What was the highlight of your trip?",
    prompt: "The",
    correct: ["tour guides","who","showed us around","the","old city","were"],
    distractor: "was"
  },
  {
    question: "I heard Anna got a promotion.",
    prompt: "",
    correct: ["Do","you","know","if","she will be","moving to","a different department"],
    distractor: "are"
  },
  {
    question: "We're planning a trip to the mountains next weekend.",
    prompt: "",
    correct: ["Can","you","tell me","whether","the cabins","will be","available"],
    distractor: "are"
  },
  {
    question: "I'm looking forward to the concert this weekend.",
    prompt: "",
    correct: ["What","time","does","it","start"],
    distractor: "is"
  },
  {
    question: "The museum exhibition opens next month.",
    prompt: "",
    correct: ["Do","you","know","how","much","tickets","will cost"],
    distractor: "are"
  },
  {
    question: "I'm planning to go to the beach tomorrow.",
    prompt: "",
    correct: ["What","is","the water","temperature","like","this","time of year"],
    distractor: "at"
  },
  {
    question: "I need to buy groceries today.",
    prompt: "",
    correct: ["Do","you","have","a","shopping","list"],
    distractor: "make"
  },
  {
    question: "I'll be taking a cooking class this weekend.",
    prompt: "",
    correct: ["What","recipes","will","you","learn"],
    distractor: "cook"
  },
  {
    question: "What did Maria ask you about the book you're reading?",
    prompt: "She",
    correct: ["wanted","to know","where","she","could","buy","a copy"],
    distractor: "can"
  },
  {
    question: "How did you prepare for the exam?",
    prompt: "I used",
    correct: ["the study guide","that","was provided","by","the professor"],
    distractor: "it"
  },

  // ── TOEFL iBT Practice Test 2 ──
  {
    question: "I need to buy a new laptop.",
    prompt: "",
    correct: ["Which","store","has","the best","deals"],
    distractor: "have"
  },
  {
    question: "I'm thinking about starting a blog.",
    prompt: "",
    correct: ["Have","you","decided","on","a topic"],
    distractor: "chosen"
  },
  {
    question: "I'm going to study at the library this afternoon.",
    prompt: "",
    correct: ["Do","you","need","to","borrow","any books"],
    distractor: "some"
  },
  {
    question: "I'm thinking about getting a pet.",
    prompt: "",
    correct: ["What","kind","of","animal","are","you","considering"],
    distractor: "type"
  },
  {
    question: "I'm excited to see the new science fiction movie tonight.",
    prompt: "",
    correct: ["Where","is","it","showing"],
    distractor: "playing"
  },
  {
    question: "I have an interview for a new job next week.",
    prompt: "",
    correct: ["Do","you","have","your","resume","ready"],
    distractor: "prepared"
  },
  {
    question: "I need to submit my assignment by tomorrow.",
    prompt: "",
    correct: ["Have","you","finished","writing","it"],
    distractor: "completing"
  },
  {
    question: "I'm planning a trip to Europe this summer.",
    prompt: "",
    correct: ["Did","you","book","your","flight","yet"],
    distractor: "reserve"
  },
  {
    question: "I just started learning French.",
    prompt: "",
    correct: ["Where","are","you","taking","classes"],
    distractor: "attending"
  },
  {
    question: "Why are you asking about the project deadline?",
    prompt: "I'm",
    correct: ["checking","to see","if","it","has been","extended"],
    distractor: "whether"
  },

  // ── Conditionals ──
  {
    question: "Why didn't you take a different road?",
    prompt: "If I",
    correct: ["had","known","I","would","have","taken","a different route"],
    distractor: "took"
  },
  {
    question: "Do you think she'll pass the exam?",
    prompt: "If she",
    correct: ["studies","harder","she","will","pass","the exam"],
    distractor: "passed"
  },
  {
    question: "Why did you miss the train?",
    prompt: "If we",
    correct: ["had","left","earlier","we","would","not","have missed it"],
    distractor: "leave"
  },
  {
    question: "What happens if the weather is bad tomorrow?",
    prompt: "If it",
    correct: ["rains","tomorrow","we","will","cancel","the picnic"],
    distractor: "cancelled"
  },
  {
    question: "Why didn't he hear the announcement?",
    prompt: "If he",
    correct: ["had","been","paying","attention","he","would have","heard it"],
    distractor: "was"
  },

  // ── Passive Voice ──
  {
    question: "Who submitted the report?",
    prompt: "The report",
    correct: ["was","submitted","by","the team","leader"],
    distractor: "is"
  },
  {
    question: "Has the board made a decision on the policy?",
    prompt: "The new policy",
    correct: ["has","been","approved","by","the board"],
    distractor: "was"
  },
  {
    question: "What's happening with the old building?",
    prompt: "The building",
    correct: ["is","being","renovated","right","now"],
    distractor: "was"
  },
  {
    question: "When will we know the results?",
    prompt: "The results",
    correct: ["will","be","announced","next","week"],
    distractor: "are"
  },
  {
    question: "Did the package arrive at the right place?",
    prompt: "No, it",
    correct: ["was","delivered","to","the wrong","address"],
    distractor: "is"
  },

  // ── Reported Speech ──
  {
    question: "What did she say about the assignment?",
    prompt: "She said",
    correct: ["that","she","had","already","finished","it"],
    distractor: "has"
  },
  {
    question: "What did he tell you about the meeting?",
    prompt: "He told me",
    correct: ["he","would","be","arriving","late"],
    distractor: "will"
  },
  {
    question: "What did the teacher want to know?",
    prompt: "The teacher",
    correct: ["asked","if","we","had","completed","the homework"],
    distractor: "have"
  },
  {
    question: "Did they say anything about the event?",
    prompt: "They mentioned",
    correct: ["the event","had","been","postponed"],
    distractor: "has"
  },
  {
    question: "What did she say about her workload?",
    prompt: "She explained",
    correct: ["that","she","had","been","working","all week"],
    distractor: "is"
  },

  // ── Relative Clauses ──
  {
    question: "Who won the scholarship?",
    prompt: "The student",
    correct: ["who","won","the scholarship","is","from","here"],
    distractor: "which"
  },
  {
    question: "When is the library book due?",
    prompt: "The book",
    correct: ["that","I","borrowed","is","due","next week"],
    distractor: "which"
  },
  {
    question: "Did you hear about the old professor?",
    prompt: "The professor",
    correct: ["whose","class","I","took","retired","recently"],
    distractor: "who"
  },
  {
    question: "How was dinner last night?",
    prompt: "The restaurant",
    correct: ["where","we","ate","last night","was","great"],
    distractor: "which"
  },
  {
    question: "Why did he leave the meeting early?",
    prompt: "The reason",
    correct: ["why","he","left","was","never","explained"],
    distractor: "that"
  },

  // ── Present Perfect ──
  {
    question: "How long have you been in this city?",
    prompt: "I have",
    correct: ["lived","here","since","I","was","a child"],
    distractor: "am"
  },
  {
    question: "Does she talk to him anymore?",
    prompt: "She has",
    correct: ["not","spoken","to","him","since","last year"],
    distractor: "from"
  },
  {
    question: "What have you done on this trip so far?",
    prompt: "We have",
    correct: ["already","visited","three","museums","this trip"],
    distractor: "went"
  },
  {
    question: "How long has he been studying English?",
    prompt: "He has been",
    correct: ["studying","English","for","five","years"],
    distractor: "since"
  },
  {
    question: "Have they made vacation plans?",
    prompt: "They have",
    correct: ["not","decided","where","to","go","yet"],
    distractor: "still"
  },

  // ── Modals ──
  {
    question: "Why didn't you tell me about the schedule change?",
    prompt: "You should",
    correct: ["have","told","me","about","it","earlier"],
    distractor: "must"
  },
  {
    question: "Why wasn't she at the appointment?",
    prompt: "She must",
    correct: ["have","forgotten","about","the","appointment"],
    distractor: "should"
  },
  {
    question: "Why didn't you take the earlier flight?",
    prompt: "We could",
    correct: ["have","taken","the","earlier","flight","instead"],
    distractor: "would"
  },
  {
    question: "Will he come to the conference?",
    prompt: "He might",
    correct: ["not","be","able","to","attend","next week"],
    distractor: "can"
  },
  {
    question: "That email looked suspicious. Why did you click it?",
    prompt: "You should",
    correct: ["not","have","opened","that","email"],
    distractor: "must"
  },

  // ── Comparatives & Superlatives ──
  {
    question: "What did you think of the documentary?",
    prompt: "This is the",
    correct: ["most","interesting","film","I","have","ever","seen"],
    distractor: "more"
  },
  {
    question: "How is the new library compared to the old one?",
    prompt: "The new library",
    correct: ["is","much","bigger","than","the old","one"],
    distractor: "more"
  },
  {
    question: "Is she good at English?",
    prompt: "She speaks",
    correct: ["English","more","fluently","than","anyone","else"],
    distractor: "most"
  },
  {
    question: "How bad was the storm?",
    prompt: "That was the",
    correct: ["worst","storm","we","have","ever","experienced"],
    distractor: "worse"
  },
  {
    question: "Any tips for improving my pronunciation?",
    prompt: "The more",
    correct: ["you","practice","the","better","you","will","become"],
    distractor: "good"
  },

  // ── Gerunds & Infinitives ──
  {
    question: "What does she do in her free time?",
    prompt: "She enjoys",
    correct: ["reading","books","about","history"],
    distractor: "to read"
  },
  {
    question: "Why did he apply for the job?",
    prompt: "He decided",
    correct: ["to","apply","after","seeing","the advertisement"],
    distractor: "applying"
  },
  {
    question: "How do they stay focused in class?",
    prompt: "They avoid",
    correct: ["using","their","phones","during","class"],
    distractor: "to use"
  },
  {
    question: "Are you interested in the writing course?",
    prompt: "I would like",
    correct: ["to","sign","up","for","that","course"],
    distractor: "signing"
  },
  {
    question: "Where should we meet?",
    prompt: "She suggested",
    correct: ["meeting","at","the café","instead"],
    distractor: "to meet"
  },

  // ── Subject-Verb Agreement ──
  {
    question: "Did anyone know about the schedule change?",
    prompt: "Neither the students",
    correct: ["nor","the teacher","was","aware"],
    distractor: "were"
  },
  {
    question: "Did everyone get a certificate?",
    prompt: "Each participant",
    correct: ["has","received","a","certificate"],
    distractor: "have"
  },
  {
    question: "Are there more applicants this year?",
    prompt: "The number of",
    correct: ["applicants","has","increased","this","year"],
    distractor: "have"
  },
  {
    question: "What are the researchers doing?",
    prompt: "A group of",
    correct: ["researchers","is","working","on","it","now"],
    distractor: "are"
  },
  {
    question: "When is the paper due?",
    prompt: "Every student",
    correct: ["has","to","submit","the paper","by Friday"],
    distractor: "have"
  },

  // ── Conjunctions & Complex Sentences ──
  {
    question: "Did he pass the final exam?",
    prompt: "Although he",
    correct: ["studied","all night","he","did","not","pass"],
    distractor: "passed"
  },
  {
    question: "Why did she go to the store?",
    prompt: "She went",
    correct: ["to","the store","because","she","needed","groceries"],
    distractor: "buying"
  },
  {
    question: "Did she help anyone after finishing her work?",
    prompt: "Not only did",
    correct: ["she","finish","early","but","she","also","helped"],
    distractor: "too"
  },
  {
    question: "Did the bad weather stop them from hiking?",
    prompt: "Even though",
    correct: ["the weather","was","bad","they","went","hiking"],
    distractor: "good"
  },
  {
    question: "What does he need to do to graduate?",
    prompt: "He will not",
    correct: ["graduate","unless","he","completes","the courses"],
    distractor: "if"
  }
];
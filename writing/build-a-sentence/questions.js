// Format:
//   question   — what someone asks in the dialogue
//   prompt     — the opening word(s) already given to the student  
//   correct    — the correct words in order (NOT including the prompt)
//   distractor — exactly ONE extra wrong word mixed into the bank

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
  }
];
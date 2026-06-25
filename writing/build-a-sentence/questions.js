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
  }
];
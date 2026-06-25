const conversationPassages = [
  {
    id: 1,
    title: "Narrowing a Research Topic",
    speakers: ["Student", "Professor Chen"],
    audioFile: null,
    duration: "2:15",
    transcript: `Student: Professor Chen, do you have a few minutes? I wanted to talk about my midterm paper.

Professor Chen: Of course, come in. What's on your mind?

Student: Well, I'm having trouble narrowing down my topic. I want to write about social media, but it feels too broad.

Professor Chen: That's a very common challenge. What aspect of social media interests you most?

Student: I think I'm most interested in how it affects mental health in teenagers.

Professor Chen: That's already much better. You could focus specifically on the relationship between social media use frequency and anxiety levels in high school students. There's quite a lot of recent research on that.

Student: Oh, that sounds a lot more manageable. Should I focus on a particular platform, like Instagram?

Professor Chen: You could, but comparing two platforms might give you a richer analysis. Just make sure you can find enough academic sources within the next week or so.

Student: Right, the paper is due in two weeks. Is it okay if I email you my outline before I start writing?

Professor Chen: Absolutely. Send it by Thursday and I'll get back to you before the weekend.`,
    questions: [
      { stem:"Why does the student visit the professor?", options:["To submit the completed paper","To get help choosing a narrower paper topic","To ask for a deadline extension","To find out what grade she received"], answer:1, type:"Main Purpose" },
      { stem:"What does the professor suggest the student write about?", options:["The history of social media platforms","How social media companies make money","The link between social media use and teenage anxiety","Differences between Instagram and TikTok users"], answer:2, type:"Detail" },
      { stem:"What does the professor say about comparing two platforms?", options:["It is too complicated for a midterm paper","It could produce a more thorough analysis","It requires special academic databases","It has already been studied too much"], answer:1, type:"Detail" },
      { stem:"By when should the student send her outline?", options:["Monday","Wednesday","Thursday","Friday"], answer:2, type:"Detail" },
      { stem:"What can be inferred about Professor Chen's attitude toward the student?", options:["He is too busy to help properly","He finds the topic uninteresting","He is supportive and wants to guide her","He thinks the paper will be too difficult for her"], answer:2, type:"Inference" }
    ]
  },
  {
    id: 2,
    title: "Planning a Group Project",
    speakers: ["Maya", "Lucas"],
    audioFile: null,
    duration: "1:55",
    transcript: `Maya: Lucas, have you thought about how we're going to divide the work for the economics project?

Lucas: A bit. I was thinking we could each take one section of the report. That way we both have ownership over part of it.

Maya: That makes sense. I'm more comfortable with the data analysis side, so I could handle the statistics and graphs.

Lucas: Perfect. I'm actually better at the written sections — the introduction, background, and conclusion. I'll take those.

Maya: Good. But we still need to figure out the research. That should probably be shared.

Lucas: Agreed. Should we split the sources? Like, you take the academic journals and I'll look through newspaper articles and reports?

Maya: That works. How about we meet again on Wednesday to compare what we've found before we start writing?

Lucas: Wednesday is fine. Should we use the library's group study room?

Maya: Yes, I'll book it for 3 PM. And let's make sure we've both done the research by then so we're not wasting time.

Lucas: Sounds like a plan. I'll text you if anything comes up.`,
    questions: [
      { stem:"What is the main purpose of the conversation?", options:["To complain about the difficulty of the assignment","To plan how to divide work on a group project","To ask their professor for help","To decide whether to change their topic"], answer:1, type:"Main Purpose" },
      { stem:"What part of the project will Maya handle?", options:["The introduction and conclusion","The newspaper articles","The statistics and graphs","The final proofreading"], answer:2, type:"Detail" },
      { stem:"How do the students plan to divide the research?", options:["Lucas does all the research while Maya writes","Maya handles journals, Lucas handles news and reports","They will both search for the same sources independently","They will ask a librarian to find everything for them"], answer:1, type:"Detail" },
      { stem:"When will the students meet next?", options:["Monday at noon","Tuesday morning","Wednesday at 3 PM","Thursday evening"], answer:2, type:"Detail" },
      { stem:"What does Maya say about their Wednesday meeting?", options:["They should invite their professor","They should both have completed their research beforehand","The library might be closed","They need to submit a draft that day"], answer:1, type:"Inference" }
    ]
  },
  {
    id: 3,
    title: "Requesting a Course Waiver",
    speakers: ["Student", "Academic Advisor"],
    audioFile: null,
    duration: "2:30",
    transcript: `Student: Hi, I have an appointment with Ms. Patel about my course requirements.

Academic Advisor: Yes, come in. I'm Ms. Patel. What can I help you with today?

Student: I'd like to ask about waiving the introductory statistics course. I studied statistics for two years at my previous university and I feel I'm well beyond that level.

Academic Advisor: I understand. We do occasionally grant waivers for students who can demonstrate sufficient prior knowledge. Have you brought any transcripts or course materials from your previous studies?

Student: Yes, I brought my official transcript and the syllabus from the statistics course I completed.

Academic Advisor: Great. I'll need to review these and pass them to the relevant department. They'll compare the content with what our introductory course covers.

Student: How long does that process take?

Academic Advisor: Usually about two weeks. If the waiver is approved, you'll need to substitute the course with another one at the same level.

Student: Would I be able to take an advanced statistics elective instead?

Academic Advisor: That would be up to the department. I'd suggest emailing Professor Lim — he oversees the statistics programme — and asking his recommendation.

Student: Thank you. I'll follow up with him this week.`,
    questions: [
      { stem:"Why does the student visit the academic advisor?", options:["To complain about a professor","To request a waiver for a required introductory course","To change her major","To ask about scholarship opportunities"], answer:1, type:"Main Purpose" },
      { stem:"What documents has the student brought?", options:["A letter of recommendation and a resume","An official transcript and a course syllabus","A completed application form","Her current grade report"], answer:1, type:"Detail" },
      { stem:"How long will the waiver process take?", options:["One week","Two weeks","Three to four weeks","It varies too much to say"], answer:1, type:"Detail" },
      { stem:"What must the student do if the waiver is approved?", options:["Retake the exam at a higher level","Complete a research project","Substitute the course with another at the same level","Get a signature from the dean"], answer:2, type:"Detail" },
      { stem:"What does the advisor suggest the student do next?", options:["Visit the registrar's office","Speak to Professor Lim about the statistics programme","Wait two weeks before taking any action","Re-enrol in the introductory course as a backup"], answer:1, type:"Inference" }
    ]
  }
];

const emailPrompts = [
  {
    id: 1,
    situation: "You are a student at a university. Your professor sent an email saying the deadline for your term paper has been extended by one week due to a scheduling conflict on her end. You have already finished most of your paper and could easily complete it before the original deadline.",
    task: "Write an email to your professor (Professor Harris) thanking her for the extension and politely asking whether you may still submit your paper by the original deadline if you finish it ahead of schedule. Sign the email with your name.",
    minWords: 80,
    modelAnswer: `Dear Professor Harris,

Thank you so much for letting us know about the extended deadline. I really appreciate your thoughtfulness in giving students more time to complete the assignment.

I have actually been making good progress on my paper and believe I may be able to finish it close to the original deadline. Would it be possible for me to submit it early if I complete it before the new due date? I want to make sure this is acceptable and would not cause any issues on your end.

Thank you again for your flexibility and understanding. I look forward to submitting a paper I am proud of.

Best regards,
Jordan Kim`
  },
  {
    id: 2,
    situation: "You live in a university dormitory. You received an official email from the housing office informing you that due to scheduled maintenance work, the hot water supply in your building will be shut off for three full days starting next Monday. No alternative arrangements have been mentioned in the email.",
    task: "Write an email to the university housing office asking for clarification about the exact hours the water will be off and requesting that you be provided with access to hot water facilities elsewhere on campus during this period. Be polite but firm.",
    minWords: 80,
    modelAnswer: `Dear Housing Office,

I am writing regarding the email I received about the hot water shutdown scheduled to begin next Monday. While I understand that maintenance work is sometimes necessary, I have a few questions and concerns I would like to raise.

First, could you please clarify the exact hours during which the water will be unavailable each day? Knowing the schedule would help me plan accordingly.

Second, I would like to request access to alternative hot water facilities on campus during these three days. As a full-time student, having access to basic amenities is essential for my daily routine and well-being.

I would greatly appreciate a prompt response so that I can make the necessary arrangements. Thank you for your attention to this matter.

Sincerely,
Alex Carter`
  },
  {
    id: 3,
    situation: "You recently attended a free career development workshop organised by your university's student services office. The workshop covered resume writing and interview skills. You found it extremely helpful and learned practical skills you had not been taught before. However, you noticed there was no section on networking, which you think would benefit students greatly.",
    task: "Write an email to the student services office expressing your genuine appreciation for the workshop and suggesting that a networking skills session be added to future workshops. Provide a brief reason for your suggestion.",
    minWords: 80,
    modelAnswer: `Dear Student Services Team,

I am writing to thank you for organising the career development workshop I attended last week. The sessions on resume writing and interview preparation were incredibly practical and well-structured. I left feeling much more confident about my job search, and I have already started updating my resume using the tips I learned.

I would also like to offer one suggestion for future workshops: it would be wonderful to include a session on professional networking skills. Many students, myself included, find networking challenging because we have never been taught how to approach it effectively. A dedicated session covering how to build connections and use platforms like LinkedIn could make a real difference.

Thank you again for providing such valuable opportunities. I hope to attend future events as well.

Kind regards,
Sam Osei`
  },
  {
    id: 4,
    situation: "You ordered a textbook online from the university bookstore three weeks ago. The website said it would arrive within five business days. You still have not received it and your first exam using that book is next Friday. You received no updates or tracking information.",
    task: "Write an email to the university bookstore asking about the status of your order, expressing your concern about the upcoming exam, and requesting either an urgent delivery or a full refund. Include your order details politely.",
    minWords: 80,
    modelAnswer: `Dear University Bookstore Team,

I am writing to enquire about an order I placed approximately three weeks ago for a course textbook. According to your website, the item was expected to arrive within five business days; however, I have not yet received it, nor have I received any tracking information or updates.

I am particularly concerned because I have an exam next Friday that covers material from this book, and I am currently unable to study from it. I would appreciate it if you could look into the status of my order as soon as possible.

If the book cannot be delivered urgently, I would request a full refund so that I can purchase it from another source in time for my exam. I am happy to provide my order number upon request.

Thank you for your prompt attention to this matter.

Best regards,
Taylor Morgan`
  },
  {
    id: 5,
    situation: "Your university library recently introduced a new online booking system for study rooms. After using it for two weeks, you have found several problems: the system often crashes, bookings are not always saved correctly, and there is no customer support contact listed on the website.",
    task: "Write an email to the library administration reporting the technical issues you have experienced with the new booking system. Suggest one practical improvement and ask about the timeline for fixing the problems.",
    minWords: 80,
    modelAnswer: `Dear Library Administration,

I am writing to bring some technical issues to your attention regarding the new online study room booking system that was introduced recently. While I appreciate the effort to modernise the booking process, I have unfortunately encountered several problems over the past two weeks.

Specifically, the system has crashed on multiple occasions while I was trying to make a reservation, and on two separate occasions my bookings were not saved despite appearing to go through successfully. Additionally, there is currently no customer support contact listed on the website, which made it difficult to know how to report these issues.

I would suggest adding a clearly visible support email or phone number to the booking page so that students can report problems quickly. I would also like to know whether there is a timeline for addressing these technical issues, as many students rely on study rooms during exam season.

Thank you for your time and I hope these concerns are helpful.

Yours sincerely,
Riley Park`
  }
];

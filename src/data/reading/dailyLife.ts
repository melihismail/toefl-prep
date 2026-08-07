// Migrated verbatim from public/reading/daily-life/questions.js — content unchanged, typing added.
import type { ReadingPassage } from './types.ts';

// ── Question format ───────────────────────────────────────────────────────────
//
// Each passage has:
//   title    — short label for the review screen
//   textType — "Email" | "Notice" | "Announcement" | "Social Post" | "Message"
//   subject  — (Email only) subject line
//   from     — (Email only) sender
//   passage  — the full text of the real-world document
//   questions — array of 2-3 questions, each with:
//       stem    — the question text
//       options — array of 4 answer strings
//       answer  — index (0-3) of the correct option
//
// Question types used (as in real TOEFL 2026):
//   - Main purpose  ("What is the main purpose of this notice?")
//   - Detail        ("According to the email, what must students do?")
//   - Negative fact ("Which of the following is NOT mentioned?")
//   - Inference     ("What can be inferred about...?")

export const dailyLifePassages: ReadingPassage[] = [

  // ── 1. Email ────────────────────────────────────────────────────────────────
  {
    title: "Library Book Return Deadline",
    textType: "Email",
    subject: "Important: Book Return Deadline – December 18",
    from: "Westfield University Bookstore <bookstore@westfield.edu>",
    passage: `Dear Students,

Please be reminded that all rented textbooks must be returned to the campus bookstore no later than December 18th. Books returned after this date will incur a late fee of $5 per day.

If you are unable to return your books in person before the deadline, you may ship them using the prepaid label available at the front desk. Please note that shipped books must be postmarked by December 18th to avoid late charges.

Students who have outstanding returns after December 25th will have a hold placed on their student account, which may affect their ability to register for next semester's courses.

If you have any questions, please contact us at bookstore@westfield.edu.`,
    questions: [
      {
        stem: "What is the main purpose of this email?",
        options: [
          "To announce a new book rental policy for next semester",
          "To remind students of the deadline for returning rented textbooks",
          "To inform students about a change in bookstore operating hours",
          "To offer students a discount on textbook purchases"
        ],
        answer: 1
      },
      {
        stem: "What will happen if a student still has books after December 25th?",
        options: [
          "They will be charged the full price of the book.",
          "They will lose their student email account.",
          "A hold will be placed on their student account.",
          "They will be required to meet with an academic advisor."
        ],
        answer: 2
      },
      {
        stem: "According to the email, which of the following is NOT mentioned as a way to return books?",
        options: [
          "Returning them in person to the bookstore",
          "Shipping them with a prepaid label",
          "Dropping them off at a campus post office box",
          "Ensuring they are postmarked by December 18th"
        ],
        answer: 2
      }
    ]
  },

  // ── 2. Notice ───────────────────────────────────────────────────────────────
  {
    title: "Campus Bike-Share Upgrade",
    textType: "Notice",
    passage: `NOTICE: Campus Bike-Share Program Update

Effective March 1st, all standard bicycles in the campus bike-share program will be replaced with new electric-assist bicycles (e-bikes).

Please note the following changes:
• Free ride time: reduced from 60 minutes to 30 minutes per ride
• Additional time: $0.15 per minute after the first 30 minutes
• Parking: All e-bikes must be returned to designated Charging Hubs (marked with green paint). Leaving an e-bike at a standard bike rack will result in a $5 penalty fee charged to your student account.

E-bikes are not permitted on hiking trails or unpaved paths. Helmets are strongly recommended but not required.`,
    questions: [
      {
        stem: "What is the main purpose of this notice?",
        options: [
          "To inform students about changes to the campus bike-share program",
          "To announce the closure of the campus bike-share program",
          "To remind students that helmets are required when riding bicycles",
          "To explain how to register for the campus bike-share program"
        ],
        answer: 0
      },
      {
        stem: "According to the notice, what will happen if a student leaves an e-bike at a standard bike rack?",
        options: [
          "Their bike-share membership will be cancelled.",
          "They will be charged a $5 penalty fee.",
          "They will not be allowed to rent another e-bike.",
          "They will receive a warning on their first offense."
        ],
        answer: 1
      },
      {
        stem: "Which of the following can be inferred about the new e-bikes?",
        options: [
          "They are available for purchase by students.",
          "They require a special license to operate.",
          "They need to be charged at designated locations.",
          "They are only available on weekdays."
        ],
        answer: 2
      }
    ]
  },

  // ── 3. Announcement ─────────────────────────────────────────────────────────
  {
    title: "Dining Hall Menu Change",
    textType: "Announcement",
    passage: `DINING SERVICES ANNOUNCEMENT

Starting next Monday, the North Campus Dining Hall will introduce a new rotating weekly menu. The menu will change every Monday and will feature a wider variety of international cuisines, including dishes from Asia, the Middle East, and Latin America.

Additionally, all meals will now be clearly labeled with allergen information, including gluten, dairy, and nut content. A dedicated allergen-free station will be available at all times.

Students with specific dietary needs are encouraged to speak with the dining staff directly. The dining hall will continue to operate from 7:00 a.m. to 9:00 p.m. Monday through Friday and from 9:00 a.m. to 7:00 p.m. on weekends.

For the full menu, visit the Dining Services website or scan the QR code at the entrance.`,
    questions: [
      {
        stem: "What is the main purpose of this announcement?",
        options: [
          "To inform students about new dining hall hours",
          "To announce changes to the dining hall menu and allergen labeling",
          "To remind students to check the Dining Services website",
          "To announce the opening of a new dining hall on campus"
        ],
        answer: 1
      },
      {
        stem: "According to the announcement, how often will the menu change?",
        options: [
          "Every day",
          "Every week",
          "Every month",
          "Every semester"
        ],
        answer: 1
      },
      {
        stem: "What can be inferred about the allergen-free station?",
        options: [
          "It is only available during lunch hours.",
          "Students must register in advance to use it.",
          "It is accessible throughout the dining hall's operating hours.",
          "It was already available before this announcement."
        ],
        answer: 2
      }
    ]
  },

  // ── 4. Social Post ──────────────────────────────────────────────────────────
  {
    title: "Community Tool Library",
    textType: "Social Post",
    passage: `📢 Eastside Community Center — Tool Library Now Open!

Did you know you can borrow tools instead of buying them? Our community tool library now has over 200 tools available for free short-term loan, including power drills, sanders, ladders, and more.

How it works:
→ Sign up for a free membership at the front desk (takes 5 minutes)
→ Borrow up to 3 tools at a time for up to 7 days
→ Return them clean and on time to keep your borrowing privileges

🎉 This week only: New members who sign up before Friday get their first loan processed immediately — no standard 24-hour waiting period!

Tools are donated by community members. Have tools you no longer need? Drop them off at the center — we accept most hand and power tools in working condition.`,
    questions: [
      {
        stem: "What is the main purpose of this post?",
        options: [
          "To sell second-hand tools to community members",
          "To promote a free tool borrowing program",
          "To announce the expansion of the community center",
          "To ask for volunteers to manage the tool library"
        ],
        answer: 1
      },
      {
        stem: "According to the post, what special benefit do new members get this week?",
        options: [
          "They can borrow more than 3 tools at a time.",
          "They can keep borrowed tools for longer than 7 days.",
          "They can have their first loan processed immediately.",
          "They receive a free donated tool to keep."
        ],
        answer: 2
      },
      {
        stem: "Which of the following is NOT stated in the post?",
        options: [
          "Members can borrow up to 3 tools at a time.",
          "The tool library accepts donated tools.",
          "Membership costs a small annual fee.",
          "Borrowed tools must be returned within 7 days."
        ],
        answer: 2
      }
    ]
  },

  // ── 5. Email ────────────────────────────────────────────────────────────────
  {
    title: "Dormitory Checkout Instructions",
    textType: "Email",
    subject: "Winter Break Checkout — Action Required",
    from: "Housing Office <housing@northridge.edu>",
    passage: `Dear Residents,

As the semester comes to a close, please review the following checkout requirements before leaving for winter break.

Before you leave, you must:
• Empty and clean your refrigerator
• Unplug all electronics (except the refrigerator)
• Take out all trash
• Ensure all windows are fully closed and locked

If you are leaving before December 15th, please place your room key in an express checkout envelope and drop it in the box at the front desk.

If you are leaving on December 15th, I will be conducting final room checks between 3:00 p.m. and 5:00 p.m. You may hand your key directly to me at that time.

Students whose flight schedules require them to stay past 5:00 p.m. must email the housing office by this Wednesday to request a late departure extension.

Have a wonderful break!
Maria Chen, Residence Director`,
    questions: [
      {
        stem: "What is the main purpose of this email?",
        options: [
          "To announce new dormitory rules for next semester",
          "To provide checkout instructions for winter break",
          "To remind students to pay their housing fees",
          "To inform students about a change in the key return system"
        ],
        answer: 1
      },
      {
        stem: "What must students who need to stay past 5:00 p.m. on December 15th do?",
        options: [
          "Call the housing office on the day of departure",
          "Leave their key in an express checkout envelope",
          "Email the housing office by Wednesday to request an extension",
          "Speak directly with Maria Chen before December 15th"
        ],
        answer: 2
      }
    ]
  },

  // ── 6. Notice ───────────────────────────────────────────────────────────────
  {
    title: "Paperless Billing Enrollment",
    textType: "Notice",
    passage: `IMPORTANT NOTICE FROM FIRST NATIONAL BANK

We are moving to paperless billing. Starting April 1st, all customers will receive their monthly statements by email only. Paper statements will no longer be mailed.

To ensure you continue to receive your statements without interruption:
1. Log in to your online banking account
2. Go to Settings > Notifications
3. Confirm your preferred email address

If you do not have an online banking account, please visit your nearest branch or call our customer service line at 1-800-555-0199 to set one up before March 25th.

Customers who do not update their preferences by March 25th will still receive statements by email, but their statements will be sent to the email address currently on file. Please verify this is correct.`,
    questions: [
      {
        stem: "What is the main purpose of this notice?",
        options: [
          "To announce a new online banking app",
          "To inform customers about the switch to paperless billing",
          "To remind customers to update their home mailing address",
          "To offer customers a discount for signing up for online banking"
        ],
        answer: 1
      },
      {
        stem: "According to the notice, what should customers do if they do not have an online banking account?",
        options: [
          "Continue receiving paper statements as usual",
          "Wait for the bank to set up an account automatically",
          "Visit a branch or call customer service before March 25th",
          "Send an email to the bank requesting an exemption"
        ],
        answer: 2
      },
      {
        stem: "What can be inferred about customers who do not update their preferences by March 25th?",
        options: [
          "They will stop receiving bank statements altogether.",
          "They will continue to receive paper statements by mail.",
          "They will receive statements at the email address already on file.",
          "They will be charged a fee for late enrollment."
        ],
        answer: 2
      }
    ]
  },

  // ── 7. Announcement ─────────────────────────────────────────────────────────
  {
    title: "Campus Gym Renovation Closure",
    textType: "Announcement",
    passage: `FITNESS CENTER TEMPORARY CLOSURE

The Riverside Campus Fitness Center will be closed from January 6th to January 20th for scheduled renovations. During this period, the following improvements will be made:
• Installation of new cardio equipment
• Resurfacing of the basketball courts
• Expansion of the stretching and yoga area

Students may use the Downtown Recreation Center free of charge during the closure period by presenting their valid student ID.

The swimming pool will remain open throughout the renovation under its regular schedule (6:00 a.m. – 8:00 p.m. daily).

We apologize for any inconvenience and look forward to providing you with an improved fitness experience upon reopening on January 21st.`,
    questions: [
      {
        stem: "What is the main purpose of this announcement?",
        options: [
          "To inform students about a permanent closure of the fitness center",
          "To announce upcoming renovations and a temporary closure",
          "To remind students of the fitness center's operating hours",
          "To introduce new fitness classes starting in January"
        ],
        answer: 1
      },
      {
        stem: "According to the announcement, which facility will remain open during the renovation?",
        options: [
          "The basketball courts",
          "The cardio equipment area",
          "The swimming pool",
          "The yoga and stretching area"
        ],
        answer: 2
      },
      {
        stem: "What can be inferred about the Downtown Recreation Center?",
        options: [
          "It is normally only open to non-students.",
          "Students do not usually get free access to it.",
          "It has better facilities than the campus fitness center.",
          "It will also be undergoing renovations in January."
        ],
        answer: 1
      }
    ]
  },

  // ── 8. Message ──────────────────────────────────────────────────────────────
  {
    title: "Study Group Rescheduling",
    textType: "Message",
    passage: `From: Omar Hassan
To: Biology 201 Study Group

Hey everyone,

Just a heads-up — I have to move our study session this Thursday. I have a lab report due Friday morning that I completely forgot about, so Thursday evenings won't work for me this week.

Would Saturday afternoon work for everyone? I'm thinking 2:00–4:00 p.m. at the library (Room 3B is usually free on weekends). Let me know by Wednesday night so I can book the room in advance.

Also, Priya said she can bring printed copies of the practice exam if we confirm the time. That would really help since not everyone has a printer.

Let me know!
Omar`,
    questions: [
      {
        stem: "Why is Omar sending this message?",
        options: [
          "To cancel the study group permanently",
          "To reschedule a study session to a different day",
          "To remind the group about an upcoming exam",
          "To ask for help with his lab report"
        ],
        answer: 1
      },
      {
        stem: "What does Omar ask the group members to do by Wednesday night?",
        options: [
          "Submit their parts of the lab report",
          "Bring printed copies of the practice exam",
          "Confirm whether Saturday afternoon works for them",
          "Reserve Room 3B at the library themselves"
        ],
        answer: 2
      },
      {
        stem: "What can be inferred about Priya?",
        options: [
          "She is the one who scheduled the original Thursday session.",
          "She is unable to attend the Saturday session.",
          "She is willing to help the group by bringing printed materials.",
          "She has already booked Room 3B at the library."
        ],
        answer: 2
      }
    ]
  },

  // ── 9. Social Post ──────────────────────────────────────────────────────────
  {
    title: "Campus Farmers Market",
    textType: "Social Post",
    passage: `🌿 Greenfield University Farmers Market — Every Wednesday!

Fresh, local produce delivered right to campus. Our weekly farmers market runs every Wednesday from 11:00 a.m. to 3:00 p.m. on the South Lawn (near the Student Union).

This week's vendors include:
🥬 Sunrise Farms — seasonal vegetables
🍞 Hearth Bakery — fresh bread and pastries
🍯 Blue Ridge Honey — local honey and jams
☕ Cloud Nine Coffee — fair-trade cold brew

Students who show their university ID get 10% off at all participating vendors.

⚠️ This week only: Hearth Bakery will not be attending due to a prior commitment. They will return next Wednesday.

Follow us on campus social media for weekly vendor updates!`,
    questions: [
      {
        stem: "What is the main purpose of this post?",
        options: [
          "To announce the opening of a new campus restaurant",
          "To promote a weekly farmers market on campus",
          "To inform students about a discount program at local stores",
          "To recruit student volunteers for a campus event"
        ],
        answer: 1
      },
      {
        stem: "According to the post, which vendor will NOT be at the market this week?",
        options: [
          "Sunrise Farms",
          "Cloud Nine Coffee",
          "Hearth Bakery",
          "Blue Ridge Honey"
        ],
        answer: 2
      }
    ]
  },

  // ── 10. Notice ──────────────────────────────────────────────────────────────
  {
    title: "Parking Permit Renewal",
    textType: "Notice",
    passage: `CAMPUS PARKING SERVICES — ANNUAL PERMIT RENEWAL

All campus parking permits expire on August 31st. To avoid disruption to your parking privileges, please renew your permit before this date.

Renewal options:
• Online: Log in to the Parking Services portal at parking.campuslink.edu
• In person: Visit the Parking Services office (Admin Building, Room 104) during business hours: Monday–Friday, 8:00 a.m. – 5:00 p.m.

Important changes for the upcoming year:
• Permit prices have increased by 8% due to maintenance costs.
• Lot C (near the Science Building) will be reserved for faculty only starting September 1st. Students previously assigned to Lot C will be reassigned to Lot E.

Students who do not renew by August 31st will have their vehicles towed at the owner's expense.`,
    questions: [
      {
        stem: "What is the main purpose of this notice?",
        options: [
          "To announce the construction of a new parking lot",
          "To inform students about permit renewal and upcoming changes",
          "To remind students about parking rules during the school year",
          "To explain why parking prices have decreased this year"
        ],
        answer: 1
      },
      {
        stem: "According to the notice, what will happen to students previously assigned to Lot C?",
        options: [
          "They will be charged extra for a new permit.",
          "They will no longer be allowed to park on campus.",
          "They will be reassigned to Lot E.",
          "They must visit the Parking Services office to choose a new lot."
        ],
        answer: 2
      },
      {
        stem: "What can be inferred about students who do not renew their permits by August 31st?",
        options: [
          "They will be given a two-week grace period to renew.",
          "They may face significant costs if they park on campus.",
          "They will automatically be assigned a temporary permit.",
          "They can renew online but not in person after August 31st."
        ],
        answer: 1
      }
    ]
  },

  // ── 11. Notice ──────────────────────────────────────────────────────────────
  {
    title: "Laundry Room Closure",
    textType: "Notice",
    passage: `NOTICE TO ALL RESIDENTS

The laundry room on the ground floor of Blackwood Hall will be closed from Monday 4 March to Thursday 7 March while the machines are replaced.

During this period, residents may use the laundry facilities in Preston Hall, which is a five-minute walk away. Your building key card will grant access automatically; no separate registration is required.

The new machines will accept card payment only. The coin slots currently in use will be removed, so please spend any remaining laundry tokens before 4 March. Unused tokens cannot be refunded after that date.`,
    questions: [
      {
        stem: "What is the main purpose of this notice?",
        options: [
          "To announce an increase in laundry prices",
          "To inform residents of a temporary closure and the alternative arrangements",
          "To ask residents to report faulty washing machines",
          "To advertise a newly opened laundry facility"
        ],
        answer: 1
      },
      {
        stem: "What must residents do before 4 March?",
        options: [
          "Register for access to Preston Hall",
          "Return their building key card to reception",
          "Use up any laundry tokens they still hold",
          "Collect a refund for unused tokens"
        ],
        answer: 2
      },
      {
        stem: "What can be inferred about the new machines?",
        options: [
          "They will be slower than the current ones",
          "They will not accept cash payment",
          "They will be available only to Preston Hall residents",
          "They will require a separate registration"
        ],
        answer: 1
      }
    ]
  },

  // ── 12. Email ───────────────────────────────────────────────────────────────
  {
    title: "Internship Interview Invitation",
    textType: "Email",
    subject: "Interview invitation – Summer Research Internship",
    from: "Careers Office <careers@westfield.edu>",
    passage: `Dear Applicant,

Thank you for applying to the Summer Research Internship. We are pleased to invite you to an interview on Wednesday 12 April.

Interviews will be held in Room 214 of the Science Building and will last approximately thirty minutes. Please arrive fifteen minutes early to complete a short registration form.

Bring a printed copy of your transcript. You do not need to prepare a presentation, but you should be ready to discuss the research proposal you submitted with your application.

If this date is not possible, reply to this message by 5 April and we will try to arrange an alternative. We cannot guarantee that later requests can be accommodated.`,
    questions: [
      {
        stem: "What should applicants bring to the interview?",
        options: [
          "A printed copy of their transcript",
          "A short presentation about their research",
          "Two letters of reference",
          "A completed registration form"
        ],
        answer: 0
      },
      {
        stem: "Which of the following is NOT mentioned in the email?",
        options: [
          "The location of the interview",
          "How long the interview will last",
          "The name of the interviewer",
          "The deadline for requesting a different date"
        ],
        answer: 2
      }
    ]
  },

  // ── 13. Announcement ────────────────────────────────────────────────────────
  {
    title: "Campus Shuttle Timetable Change",
    textType: "Announcement",
    passage: `From Monday 15 January, the campus shuttle will run on a revised timetable.

Services between the main campus and the railway station will depart every twenty minutes rather than every fifteen. The first departure remains at 07:10 and the last at 23:30.

A new stop has been added outside the sports centre. Passengers travelling to the sports centre no longer need to change at the library stop.

Fares are unchanged. Students travelling with a valid card continue to ride free of charge; visitors pay two pounds per journey.`,
    questions: [
      {
        stem: "What is the main change described in this announcement?",
        options: [
          "The shuttle will stop running at weekends",
          "Services will run less frequently and a new stop has been added",
          "Fares will increase for all passengers",
          "The route to the railway station has been cancelled"
        ],
        answer: 1
      },
      {
        stem: "What is true of passengers going to the sports centre?",
        options: [
          "They must change at the library stop",
          "They now pay an additional fare",
          "They can travel there without changing",
          "They must book a seat in advance"
        ],
        answer: 2
      }
    ]
  },

  // ── 14. Message ─────────────────────────────────────────────────────────────
  {
    title: "Study Group Rescheduled",
    textType: "Message",
    passage: `Hey — quick change of plan for tomorrow.

The seminar room we booked has been taken for a staff meeting, so I have moved us to the group study area on the third floor of the library. Same time, half past two.

Bring your notes from week six if you have them. I still cannot make sense of the second case study and I am hoping someone else has.

Also, the café downstairs closes at four now, so grab a coffee on the way in if you want one.`,
    questions: [
      {
        stem: "Why has the meeting place changed?",
        options: [
          "The library is closing early",
          "The original room was needed for a staff meeting",
          "More people are joining the group",
          "The café downstairs is now closed"
        ],
        answer: 1
      },
      {
        stem: "What does the writer ask the others to bring?",
        options: [
          "Coffee for the group",
          "A copy of the second case study",
          "Their notes from week six",
          "The room booking confirmation"
        ],
        answer: 2
      }
    ]
  },

  // ── 15. Social Post ─────────────────────────────────────────────────────────
  {
    title: "Lost Keys Post",
    textType: "Social Post",
    passage: `Has anyone handed in a set of keys today? Three keys on a blue cord, one of them a small locker key.

I think I dropped them somewhere between the north entrance and the lecture theatre this morning, but I have already checked both and found nothing.

I have asked at the security desk and they said nothing has been brought in yet. If you find them, message me here rather than leaving them anywhere — I would rather collect them in person.

Thanks, and sorry for cluttering the feed.`,
    questions: [
      {
        stem: "What has the writer already done?",
        options: [
          "Requested a replacement locker key",
          "Asked at the security desk",
          "Reported the loss to the police",
          "Left a note at the north entrance"
        ],
        answer: 1
      },
      {
        stem: "What does the writer ask people to do if they find the keys?",
        options: [
          "Hand them in at the security desk",
          "Leave them at the lecture theatre",
          "Send a message rather than leaving them somewhere",
          "Post a photograph of them online"
        ],
        answer: 2
      }
    ]
  },

  // ── 16. Notice ──────────────────────────────────────────────────────────────
  {
    title: "Pharmacy Opening Hours",
    textType: "Notice",
    passage: `PHARMACY — REVISED OPENING HOURS

From 1 September the pharmacy will open at 8:30 on weekdays and close at 18:00. On Saturdays we will open from 9:00 until 13:00. We will no longer open on Sundays.

Repeat prescriptions ordered before 15:00 will normally be ready the same working day. Orders placed after that time will be ready the following morning.

If you need medicine urgently when we are closed, the hospital pharmacy on Grange Road is open at all times.`,
    questions: [
      {
        stem: "What change is announced in this notice?",
        options: [
          "The pharmacy will close permanently in September",
          "The pharmacy will no longer open on Sundays",
          "Repeat prescriptions will no longer be available",
          "The pharmacy is moving to Grange Road"
        ],
        answer: 1
      },
      {
        stem: "When will a prescription ordered at 16:00 be ready?",
        options: [
          "Within one hour",
          "The same working day",
          "The following morning",
          "After three working days"
        ],
        answer: 2
      },
      {
        stem: "What can be inferred about the hospital pharmacy?",
        options: [
          "It is cheaper than the campus pharmacy",
          "It can be used outside the campus pharmacy's hours",
          "It only serves hospital patients",
          "It requires an appointment"
        ],
        answer: 1
      }
    ]
  },

  // ── 17. Email ───────────────────────────────────────────────────────────────
  {
    title: "Room Inspection Notice",
    textType: "Email",
    subject: "Room inspections – week beginning 22 May",
    from: "Accommodation Office <housing@westfield.edu>",
    passage: `Dear Resident,

Routine room inspections will take place during the week beginning 22 May. Staff will visit each room between 10:00 and 16:00 and will knock before entering.

You do not need to be present. Please make sure that floors are clear, that windows can be opened, and that no cooking equipment is being stored in bedrooms.

Inspections usually take under five minutes. If a problem is found, you will receive a written note and a follow-up visit will be arranged for the following week.

Requests to change the day of your inspection cannot be accepted, as staff work through the building floor by floor.`,
    questions: [
      {
        stem: "What are residents asked to do before the inspection?",
        options: [
          "Remain in their rooms between 10:00 and 16:00",
          "Clear the floor and remove cooking equipment from bedrooms",
          "Confirm their preferred inspection day",
          "Report any damage in writing"
        ],
        answer: 1
      },
      {
        stem: "Why can residents not choose a different inspection day?",
        options: [
          "Because inspections are carried out floor by floor",
          "Because there are too few staff available",
          "Because the dates are set by the university council",
          "Because residents were asked to choose earlier in the year"
        ],
        answer: 0
      }
    ]
  },

  // ── 18. Announcement ────────────────────────────────────────────────────────
  {
    title: "Volunteer Fair",
    textType: "Announcement",
    passage: `The annual Volunteer Fair will be held in the Great Hall on Thursday 9 November from 11:00 to 15:00.

More than forty local organisations will attend, including animal shelters, community gardens, tutoring schemes and a hospital visiting service. Most are looking for volunteers who can give two or three hours a week.

No booking is needed and you may arrive at any point during the afternoon. Bring a pen; several organisations ask you to sign up on paper rather than online.

Free refreshments will be served until 14:00.`,
    questions: [
      {
        stem: "What are attendees advised to bring?",
        options: [
          "A printed copy of their timetable",
          "A pen for signing up on paper",
          "Proof of previous volunteering",
          "A booking confirmation"
        ],
        answer: 1
      },
      {
        stem: "Which of the following is NOT stated about the fair?",
        options: [
          "Booking in advance is unnecessary",
          "Refreshments are available for part of the event",
          "Most organisations want a few hours a week",
          "Attendance counts towards course credit"
        ],
        answer: 3
      }
    ]
  },

  // ── 19. Message ─────────────────────────────────────────────────────────────
  {
    title: "Borrowed Charger",
    textType: "Message",
    passage: `Sorry, I only just realised I still have your laptop charger in my bag from Friday.

I am on campus all day tomorrow, so I can leave it at the porters' lodge if that is easier than trying to meet. They keep things behind the desk and you just give your name.

If you need it before then, I finish work at six tonight and could drop it round on my way home. Let me know which suits you.`,
    questions: [
      {
        stem: "Why is the writer sending this message?",
        options: [
          "To ask to borrow a laptop charger",
          "To return something they took by mistake",
          "To arrange a meeting on campus tomorrow",
          "To report a lost item to the porters"
        ],
        answer: 1
      },
      {
        stem: "What does the writer offer to do if the charger is needed tonight?",
        options: [
          "Leave it at the porters' lodge",
          "Post it the following morning",
          "Bring it round after finishing work",
          "Meet at the writer's workplace"
        ],
        answer: 2
      }
    ]
  },

  // ── 20. Notice ──────────────────────────────────────────────────────────────
  {
    title: "Bicycle Storage Rules",
    textType: "Notice",
    passage: `BICYCLE STORAGE

Bicycles must be left in the covered racks beside the east car park. Bicycles chained to railings, stairways or lamp posts obstruct access and will be removed without notice.

Each resident may register one bicycle. Registration is free and is completed at the accommodation office; you will be given a numbered tag to attach to the frame.

Untagged bicycles left in the racks for more than fourteen days will be treated as abandoned and donated to a local repair charity.`,
    questions: [
      {
        stem: "What happens to bicycles chained to railings?",
        options: [
          "They are tagged by staff",
          "They are removed without warning",
          "Their owners are fined",
          "They are moved to the east car park"
        ],
        answer: 1
      },
      {
        stem: "What is required in order to keep a bicycle in the racks?",
        options: [
          "Payment of a small annual fee",
          "A numbered tag obtained by registering",
          "Permission from the east car park attendant",
          "A lock supplied by the accommodation office"
        ],
        answer: 1
      }
    ]
  },

  // ── 21. Email ───────────────────────────────────────────────────────────────
  {
    title: "Delivery Attempt Failed",
    textType: "Email",
    subject: "We missed you – parcel WX-4471",
    from: "Northgate Deliveries <noreply@northgate-delivery.com>",
    passage: `Hello,

Our driver attempted to deliver parcel WX-4471 today at 14:20 but was unable to gain access to the building.

The parcel has been returned to the Northgate depot on Mill Street. You may collect it in person between 08:00 and 19:00 on weekdays, bringing photographic identification and this reference number.

Alternatively, you can arrange a second delivery attempt through the link below. Second attempts are free; a third attempt is charged at £3.

Parcels not collected or redelivered within ten days are returned to the sender.`,
    questions: [
      {
        stem: "Why was the parcel not delivered?",
        options: [
          "Nobody was at home",
          "The driver could not get into the building",
          "The address was incorrect",
          "The parcel was damaged in transit"
        ],
        answer: 1
      },
      {
        stem: "What must a customer bring in order to collect the parcel?",
        options: [
          "Payment of a £3 fee",
          "A printed copy of the email only",
          "Photographic identification and the reference number",
          "A signed authorisation form"
        ],
        answer: 2
      },
      {
        stem: "What can be inferred about a third delivery attempt?",
        options: [
          "It is not offered",
          "It costs the customer money",
          "It must be arranged at the depot",
          "It is made within ten days automatically"
        ],
        answer: 1
      }
    ]
  },

  // ── 22. Social Post ─────────────────────────────────────────────────────────
  {
    title: "Flatmate Wanted",
    textType: "Social Post",
    passage: `We are looking for someone to take the spare room in our flat from the start of next term.

It is a ten-minute walk from the science campus, above a bakery, so it smells extremely good in the mornings and is a little noisy from about six. Rent is £430 a month including bills.

There are three of us already: two postgraduates and one very sleepy cat. We are quiet during the week but do cook together most Sundays.

Message me if you want to come and see it.`,
    questions: [
      {
        stem: "What does the writer suggest is a drawback of the flat?",
        options: [
          "The rent does not include bills",
          "It is far from the science campus",
          "There is noise early in the morning",
          "There is no kitchen to share"
        ],
        answer: 2
      },
      {
        stem: "What can be inferred about the current residents?",
        options: [
          "They rarely spend time together",
          "They are all undergraduates",
          "They eat together at weekends",
          "They are moving out at the end of term"
        ],
        answer: 2
      }
    ]
  },

  // ── 23. Notice ──────────────────────────────────────────────────────────────
  {
    title: "Swimming Pool Maintenance",
    textType: "Notice",
    passage: `The swimming pool will be drained for annual maintenance from 2 to 16 August.

The gym, squash courts and changing rooms remain open throughout. Members who use the pool exclusively may pause their membership for the fortnight by speaking to reception before 1 August; the two weeks will then be added to the end of the membership.

Swimming lessons booked for August will be rescheduled to September at no extra cost. Those unable to attend in September will be refunded in full.`,
    questions: [
      {
        stem: "What is the main purpose of this notice?",
        options: [
          "To announce a rise in membership fees",
          "To explain a temporary pool closure and the options available",
          "To advertise new swimming lessons in September",
          "To announce the opening of a second pool"
        ],
        answer: 1
      },
      {
        stem: "What must a member do to pause their membership?",
        options: [
          "Apply online during August",
          "Speak to reception before 1 August",
          "Cancel their swimming lessons first",
          "Request a full refund"
        ],
        answer: 1
      }
    ]
  },

  // ── 24. Announcement ────────────────────────────────────────────────────────
  {
    title: "Exam Hall Regulations",
    textType: "Announcement",
    passage: `Candidates sitting examinations in the Sports Hall should note the following.

Doors open thirty minutes before each paper. Candidates arriving more than thirty minutes after the start will not be admitted and must apply to sit the paper at the next opportunity.

Bags, coats and electronic devices must be left in the racks at the entrance. Water is permitted in a clear bottle with the label removed.

Candidates may not leave during the first hour or the final fifteen minutes of any paper.`,
    questions: [
      {
        stem: "What happens to a candidate who arrives forty minutes late?",
        options: [
          "They are admitted but given less time",
          "They are refused entry and must sit the paper later",
          "They must sit at the back of the hall",
          "They are given a written warning"
        ],
        answer: 1
      },
      {
        stem: "What are candidates allowed to take to their desk?",
        options: [
          "A mobile phone switched off",
          "A coat, if the hall is cold",
          "Water in a clear bottle without a label",
          "A bag containing stationery"
        ],
        answer: 2
      },
      {
        stem: "Which of the following is NOT stated in the announcement?",
        options: [
          "When the doors open",
          "Where bags must be left",
          "How long each paper lasts",
          "When candidates may not leave"
        ],
        answer: 2
      }
    ]
  },

  // ── 25. Email ───────────────────────────────────────────────────────────────
  {
    title: "Refund Request Reply",
    textType: "Email",
    subject: "Re: Refund for damaged headphones",
    from: "Riverside Electronics <support@riverside-electronics.co.uk>",
    passage: `Dear Customer,

Thank you for contacting us about the headphones that arrived damaged.

We are able to offer either a replacement or a full refund. If you would prefer a replacement, we can dispatch it today and it should arrive within two working days. A refund takes rather longer, usually five to seven working days once we receive the returned item.

Either way, please return the damaged headphones in their original packaging using the prepaid label attached to this email. There is no need to include the manual or cables.

Let us know which option you would prefer and we will arrange it immediately.`,
    questions: [
      {
        stem: "What does the company offer the customer?",
        options: [
          "A discount on a future purchase",
          "A replacement or a full refund",
          "A repair carried out free of charge",
          "A partial refund and a voucher"
        ],
        answer: 1
      },
      {
        stem: "What does the customer NOT need to return?",
        options: [
          "The headphones themselves",
          "The original packaging",
          "The manual and cables",
          "The prepaid label"
        ],
        answer: 2
      }
    ]
  },

  // ── 26. Message ─────────────────────────────────────────────────────────────
  {
    title: "Dentist Appointment Reminder",
    textType: "Message",
    passage: `Reminder: you have a dental check-up at Parkview Dental on Tuesday 14 May at 09:40.

Please arrive ten minutes early. If you have changed address or telephone number since your last visit, let reception know when you arrive.

To cancel or move the appointment, reply CHANGE to this message or call us during opening hours. Appointments cancelled with less than twenty-four hours' notice may be charged.`,
    questions: [
      {
        stem: "What is the patient asked to do on arrival?",
        options: [
          "Pay for the appointment in advance",
          "Report any change of address or telephone number",
          "Complete a medical history form",
          "Reply CHANGE to the message"
        ],
        answer: 1
      },
      {
        stem: "What can be inferred about cancelling on the same day?",
        options: [
          "It is not permitted",
          "It may result in a charge",
          "It requires a written letter",
          "It is free of charge"
        ],
        answer: 1
      }
    ]
  },

  // ── 27. Notice ──────────────────────────────────────────────────────────────
  {
    title: "Quiet Study Floor",
    textType: "Notice",
    passage: `THIRD FLOOR — SILENT STUDY

This floor is reserved for silent individual study. Conversation, group work and telephone calls are not permitted at any time.

Group study rooms are available on the first floor and may be booked for up to two hours through the library website. Discussion is welcome in the ground floor commons.

Headphones may be used provided that no sound is audible to others. Food is not allowed on this floor; drinks are permitted in containers with lids.

Staff will ask anyone disturbing others to move to another floor.`,
    questions: [
      {
        stem: "Where should students go if they want to work together?",
        options: [
          "The third floor, using headphones",
          "The first floor group study rooms",
          "The library entrance hall",
          "Anywhere, provided they speak quietly"
        ],
        answer: 1
      },
      {
        stem: "What is permitted on the third floor?",
        options: [
          "Drinks in containers with lids",
          "Short telephone calls",
          "Snacks that make no noise",
          "Quiet discussion between two people"
        ],
        answer: 0
      }
    ]
  },

  // ── 28. Social Post ─────────────────────────────────────────────────────────
  {
    title: "Free Furniture",
    textType: "Social Post",
    passage: `Moving out on Saturday and giving away a desk, a bookshelf and a floor lamp. All free, all in decent condition apart from a scratch on the desk that you will only notice if you look for it.

The catch is that you have to collect from the fourth floor and there is no lift in the building. The bookshelf comes apart, but the desk does not.

First to reply gets first choice. I would rather someone used them than see them go in a skip.`,
    questions: [
      {
        stem: "What difficulty does the writer mention?",
        options: [
          "The furniture is in poor condition",
          "The items must be carried down four floors",
          "Collection is only possible on Saturday morning",
          "The bookshelf cannot be taken apart"
        ],
        answer: 1
      },
      {
        stem: "What can be inferred about the writer's attitude?",
        options: [
          "They hope to sell the items quickly",
          "They would prefer the items to be reused rather than thrown away",
          "They are unwilling to help with collection",
          "They expect nobody to reply"
        ],
        answer: 1
      }
    ]
  },

  // ── 29. Announcement ────────────────────────────────────────────────────────
  {
    title: "Careers Talk Series",
    textType: "Announcement",
    passage: `The department is running a series of four careers talks this term, held on Wednesday afternoons at 16:00 in Lecture Room B.

The speakers are all former students of the department who now work in publishing, environmental consultancy, teaching and data analysis. Each talk lasts about forty minutes and is followed by questions.

Places are limited to sixty and must be reserved through the department office. Reservations open two weeks before each talk. Students who reserve a place and then cannot attend are asked to cancel so that the place can be offered to someone else.`,
    questions: [
      {
        stem: "Who will be giving the talks?",
        options: [
          "Members of the department's teaching staff",
          "Employers currently recruiting graduates",
          "Former students of the department",
          "Careers advisers from the university"
        ],
        answer: 2
      },
      {
        stem: "What are students who cannot attend asked to do?",
        options: [
          "Send someone else in their place",
          "Cancel their reservation",
          "Inform the speaker directly",
          "Reserve a place for a later talk"
        ],
        answer: 1
      }
    ]
  },

  // ── 30. Email ───────────────────────────────────────────────────────────────
  {
    title: "Bank Card Expiry",
    textType: "Email",
    subject: "Your new card is on its way",
    from: "Meridian Bank <noreply@meridianbank.com>",
    passage: `Dear Customer,

Your current debit card expires at the end of this month. A replacement has been posted to the address we hold for you and should arrive within five working days.

Your new card has the same account number but a different security code and expiry date. Any regular payments you have set up will continue as normal, but you will need to update the details for anything you pay for manually online.

Please destroy your old card once the new one is active. You can activate the new card at any cash machine or in the mobile app.`,
    questions: [
      {
        stem: "What does the customer need to update?",
        options: [
          "Their account number with the bank",
          "Card details saved for manual online payments",
          "The address held by the bank",
          "Their regular payment arrangements"
        ],
        answer: 1
      },
      {
        stem: "How can the new card be activated?",
        options: [
          "By visiting a branch in person",
          "By replying to this email",
          "At a cash machine or in the mobile app",
          "It activates automatically on arrival"
        ],
        answer: 2
      }
    ]
  }

];

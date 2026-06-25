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

const dailyLifePassages = [

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
  }

];

// Listen to an Announcement — the fourth listening task ETS lists, which the
// site did not have. One speaker addressing a group, in an academic or campus
// setting, so these can be voiced the same way as the academic talks.
//
// The questions follow what ETS says the task measures: the speaker's purpose,
// key information, implied meaning, and what listeners should do next. That
// last type — Next Action — appears nowhere else in the app.
import type { ListeningPassage } from './types.ts';

export const announcementPassages: ListeningPassage[] = [
  {
    id: 1,
    title: 'Library Closure for Refurbishment',
    subject: 'Campus Notice',
    audioFile: '/listening/announcement/audio/an-01.mp3',
    duration: '0:50',
    transcript: `Good morning, everyone. Before you settle in, a quick announcement about the main library.

From Monday the fourteenth, the second and third floors will close for refurbishment. The ground floor stays open as normal, and the twenty-four-hour study room is unaffected.

Now, this matters for anyone with books currently on loan from the upper floors. Those shelves are being emptied, so the usual renewal system will not work. If you need a title beyond the fourteenth, bring it to the ground-floor desk this week and staff will extend it manually. If you leave it until Monday, the book will have been moved into storage and it will take three working days to retrieve.

Work is scheduled to finish before the examination period. We will email everyone if that changes.`,
    questions: [
      {
        stem: 'What is the main purpose of this announcement?',
        options: [
          'To advertise a new twenty-four-hour study room',
          'To inform students that part of the library is closing temporarily',
          'To explain a change to library membership rules',
          'To announce that the examination period has moved',
        ],
        answer: 1,
        type: 'Purpose',
      },
      {
        stem: 'Which part of the library remains open?',
        options: ['The second floor', 'The third floor', 'The ground floor', 'None of it'],
        answer: 2,
        type: 'Detail',
      },
      {
        stem: 'What should a student with a borrowed book from the third floor do?',
        options: [
          'Return it before Monday the fourteenth',
          'Renew it online as usual',
          'Take it to the ground-floor desk this week to be extended manually',
          'Wait three working days and then renew it',
        ],
        answer: 2,
        type: 'Next Action',
      },
      {
        stem: 'What does the speaker imply about waiting until Monday?',
        options: [
          'The book will be unavailable for several days',
          'A late fee will be charged',
          'The loan will be cancelled entirely',
          'Staff will no longer be able to help',
        ],
        answer: 0,
        type: 'Inference',
      },
      {
        stem: 'Which of the following is NOT mentioned in the announcement?',
        options: [
          'The refurbishment should finish before exams',
          'Students will be emailed if the schedule changes',
          'The library will open earlier during the works',
          'The twenty-four-hour study room is unaffected',
        ],
        answer: 2,
        type: 'Negative Fact',
      },
    ],
  },
  {
    id: 2,
    title: 'Change of Room for the Statistics Seminar',
    subject: 'Class Announcement',
    audioFile: '/listening/announcement/audio/an-02.mp3',
    duration: '0:45',
    transcript: `Right, everyone, listen up for a moment before we start.

Thursday's statistics seminar is moving. We have outgrown this room — there were people standing at the back last week — so from this Thursday we are in the Fielding Building, lecture theatre two. Same time, half past nine.

Two things follow from that. First, the Fielding Building is on the far side of campus, so give yourself ten minutes to walk over. Second, lecture theatre two has power at every seat, which this room does not, so if you have been sharing sockets or working off a dying battery, that problem goes away.

The room change is already on the online timetable. It is not on the printed handbook, which was produced in August, so trust the website rather than the booklet.`,
    questions: [
      {
        stem: 'Why is the seminar being moved?',
        options: [
          'The current room is being refurbished',
          'The class has grown too large for the current room',
          'The lecturer has changed',
          'The seminar time has changed',
        ],
        answer: 1,
        type: 'Purpose',
      },
      {
        stem: 'What time does the seminar start?',
        options: ['Nine o’clock', 'Half past nine', 'Ten o’clock', 'Half past ten'],
        answer: 1,
        type: 'Detail',
      },
      {
        stem: 'What advantage of the new room does the speaker mention?',
        options: [
          'It is closer to the library',
          'It has power at every seat',
          'It holds twice as many students',
          'It has better lighting',
        ],
        answer: 1,
        type: 'Detail',
      },
      {
        stem: 'Which source should students trust for the room number?',
        options: [
          'The printed handbook',
          'The online timetable',
          'The noticeboard outside the current room',
          'An email from the department',
        ],
        answer: 1,
        type: 'Next Action',
      },
      {
        stem: 'What does the speaker imply about the printed handbook?',
        options: [
          'It was never distributed to students',
          'It is out of date because it was produced before the change',
          'It contains errors in several sections',
          'It will be reprinted before Thursday',
        ],
        answer: 1,
        type: 'Inference',
      },
    ],
  },
  {
    id: 3,
    title: 'Campus Shuttle Service Update',
    subject: 'Campus Notice',
    audioFile: '/listening/announcement/audio/an-03.mp3',
    duration: '0:50',
    transcript: `Attention passengers waiting for the campus shuttle. Please listen carefully, as the timetable has changed this week.

Because of resurfacing work on Chapel Road, the shuttle can no longer stop outside the science building. Instead it will use the temporary stop beside the sports centre, about two minutes' walk further north. Look for the yellow sign.

Services are running every fifteen minutes rather than every ten, so allow extra time if you are heading to a nine o'clock class. The last shuttle of the evening leaves at eleven, as usual.

If you have a reduced-mobility pass, please do not wait at the temporary stop. Call the number on the back of your pass and a driver will collect you from the science building entrance directly.

Normal service resumes the week after next.`,
    questions: [
      {
        stem: 'What is the announcement mainly about?',
        options: [
          'A permanent change to shuttle routes',
          'Temporary changes to the shuttle caused by roadworks',
          'An increase in shuttle fares',
          'The closure of the sports centre',
        ],
        answer: 1,
        type: 'Purpose',
      },
      {
        stem: 'Where is the temporary stop?',
        options: [
          'Outside the science building',
          'On Chapel Road',
          'Beside the sports centre',
          'At the main campus entrance',
        ],
        answer: 2,
        type: 'Detail',
      },
      {
        stem: 'How often are shuttles running this week?',
        options: ['Every five minutes', 'Every ten minutes', 'Every fifteen minutes', 'Every twenty minutes'],
        answer: 2,
        type: 'Detail',
      },
      {
        stem: 'What should a passenger with a reduced-mobility pass do?',
        options: [
          'Wait at the temporary stop by the sports centre',
          'Call the number on the pass to be collected from the science building',
          'Board at the main campus entrance instead',
          'Travel only after nine o’clock',
        ],
        answer: 1,
        type: 'Next Action',
      },
      {
        stem: 'What does the speaker suggest about students with early classes?',
        options: [
          'They should leave earlier than usual',
          'They should use a different service',
          'Their classes have been rescheduled',
          'They will be given priority boarding',
        ],
        answer: 0,
        type: 'Inference',
      },
    ],
  },
  {
    id: 4,
    title: 'Deadline Extension for Research Proposals',
    subject: 'Department Announcement',
    audioFile: '/listening/announcement/audio/an-04.mp3',
    duration: '0:50',
    transcript: `A short announcement from the department before you go.

The deadline for research proposals has moved from the first of March to the fifteenth. This is because the submission portal was unavailable for most of last weekend, and a number of you could not upload your drafts.

I want to be clear about what has and has not changed. The deadline is later. The word limit, the reference format and the requirement for a supervisor's signature are all exactly as they were. Please do not read an extension as a relaxation of anything else.

One more thing, and this is the part people get wrong every year. Your supervisor needs time to read a draft before signing it. If you send it to them on the fourteenth, you will not get a signature, and an unsigned proposal is not accepted. Aim to have a draft with them by the eighth.`,
    questions: [
      {
        stem: 'Why has the deadline been changed?',
        options: [
          'Too few proposals were submitted',
          'The submission portal was unavailable last weekend',
          'Supervisors requested more time',
          'The department calendar was printed incorrectly',
        ],
        answer: 1,
        type: 'Purpose',
      },
      {
        stem: 'What is the new deadline?',
        options: ['The first of March', 'The eighth of March', 'The fourteenth of March', 'The fifteenth of March'],
        answer: 3,
        type: 'Detail',
      },
      {
        stem: 'Which requirement has NOT changed?',
        options: [
          'The word limit',
          'The reference format',
          'The need for a supervisor’s signature',
          'All of these are unchanged',
        ],
        answer: 3,
        type: 'Negative Fact',
      },
      {
        stem: 'By when does the speaker advise sending a draft to a supervisor?',
        options: ['The first', 'The eighth', 'The fourteenth', 'The fifteenth'],
        answer: 1,
        type: 'Next Action',
      },
      {
        stem: 'What does the speaker imply about students who submit late drafts to supervisors?',
        options: [
          'Their proposals will be marked down',
          'They risk submitting without the signature that makes a proposal valid',
          'They will be given a further extension',
          'They must find a different supervisor',
        ],
        answer: 1,
        type: 'Inference',
      },
    ],
  },
];

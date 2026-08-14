import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import { Home } from './pages/Home.tsx';
import { Sections } from './pages/Sections.tsx';
import { Learn } from './pages/Learn.tsx';
import { SectionPage } from './pages/SectionPage.tsx';
import { sectionBySlug, type Section } from './data/sections.ts';
import { ListeningExam } from './exercises/listening/ListeningExam.tsx';
import { ChooseAResponse } from './exercises/listening/ChooseAResponse.tsx';
import { QuickTest } from './exercises/quick/QuickTest.tsx';
import { conversationPassages } from './data/listening/conversation.ts';
import { academicTalkPassages } from './data/listening/academicTalk.ts';
import { announcementPassages } from './data/listening/announcement.ts';
import { PassageExam } from './exercises/reading/PassageExam.tsx';
import { CompleteTheWords } from './exercises/reading/CompleteTheWords.tsx';
import { dailyLifePassages } from './data/reading/dailyLife.ts';
import { academicPassages } from './data/reading/academicPassage.ts';
import { BuildASentence } from './exercises/writing/BuildASentence.tsx';
import { WriteAnEmail } from './exercises/writing/WriteAnEmail.tsx';
import { AcademicDiscussion } from './exercises/writing/AcademicDiscussion.tsx';
import { VideoLab } from './vidconf/VideoLab.tsx';
import { VIDEO_LAB_PATH } from './vidconf/config.ts';

function SectionRoute() {
  const { slug } = useParams<{ slug: string }>();
  const section = slug ? sectionBySlug[slug as Section['slug']] : undefined;
  if (!section) return <Navigate to="/sections" replace />;
  return <SectionPage section={section} />;
}

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sections" element={<Sections />} />
      <Route path="/sections/:slug" element={<SectionRoute />} />
      <Route path="/learn" element={<Learn />} />
      <Route path="/quick-test" element={<QuickTest />} />

      {/* Ported exercises. Their public/ directories are gone, so these paths
          are free and the original URLs keep working. */}
      <Route path="/listening/choose-a-response" element={<ChooseAResponse />} />
      <Route
        path="/listening/conversation"
        element={
          <ListeningExam
            data={conversationPassages}
            titleKey="conversation"
            backTo="/sections/listening"
            backLabelKey="back_listening"
          />
        }
      />
      <Route
        path="/listening/announcement"
        element={
          <ListeningExam
            data={announcementPassages}
            titleKey="announcement"
            backTo="/sections/listening"
            backLabelKey="back_listening"
          />
        }
      />
      <Route
        path="/listening/academic-talk"
        element={
          <ListeningExam
            data={academicTalkPassages}
            titleKey="academic_talk"
            backTo="/sections/listening"
            backLabelKey="back_listening"
          />
        }
      />

      <Route path="/reading/complete-the-words" element={<CompleteTheWords />} />
      <Route
        path="/reading/daily-life"
        element={
          <PassageExam
            data={dailyLifePassages}
            examSize={8}
            titleKey="read_in_daily_life"
            backTo="/sections/reading"
            backLabelKey="back_reading"
            variant="daily-life"
          />
        }
      />
      <Route
        path="/reading/academic-passage"
        element={
          <PassageExam
            data={academicPassages}
            examSize={5}
            titleKey="read_academic_passage"
            backTo="/sections/reading"
            backLabelKey="back_reading"
            variant="academic"
          />
        }
      />

      <Route path="/writing/build-a-sentence" element={<BuildASentence />} />
      <Route path="/writing/write-an-email" element={<WriteAnEmail />} />
      <Route path="/writing/academic-discussion" element={<AcademicDiscussion />} />

      {/* Unlisted: nothing on the site links here, and every other unknown
          path falls through to the redirect below. The path is still readable
          in the JS bundle, so treat it as unlisted rather than private. */}
      <Route path={VIDEO_LAB_PATH} element={<VideoLab />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

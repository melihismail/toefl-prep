import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import { Home } from './pages/Home.tsx';
import { Sections } from './pages/Sections.tsx';
import { SectionPage } from './pages/SectionPage.tsx';
import { sectionBySlug, type Section } from './data/sections.ts';
import { ListeningExam } from './exercises/listening/ListeningExam.tsx';
import { conversationPassages } from './data/listening/conversation.ts';
import { academicTalkPassages } from './data/listening/academicTalk.ts';

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

      {/* Ported exercises. Their public/ directories are gone, so these paths
          are free and the original URLs keep working. */}
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

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

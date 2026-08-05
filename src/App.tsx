import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import { Home } from './pages/Home.tsx';
import { Sections } from './pages/Sections.tsx';
import { SectionPage } from './pages/SectionPage.tsx';
import { sectionBySlug, type Section } from './data/sections.ts';

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
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

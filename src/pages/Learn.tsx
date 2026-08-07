import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import HowItWorks, { type Step } from '../components/HowItWorks.tsx';
import { useLanguage } from '../i18n/useLanguage.ts';
import { learnSections, type LearnSection } from '../data/learn.ts';
import './Learn.css';

/** Card palette per section, as Tailwind classes the component expects. */
const CARD_COLOURS: Record<LearnSection['slug'], { bg: string; text: string; border: string }> = {
  listening: { bg: 'bg-[#ecfdf5]', text: 'text-[#059669]', border: 'border-[#a7f3d0]' },
  reading: { bg: 'bg-[#eef2ff]', text: 'text-[#4f46e5]', border: 'border-[#c7d2fe]' },
  writing: { bg: 'bg-[#fffbeb]', text: 'text-[#b45309]', border: 'border-[#fde68a]' },
  speaking: { bg: 'bg-[#faf5ff]', text: 'text-[#9333ea]', border: 'border-[#e9d5ff]' },
};

/**
 * Tighter than the component's 900px default for four steps, so the whole
 * walkthrough fits a laptop screen without scrolling. Cards are ~290px tall,
 * and same-side neighbours (1&3, 2&4) are kept 300px apart so they never
 * overlap.
 */
const TRACK_HEIGHT = 740;
const STEP_POSITIONS = [
  { className: 'md:absolute md:top-0 md:left-[15%]', rotate: 'rotate-8' },
  { className: 'md:absolute md:top-[110px] md:right-[15%]', rotate: '-rotate-8' },
  { className: 'md:absolute md:top-[330px] md:left-[15%]', rotate: 'rotate-8' },
  { className: 'md:absolute md:top-[440px] md:right-[10%]', rotate: '-rotate-8' },
];
/** Curves through the card centres implied by STEP_POSITIONS. */
const CONNECTOR =
  'M 290 138 C 500 138, 550 248, 710 248' +
  ' C 850 248, 500 330, 290 468' +
  ' C 290 528, 550 578, 760 578';

export function Learn() {
  const { lang } = useLanguage();
  const [open, setOpen] = useState<LearnSection | null>(null);

  const steps: Step[] = learnSections.map((section) => ({
    title: section.name[lang],
    description: section.desc[lang],
    colors: CARD_COLOURS[section.slug],
    actionLabel: `${section.tasks.length} ${lang === 'tr' ? 'görev' : 'tasks'} · ${section.time}`,
    onClick: () => setOpen(section),
  }));

  return (
    <div className="learn-page">
      {/* One compact row: the cards explain the rest. */}
      <div className="learn-bar">
        <Link to="/" className="learn-back" aria-label={lang === 'tr' ? 'Ana Sayfa' : 'Home'}>
          ←
        </Link>
        <h1 className="learn-title">TOEFL 2026</h1>
        <Link to="/sections" className="learn-cta">
          {lang === 'tr' ? 'Alıştırma' : 'Practise'} →
        </Link>
      </div>

      <HowItWorks
        features={steps}
        stepPositions={STEP_POSITIONS}
        height={TRACK_HEIGHT}
        pathD={CONNECTOR}
        className="learn-works"
      />

      {open && <SectionPanel section={open} lang={lang} onClose={() => setOpen(null)} />}
    </div>
  );
}

function SectionPanel({
  section,
  lang,
  onClose,
}: {
  section: LearnSection;
  lang: 'en' | 'tr';
  onClose: () => void;
}) {
  const [expanded, setExpanded] = useState<string | null>(section.tasks[0]?.id ?? null);

  return (
    <div className="learn-overlay" role="dialog" aria-modal="true" aria-label={section.name[lang]}>
      <button className="learn-overlay-scrim" onClick={onClose} aria-label={lang === 'tr' ? 'Kapat' : 'Close'} />
      <motion.div
        className="learn-panel"
        style={{ '--sec': section.color, '--sec-dark': section.colorDark } as React.CSSProperties}
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 30 }}
      >
        <button className="learn-panel-back" onClick={onClose}>
          ← {lang === 'tr' ? 'Geri' : 'Back'}
        </button>

        <div className="learn-panel-tag">{lang === 'tr' ? 'Bölüm' : 'Section'}</div>
        <h3 className="learn-panel-title">{section.name[lang]}</h3>
        <div className="learn-panel-meta">
          {section.time} · {section.tasks.length} {lang === 'tr' ? 'görev' : 'tasks'}
        </div>
        <p className="learn-panel-desc">{section.desc[lang]}</p>

        {section.tasks.map((task) => {
          const isOpen = expanded === task.id;
          return (
            <div className={`learn-acc${isOpen ? ' is-open' : ''}`} key={task.id}>
              <button className="learn-acc-head" onClick={() => setExpanded(isOpen ? null : task.id)}>
                <span className="learn-acc-name">{task.name[lang]}</span>
                <span className="learn-acc-meta">
                  {task.count[lang]} · {task.time}
                </span>
                <span className="learn-acc-chev" aria-hidden="true">
                  {isOpen ? '−' : '+'}
                </span>
              </button>

              {isOpen && (
                <div className="learn-acc-body">
                  <p className="learn-acc-desc">{task.desc[lang]}</p>

                  <div className="learn-block">
                    <div className="learn-block-label">{lang === 'tr' ? 'İpuçları' : 'Tips'}</div>
                    <p>{task.tips[lang]}</p>
                  </div>

                  <div className="learn-block">
                    <div className="learn-block-label">{lang === 'tr' ? 'Puanlama' : 'Scoring'}</div>
                    <p>{task.scoring[lang]}</p>
                  </div>

                  {task.practiceHref.endsWith('.html') ? (
                    <a className="learn-panel-cta" href={task.practiceHref}>
                      {lang === 'tr' ? 'Bu görevi dene' : 'Try this task'} →
                    </a>
                  ) : (
                    <Link className="learn-panel-cta" to={task.practiceHref}>
                      {lang === 'tr' ? 'Bu görevi dene' : 'Try this task'} →
                    </Link>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

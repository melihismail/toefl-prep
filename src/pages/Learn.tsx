import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useSpring, useMotionValueEvent } from 'motion/react';
import { useLanguage } from '../i18n/useLanguage.ts';
import { learnSections, type LearnSection, type LearnTask } from '../data/learn.ts';
import './Learn.css';

/**
 * "How it works" walkthrough: the four exam sections as pinned, connected
 * cards. Each card sticks while its own scroll range plays out, so the reader
 * moves through the exam in order rather than scanning a grid.
 */
export function Learn() {
  const { lang } = useLanguage();
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [openTask, setOpenTask] = useState<{ section: LearnSection; task: LearnTask } | null>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });
  const spineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  // Which step is in play. Derived as state rather than a per-card scroll
  // transform: the transforms became keyframe animations whose values did not
  // hold once scroll moved past a card's range.
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = Math.min(learnSections.length - 1, Math.max(0, Math.floor(v * learnSections.length)));
    setActive((cur) => (cur === next ? cur : next));
  });

  return (
    <div className="learn-page">
      <div className="mx-auto w-full max-w-3xl px-4 pt-8">
        <Link to="/" className="learn-back">
          ← {lang === 'tr' ? 'Ana Sayfa' : 'Home'}
        </Link>

        <header className="mb-10">
          <div className="learn-eyebrow">{lang === 'tr' ? 'Sınavı Öğren' : 'Learn the exam'}</div>
          <h1 className="learn-title">TOEFL 2026</h1>
          <p className="learn-lede">
            {lang === 'tr'
              ? 'Sınav dört bölümden oluşur. Sırayla ilerleyin — her bölümün görevlerini, süresini ve puanlamasını görün.'
              : 'The exam has four sections. Scroll through them in order to see each task, its timing and how it is scored.'}
          </p>
        </header>
      </div>

      {/* One tall track; each card pins inside its own slice of it. */}
      <div ref={trackRef} className="learn-track">
        <div className="learn-spine" aria-hidden="true">
          <motion.div className="learn-spine-fill" style={{ scaleY: spineScale }} />
        </div>

        {learnSections.map((section, i) => (
          <StepCard
            key={section.slug}
            section={section}
            index={i}
            total={learnSections.length}
            isActive={i === active}
            lang={lang}
            onOpenTask={(task) => setOpenTask({ section, task })}
          />
        ))}
      </div>

      <div className="mx-auto w-full max-w-3xl px-4 pb-16">
        <Link to="/sections" className="learn-cta">
          {lang === 'tr' ? 'Alıştırmaya başla' : 'Start practising'} →
        </Link>
      </div>

      {openTask && (
        <TaskPanel
          section={openTask.section}
          task={openTask.task}
          lang={lang}
          onClose={() => setOpenTask(null)}
        />
      )}
    </div>
  );
}

function StepCard({
  section,
  index,
  total,
  isActive,
  lang,
  onOpenTask,
}: {
  section: LearnSection;
  index: number;
  total: number;
  isActive: boolean;
  lang: 'en' | 'tr';
  onOpenTask: (task: LearnTask) => void;
}) {
  return (
    <section
      className="learn-step"
      style={{ '--sec': section.color, '--sec-dark': section.colorDark } as React.CSSProperties}
    >
      <article className={`learn-card${isActive ? ' is-active' : ''}`}>
        <div className="learn-card-head">
          <span className="learn-step-num">
            {index + 1}
            <span className="learn-step-of">/{total}</span>
          </span>
          <span className="learn-card-icon">
            <i className={`ti ${section.icon}`} aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="learn-card-title">{section.name[lang]}</h2>
            <div className="learn-card-meta">
              {section.time} · {section.tasks.length} {lang === 'tr' ? 'görev' : 'tasks'}
            </div>
          </div>
        </div>

        <p className="learn-card-desc">{section.desc[lang]}</p>

        <ul className="learn-tasks">
          {section.tasks.map((task) => (
            <li key={task.id}>
              <button className="learn-task" onClick={() => onOpenTask(task)}>
                <span className="learn-task-name">{task.name[lang]}</span>
                <span className="learn-task-meta">
                  {task.count[lang]} · {task.time}
                </span>
                <span className="learn-task-go" aria-hidden="true">
                  →
                </span>
              </button>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}

function TaskPanel({
  section,
  task,
  lang,
  onClose,
}: {
  section: LearnSection;
  task: LearnTask;
  lang: 'en' | 'tr';
  onClose: () => void;
}) {
  return (
    <div className="learn-overlay" role="dialog" aria-modal="true" aria-label={task.name[lang]}>
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

        <div className="learn-panel-tag">{section.name[lang]}</div>
        <h3 className="learn-panel-title">{task.name[lang]}</h3>
        <div className="learn-panel-meta">
          {task.count[lang]} · {task.time}
        </div>
        <p className="learn-panel-desc">{task.desc[lang]}</p>

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
      </motion.div>
    </div>
  );
}

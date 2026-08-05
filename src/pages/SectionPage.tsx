import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/useLanguage.ts';
import { LanguageToggle } from '../components/LanguageToggle.tsx';
import type { Section } from '../data/sections.ts';

export function SectionPage({ section }: { section: Section }) {
  const { t } = useLanguage();

  return (
    <div className={`section-${section.slug}`}>
      <LanguageToggle />

      <div className="hero hero-filled">
        <div className="app-wide">
          <Link to="/sections" className="back-btn">
            {t('back_home')}
          </Link>
          <div className="hero-top">
            <div className="hero-icon">
              <i className={`ti ${section.icon}`} aria-hidden="true" />
            </div>
            <h1>{t(section.headingKey)}</h1>
          </div>
          <div className="hero-pills">
            <span className="hero-pill">
              <i className="ti ti-list-check" aria-hidden="true" />
              {section.tasks.length} {t('task_types')}
            </span>
            <span className="hero-pill solid">
              <i className="ti ti-clock" aria-hidden="true" />~{section.totalMinutes} {t('unit_min')}
            </span>
          </div>
        </div>
        <i className={`ti ${section.icon} hero-watermark`} aria-hidden="true" />
      </div>

      <div className="app-wide">
        <div className="task-flow">
          {section.tasks.map((task, i) => (
            <div className="task-row" key={task.href}>
              <div className="task-rail" aria-hidden="true">
                <span className="line line-top" />
                <span className="task-step">{i + 1}</span>
                <span className="line line-bot" />
              </div>
              {/* Legacy exercise pages, so a plain anchor rather than a router Link. */}
              <a className="task-card" href={task.href}>
                <div className="task-icon">
                  <i className={`ti ${task.icon}`} aria-hidden="true" />
                </div>
                <div className="task-info">
                  <div className="task-name">
                    <span>{t(task.titleKey)}</span>
                    {task.badgeKey && (
                      <span className="task-badge">
                        <i className="ti ti-sparkles" aria-hidden="true" />
                        {t(task.badgeKey)}
                      </span>
                    )}
                  </div>
                  <div className="task-count">{t(task.countKey)}</div>
                </div>
                <div className="task-time">
                  <span className="num">{task.minutes}</span>
                  <span className="unit">{t('unit_min')}</span>
                </div>
              </a>
            </div>
          ))}
        </div>

        {section.noteKey && (
          <div className="info-strip" style={{ marginTop: '1.25rem' }}>
            <i className={`ti ${section.noteIcon}`} aria-hidden="true" />
            <span>{t(section.noteKey)}</span>
          </div>
        )}
      </div>
    </div>
  );
}

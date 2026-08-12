import { lazy, Suspense, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/useLanguage.ts';
import './Home.css';

// three is far larger than the rest of the app put together, and only this page
// uses it, so it is fetched after the landing page has already rendered.
const ColorBends = lazy(() => import('../components/ColorBends.tsx'));

/** The violet-to-indigo the rest of the site is built from, lightest first. */
const BEND_COLORS = ['#ede9fe', '#c4b5fd', '#7c3aed', '#4f46e5'];

export function Home() {
  const { lang, setLang, t } = useLanguage();
  const [animate, setAnimate] = useState(false);

  // A WebGL canvas is not worth blocking first paint for, and anyone who has
  // asked for less motion should not get an animated background at all.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // A timer rather than requestAnimationFrame: the point is to let the page
    // paint first, and rAF does not run at all in a tab that is not compositing.
    const id = setTimeout(() => setAnimate(true), 0);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="landing">
      {animate && (
        <Suspense fallback={null}>
          <div className="landing-bg" aria-hidden="true">
            <ColorBends
              colors={BEND_COLORS}
              rotation={110}
              speed={0.14}
              scale={1.25}
              bandWidth={9}
              intensity={0.75}
              noise={0.08}
              parallax={0.35}
              mouseInfluence={0.5}
            />
          </div>
        </Suspense>
      )}

      <nav className="landing-nav">
        <div className="landing-logo">
          <div className="landing-logo-icon" />
          Birlikte İngilizce — TOEFL Prep
        </div>
        <div className="lang-switch">
          <button className={lang === 'tr' ? 'active' : ''} onClick={() => setLang('tr')}>
            TR
          </button>
          <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>
            EN
          </button>
        </div>
      </nav>

      <div className="landing-content">
        <div className="landing-title">{t('landing_title_1')}</div>
        <div className="landing-title landing-title-accent">{t('landing_title_2')}</div>
        <div className="landing-status">
          <div className="landing-status-dot" />
          <span>{t('landing_status')}</span>
        </div>
      </div>

      <div className="landing-cards">
        <Link className="landing-card" to="/learn">
          <div className="landing-card-icon">
            <i className="ti ti-book" aria-hidden="true" />
          </div>
          <div className="landing-card-title">{t('learn_the_exam')}</div>
          <div className="landing-card-arrow">›</div>
        </Link>

        <Link className="landing-card" to="/sections">
          <div className="landing-card-icon">
            <i className="ti ti-pencil" aria-hidden="true" />
          </div>
          <div className="landing-card-title">{t('exam_samples')}</div>
          <div className="landing-card-arrow">›</div>
        </Link>
      </div>
    </div>
  );
}

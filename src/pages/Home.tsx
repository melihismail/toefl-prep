import { lazy, Suspense, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../i18n/useLanguage.ts';
import './Home.css';

// Both of these pull a WebGL library, and only this page uses either, so they
// are fetched after the landing page has already rendered.
const ColorBends = lazy(() => import('../components/ColorBends.tsx'));
const SpecularButton = lazy(() => import('../components/SpecularButton.tsx'));

/** The violet-to-indigo the rest of the site is built from, lightest first. */
const BEND_COLORS = ['#ede9fe', '#c4b5fd', '#7c3aed', '#4f46e5'];

/**
 * The call to action while its shader is still loading, and for anyone who has
 * asked for less motion. Same box and colour, so nothing shifts when the real
 * one arrives — only the travelling sheen is missing.
 */
function PlainCta({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button className="landing-cta-plain" onClick={onClick}>
      <span className="landing-cta-inner">
        <i className="ti ti-pencil" aria-hidden="true" />
        {label}
      </span>
    </button>
  );
}

export function Home() {
  const { lang, setLang, t } = useLanguage();
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);
  const goToSections = () => navigate('/sections');

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
        {/* Practising is what people come here to do, so it leads and is the
            only filled control on the page. */}
        {!animate ? (
          <PlainCta onClick={goToSections} label={t('exam_samples')} />
        ) : (
        <Suspense fallback={<PlainCta onClick={goToSections} label={t('exam_samples')} />}>
          <SpecularButton
            fullWidth
            size="lg"
            radius={16}
            tint="#4f46e5"
            tintOpacity={1}
            textColor="#ffffff"
            lineColor="#ddd6fe"
            baseColor="#3730a3"
            shadow="inset 0 1px 0 rgba(255,255,255,.16), 0 10px 26px rgba(79,70,229,.28)"
            intensity={1}
            shineSize={10}
            shineFade={40}
            thickness={1}
            speed={1}
            followMouse={false}
            proximity={250}
            autoAnimate
            onClick={goToSections}
          >
            <span className="landing-cta-inner">
              <i className="ti ti-pencil" aria-hidden="true" />
              {t('exam_samples')}
            </span>
          </SpecularButton>
        </Suspense>
        )}

        <Link className="landing-card" to="/learn">
          <div className="landing-card-icon">
            <i className="ti ti-book" aria-hidden="true" />
          </div>
          <div className="landing-card-title">{t('learn_the_exam')}</div>
          <div className="landing-card-arrow">›</div>
        </Link>
      </div>
    </div>
  );
}

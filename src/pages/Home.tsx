import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/useLanguage.ts';
import './Home.css';

export function Home() {
  const { lang, setLang, t } = useLanguage();

  return (
    <div className="landing">
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

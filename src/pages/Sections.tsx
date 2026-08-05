import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/useLanguage.ts';
import { sections } from '../data/sections.ts';
import './Sections.css';

export function Sections() {
  const { t } = useLanguage();

  return (
    <div className="app-wide sections-page">
      <Link to="/" className="sec-back">
        {t('back_home')}
      </Link>

      <div className="sections-header">
        <h1>{t('practice_by_section')}</h1>
      </div>

      <div className="sec-grid">
        {sections.map((section) => (
          <Link
            key={section.slug}
            className="sec-card"
            to={`/sections/${section.slug}`}
            style={
              {
                '--sec': section.color,
                '--sec-dark': section.colorDark,
              } as React.CSSProperties
            }
          >
            <i className={`ti ${section.icon} sec-watermark`} aria-hidden="true" />
            <div className="title">{t(section.titleKey)}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

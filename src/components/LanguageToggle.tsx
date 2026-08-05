import { useLanguage } from '../i18n/useLanguage.ts';

/** Replaces the button the legacy lang/i18n.js injected into every page. */
export function LanguageToggle() {
  const { lang, setLang } = useLanguage();
  const next = lang === 'tr' ? 'en' : 'tr';
  return (
    <button className="lang-toggle" onClick={() => setLang(next)} aria-label={`Switch to ${next.toUpperCase()}`}>
      {next.toUpperCase()}
    </button>
  );
}

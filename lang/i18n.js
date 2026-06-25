(function(){
  const STORAGE_KEY = 'toefl_lang';

  function detectLang(){
    const saved = localStorage.getItem(STORAGE_KEY);
    if(saved) return saved;
    const nav = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
    return nav.startsWith('tr') ? 'tr' : 'en';
  }

  function setLang(lang){
    localStorage.setItem(STORAGE_KEY, lang);
    applyTranslations(lang);
    updateToggle(lang);
    document.documentElement.lang = lang;
  }

  function t(key, lang){
    return (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || (TRANSLATIONS.en && TRANSLATIONS.en[key]) || key;
  }

  function applyTranslations(lang){
    document.querySelectorAll('[data-i18n]').forEach(function(el){
      var key = el.getAttribute('data-i18n');
      var attr = el.getAttribute('data-i18n-attr');
      if(attr){
        el.setAttribute(attr, t(key, lang));
      } else {
        el.textContent = t(key, lang);
      }
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function(el){
      var key = el.getAttribute('data-i18n-html');
      el.innerHTML = t(key, lang);
    });
  }

  function updateToggle(lang){
    var btn = document.getElementById('lang-toggle');
    if(btn){
      btn.textContent = lang === 'tr' ? 'EN' : 'TR';
      btn.title = lang === 'tr' ? 'Switch to English' : 'Türkçeye geç';
    }
  }

  function createToggle(){
    var btn = document.createElement('button');
    btn.id = 'lang-toggle';
    btn.className = 'lang-toggle';
    btn.addEventListener('click', function(){
      var current = localStorage.getItem(STORAGE_KEY) || detectLang();
      setLang(current === 'tr' ? 'en' : 'tr');
    });
    document.body.appendChild(btn);
    return btn;
  }

  window.i18n = {
    t: function(key){ return t(key, detectLang()); },
    getLang: function(){ return localStorage.getItem(STORAGE_KEY) || detectLang(); },
    setLang: setLang
  };

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init(){
    createToggle();
    var lang = detectLang();
    setLang(lang);
  }
})();

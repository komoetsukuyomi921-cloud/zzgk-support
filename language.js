(() => {
  const supported = ['en', 'es', 'fr', 'ja', 'ko', 'zh-Hans', 'zh-Hant'];
  const match = value => {
    const tag = String(value || '').toLowerCase();
    if (tag === 'zh' || tag.startsWith('zh-')) {
      return /hant|(?:^|-)tw(?:-|$)|(?:^|-)hk(?:-|$)|(?:^|-)mo(?:-|$)/.test(tag) ? 'zh-Hant' : 'zh-Hans';
    }
    return supported.find(code => tag === code.toLowerCase() || tag.startsWith(code.toLowerCase() + '-'));
  };
  document.querySelectorAll('[data-language]').forEach(link => {
    link.addEventListener('click', () => {
      try { localStorage.setItem('zenplan-site-language', link.dataset.language); } catch {}
    });
  });
  if (document.body.dataset.root !== 'true') return;
  let saved;
  try { saved = localStorage.getItem('zenplan-site-language'); } catch {}
  const requested = new URLSearchParams(location.search).get('lang');
  const locale = match(requested) || (supported.includes(saved) ? saved : null)
    || (navigator.languages || [navigator.language]).map(match).find(Boolean) || 'en';
  const target = new URL(`${locale}/${document.body.dataset.page}.html`, location.href);
  target.hash = location.hash;
  location.replace(target.href);
})();

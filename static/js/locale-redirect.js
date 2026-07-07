(function () {
  var supportedLocales = ['vi', 'zh-Hans'];
  var path = window.location.pathname;
  var firstSegment = path.split('/').filter(Boolean)[0];

  if (supportedLocales.indexOf(firstSegment) !== -1) {
    window.localStorage.setItem('microbe-docs-locale', firstSegment);
    return;
  }

  if (path !== '/') {
    window.localStorage.setItem('microbe-docs-locale', 'en');
    return;
  }

  var savedLocale = window.localStorage.getItem('microbe-docs-locale');
  if (savedLocale === 'en') {
    return;
  }

  var language = (navigator.languages && navigator.languages[0]) || navigator.language || '';
  var normalized = language.toLowerCase();
  var target = '';

  if (savedLocale === 'vi' || normalized.indexOf('vi') === 0) {
    target = '/vi/';
  }

  if (
    savedLocale === 'zh-Hans' ||
    normalized === 'zh' ||
    normalized.indexOf('zh-cn') === 0 ||
    normalized.indexOf('zh-hans') === 0 ||
    normalized.indexOf('zh-sg') === 0
  ) {
    target = '/zh-Hans/';
  }

  if (target) {
    window.location.replace(target);
  }
})();

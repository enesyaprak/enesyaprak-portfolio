/* Tema: localStorage'daki seçimi ilk boyamadan önce uygular (flash olmasın). Seçim yoksa açık tema. CSP için harici dosya. */
(function () {
  try {
    var t = localStorage.getItem('theme');
    if (t === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      var m = document.querySelector('meta[name="theme-color"]');
      if (m) m.setAttribute('content', '#0d1117');
    }
  } catch (e) {}
})();

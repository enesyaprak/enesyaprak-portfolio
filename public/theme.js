/* Tema: localStorage'daki seçimi ilk boyamadan önce uygular (flash olmasın). CSP için harici dosya. */
(function () {
  try {
    var t = localStorage.getItem('theme');
    if (t === 'dark' || t === 'light') document.documentElement.setAttribute('data-theme', t);
  } catch (e) {}
})();

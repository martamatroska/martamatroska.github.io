
(function () {
 
  if (location.search.indexOf('notrack') !== -1) {
    localStorage.setItem('umami.disabled', 1);
  }

  var s = document.createElement('script');
  s.defer = true;
  s.src = 'https://cloud.umami.is/script.js';
  s.setAttribute('data-website-id', '59b7874a-3838-4e84-b6b4-01bf762efa3f');
  s.setAttribute('data-domains', 'martamatroska.github.io');
  document.head.appendChild(s);
})();
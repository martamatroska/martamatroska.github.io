
(function () {
  var WEBSITE_ID = '59b7874a-3838-4e84-b6b4-01bf762efa3f';
  var SCRIPT_SRC = 'https://cloud.umami.is/script.js';

  // '88.26.230.179', 'otra.ip'
  var IPS_EXCLUIDAS = ['88.26.230.179'];

  function cargarUmami() {
    var s = document.createElement('script');
    s.defer = true;
    s.src = SCRIPT_SRC;
    s.setAttribute('data-website-id', WEBSITE_ID);
    document.head.appendChild(s);
  }

  fetch('https://api.ipify.org?format=json')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      if (IPS_EXCLUIDAS.indexOf(data.ip) === -1) {
        cargarUmami();      
      }
    })
    .catch(cargarUmami);   
})();
'use strict';
(function () {
  var nonce = document.currentScript ? document.currentScript.nonce : '';
  var assetBase = document.currentScript && document.currentScript.src ? new URL('.', document.currentScript.src).href : location.origin + '/';
  var failure = '';
  var retries = 0;
  window.gameStage = 'loader';
  function fillCode() {
    var input = document.querySelector('#join [name=code]');
    var match = location.search.match(/[?&]code=([0-9]{6})(?:&|$)/);
    if (input && match) input.value = match[1];
  }
  window.bootError = function (detail) {
    if (detail && !failure) failure = String(detail).slice(0, 240);
    var element = document.querySelector('#error');
    if (element) {
      element.textContent = 'Не удалось запустить игру. ' + (failure ? 'Причина: ' + failure : 'Этап: ' + window.gameStage + '. Выполняется повторная загрузка…');
      element.hidden = false;
    }
  };
  function retry() {
    if (window.gameReady || retries >= 2) return;
    if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', retry, { once: true }); return; }
    retries++;
    var script = document.createElement('script');
    script.src = assetBase + 'game-client.js?retry=' + retries;
    if (nonce) script.setAttribute('nonce', nonce);
    script.onerror = function () { window.bootError('Резервный скрипт не загрузился. Проверьте доступ к ссылке игры.'); };
    document.head.appendChild(script);
  }
  document.addEventListener('DOMContentLoaded', fillCode);
  document.addEventListener('submit', function (event) {
    if (!window.gameReady) { event.preventDefault(); fillCode(); retry(); window.bootError(); }
  }, true);
  window.addEventListener('error', function (event) {
    if (!window.gameReady) window.bootError(event.message || 'Не загрузился скрипт');
  }, true);
  document.addEventListener('securitypolicyviolation', function (event) {
    if (!window.gameReady && event.violatedDirective.indexOf('script-src') >= 0) {
      window.bootError('Браузер заблокировал скрипт (' + event.violatedDirective + ').'); retry();
    }
  });
  setTimeout(function () { if (!window.gameReady) { fillCode(); retry(); } }, 2000);
  setTimeout(function () { if (!window.gameReady) { retry(); window.bootError(); } }, 12000);
}());

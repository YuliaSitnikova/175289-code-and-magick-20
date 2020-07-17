'use strict';

(function () {
  var TIMEOUT = 10000;
  var statusCode = {
    OK: 200,
  };

  var createXHR = function (url, method, data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function () {
      if (xhr.status === statusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;
    xhr.open(method, url);
    xhr.send(data);
  };

  var load = function (onLoad, onError) {
    var URL = 'https://javascript.pages.academy/code-and-magick/data';
    var method = 'GET';
    createXHR(URL, method, null, onLoad, onError);
  };

  var save = function (data, onLoad, onError) {
    var URL = 'https://javascript.pages.academy/code-and-magick';
    var method = 'POST';
    createXHR(URL, method, data, onLoad, onError);
  };

  window.backend = {
    load: load,
    save: save,
  };
})();

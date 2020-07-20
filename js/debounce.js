'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 300;

  window.debounce = function (callback) {
    var lastTimeout;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        callback.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };
})();

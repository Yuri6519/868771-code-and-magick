'use strict';

(function () {
  var lastTimer;


  function debounce(interval, func) {

    if (lastTimer) {
      window.clearTimeout(lastTimer);
    }

    lastTimer = window.setTimeout(func, interval);
  }


  window.debounce = {
    debounce: debounce
  };

})();

// запросы к серверу

'use strict';

(function () {

  var url = ' https://js.dump.academy/code-and-magick';

  // с помощью XMLHttpRequest
  function load(onLoad, onError) {
    processRequest(onLoad, onError, 'GET', url + '/data');
  }

  // JSONP для практики (без обработки ошибок)
  function loadJsonp(onLoad) {
    window.GetIt = function (data) {
      onLoad(data);
    };

    var scriptEl = document.createElement('script');
    scriptEl.src = url + '/data?callback=GetIt';
    document.body.appendChild(scriptEl);

  }

  function save(data, onLoad, onError) {
    processRequest(onLoad, onError, 'POST', url, data);
  }

  // запросы GET И POST почти одинаковые для примера и отличаются параметрами, поэтому сделал общий обраболтчик
  function processRequest(onLoad, onError, method, reqUrl, data) {
    // ради практики заверну все в try/catch
    try {
      var req = new XMLHttpRequest();
      req.responseType = 'json';

      // общий листенер на успех - ошибку
      req.addEventListener('load', function () {
        switch (req.status) {
          case 200:
            onLoad(req.response);
            break;
          default: onError('Ошибка выполнения запроса к серверу. Статус: ' + req.status + ', текст: ' + req.statusText);
        }
      });

      // на соединение
      req.addEventListener('error', function () {
        onError('Ошибка соединения. Повторите запрос позже');
      });

      // на timeout
      req.addEventListener('timeout', function () {
        onError('Время выполнения запроса истекло. Запрос не успел выполнится за ' + req.timeout + 'мс');
      });

      req.timeout = 30000; // 30сек
      req.open(method, reqUrl);

      if (method === 'POST') {
        req.send(data);
      } else if (method === 'GET') {
        req.send();
      } else {
        throw new Error('неизвестный метод: ' + method);
      }

    } catch (err) {
      onError('Общая ошибка получения данных: ' + err);
    }
  }

  window.backend = {
    load: load,
    save: save,
    loadJsonp: loadJsonp

  };


})();

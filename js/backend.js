// запросы к серверу

'use strict';

(function () {

  var url = ' https://js.dump.academy/code-and-magick/data';

  function load(onLoad, onError) {
    // ради практики заверну все в try/catch
    // генерю внутри ошибку throw new Error('ERROR OSSURED HERE!') - работает ))
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
      req.open('GET', url);
      req.send();

    } catch (err) {
      onError('Общая ошибка получения данных: ' + err);
    }

  }

  //function save(data, onLoad, onError) {
  function save(onLoad) {
    window.GetIt = function (data) {
      onLoad(data);
    };

    var scriptEl = document.createElement('script');
    scriptEl.src = url + '?callback=GetIt';

console.log(scriptEl);
    
    document.body.appendChild(scriptEl);

  }

  window.backend = {
    load: load,
    save: save

  };


})();

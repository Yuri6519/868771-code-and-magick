'use strict';

(function () {
  var wizardWindowAvatar = document.querySelector('.setup').querySelector('.upload');

  wizardWindowAvatar.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    // координаты курсора
    var initialPos = {
      x: evt.clientX,
      y: evt.clientY
    };

    // флаг сдвига
    var isMove = false;

    function onMouseMove(evtMove) {
      evtMove.preventDefault();

      var shiftPos = {
        x: initialPos.x - evtMove.clientX,
        y: initialPos.y - evtMove.clientY
      };

      initialPos = {
        x: evtMove.x,
        y: evtMove.y
      };

      // новое положение окна
      window.commonUtils.wizardWindow.style.left = window.commonUtils.wizardWindow.offsetLeft - shiftPos.x + 'px';
      window.commonUtils.wizardWindow.style.top = window.commonUtils.wizardWindow.offsetTop - shiftPos.y + 'px';

      isMove = isMove ? isMove : (Math.abs(shiftPos.x) > 0 || Math.abs(shiftPos.y) > 0);
    }

    function onMouseUp(evtUp) {
      evtUp.preventDefault();

      function onclick(evtClick) {
        evtClick.preventDefault();
        wizardWindowAvatar.removeEventListener('click', onclick);
      }

      // если был сдвиг не показываем
      if (isMove) {
        wizardWindowAvatar.addEventListener('click', onclick);
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

})();

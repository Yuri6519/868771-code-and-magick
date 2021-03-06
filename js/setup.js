'use strict';

(function () {
  // url отправки формы визарда
  var WIZARD_FORM_URL = 'https://js.dump.academy/code-and-magick';

  // форма визарда
  var wizardForm = window.commonUtils.wizardWindow.querySelector('.setup-wizard-form');

  // input формы визарда
  var elUserNameInput = window.commonUtils.wizardWindow.querySelector('.setup-user-name');

  // массив имен
  var wizardNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

  // массив фамилий
  var wizardLastNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

  // окно настройки персонажа
  var initWizardPos = {
    x: window.commonUtils.wizardWindow.style.left,
    y: window.commonUtils.wizardWindow.style.top
  };

  // ключ на генерацию тестовых данных
  var isModeTest = false;

  // массив визардов, полученный с сервера
  var arrayServerWizards = [];

  // персонаж
  var wizardPlayer = document.querySelector('.setup-player').querySelector('.setup-wizard').querySelector('.wizard');

  // персонаж
  var wizardPlayerObj = {
    coat: wizardPlayer.querySelector('.wizard-coat'),
    eyes: wizardPlayer.querySelector('.wizard-eyes'),
    fireball: document.querySelector('.setup-fireball-wrap')
  };

  // ф-ия генерит имя и фамилию
  function getWizardName() {
    var nameLength = wizardNames.length;
    var lastNameLength = wizardLastNames.length;

    var wizardName = wizardLastNames[Math.round(Math.random() * (nameLength - 1))];
    var wizarLastdName = wizardNames[Math.round(Math.random() * (lastNameLength - 1))];

    // задание - при желании имя и фамилию можно в случайном порядке менять местами:). Поменял ради практики ))
    if (Math.random() > 0.5) {
      return wizarLastdName + ' ' + wizardName;
    } else {
      return wizardName + ' ' + wizarLastdName;
    }
  }

  // массив цветов мантии персонажа
  var wizardCoatColor = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

  // Ф-ия возвращает случайным образом цвет мантии персонажа
  function getWizardCoatColor() {

    return wizardCoatColor[Math.round(Math.random() * (wizardCoatColor.length - 1))];
  }

  // массив цветов глаз персонажа
  var wizardEyesColor = ['black', 'red', 'blue', 'yellow', 'green'];

  // Ф-ия возвращает случайным образом цвет глаз персонажа
  function getWizardEyesColor() {

    return wizardEyesColor[Math.round(Math.random() * (wizardEyesColor.length - 1))];
  }

  // массив цветов фаербола
  var wizardFireballColor = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  // Ф-ия возвращает случайным образом цвет глаз персонажа
  function getWizardFireballColor() {
    return wizardFireballColor[Math.round(Math.random() * (wizardFireballColor.length - 1))];
  }

  // возвращает балы весомости мага
  function getMark(wizard, coatColor, eyesColor) {
    var res = 0;
    if (wizard.colorCoat === coatColor) {
      res += 2;
    }

    if (wizard.colorEyes === eyesColor) {
      res += 1;
    }

    return res;
  }


  // ф-ия заполняет массив персонажей Длдиной num из данных, полученных с сервера.
  function getWizards(num) {
    var wizardsArrayRes = [];

    // 1. Сортировка массива под похожего персонажа
    // цвет куртки
    var currentCoatColor = wizardPlayerObj.coat.style.fill;
    // цвет глаз
    var currentEyesColor = wizardPlayerObj.eyes.style.fill;
    // для первой сортировки прри загрузке цвет не определен (см. разметку), поэтому для первого раза беру из разметки дефолтовый
    if (!currentEyesColor) {
      var listInputs = document.querySelector('.setup-wizard-appearance').querySelectorAll('input');
      var clrInput = [].map.call(listInputs, function (itr) {
        return {name: itr.name,
          value: itr.value
        };
      }).filter(function (itr) {
        return itr.name === 'eyes-color';
      });

      currentEyesColor = clrInput[0].value;

    }

    // работаем с копией полученных данных
    var cloneArr = arrayServerWizards.slice().sort(function (one, two) {
      var left = getMark(one, currentCoatColor, currentEyesColor);
      var right = getMark(two, currentCoatColor, currentEyesColor);
      var res;

      if (left > right) {
        res = -1;
      } else if (left < right) {
        res = 1;
      } else {
        // по имени для одинаковых
        if (one.name < two.name) {
          res = -1;
        } else if (one.name > two.name) {
          res = 1;
        } else {
          res = 0;
        }
      }
      return res;

    });

    wizardsArrayRes = cloneArr.slice(0, num);

    // не убираю тестовый - жалко код терять ))
    if (isModeTest) {
      // случайные num персонажа из полученных данных
      for (var i = 0; i < num; i++) {
        // тестовые данные
        wizardsArrayRes[i] = {
          name: getWizardName(),
          coatColor: getWizardCoatColor(),
          eyesColor: getWizardEyesColor()
        };
      }
    }

    return wizardsArrayRes;
  }

  // ф-ия генерит один персонаж - DOM element
  function createSimilarWizard(wizardData, template) {
    var similarWizard = template.cloneNode(true);
    similarWizard.querySelector('.setup-similar-label').textContent = wizardData.name;
    similarWizard.querySelector('.wizard').querySelector('.wizard-coat').style.fill = wizardData.colorCoat;
    similarWizard.querySelector('.wizard').querySelector('.wizard-eyes').style.fill = wizardData.colorEyes;
    return similarWizard;
  }

  // ф-ия генерит DOM элементы (похожие персонажи)
  function createSimilarWizards(wizardsArray, template) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < wizardsArray.length; i++) {
      fragment.appendChild(createSimilarWizard(wizardsArray[i], template));
    }

    return fragment;
  }

  // отрисовка wizards
  function drawWizards(conntainer) {
    // элемент
    var similarList = document.querySelector('.setup-similar-list');

    var items = similarList.querySelectorAll('.setup-similar-item');

    // очистим
    for (var i = 0; i < items.length; i++) {
      items[i].remove();
    }

    // добавим
    similarList.appendChild(conntainer);
  }

  // инициализация кастомных визардов
  function initSimilarWizards() {

    var wizards = getWizards(4);

    // 1. Вытащим шаблон и создадим DOM элементы. Хранить будем в DocumentFragment
    var template = document.getElementById('similar-wizard-template').content.querySelector('.setup-similar-item');

    // 2. Получим заполненный фрагмент с персонажами
    var conntainer = createSimilarWizards(wizards, template);

    // 3. Отрисуем персонажи
    drawWizards(conntainer);

    // 4. Покажем
    document.querySelector('.setup-similar').classList.remove('hidden');
  }

  // ф-ии окна выбора персонажа
  // ф-ия открытия окна
  function openWizardSetup() {
    // Для того, чтобы при открытом окне и нажатии ENTER или щелчке не вызывался постоянно remove
    if (window.commonUtils.wizardWindow.classList.contains('hidden')) {
      // начальное положение
      window.commonUtils.wizardWindow.style.left = initWizardPos.x;
      window.commonUtils.wizardWindow.style.top = initWizardPos.y;

      // уберем сообщение об ошибке (если было)
      var errElem = document.querySelector('.setup-error');
      if (errElem) {
        errElem.remove();
      }

      // показываем окно
      window.commonUtils.wizardWindow.classList.remove('hidden');

      // регистрируем событие на документе (пробовал непосредственно на самом окне - не работает)) ) - при нажатии ESCAPE
      document.addEventListener('keydown', onCloseWizardWindowKeyDown);

      // отрисовка похожих персонажей - данные с сервера
      // XMLHttpRequest
      window.backend.load(cbSuccessLoadWizard, cbErrorLoadWizard);

      // JSONP
      // window.backend.loadJsonp(cbSuccessLoadWizard, cbErrorLoadWizard);

    }

  }

  // ф-ия закрытия окна
  function closeWizardSetup() {
    window.commonUtils.wizardWindow.classList.add('hidden');

    // разрегистрируем событие keydown на документе
    document.removeEventListener('keydown', onCloseWizardWindowKeyDown);
  }

  // событие вывода окна настройки персонажа по клику на иконке
  function onIconWizardOpenCkick() {
    openWizardSetup();
  }

  // событие вывода окна настройки персонажа по нажатию на ENTER
  function onIconWizardOpenKeyDown(evt) {
    if (evt.keyCode === window.commonUtils.KEY_RETURN) {
      openWizardSetup();
    }

  }

  // событие закрытия окна настройки персонажа по нажатию на "крестике"
  function onButtonWizardCloseCkick() {
    closeWizardSetup();
  }

  // событие закрытия окна настройки персонажа по нажатию на ENTER
  function onCloseElmWizardKeyDown(evt) {
    if (evt.keyCode === window.commonUtils.KEY_RETURN) {
      closeWizardSetup();
    }

  }

  // событие закрытия окна настройки персонажа по нажатию на ESCAPE
  function onCloseWizardWindowKeyDown(evt) {
    if (evt.keyCode === window.commonUtils.KEY_ESCAPE) {
      // требования к закрытию окна по ТЗ:
      // когда окно настройки персонажа открыто, нажатие на клавишу ESC должно закрывать диалог
      // если фокус находится на форме ввода имени, то окно закрываться не должно.
      elUserNameInput = window.commonUtils.wizardWindow.querySelector('.setup-user-name');
      var canClose = (!window.commonUtils.wizardWindow.classList.contains('hidden')) & (window.commonUtils.getAttributeValue(elUserNameInput, 'hasfocus') === 'false');

      if (canClose) {
        closeWizardSetup();
      }
    }
  }

  // событие фокуса на поле ввода
  function onUserNameInputFocus() {
    processFocusOnUserNameInput(true);
  }

  // событие фокуса на поле ввода
  function onUserNameInputBlur() {
    processFocusOnUserNameInput(false);
  }

  // обработка фокуса
  function processFocusOnUserNameInput(value) {
    elUserNameInput = window.commonUtils.wizardWindow.querySelector('.setup-user-name');
    window.commonUtils.setAttributeValue(elUserNameInput, 'hasfocus', value);
  }

  // событие клика на плаще
  function onWizardCoatCkick(evt) {
    processClickOnWizardCoat(evt.currentTarget);
  }

  // ф-ия обработки нажатия клика на плаще
  function processClickOnWizardCoat(wizardCoat) {
    wizardCoat.style.fill = getWizardCoatColor();
    // отрисовка похожих персонажей
    window.debounce.debounce(500, initSimilarWizards);
  }

  // событие клика на глазах персонажа
  function onWizardEyesCkick(evt) {
    processClickOnWizardEyes(evt.currentTarget);
  }

  // ф-ия обработки нажатия клика на глазах персонажа
  function processClickOnWizardEyes(wizardEyes) {
    wizardEyes.style.fill = getWizardEyesColor();
    // отрисовка похожих персонажей
    window.debounce.debounce(500, initSimilarWizards);
  }

  // событие клика на фаерболе
  function onWizardFireballCkick(evt) {
    processClickOnWizardFireball(evt.currentTarget);
  }

  // ф-ия обработки нажатия клика на фаерболе
  function processClickOnWizardFireball(fireball) {
    fireball.style.background = getWizardFireballColor();
  }


  // инициализация окна визарда
  function inittWizardSetupWindow() {
    // события регестрируем через именованную ф-ию, чтобы потом (если надо) можно было-бы "разрегистрировать"
    // нажатие на иконку с аватаром пользователя
    var wzSetupUserIcon = document.querySelector('.setup-open');
    wzSetupUserIcon.addEventListener('click', onIconWizardOpenCkick);
    wzSetupUserIcon.addEventListener('keydown', onIconWizardOpenKeyDown);

    // создадим атрибут tabindex элементу img и зададим ему значание 0
    var img = wzSetupUserIcon.querySelector('.setup-open-icon');
    window.commonUtils.setObjectAttribute(img, 'tabindex', 0);

    // нажатие на элемент закрытия окна визарда
    var wzSetupCloseElm = window.commonUtils.wizardWindow.querySelector('.setup-close');
    wzSetupCloseElm.addEventListener('click', onButtonWizardCloseCkick);
    wzSetupCloseElm.addEventListener('keydown', onCloseElmWizardKeyDown);

    // создадим атрибут tabindex элементу закрытия окна визарда и зададим ему значание 0
    window.commonUtils.setObjectAttribute(wzSetupCloseElm, 'tabindex', 0);

    // элементу .setup-user-name добавим атрибут hasfocus = false
    elUserNameInput = window.commonUtils.wizardWindow.querySelector('.setup-user-name');
    window.commonUtils.setObjectAttribute(elUserNameInput, 'hasfocus', false);
    elUserNameInput.addEventListener('focus', onUserNameInputFocus);
    elUserNameInput.addEventListener('blur', onUserNameInputBlur);

    // по ТЗ:фФорма должна отправляться на урл https://js.dump.academy/code-and-magick методом POST с типом multipart/form-data
    // в index.html у формы есть method="post" и enctype="multipart/form-data". Не хватает action
    wizardForm.action = WIZARD_FORM_URL;

    // событие отправки данных на форму
    wizardForm.addEventListener('submit', function (evt) {
      evt.preventDefault();
      window.backend.save(new FormData(wizardForm), cbSuccessSaveWizard, cbErrorLoadWizard);
    });

    // условия валидации длины имени персонажа
    // имя персонажа не может содержать менее 2 символов
    // максимальная длина имени персонажа — 25 символов
    // не работает, есди делать в лоб:
    // elUserNameInput.maxlength = 25;
    // elUserNameInput.minlength = 2;
    window.commonUtils.setAttributeValue(elUserNameInput, 'maxlength', 25);
    window.commonUtils.setObjectAttribute(elUserNameInput, 'minlength', 2);

    // событие на плащ персонажа
    wizardPlayerObj.coat.addEventListener('click', onWizardCoatCkick);

    // событие на глаза персонажа
    wizardPlayerObj.eyes.addEventListener('click', onWizardEyesCkick);

    // событие на файербол
    wizardPlayerObj.fireball.addEventListener('click', onWizardFireballCkick);

  }

  // callback на загрузку персонажей
  function cbSuccessLoadWizard(wizardData) {

    // запомним данные с сервера
    arrayServerWizards = wizardData.slice();

    // отрисовка похожих персонажей - сразу после открытия формы и загрузки данных с сервера
    initSimilarWizards();

  }

  // callback на обработку ошибок при работе с сервером через окно выбора персонажей
  function cbErrorLoadWizard(mes) {
    var elDiv = document.createElement('div');
    elDiv.style.color = 'white';
    elDiv.style.background = 'red';
    elDiv.textContent = mes;
    elDiv.classList.add('setup-error'); // чтобы можно было убрать
    window.commonUtils.wizardWindow.appendChild(elDiv);
  }

  // callback на отправку формы
  function cbSuccessSaveWizard() {
    window.commonUtils.wizardWindow.classList.add('hidden');
  }


  // точка входа
  // 1. Инициализация формы (привязка событий к окну выбора персонажа...)
  inittWizardSetupWindow(window.commonUtils.wizardWindow);

})();

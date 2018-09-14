'use strict';

// коды кнопок
var KEY_RETURN = 13;
var KEY_ESCAPE = 27;

// url отправки формы визарда
var WIZARD_FORM_URL = 'https://js.dump.academy/code-and-magick';

// массив имен
var wizardNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

// массив фамилий
var wizardLastNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

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

// Ф-ия возвращает случайным образом цветмантии персонажа
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

// ф-ия генрит и заполняет массив персонажей. Количество задает входной параметр
function getWizards(length) {
  var wizardsArray = [];

  for (var i = 0; i < length; i++) {
    wizardsArray[i] = {
      name: getWizardName(),
      coatColor: getWizardCoatColor(),
      eyesColor: getWizardEyesColor()
    };
  }
  return wizardsArray;
}

// ф-ия генерит один персонаж - DOM element
function createSimilarWizard(wizardData, template) {
  var similarWizard = template.cloneNode(true);
  similarWizard.querySelector('.setup-similar-label').textContent = wizardData.name;
  similarWizard.querySelector('.wizard').querySelector('.wizard-coat').style.fill = wizardData.coatColor;
  similarWizard.querySelector('.wizard').querySelector('.wizard-eyes').style.fill = wizardData.eyesColor;
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

// инициализация кастомных визардов
function initSimilarWizards() {
  // 1. Найдем элемент div с классом setup и покажем (уберем hidden)
  // var showWizardWindow = document.querySelector('.setup');
  // showWizardWindow.classList.remove('hidden');

  // 2. Объявим переменную, содержащую массив персонажей и заполним массив
  var wizards = getWizards(4);

  // 3. Вытащим шаблон и создадим DOM элементы. Хранить будем в DocumentFragment
  var template = document.getElementById('similar-wizard-template').content.querySelector('.setup-similar-item');

  // 4. Получим заполненный фрагмент с персонажами
  var conntainer = createSimilarWizards(wizards, template);

  // 5. Отрисуем персонажи
  document.querySelector('.setup-similar-list').appendChild(conntainer);

  // 6. Покажем
  document.querySelector('.setup-similar').classList.remove('hidden');
}

// ф-ии окна выбора персонажа
// ф-ия открытия окна
function openWizardSetup() {
  // Для того, чтобы при открытом окне и нажатии ENTER или щелчке не вызывался постоянно remove
  if (wizardWindow.classList.contains('hidden')) {
    // показываем окно
    wizardWindow.classList.remove('hidden');

    // регистрируем событие на документе (пробовал непосредственно на самом окне - не работает)) ) - при нажатии ESCAPE
    document.addEventListener('keydown', onCloseWizardWindowKeyDown);
  }

}

// ф-ия закрытия окна
function closeWizardSetup() {
  wizardWindow.classList.add('hidden');

  // разрегистрируем событие keydown на документе
  document.removeEventListener('keydown', onCloseWizardWindowKeyDown);
}

// событие вывода окна настройки персонажа по клику на иконке
function onIconWizardOpenCkick() {
  openWizardSetup();
}

// событие вывода окна настройки персонажа по нажатию на ENTER
function onIconWizardOpenKeyDown(evt) {
  if (evt.keyCode === KEY_RETURN) {
    openWizardSetup();
  }

}

// событие закрытия окна настройки персонажа по нажатию на "крестике"
function onButtonWizardCloseCkick() {
  closeWizardSetup();
}

// событие закрытия окна настройки персонажа по нажатию на ENTER
function onCloseElmWizardKeyDown(evt) {
  if (evt.keyCode === KEY_RETURN) {
    closeWizardSetup();
  }

}

// получение значения атрибута
function getAttributeValue(element, attrName) {
  var value;
  for (var i = 0; i < element.attributes.length; i++) {
    if (element.attributes[i].name === attrName) {
      value = element.attributes[i].value;
    }
  }

  return value;

}

// установка значения атрибута
function setAttributeValue(element, attrName, value) {
  for (var i = 0; i < element.attributes.length; i++) {
    if (element.attributes[i].name === attrName) {
      element.attributes[i].value = value;
    }
  }
}

// событие закрытия окна настройки персонажа по нажатию на ESCAPE
function onCloseWizardWindowKeyDown(evt) {
  if (evt.keyCode === KEY_ESCAPE) {
    // требования к закрытию окна по ТЗ:
    // когда окно настройки персонажа открыто, нажатие на клавишу ESC должно закрывать диалог
    // если фокус находится на форме ввода имени, то окно закрываться не должно.
    elUserNameInput = wizardWindow.querySelector('.setup-user-name');
    var canClose = (!wizardWindow.classList.contains('hidden')) & (getAttributeValue(elUserNameInput, 'hasfocus') === 'false');

    if (canClose) {
      closeWizardSetup();
    }
  }
}

// установка атрибута
function setObjectAttribute(obj, attrName, atrValue) {
  var attr = document.createAttribute(attrName);
  attr.value = atrValue;
  obj.attributes.setNamedItem(attr);
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
  elUserNameInput = wizardWindow.querySelector('.setup-user-name');
  setAttributeValue(elUserNameInput, 'hasfocus', value);
}

// событие клика на плаще
function onWizardCoatCkick(evt) {
  processClickOnWizardCoat(evt.currentTarget);
}

// ф-ия обработки нажатия клика на плаще
function processClickOnWizardCoat(wizardCoat) {
  wizardCoat.style.fill = getWizardCoatColor();
}

// событие клика на глазах персонажа
function onWizardEyesCkick(evt) {
  processClickOnWizardEyes(evt.currentTarget);
}

// ф-ия обработки нажатия клика на глазах персонажа
function processClickOnWizardEyes(wizardEyes) {
  wizardEyes.style.fill = getWizardEyesColor();
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
  setObjectAttribute(img, 'tabindex', 0);

  // нажатие на элемент закрытия окна визарда
  var wzSetupCloseElm = wizardWindow.querySelector('.setup-close');
  wzSetupCloseElm.addEventListener('click', onButtonWizardCloseCkick);
  wzSetupCloseElm.addEventListener('keydown', onCloseElmWizardKeyDown);

  // создадим атрибут tabindex элементу закрытия окна визарда и зададим ему значание 0
  setObjectAttribute(wzSetupCloseElm, 'tabindex', 0);

  // элементу .setup-user-name добавим атрибут hasfocus = false
  elUserNameInput = wizardWindow.querySelector('.setup-user-name');
  setObjectAttribute(elUserNameInput, 'hasfocus', false);
  elUserNameInput.addEventListener('focus', onUserNameInputFocus);
  elUserNameInput.addEventListener('blur', onUserNameInputBlur);

  // по ТЗ:фФорма должна отправляться на урл https://js.dump.academy/code-and-magick методом POST с типом multipart/form-data
  // в index.html у формы есть method="post" и enctype="multipart/form-data". Не хватает action
  var wizardForm = wizardWindow.querySelector('.setup-wizard-form');
  wizardForm.action = WIZARD_FORM_URL;

  // условия валидации длины имени персонажа
  // имя персонажа не может содержать менее 2 символов
  // максимальная длина имени персонажа — 25 символов
  // не работает, есди делать в лоб:
  // elUserNameInput.maxlength = 25;
  // elUserNameInput.minlength = 2;
  setAttributeValue(elUserNameInput, 'maxlength', 25);
  setObjectAttribute(elUserNameInput, 'minlength', 2);

  // персонаж
  var wizardPlayer = document.querySelector('.setup-player').querySelector('.setup-wizard').querySelector('.wizard');

  // плащ персонажа
  var wizardCoat = wizardPlayer.querySelector('.wizard-coat');
  wizardCoat.addEventListener('click', onWizardCoatCkick);

  // глаза персонажа
  var wizardEyes = wizardPlayer.querySelector('.wizard-eyes');
  wizardEyes.addEventListener('click', onWizardEyesCkick);

  // файербол
  var wizarFireball = document.querySelector('.setup-fireball-wrap');
  wizarFireball.addEventListener('click', onWizardFireballCkick);

}

// точка входа
// 1. Инициализация похожих персонажей
initSimilarWizards();

// 2. Инициализация формы (привязка событий к окну выбора персонажа...)
var wizardWindow = document.querySelector('.setup');
var elUserNameInput = wizardWindow.querySelector('.setup-user-name');

inittWizardSetupWindow(wizardWindow);


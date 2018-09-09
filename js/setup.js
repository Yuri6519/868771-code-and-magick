'use strict';

// Массив имен
var wizardNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

// Массив фамилий
var wizardLastNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

// Ф-ия генерит имя и фамилию
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


// точка входа
// 1. Найдем элемент div с классом setup и покажем (уберем hidden)
var showWizardWindow = document.querySelector('.setup');
showWizardWindow.classList.remove('hidden');

// 2. Объявим переменную, содержащую массив персонажей и заполним массив
var wizards = getWizards(4);

// 3. Вытащим шаблон и создадим DOM элементы. Хранить будем в DocumentFragment
var template = document.getElementById('similar-wizard-template').content.querySelector('.setup-similar-item');

// 4. Получим заполненный фрагмент с персонажами
var conntainer = createSimilarWizards(wizards, template);

// 5. Отрисуем персонажи
document.querySelector('.setup-similar-list').appendChild(conntainer);

// 6. Покажем то, что понаделали))
document.querySelector('.setup-similar').classList.remove('hidden');

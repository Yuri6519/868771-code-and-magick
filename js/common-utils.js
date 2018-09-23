'use strict';

(function () {

  // коды кнопок
  var KEY_RETURN = 13;
  var KEY_ESCAPE = 27;

  // окно настройки персонажа
  var wizardWindow = document.querySelector('.setup');

  // установка атрибута
  function setObjectAttribute(obj, attrName, atrValue) {
    var attr = document.createAttribute(attrName);
    attr.value = atrValue;
    obj.attributes.setNamedItem(attr);
  }

  // 2. Максимальное число в массиве - обычным перебором, через переменную
  function getMaxNumber(arrayOfNumbers) {
    var maxNumber = arrayOfNumbers[0];
    for (var i = 1; i < arrayOfNumbers.length; i++) {
      maxNumber = arrayOfNumbers[i] > maxNumber ? arrayOfNumbers[i] : maxNumber;
    }
    return maxNumber;
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


  // экспорт
  window.commonUtils = {
    KEY_RETURN: KEY_RETURN,
    KEY_ESCAPE: KEY_ESCAPE,

    wizardWindow: wizardWindow,

    setObjectAttribute: setObjectAttribute,
    getMaxNumber: getMaxNumber,
    getAttributeValue: getAttributeValue,
    setAttributeValue: setAttributeValue

  };

})();

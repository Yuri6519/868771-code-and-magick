'use strict';

// Блок констант
// Облако
var LEFT_CLOUD = 100;
var TOP_CLOUD = 10;
var RIGHT_CLOUD = 420;
var BOTTOM_CLOUD = 270;
var SHADOW_SHIFT = 10;

// Текст
var SHIFT_TEXT_HORIZONT = 20;
var SHIFT_TEXT_VERTICAL = 30;
var SHIFT_TEXT_GAP = 16;

// Гистограмма
// 1. Высота
var GIST_HEIGHT = 150;
// 2. Отступ от нижней границы
var GIST_BOTTOM_GAP = 35;
// 3. Ширина столбца
var GIST_COLUMN_WIDTH = 40;
// 4. Расстояние между колонками
var GIST_COLUMN_GAP = 50;
// 5. Начало отрисовки гистограммы - нижний край
var GIST_START = TOP_CLOUD + BOTTOM_CLOUD - GIST_BOTTOM_GAP;
// 6. Отступ слева
var GIST_LEFT = LEFT_CLOUD + 40;

// Расстояние между гистограммой и текстом (Имя, результат)
var TEXT_GAP = 16;

// Вспомогательные ф-ии
// 1. Отрисовка облака
function drawCloud(ctx, colors, coordinates, shift) {
  // Тень
  ctx.fillStyle = colors[1];
  ctx.fillRect(coordinates[0] + shift, coordinates[1] + shift, coordinates[2], coordinates[3]);

  // Облако
  ctx.fillStyle = colors[0];
  ctx.fillRect(coordinates[0], coordinates[1], coordinates[2], coordinates[3]);
}

// 2. Максимальное число в массиве - обычным перебором, через переменную
function getMaxNumber(arrayOfNumbers) {
  var maxNumber = arrayOfNumbers[0];
  for (var i = 1; i < arrayOfNumbers.length; i++) {
    maxNumber = arrayOfNumbers[i] > maxNumber ? arrayOfNumbers[i] : maxNumber;
  }

  return maxNumber;

}

// 3. Отрисовка одного столбца
function drawGistColumn(ctx, gstWidth, gstHeight, gstGap, gstColor) {
  ctx.fillStyle = gstColor;
  ctx.fillRect(GIST_LEFT + gstGap, GIST_START - gstHeight, gstWidth, gstHeight);
}

// 4. Вспомогательная ф-ия для расчета расстояния между столбцами в зависимости от индекса мпссива
function getColumnGap(index) {
  return (GIST_COLUMN_WIDTH + GIST_COLUMN_GAP) * index;
}

// 5. Вывод текста с участником или балами
function writeGistText(ctx, gstGap, top, text) {
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText(text, GIST_LEFT + gstGap, GIST_START - top);
}

// 6. Пропорция для перевода времени (результат игры) в пиксели
function getPixelEqualsTime(maxTime, curtime) {
  return Math.round(curtime * GIST_HEIGHT / maxTime);
}

// 7. Цвет колонки
function getUserColor(userName) {

  // 1. Насыщенность - случайная величина (не очень правильно, так как когда она близко к 0, то столбеца не видно)
  // 2. Цвет для основного игрока = 'rgba(255, 0, 0, 1)'
  // 3. Цвет для остальных синий + случайная насыщенность

  return userName === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 0, 255, ' + Math.random().toFixed(1) + ')';

}

// Статистика
window.renderStatistics = function (ctx, names, times) {
  // Облако
  drawCloud(ctx, ['white', 'rgba(0, 0, 0, 0.7)'], [LEFT_CLOUD, TOP_CLOUD, RIGHT_CLOUD, BOTTOM_CLOUD], SHADOW_SHIFT);

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура! Вы победили!', LEFT_CLOUD + SHIFT_TEXT_HORIZONT, TOP_CLOUD + SHIFT_TEXT_VERTICAL);
  ctx.fillText('Список результатов:', LEFT_CLOUD + SHIFT_TEXT_HORIZONT, TOP_CLOUD + SHIFT_TEXT_GAP + SHIFT_TEXT_VERTICAL);

  // Максимальное время из массива. Берем его за 100% (т.е. = 150px, высота гистограммы)
  var maxTime = getMaxNumber(times);

  // Перебор массива и отрисовка результатов игры каждого участника
  for (var i = 0; i < names.length; i++) {
    // Сделал через переменные, для читабельности (если оптимизировать - кода меньше, но читабельности еще меньше)

    // Имя юзера
    var userName = names[i];

    // Цвет - зависит от элемента массива
    var userColor = getUserColor(userName);

    // Время, переведенное в пиксели - высота столбца гистограммы
    var userTimeInPx = getPixelEqualsTime(maxTime, times[i]);

    // Рисуем столбец гистограммы
    drawGistColumn(ctx, GIST_COLUMN_WIDTH, userTimeInPx, getColumnGap(i), userColor);

    // Имя - внизу столбца
    writeGistText(ctx, getColumnGap(i), -TEXT_GAP, userName);

    // Результат - вверху столбца
    writeGistText(ctx, getColumnGap(i), userTimeInPx + TEXT_GAP / 2, Math.round(times[i]));

  }

};


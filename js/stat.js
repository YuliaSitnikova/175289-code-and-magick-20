'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var BAR_WIDTH = 40;
var BAR_MAX_HEIGHT = 150;
var BAR_GAP = 50;
var TEXT_HEIGHT = 16;
var START_X = (CLOUD_WIDTH - BAR_WIDTH * 4 - BAR_GAP * 3) / 2; // Для расположения статистики по центру
var START_Y = CLOUD_Y + CLOUD_HEIGHT - GAP; // Для расчета положения элементов
var USER_TEXT_COLOR = 'rgba(255, 0, 0, 1)';

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderColumn = function (ctx, index, player, time, maxTime) {
  var x = CLOUD_X + START_X + (BAR_WIDTH + BAR_GAP) * index;
  var barHeight = BAR_MAX_HEIGHT * Math.round(time) / maxTime;

  ctx.fillStyle = '#000';
  ctx.fillText(player, x, START_Y);
  ctx.fillStyle = (player === 'Вы') ? USER_TEXT_COLOR : getColor();
  ctx.fillRect(x, START_Y - TEXT_HEIGHT - barHeight, BAR_WIDTH, barHeight);
  ctx.fillStyle = '#000';
  ctx.fillText(Math.round(time), x, START_Y - TEXT_HEIGHT - barHeight - GAP);
};

var getMaxElement = function (arr) {
  if (arr.length > 0) {
    var max = arr[0];
    for (var i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
        max = arr[i];
      }
    }
    return max;
  }
};

var getRandom = function(min, max) {
  return Math.random() * (max - min) + min;
};

var getColor = function () {
  return 'hsl(240,' + getRandom(0, 100) + '%, 50%)';
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.fillText('Ура вы победили!', CLOUD_X + START_X, CLOUD_Y + GAP + TEXT_HEIGHT);
  ctx.fillText('Список результатов:', CLOUD_X + START_X, CLOUD_Y + GAP + TEXT_HEIGHT + GAP + TEXT_HEIGHT);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    renderColumn(ctx, i, players[i], times[i], maxTime);
  }
};

'use strict';

(function () {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var CLOUD_COLOR = '#fff';
  var CLOUD_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
  var GAP = 10;
  var BAR_WIDTH = 40;
  var BAR_MAX_HEIGHT = 150;
  var BAR_GAP = 50;
  var TEXT_HEIGHT = 16;
  var START_X = (CLOUD_WIDTH - BAR_WIDTH * 4 - BAR_GAP * 3) / 2; // Для расположения статистики по центру
  var USER_TEXT_COLOR = 'rgba(255, 0, 0, 1)';

  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  var renderCongratulation = function (ctx) {
    var line1 = 'Ура вы победили!';
    var line2 = 'Список результатов:';
    ctx.fillStyle = '#000';
    ctx.fillText(line1, CLOUD_X + START_X, CLOUD_Y + GAP + TEXT_HEIGHT);
    ctx.fillText(line2, CLOUD_X + START_X, CLOUD_Y + GAP + TEXT_HEIGHT + GAP + TEXT_HEIGHT);
  };

  var renderHistogram = function (ctx, players, times) {
    var maxTime = window.util.getMaxElement(times);

    players.forEach(function (player, index) {
      var time = Math.round(times[index]);
      var barHeight = BAR_MAX_HEIGHT * time / maxTime;
      var barX = CLOUD_X + START_X + (BAR_WIDTH + BAR_GAP) * index;
      var barY = CLOUD_Y + CLOUD_HEIGHT - GAP - TEXT_HEIGHT - barHeight;

      renderColumn(ctx, barX, barY, barHeight, player, time);
    });
  };

  var renderColumn = function (ctx, barX, barY, barHeight, player, time) {
    ctx.fillStyle = '#000';
    ctx.fillText(time, barX, barY - GAP);
    ctx.fillStyle = player === 'Вы' ? USER_TEXT_COLOR : window.util.getRandomBlueColor();
    ctx.fillRect(barX, barY, BAR_WIDTH, barHeight);
    ctx.fillStyle = '#000';
    ctx.fillText(player, barX, barY + barHeight + TEXT_HEIGHT);
  };

  window.renderStatistics = function (ctx, players, times) {
    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, CLOUD_SHADOW_COLOR);
    renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);
    renderCongratulation(ctx);
    renderHistogram(ctx, players, times);
  };
})();

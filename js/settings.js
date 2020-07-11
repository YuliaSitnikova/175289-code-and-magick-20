'use strict';

(function () {
  window.fireballSize = 22;
  window.wizardSpeed = 3;
  window.wizardWidth = 70;
  window.getFireballSpeed = function (movingLeft) {
    return movingLeft ? 2 : 5;
  };
  window.getWizardHeight = function () {
    return 1.337 * window.wizardWidth;
  };
  window.getWizardX = function (gameFieldWidth) {
    return (gameFieldWidth - window.wizardWidth) / 2;
  };
  window.getWizardY = function (gameFieldHeight) {
    return gameFieldHeight / 3;
  };
})();

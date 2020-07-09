'use strict';

(function () {
  var getRandom = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  var getRandomBlueColor = function () {
    return 'hsl(240,' + getRandom(0, 100) + '%, 50%)';
  };
  var getRandomElement = function (elements) {
    return elements[Math.floor(Math.random() * (elements.length))];
  };
  var getNextElement = function (elements, currentElement) {
    var index = elements.indexOf(currentElement);
    if (index === elements.length - 1) {
      return elements[0];
    }
    return elements[index + 1];
  };
  var getMaxElement = function (elements) {
    return Math.max.apply(null, elements);
  };
  window.util = {
    getRandom: getRandom,
    getRandomBlueColor: getRandomBlueColor,
    getRandomElement: getRandomElement,
    getNextElement: getNextElement,
    getMaxElement: getMaxElement
  };
})();

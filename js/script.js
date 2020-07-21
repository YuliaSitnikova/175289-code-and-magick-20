'use strict';

(function () {
  var dialogSimilar = document.querySelector('.setup-similar');
  var coatColor = 'rgb(101, 137, 164)';
  var eyesColor = 'black';
  var wizards = [];

  var onLoadSuccess = function (data) {
    wizards = data;
    updateWizards();
    dialogSimilar.classList.remove('hidden');
  };

  var onLoadError = function (errorText) {
    var node = document.createElement('div');
    node.style = 'position: absolute; top: 0; right: 0; left: 0; z-index: 100; text-align: center; background-color: red;';
    node.textContent = errorText;
    document.body.prepend(node);
  };

  window.setup.onCoatChange = window.debounce(function (color) {
    coatColor = color;
    updateWizards();
  });

  window.setup.onEyesChange = window.debounce(function (color) {
    eyesColor = color;
    updateWizards();
  });

  var getRank = function (wizard) {
    var rank = 0;
    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }
    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    var wisardsBySimilarity = wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator();
      }
      return rankDiff;
    });
    window.wizards.render(wisardsBySimilarity);
  };

  window.backend.load(onLoadSuccess, onLoadError);
})();

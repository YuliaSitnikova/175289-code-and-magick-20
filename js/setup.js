'use strict';

(function () {
  var WIZARD_COUNT = 4;
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var dialog = document.querySelector('.setup');
  var dialogWizardCoat = dialog.querySelector('.setup-wizard .wizard-coat');
  var dialogWizardEyes = dialog.querySelector('.setup-wizard .wizard-eyes');
  var dialogFireball = dialog.querySelector('.setup-fireball-wrap');
  var dialogForm = dialog.querySelector('.setup-wizard-form');
  var dialogSimilar = dialog.querySelector('.setup-similar');

  var onSaveSuccess = function () {
    window.dialog.hide();
  };

  var onLoadSuccess = function (wizards) {
    renderWizards(wizards);
    dialogSimilar.classList.remove('hidden');
  };

  var onError = function (errorText) {
    var node = document.createElement('div');
    node.style = 'position: absolute; top: 0; right: 0; left: 0; z-index: 100; text-align: center; background-color: red;';
    node.textContent = errorText;
    document.body.prepend(node);
  };

  var changeWizardCoat = function () {
    var colorInput = document.querySelector('[name="coat-color"]');
    var color = colorInput.value;
    var newColor = window.util.getNextElement(COAT_COLORS, color);
    colorInput.value = newColor;
    dialogWizardCoat.style.fill = newColor;
  };

  var changeWizardEyes = function () {
    var colorInput = document.querySelector('[name="eyes-color"]');
    var color = colorInput.value;
    var newColor = window.util.getNextElement(EYES_COLORS, color);
    colorInput.value = newColor;
    dialogWizardEyes.style.fill = newColor;
  };

  var changeFireball = function () {
    var colorInput = document.querySelector('[name="fireball-color"]');
    var color = colorInput.value;
    var newColor = window.util.getNextElement(FIREBALL_COLORS, color);
    colorInput.value = newColor;
    dialogFireball.style.backgroundColor = newColor;
  };

  var createWizard = function (wizard) {
    var template = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
    var wizardElement = template.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };

  var renderWizards = function (wizards) {
    var wizardsList = document.querySelector('.setup-similar-list');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < WIZARD_COUNT; i++) {
      fragment.append(createWizard(wizards[i + 5]));
    }
    wizardsList.append(fragment);
  };

  dialogWizardCoat.addEventListener('click', function () {
    changeWizardCoat();
  });

  dialogWizardEyes.addEventListener('click', function () {
    changeWizardEyes();
  });

  dialogFireball.addEventListener('click', function () {
    changeFireball();
  });

  dialogForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(dialogForm), onSaveSuccess, onError);
  });

  window.backend.load(onLoadSuccess, onError);
})();

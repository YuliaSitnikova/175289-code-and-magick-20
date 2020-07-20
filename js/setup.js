'use strict';

(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var dialog = document.querySelector('.setup');
  var dialogWizardCoat = dialog.querySelector('.setup-wizard .wizard-coat');
  var dialogWizardEyes = dialog.querySelector('.setup-wizard .wizard-eyes');
  var dialogFireball = dialog.querySelector('.setup-fireball-wrap');
  var dialogForm = dialog.querySelector('.setup-wizard-form');

  var onSaveSuccess = function () {
    window.dialog.hide();
  };

  var onSaveError = function (errorText) {
    var node = document.createElement('div');
    node.style = 'position: absolute; top: 0; right: 0; left: 0; z-index: 100; text-align: center; background-color: red;';
    node.textContent = errorText;
    document.body.prepend(node);
  };

  var setup = {
    onCoatChange: function () {},
    onEyesChange: function () {},
  };

  var changeWizardCoat = function () {
    var colorInput = document.querySelector('[name="coat-color"]');
    var color = colorInput.value;
    var newColor = window.util.getNextElement(COAT_COLORS, color);
    colorInput.value = newColor;
    dialogWizardCoat.style.fill = newColor;
    setup.onCoatChange(newColor);
  };

  var changeWizardEyes = function () {
    var colorInput = document.querySelector('[name="eyes-color"]');
    var color = colorInput.value;
    var newColor = window.util.getNextElement(EYES_COLORS, color);
    colorInput.value = newColor;
    dialogWizardEyes.style.fill = newColor;
    setup.onEyesChange(newColor);
  };

  var changeFireball = function () {
    var colorInput = document.querySelector('[name="fireball-color"]');
    var color = colorInput.value;
    var newColor = window.util.getNextElement(FIREBALL_COLORS, color);
    colorInput.value = newColor;
    dialogFireball.style.backgroundColor = newColor;
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
    window.backend.save(new FormData(dialogForm), onSaveSuccess, onSaveError);
  });

  window.setup = setup;

})();

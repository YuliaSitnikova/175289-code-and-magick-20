'use strict';

(function () {
  var WIZARD_COUNT = 4;

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
    wizardsList.innerHTML = '';
    var fragment = document.createDocumentFragment();
    var count = wizards.length > WIZARD_COUNT ? WIZARD_COUNT : wizards.length;
    for (var i = 0; i < count; i++) {
      fragment.append(createWizard(wizards[i]));
    }
    wizardsList.append(fragment);
  };

  window.wizards = {
    render: renderWizards
  };
})();

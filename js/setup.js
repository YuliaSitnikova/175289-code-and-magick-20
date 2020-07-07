'use strict';

var WIZARD_COUNT = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var dialog = document.querySelector('.setup');
var dialogSimilar = document.querySelector('.setup-similar');
var dialogOpenButton = document.querySelector('.setup-open');
var dialogCloseButton = dialog.querySelector('.setup-close');
var dialogUserName = dialog.querySelector('.setup-user-name');
var dialogWizardCoat = dialog.querySelector('.setup-wizard .wizard-coat');
var dialogWizardEyes = dialog.querySelector('.setup-wizard .wizard-eyes');
var dialogFireball = dialog.querySelector('.setup-fireball-wrap');

var onDialogEscPress = function (evt) {
  if (evt.key === 'Escape' && document.activeElement !== dialogUserName) {
    evt.preventDefault();
    hideDialog();
  }
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

var showDialog = function () {
  dialog.classList.remove('hidden');
  dialogSimilar.classList.remove('hidden');

  document.addEventListener('keydown', onDialogEscPress);
};

var hideDialog = function () {
  dialog.classList.add('hidden');
  dialogSimilar.classList.add('hidden');

  document.removeEventListener('keydown', onDialogEscPress);
};

var changeWizardCoat = function () {
  var colorInput = document.querySelector('[name="coat-color"]');
  var color = colorInput.value;
  var newColor = getNextElement(COAT_COLORS, color);
  colorInput.value = newColor;
  dialogWizardCoat.style.fill = newColor;
};

var changeWizardEyes = function () {
  var colorInput = document.querySelector('[name="eyes-color"]');
  var color = colorInput.value;
  var newColor = getNextElement(EYES_COLORS, color);
  colorInput.value = newColor;
  dialogWizardEyes.style.fill = newColor;
};

var changeFireball = function () {
  var colorInput = document.querySelector('[name="fireball-color"]');
  var color = colorInput.value;
  var newColor = getNextElement(FIREBALL_COLORS, color);
  colorInput.value = newColor;
  dialogFireball.style.backgroundColor = newColor;
};

var generateWizard = function () {
  var wizard = {
    name: getRandomElement(WIZARD_NAMES) + ' ' + getRandomElement(WIZARD_SURNAMES),
    coatColor: getRandomElement(COAT_COLORS),
    eyesColor: getRandomElement(EYES_COLORS),
  };
  return wizard;
};

var getWizards = function (count) {
  var wizards = [];
  for (var i = 0; i < count; i++) {
    wizards.push(generateWizard());
  }
  return wizards;
};

var createWizard = function (wizard) {
  var template = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var wizardElement = template.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var renderWizards = function (wizards) {
  var wizardsList = document.querySelector('.setup-similar-list');
  var fragment = document.createDocumentFragment();
  wizards.forEach(function (wizard) {
    fragment.append(createWizard(wizard));
  });
  wizardsList.append(fragment);
};

dialogOpenButton.addEventListener('click', function () {
  showDialog();
});

dialogOpenButton.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    showDialog();
  }
});

dialogCloseButton.addEventListener('click', function () {
  hideDialog();
});

dialogCloseButton.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    hideDialog();
  }
});

dialogWizardCoat.addEventListener('click', function () {
  changeWizardCoat();
});

dialogWizardEyes.addEventListener('click', function () {
  changeWizardEyes();
});

dialogFireball.addEventListener('click', function () {
  changeFireball();
});

var wizards = getWizards(WIZARD_COUNT);
renderWizards(wizards);

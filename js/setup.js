'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_COUNT = 4;

var dialog = document.querySelector('.setup');
var dialogSimilar = dialog.querySelector('.setup-similar');
var dialogSimilarList = dialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var wizards = [];

var showDialog = function () {
  dialog.classList.remove('hidden');
};

var showDialogSimilar = function () {
  dialogSimilar.classList.remove('hidden');
};

var getWizards = function (array) {
  for (var i = 0; i < WIZARD_COUNT; i++) {
    array.push(getWizard());
  }
  return array;
};

var getWizard = function () {
  var wizard = {
    name: WIZARD_NAMES[getRandom(0, WIZARD_NAMES.length - 1)] + ' ' + WIZARD_SURNAMES[getRandom(0, WIZARD_SURNAMES.length - 1)],
    coatColor: COAT_COLORS[getRandom(0, COAT_COLORS.length - 1)],
    eyesColor: EYES_COLORS[getRandom(0, EYES_COLORS.length - 1)]
  };
  return wizard;
};

var renderWizards = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.append(renderWizard(wizards[i]));
  }
  dialogSimilarList.append(fragment);
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

showDialog();
wizards = getWizards(wizards);
renderWizards();
showDialogSimilar();

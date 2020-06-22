'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_COUNT = 4;

var dialog = document.querySelector('.setup');
var dialogSimilar = document.querySelector('.setup-similar');

var getRandomElement = function (elements) {
  return elements[Math.floor(Math.random() * (elements.length))];
};

var showDialog = function () {
  dialog.classList.remove('hidden');
  dialogSimilar.classList.remove('hidden');
};

var generateWizard = function () {
  var wizard = {
    name: getRandomElement(WIZARD_NAMES) + ' ' + getRandomElement(WIZARD_SURNAMES),
    coatColor: getRandomElement(COAT_COLORS),
    eyesColor: getRandomElement(EYES_COLORS)
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

showDialog();
var wizards = getWizards(WIZARD_COUNT);
renderWizards(wizards);

'use strict';

(function () {
  var dialog = document.querySelector('.setup');
  var dialogOpenButton = document.querySelector('.setup-open');
  var dialogCloseButton = dialog.querySelector('.setup-close');
  var dialogHandle = dialog.querySelector('.upload');
  var dialogSimilar = document.querySelector('.setup-similar');
  var dialogUserName = dialog.querySelector('.setup-user-name');

  var onDialogEscPress = function (evt) {
    if (evt.key === 'Escape' && document.activeElement !== dialogUserName) {
      evt.preventDefault();
      hideDialog();
    }
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
    dialog.removeAttribute('style');
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

  dialogHandle.addEventListener('mousedown', function (evt) {
    var dragged = false;
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    var onMouseMove = function (moveEvt) {
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      if (shift.x !== 0 || shift.y !== 0) {
        dragged = true;
        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY,
        };
        dialog.style.top = (dialog.offsetTop - shift.y) + 'px';
        dialog.style.left = (dialog.offsetLeft - shift.x) + 'px';
      }
    };

    var onMouseUp = function () {
      if (dragged) {
        var onDraggedHandleClick = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandle.removeEventListener('click', onDraggedHandleClick);
        };
        dialogHandle.addEventListener('click', onDraggedHandleClick);
      }
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();

'use strict';

(function () {
  var fileTypes = ['jpg', 'jpeg', 'png', 'gif'];
  var fileInput = document.querySelector('.upload [type="file"]');
  var picture = document.querySelector('.setup-user-pic');

  fileInput.addEventListener('change', function () {
    var file = fileInput.files[0];
    if (file !== undefined) {
      var fileName = file.name.toLowerCase();
      var matches = fileTypes.some(function (item) {
        return fileName.endsWith(item);
      });
      if (matches) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          picture.src = reader.result;
        });
        reader.readAsDataURL(file);
      }
    }
  });
})();

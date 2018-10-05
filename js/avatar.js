'use strict';

(function () {

  var AVATAR_FILE_EXT = ['gif', 'jpg', 'jpeg', 'png'];
  var avatarUploadFile = document.querySelector('.upload input[type=file]');
  var avatarImg = document.querySelector('.setup-user-pic');

  avatarUploadFile.addEventListener('change', function () {

    var avatarFile = avatarUploadFile.files[0];

    if (avatarFile) {
      var avatarFileName = avatarFile.name.toLowerCase();

      var ismatch = AVATAR_FILE_EXT.some(function (itr) {
        return avatarFileName.endsWith(itr);
      });

      if (ismatch) {
        var fileReader = new FileReader();

        fileReader.addEventListener('load', function () {
          // меняем на форме диалога
          avatarImg.src = fileReader.result;
          // меняем на главной форме - иначе не понятно зачем меняли в диалоге
          document.querySelector('.setup-open-icon').src = fileReader.result;
        });

        fileReader.readAsDataURL(avatarFile);

      }
    }
  });

})();

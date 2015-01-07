adsApp.directive('browseImage', function () {
    return {
        templateUrl: 'templates/directives/browse-image.html',
        link: function (scope, element, attrs) {
            $(element).children('.upload-input').change(function () {
                var file = this.files[0];
                var reader = new FileReader();
                reader.onload = function () {
                    var base64Str = reader.result;
                    $(attrs.preview).attr('src', base64Str);
                    scope[attrs.image](base64Str);
                };
                reader.readAsDataURL(file);
            });
        }
    };
});
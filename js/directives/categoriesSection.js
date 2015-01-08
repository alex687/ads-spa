adsApp.directive('categoriesSection', function () {
    return {
        controller: function ($scope, adsData) {
            adsData.getAllCategories().success(function (categories) {
                $scope.categories = categories;
            })
        },
        templateUrl: 'templates/directives/categories-section.html'
    };
});
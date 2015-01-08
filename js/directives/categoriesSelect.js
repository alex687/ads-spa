adsApp.directive('categoriesSelect', function () {
    return {
        scope: {},
        controller: function ($scope, adsData) {
            adsData.getAllCategories().success(function (categories) {
                $scope.categories = categories;
            })
        },
        templateUrl: 'templates/directives/categories-select.html'
    };
});
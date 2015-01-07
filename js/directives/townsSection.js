adsApp.directive('townsSection', function () {
    return {
        scope: {},
        controller: function ($scope, adsData) {
            adsData.getALlTowns().success(function (towns) {
                $scope.towns = towns;
            })
        },
        templateUrl: 'templates/directives/towns-section.html'
    };
});
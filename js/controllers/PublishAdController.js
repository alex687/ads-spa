'use strict';

adsApp.controller('PublishAdController', function HomeController($scope, adsData) {
    $scope.publishAdAlert = false;
    adsData.getAllCategories().success(function (categories) {
        $scope.categories = categories;
    });

    $scope.publish = function (ad) {
        adsData.createNewAd(ad).$promise.then(function (data) {
            $scope.publishAdAlert = false;

            $state.go('home');
        }, function (data) {
            $scope.publishAdAlert = true;
            $scope.alertMessage = data.error_description
        });
    };

    $scope.$emit('changePageName', 'Publish new Ad');
});
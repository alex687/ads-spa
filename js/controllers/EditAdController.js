'use strict';

adsApp.controller('EditAdController', function PublishAdController($scope, adsData) {
    $scope.publishAdAlert = false;
    $scope.publishAdSuccess = false;

    $scope.ad = {};
    adsData.getAllCategories().success(function (categories) {
        $scope.categories = categories;
    });

    adsData.getALlTowns().success(function (towns) {
        $scope.towns = towns;
    });

    $scope.publish = function (ad) {
        adsData.createNewAd(ad).$promise.then(function (data) {
            $scope.publishAdAlert = false;
            $scope.publishAdSuccess = true;
            $scope.successMessage = data.message;
            $state.go('home');
        }, function (data) {
            $scope.publishAdAlert = true;
            $scope.alertMessage = data.error_description
        });
    };

    $scope.imageSetData = function(imageData){
        $scope.ad.imageDataUrl = imageData;
    };

    $scope.$emit('changePageName', 'Publish new Ad');
});
'use strict';

adsApp.controller('EditAdController', function PublishAdController($scope, adsData, $stateParams) {
    $scope.showAlert = false;
    $scope.showSucces = false;
    $scope.showForm = false;
    $scope.ad = {};
    $scope.imageDataUrl = 'img/no-image.PNG';

    adsData.getAllCategories().success(function (categories) {
        $scope.categories = categories;
    });

    adsData.getALlTowns().success(function (towns) {
        $scope.towns = towns;
    });

    adsData.getAdById($stateParams.adId).$promise.then(function (ad) {
        $scope.ad = ad;
        $scope.imageDataUrl = ad.imageDataUrl;
        $scope.showForm = true;
    });

    $scope.submit = function (ad) {
        adsData.editAd($stateParams.adId, ad).$promise.then(function (data) {
            $scope.showAlert = false;
            $scope.showSucces = true;
            $scope.successMessage = data.message;
        }, function (data) {
            $scope.showAlert = true;
            $scope.alertMessage = data.error_description
        });
    };

    $scope.imageSetData = function (imageData) {
        $scope.ad.imageDataUrl = imageData;
    };

    $scope.pageName = 'Edit Ad';
    $scope.buttonSubmitText = 'Edit';
    $scope.$emit('changePageName', $scope.pageName);
});
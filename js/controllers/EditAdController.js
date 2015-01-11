'use strict';

adsApp.controller('EditAdController', function PublishAdController($scope, adsData, $stateParams) {
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
        if (ad.imageDataUrl) {
            $scope.imageDataUrl = ad.imageDataUrl;
        }
        $scope.showForm = true;

    });

    $scope.submit = function (ad) {
        adsData.editAd($stateParams.adId, ad).$promise.then(function (data) {
            $scope.$emit('showSuccess', data.message);
            ad.changeImage = false;
        }, function (request) {
            $scope.$emit('showAlert', request.data.message);
        });
    };

    $scope.deleteImage = function (ad) {
        var oldImageDataUrl = ad.imageDataUrl;
        delete ad.imageDataUrl;
        ad.changeImage = true;

        adsData.editAd($stateParams.adId, ad).$promise.then(function (data) {
            $scope.$emit('showSuccess', data.message);

            $scope.imageDataUrl = 'img/no-image.PNG';
            ad.changeImage = false;
        }, function (data) {
            $scope.$emit('showAlert', data.error_description);

            ad.imageDataUrl = oldImageDataUrl;
            ad.changeImage = false;
        });
    };


    $scope.imageSetData = function (imageData) {
        $scope.ad.imageDataUrl = imageData;
        $scope.ad.changeImage = true;
    };

    $scope.pageName = 'Edit Ad';
    $scope.buttonSubmitText = 'Edit';
    $scope.$emit('changePageName', $scope.pageName);
});
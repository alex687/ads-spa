'use strict';

adsApp.controller('PublishAdController', function PublishAdController($scope, adsData) {
    $scope.showForm = true;
    $scope.ad = {};
    $scope.imageDataUrl = 'img/no-image.PNG';

    adsData.getAllCategories().success(function (categories) {
        $scope.categories = categories;
    });

    adsData.getALlTowns().success(function (towns) {
        $scope.towns = towns;
    });

    $scope.submit = function (ad) {
        adsData.createNewAd(ad).$promise.then(function (data) {
            $scope.$emit('showSuccess', data.message);
        }, function (request) {
            $scope.$emit('showAlert', request.data.message);
        });
    };

    $scope.imageSetData = function(imageData){
        $scope.ad.imageDataUrl = imageData;
    };

    $scope.pageName = 'Publish new Ad';
    $scope.buttonSubmitText= 'Publish';
    $scope.$emit('changePageName', $scope.pageName);
});
'use strict';

adsApp.controller('DeleteAdController', function PublishAdController($scope, adsData, $stateParams) {
    $scope.showAlert = false;
    $scope.showSucces = false;
    $scope.showForm = false;

    adsData.getAdById($stateParams.adId).$promise.then(function(ad){
        $scope.ad = ad;
        $scope.showForm = true;
    });

    $scope.delete = function () {
        adsData.deleteAd($stateParams.adId).$promise.then(function (data) {
            $scope.showAlert = false;
            $scope.showSucces = true;
            $scope.successMessage = data.message;
        }, function (data) {
            $scope.showAlert = true;
            $scope.alertMessage = data.error_description
        });
    };

    $scope.pageName = 'Delete Ad';
    $scope.$emit('changePageName', $scope.pageName);
});
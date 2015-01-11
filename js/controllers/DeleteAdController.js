'use strict';

adsApp.controller('DeleteAdController', function PublishAdController($scope, adsData, $stateParams) {
    $scope.showForm = false;

    adsData.getAdById($stateParams.adId).$promise.then(function(ad){
        $scope.ad = ad;
        $scope.showForm = true;
    });

    $scope.delete = function () {
        adsData.deleteAd($stateParams.adId).$promise.then(function (data) {
            $scope.$emit('showSuccess', data.message);
        }, function (request) {
            $scope.$emit('showAlert', request.data.message);
        });
    };

    $scope.pageName = 'Delete Ad';
    $scope.$emit('changePageName', $scope.pageName);
});
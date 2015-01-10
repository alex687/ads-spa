'use strict';

adsApp.controller('AdminDeleteAdController', function PublishAdController($scope, adsData, $stateParams) {
    $scope.showForm = false;

    adsData.admin.getAd($stateParams.adId).$promise.then(function (ad) {
        $scope.ad = ad;
        $scope.showForm = true;
    });

    $scope.delete = function () {
        adsData.admin.deleteAd($stateParams.adId).$promise.then(function (data) {
            $scope.$emit('showSuccess', data.message);
        }, function (data) {
            $scope.$emit('showAlert', data.error_description);

        });
    };

    $scope.pageName = 'Admin Delete Ad';
    $scope.$emit('changePageName', $scope.pageName);
});
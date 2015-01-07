'use strict';

adsApp.controller('UserAdsController', function UserAdsController($scope, adsData, authorization, pageSize) {
    var params = {PageSize: pageSize};
    $scope.areAdsLoaged = false;

    $scope.changeStatusFilter = function (status) {
        params.status = status;
        loadAds(params);
    };

    $scope.removeStatusFilter = function () {
        delete  params['status'];
        loadAds(params);
    };

    $scope.pageSize = pageSize;

    $scope.pageChanged = function () {
        params.StartPage = $scope.currentPage;
        loadAds(params)
    };

    if (authorization.isLogged()) {
        $scope.menu = 'templates/logged-menu.html';
    }
    else {
        $scope.menu = 'templates/guest-menu.html';
    }

    $scope.$emit('changePageName', 'My ads');

    function loadAds(params) {
        adsData.getAllUerAds(params).$promise.then(function (data) {
            $scope.ads = data.ads;
            $scope.areAdsLoaged = true;
            $scope.totalItems = data.numItems;
        });
    }

    loadAds(params);
});
'use strict';

adsApp.controller('AdminHomeController', function AdminHomeController($scope, adsData, pageSize) {
    var params = {PageSize: pageSize};
    $scope.areAdsLoaged = false;

    $scope.filterByCategory = function (categoryId) {
        params.categoryId = categoryId;
        loadAds(params);
    };

    $scope.filterByTown = function (townId) {
        params.townId = townId;
        loadAds(params);
    };

    $scope.removeTownFiltration = function () {
        delete  params['townId'];
        loadAds(params);
    };

    $scope.removeCategoryFiltration = function () {
        delete  params['categoryId'];
        loadAds(params);
    };

    $scope.pageSize = pageSize;

    $scope.pageChanged = function () {
        params.StartPage = $scope.currentPage;
        loadAds(params)
    };

    $scope.approve = function (ad) {
        adsData.admin.approveAd(ad.id).$promise.then(function () {
            ad.status = 'Published';
        });
    };

    $scope.reject = function (ad) {
        adsData.admin.rejectAd(ad.id).$promise.then(function () {
            ad.status = 'Inactive';
        });
    };

    $scope.$emit('changePageName', 'Admin Home');

    function loadAds(params) {
        adsData.admin.getAllAds(params).$promise.then(function (data) {
            $scope.ads = data.ads;
            $scope.areAdsLoaged = true;
            $scope.totalItems = data.numItems;
        });
    }

    loadAds(params);
});
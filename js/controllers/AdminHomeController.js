'use strict';

adsApp.controller('AdminHomeController', function AdminHomeController($scope, adsData, authorization, pageSize) {
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

    $scope.$emit('changePageName', 'Home');

    function loadAds(params) {
        adsData.getAllPublishedAds(params).success(function (data) {
            $scope.ads = data.ads;
            $scope.areAdsLoaged = true;
            $scope.totalItems = data.numItems;
        });
    }

    loadAds(params);
});
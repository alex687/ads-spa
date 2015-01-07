'use strict';

adsApp.controller('HomeController', function HomeController($scope, adsData, authorization, pageSize) {
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

    if (authorization.isLogged()) {
        $scope.menu = 'templates/logged-menu.html';
    }
    else {
        $scope.menu = 'templates/guest-menu.html';
    }

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
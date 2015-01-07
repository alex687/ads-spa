'use strict';

adsApp.controller('UserAdsController', function UserAdsController($scope, adsData, authorization, pageSize) {
    var params = {PageSize: pageSize};

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

    $scope.$emit('changePageName', 'My ads');

    function loadAds(params) {
        adsData.getAllUerAds(params).$promise.then(function (data) {
            $scope.ads = data.ads;
            $scope.totalItems = data.numItems;
        });
    }

    loadAds(params);
});
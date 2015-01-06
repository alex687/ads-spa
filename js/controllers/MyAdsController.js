'use strict';

adsApp.controller('MyAdsController', function HomeController($scope, adsData, authorization) {
    var params = {PageSize: 5};

    adsData.getAllCategories().success(function (data) {
        $scope.categories = data;
    });

    adsData.getALlTowns().success(function (data) {
        $scope.towns = data;
    });

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

    $scope.totalItems = 64;
    $scope.currentPage = 4;
    $scope.maxSize = 5;

    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function() {
        $log.log('Page changed to: ' + $scope.currentPage);
    };

    if (authorization.isLogged()) {
        $scope.menu = 'templates/logged-menu.html';
    }
    else {
        $scope.menu = 'templates/guest-menu.html';
    }

    $scope.$emit('changePageName',  'Home');

    function loadAds(params) {
        adsData.getAllPublishedAds(params).success(function (data) {
            $scope.ads = data.ads;
            console.log(data);
        });
    }
    loadAds(params);
});
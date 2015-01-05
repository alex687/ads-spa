'use strict';

adsApp.controller('HomeController', function HomeController($scope, adsData, $routeParams) {
    var params = {PageSize: 5};
    if ($routeParams.townId) {
        params.TownId = $routeParams.townId;
    }

    if ($routeParams.categoryId) {
        params.CategoryId = $routeParams.categoryId;
    }

    adsData.getAllPublishedAds(params).success(function (data) {
        $scope.ads = data.ads;
    });

    adsData.getAllCategories().success(function (data) {
        $scope.categories = data;
    });

    adsData.getALlTowns().success(function (data) {
        $scope.towns = data;
    });

    $scope.getCategoryUrl = function (categoryId) {
        if ($routeParams.townId) {
            return "#/town/" + $routeParams.townId + "/category/" + categoryId;
        }

        return "#/category/" + categoryId;
    };

    $scope.getTownUrl = function (townId) {
        if ($routeParams.categoryId) {
            return "#/town/" + townId + "/category/" + $routeParams.categoryId;
        }

        return "#/town/" + townId;
    };

    $scope.removeTownFiltrationUrl = function () {
        if($routeParams.categoryId){
            return '#/category/' + $routeParams.categoryId;
        }

        return '#/';
    };

    $scope.removeCategoryFiltrationUrl = function () {
        if($routeParams.townId){
            return '#/town/' + $routeParams.townId;
        }

        return '#/';
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


    $scope.$emit('changePageName',  'Home');

});
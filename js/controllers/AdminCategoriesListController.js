'use strict';

adsApp.controller('AdminCategoriesListController', function AdminCategoriesListController($scope, adsData, pageSize, $state) {
    var params = {PageSize: pageSize * 3, SortBy: 'Id'};
    $scope.pageSize = pageSize * 3;


    $scope.pageChanged = function () {
        params.StartPage = $scope.currentPage;
        loadCategories(params);
    };

    $scope.sort = function sortCategories(by) {
        if (params.SortBy == by && by[0] != '-') {
            params.SortBy = '-' + by;
        }
        else {
            if ((params.SortBy == by && by[0] == '-') || params.SortBy != by) {
                params.SortBy = by;
            }
        }
        loadCategories();
    };

    $scope.forEdit = function (category) {
        adsData.admin.towns.saveTownData(category);
        $state.transitionTo('admin-towns-edit', {'townId': category.id});
    };

    $scope.forDelete = function (category) {
        adsData.admin.towns.saveTownData(category);
        $state.transitionTo('admin-towns-delete', {'townId': category.id});
    };

    $scope.$emit('changePageName', 'Admin Categories');

    function loadCategories() {
        adsData.admin.categories.getAll(params).$promise.then(function (data) {
            $scope.items = data.towns;
            $scope.totalItems = data.numItems;
            $scope.areUsersLoaged = true;
        });
    }

    loadCategories();
});
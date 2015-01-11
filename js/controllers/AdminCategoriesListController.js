'use strict';

adsApp.controller('AdminCategoriesListController', function AdminCategoriesListController($scope, adsData, pageSize, $state, storageData) {
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
        storageData.save('category_data',category);
        $state.transitionTo('admin-categories-edit', {'categoryId': category.id});
    };

    $scope.forDelete = function (category) {
        storageData.save('category_data',category);
        $state.transitionTo('admin-categories-delete', {'categoryId': category.id});
    };

    $scope.$emit('changePageName', 'Admin Categories');

    function loadCategories() {
        adsData.admin.categories.getAll(params).$promise.then(function (data) {
            $scope.items = data.categories;
            $scope.totalItems = data.numItems;
            $scope.areUsersLoaged = true;
        });
    }

    loadCategories();
});
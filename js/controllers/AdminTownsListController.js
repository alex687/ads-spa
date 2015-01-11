'use strict';

adsApp.controller('AdminUserListController', function AdminUserListController($scope, adsData, pageSize, $state) {
    var params = {PageSize: pageSize * 3, SortBy: 'Id'};
    $scope.pageSize = pageSize * 3;


    $scope.pageChanged = function () {
        params.StartPage = $scope.currentPage;
        loadTowns(params);
    };

    $scope.sort = function sortTowns(by) {
        if (params.SortBy == by && by[0] != '-') {
            params.SortBy = '-' + by;
        }
        else {
            if ((params.SortBy == by && by[0] == '-') || params.SortBy != by) {
                params.SortBy = by;
            }
        }
        loadTowns();
    };

    $scope.forEdit = function (town) {
        console.log(town);
        adsData.admin.towns.saveTownData(town);
        $state.transitionTo('admin-towns-edit', {'townId': town.id});
    };

    $scope.forDelete = function (town) {
        adsData.admin.towns.saveTownData(town);
        $state.transitionTo('admin-towns-delete', {'townId': town.id});
    };

    $scope.$emit('changePageName', 'Admin Towns');

    function loadTowns() {
        adsData.admin.towns.getAll(params).$promise.then(function (data) {
            $scope.items = data.towns;
            $scope.totalItems = data.numItems;
            $scope.areUsersLoaged = true;
        });
    }

    loadTowns();
});
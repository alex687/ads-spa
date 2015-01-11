'use strict';

adsApp.controller('AdminTownsListController', function AdminTownsListController($scope, adsData, pageSize, $state, storageData) {
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
        storageData.save('town_data',town);
        $state.transitionTo('admin-towns-edit', {'townId': town.id});
    };

    $scope.forDelete = function (town) {
        storageData.save('town_data',town);
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
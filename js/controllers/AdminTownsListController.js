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

    $scope.userForEdit = function (user) {
        adsData.admin.saveUserData(user);
        $state.transitionTo('admin-towns-edit', {'userId': user.id});
    };

    $scope.userForDelete = function (user) {
        adsData.admin.saveUserData(user);
        $state.transitionTo('admin-towns-delete', {'userId': user.id});
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
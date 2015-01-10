'use strict';

adsApp.controller('AdminUserListController', function AdminHomeController($scope, userData, pageSize, $state) {
    var params = {PageSize: pageSize * 3, SortBy: 'Id'};
    $scope.pageSize = pageSize * 3;


    $scope.pageChanged = function () {
        params.StartPage = $scope.currentPage;
        loadUsers(params)
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
        loadUsers();
    };

    $scope.userForEdit = function (user) {
        userData.admin.saveUserData(user);
        $state.transitionTo('admin-user-edit', {'userId': user.id});
    };

    $scope.userForDelete = function (user) {
        userData.admin.saveUserData(user);
        $state.transitionTo('admin-user-delete', {'userId': user.id});
    };


    function loadTowns() {
        userData.admin.getAll(params).$promise.then(function (data) {
            $scope.users = data.users;
            $scope.totalItems = data.numItems;
            $scope.areUsersLoaged = true;
        });
    }

    loadUsers();
});
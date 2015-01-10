'use strict';

adsApp.controller('AdminUserListController', function AdminHomeController($scope, userData, pageSize) {
    var params = {PageSize: pageSize * 3, SortBy: 'UserName'};
    $scope.pageSize = pageSize * 3;


    $scope.pageChanged = function () {
        params.StartPage = $scope.currentPage;
        loadUsers(params)
    };

    $scope.sortUsers = function sortUsers(by) {
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

    function loadUsers() {
        userData.admin.getAll(params).$promise.then(function (data) {
            $scope.users = data.users;
            $scope.totalItems = data.numItems;
            $scope.areUsersLoaged = true;
        });
    }

    loadUsers();
});
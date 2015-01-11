'use strict';

adsApp.controller('AdminDeleteUserController', function AdminDeleteUserController($scope, userData, $stateParams, $state, storageData) {
    $scope.showForm = true;

    var user = userData.admin.getUser($stateParams.userId);
    if (!user) {
        $state.go('admin-users-list');
    }

    $scope.user = user;
    $scope.delete = function () {
        userData.admin.deleteUser($scope.user.username).$promise.then(function (data) {
            $scope.$emit('showSuccess', data.message);
            storageData.remove('user_data');
        }, function (data) {
            $scope.$emit('showAlert', data.error_description);
        });
    };

    $scope.pageName = 'Admin Delete User';
    $scope.$emit('changePageName', $scope.pageName);
});
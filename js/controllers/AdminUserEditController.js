'use strict';

adsApp.controller('AdminUserEditController', function UserProfileEdit($scope, userData, adsData, $stateParams, $state, storageData) {
    $scope.emailValidationPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    $scope.passwordPattern = /^[\s\S]{2,100}$/;

    $scope.editProfile = function (user) {
        userData.admin.editProfile(user.username, user.name, user.email, user.phoneNumber, user.townId).$promise.then(function (data) {
                $scope.$emit('showSuccess', data.message);
                storageData.save('user_data', user);
            },
            function (data) {
                $scope.$emit('showAlert', data.message);
            });
    };

    $scope.changePassword = function (user) {
        userData.admin.setPassword(user.username, user.newPassword, user.confirmPassword).$promise.then(function (data) {
                $scope.$emit('showSuccess', data.message);
            },
            function () {
                $scope.$emit('showAlert', data.message);
            });
    };

    var user = userData.admin.getUser($stateParams.userId);
    if (!user) {
        $state.go('admin-users-list');
    }

    $scope.user = user;

    adsData.getALlTowns().success(function (data) {
        $scope.towns = data;
    });

    $scope.$emit('changePageName', 'Edit profile');

});
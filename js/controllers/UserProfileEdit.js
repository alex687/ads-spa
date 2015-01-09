'use strict';

adsApp.controller('UserProfileEdit', function UserProfileEdit($scope, userData, adsData) {
    $scope.emailValidationPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    $scope.passwordPattern = /^[\s\S]{2,100}$/;

    $scope.editProfile = function (user) {
        userData.editProfile(user.name, user.email, user.phoneNumber, user.townId).$promise.then(function (data) {
                $scope.$emit('showSuccess', data.message);
            },
            function (data) {
                $scope.$emit('showAlert', data.message);
            });
    };

    $scope.changePassword = function (user) {
        userData.changePassword(user.oldPassword, user.newPassword, user.confirmPassword).$promise.then(function (data) {
                $scope.$emit('showSuccess', data.message);
            },
            function () {
                $scope.$emit('showAlert', data.message);
            });
    };

    userData.getProfile().$promise.then(function (data) {
        $scope.user = data;
    });

    adsData.getALlTowns().success(function (data) {
        $scope.towns = data;
    });

    $scope.$emit('changePageName', 'Edit profile');

});
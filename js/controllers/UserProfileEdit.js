'use strict';

adsApp.controller('UserProfileEdit', function UserProfileEdit($scope, userData) {
    $scope.emailValidationPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    $scope.passwordPattern = /^[\s\S]{2,100}$/;

    $scope.editProfile = function (user) {
        userData.editProfile(user.name, user.email, user.phone, user.townId).$promise.then(function (data) {
                //TODO Show success
            },
            function () {
                //TODO Show error
            });
    };

    $scope.changePassword = function (user) {
        userData.changePassword(user.oldPassword, user.newPassword, user.confirmPassword).$promise.then(function (data) {
                //TODO Show success
            },
            function () {
                //TODO Show error
            });
    };

    //TODO load towns
});
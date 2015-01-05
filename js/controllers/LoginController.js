'use strict';

adsApp.controller('LoginController', function LoginController($scope, userData, authorization) {
    $scope.$emit('changePageName', 'Login');
    $scope.loginAlert = false;

    $scope.login = function (user) {
        userData.login(user.username, user.password).success(function (data) {
            $scope.loginAlert = false;
            authorization.saveCredentials(data);
        }).error(function (data) {
            $scope.loginAlert = true;
            $scope.alertMessage = data.error_description
        });
    };
});
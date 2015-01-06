'use strict';

adsApp.controller('LoginController', function LoginController($scope, userData, authorization, $state) {
    $scope.$emit('changePageName', 'Login');
    $scope.registerAlert = false;

    $scope.login = function (user) {
        userData.login(user.username, user.password).success(function (data) {
            $scope.registerAlert = false;
            authorization.saveCredentials(data);
            $state.go('home');
        }).error(function (data) {
            $scope.registerAlert = true;
            $scope.alertMessage = data.error_description
        });
    };
});
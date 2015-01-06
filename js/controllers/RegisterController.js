'use strict';

adsApp.controller('RegisterController', function RegisterController($scope, userData, authorization, $state, adsData) {
    $scope.$emit('changePageName', 'Registration');
    $scope.registerAlert = false;
    $scope.emailValidationPattern =  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    $scope.passwordPattern = /^[\s\S]{2,100}$/;

    adsData.getALlTowns().success(function (data) {
       $scope.towns = data;
    });

    $scope.register = function (user) {
        userData.register(user.username, user.password).success(function (data) {
            $scope.registerAlert = false;
            authorization.saveCredentials(data);
            $state.go('home');
        }).error(function (data) {
            $scope.registerAlert = true;
            $scope.alertMessage = data.error_description
        });
    };
});
'use strict';

adsApp.controller('RegisterController', function RegisterController($scope, userData, authorization, $state, adsData) {
    $scope.$emit('changePageName', 'Registration');
    $scope.emailValidationPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    $scope.passwordPattern = /^[\s\S]{1,100}$/;

    adsData.getALlTowns().success(function (data) {
        $scope.towns = data;
    });

    $scope.register = function (user) {
        userData.register(user.username, user.password, user.confirmPassword, user.name, user.email, user.phone, user.townId)
            .$promise.then(function (data) {
                $scope.registerAlert = false;
                authorization.saveCredentials(data);
                $state.go('home');
            }, function (request) {
                $scope.$emit('showAlert', request.data.modelState[Object.keys(request.data.modelState)[0]]);
            });
    };
});
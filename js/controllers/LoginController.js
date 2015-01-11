'use strict';

adsApp.controller('LoginController', function LoginController($scope, userData, authorization, $state) {
    $scope.$emit('changePageName', 'Login');

    $scope.login = function (user) {
        userData.login(user.username, user.password).$promise.then(function (data) {
            authorization.saveCredentials(data);
            $state.go('user-home');
        }, function (request) {
            $scope.$emit('showAlert', request.data.error_description);
        });
    };
});
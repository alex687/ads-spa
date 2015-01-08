'use strict';

adsApp.controller('LogoutController', function LogoutController($scope, userData, authorization, $state) {
    $scope.$emit('changePageName', 'Logout');

    authorization.logout();
    $state.go('home');
});
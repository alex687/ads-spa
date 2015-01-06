'use strict';

adsApp.controller('PublishAdController', function HomeController($scope, adsData, authorization) {
    $scope.publishAdAlert = false;
    $scope.publish = function (ad) {
        userData.login().success(function (data) {
            $scope.publishAdAlert = false;
            authorization.saveCredentials(data);
            $state.go('home');
        }).error(function (data) {
            $scope.publishAdAlert = true;
            $scope.alertMessage = data.error_description
        });
    };

    $scope.$emit('changePageName', 'Publish new Ad');
});
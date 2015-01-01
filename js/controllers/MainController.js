'use strict';

adsApp.controller('MainController', function LoginController($scope) {
    $scope.$on('changePageName', function (event, pageName) {
        $scope.pageName = pageName;
    });
});
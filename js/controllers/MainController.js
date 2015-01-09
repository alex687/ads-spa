'use strict';

adsApp.controller('MainController', function LoginController($scope) {
    $scope.$on('changePageName', function (event, pageName) {
        $scope.pageName = pageName;
        //Hiding the Alert and Success messages
        $scope.showAlert = false;
        $scope.showSuccess = false;
    });


    $scope.$on('showAlert', function (event, message) {
        $scope.showAlert = true;
        $scope.showSuccess = false;

        $scope.alertMessage = message;
    });

    $scope.$on('showSuccess', function (event, message) {
        $scope.showAlert = false;
        $scope.showSuccess = true;

        $scope.successMessage = message;
    });
});
'use strict';

adsApp.controller('AdminDeleteUserController', function AdminDeleteUserController($scope, userData, $stateParams) {
    $scope.showForm = true;

    $scope.user = userData.admin.getSavedUserData();

    $scope.delete = function () {
        userData.admin.de($stateParams.adId).$promise.then(function (data) {
            $scope.$emit('showSuccess', data.message);
        }, function (data) {
            $scope.$emit('showAlert', data.error_description);

        });
    };

    $scope.pageName = 'Admin Delete User';
    $scope.$emit('changePageName', $scope.pageName);
});
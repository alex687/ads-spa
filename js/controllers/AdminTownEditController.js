'use strict';

adsApp.controller('AdminTownCreateController', function AdminUserListController($scope, adsData) {

    $scope.name = adsData.admin.towns.

    $scope.submit = function (name) {
        adsData.admin.towns.edit(name).$promise.then(function (data) {
                $scope.$emit('showSuccess', data.message);
            },
            function (data) {
                $scope.$emit('showAlert', data.message);
            });
    };

    $scope.buttonText = 'Edit Town';
    $scope.$emit('changePageName', 'Admin Town edit');
});
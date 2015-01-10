'use strict';

adsApp.controller('AdminTownCreateController', function AdminUserListController($scope, adsData) {

    $scope.submit = function (name) {
        adsData.admin.towns.create(name).$promise.then(function (data) {
                $scope.$emit('showSuccess', data.message);
            },
            function (data) {
                $scope.$emit('showAlert', data.message);
            });
    };

    $scope.buttonText = 'Create Town';
    $scope.$emit('changePageName', 'Admin Town create');
});
'use strict';

adsApp.controller('AdminCategoriesCreateController', function AdminCategoriesCreateController($scope, adsData) {

    $scope.submit = function (name) {
        adsData.admin.categories.create(name).$promise.then(function (data) {
                $scope.$emit('showSuccess', data.message);
            },
            function (data) {
                $scope.$emit('showAlert', data.message);
            });
    };

    $scope.buttonText = 'Create Category';
    $scope.$emit('changePageName', 'Admin Category create');
});
'use strict';

adsApp.controller('AdminCategoriesDeleteController', function AdminCategoriesDeleteController($scope, adsData, $stateParams, $state, storageData) {

    var categoryData = adsData.admin.categories.getCategory($stateParams.categoryId);
    if (!categoryData) {
        $state.go('admin-categories-list');
    }
    $scope.name = categoryData.name;
    $scope.disabled = true;
    $scope.submit = function (name) {
        adsData.admin.categories.delete(categoryData.id).$promise.then(function (data) {
                storageData.remove('category_data');
                $scope.$emit('showSuccess', data.message);
            },
            function (data) {
                $scope.$emit('showAlert', data.message);
            });
    };

    $scope.buttonText = 'Delete Category';
    $scope.$emit('changePageName', 'Admin Category delete');

});
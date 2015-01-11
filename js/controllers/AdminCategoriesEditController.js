'use strict';

adsApp.controller('AdminCategoriesEditController', function AdminCategoriesEditController($scope, adsData, $stateParams, $state, storageData) {

    var categoryData = adsData.admin.categories.getCategory($stateParams.categoryId);
    if (!categoryData) {
        $state.go('admin-categories-list');
    }
    $scope.name = categoryData.name;
    $scope.submit = function (name) {
        adsData.admin.categories.edit(categoryData.id, name).$promise.then(function (data) {
                $scope.$emit('showSuccess', data.message);
                categoryData.username = $scope.name;
                storageData.save('category_data',categoryData);
            },
            function (data) {
                $scope.$emit('showAlert', data.message);
            });
    };

    $scope.buttonText = 'Edit Category';
    $scope.$emit('changePageName', 'Admin Category edit');

});
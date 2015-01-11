'use strict';

adsApp.controller('AdminTownEditController', function AdminTownEditController($scope, adsData, $stateParams, $state) {

    var townData = adsData.admin.towns.getTown($stateParams.townId);
    if (!townData) {
        $state.go('admin-towns-list');
    }

    $scope.name = townData.name;
    $scope.submit = function (name) {
        adsData.admin.towns.edit(townData.id, name).$promise.then(function (data) {
                $scope.$emit('showSuccess', data.message);
                townData.username = $scope.name;
                adsData.admin.towns.saveTownData(townData);
            },
            function (data) {
                $scope.$emit('showAlert', data.message);
            });
    };

    $scope.buttonText = 'Edit Town';
    $scope.$emit('changePageName', 'Admin Town edit');

});
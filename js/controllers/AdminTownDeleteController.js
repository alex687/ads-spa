'use strict';

adsApp.controller('AdminTownDeleteController', function AdminTownDeleteController($scope, adsData, $stateParams, $state) {

    var townData = adsData.admin.towns.getTown($stateParams.townId);
    if (!townData) {
        $state.go('admin-towns-list');
    }

    $scope.name = townData.name;
    $scope.disabled = true;
    $scope.submit = function (name) {
        adsData.admin.towns.delete(townData.id).$promise.then(function (data) {
                adsData.admin.towns.removeTownData(townData);
                $scope.$emit('showSuccess', data.message);
            },
            function (data) {
                $scope.$emit('showAlert', data.message);
            });
    };

    $scope.buttonText = 'Delete Town';
    $scope.$emit('changePageName', 'Admin Town delete');

});
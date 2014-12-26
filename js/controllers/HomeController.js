'use strict';

adsApp.controller('HomeController', function HomeController($scope, adsData, $location) {
    console.log($location);
    adsData.getAllCategories().success(function(data){
            $scope.categories = data;
    });

    adsData.getALlTowns().success(function (data) {
        $scope.towns = data;
    });


    adsData.getAllPublishedAds().success(function(data){
        $scope.ads = data.ads;
        console.log(data);
    });

    $scope.changeCategory = function(){
        return $location.url();
    };
    
    $scope.changeTown = function () {
        
    };

});
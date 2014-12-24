'use strict';

adsApp.controller('HomeController', function HomeController($scope, adsData) {
    adsData.getAllPublishedAds().success(function(data){{
        $scope.ads = data.ads;
        console.log(data);
    }})
});
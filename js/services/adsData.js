'use strict';

adsApp.factory('adsData', function ($q, $http, serviceBaseUrl) {

    function getAllPublishedAds(params) {
        return $http({method: 'GET', url: serviceBaseUrl + 'ads/', params: params});
    }

    function getAllCategories() {
       return $http({method: 'GET', url: serviceBaseUrl + 'categories/'});
    }

    function getAllTowns() {
        return $http({method: 'GET', url: serviceBaseUrl + 'towns/'});
    }

    function createAd(title, text, optionalData){
        var data = optionalData || {};
        data.title = title;
        data.text = text;

        return $http.post(serviceBaseUrl + 'user/ads', data);
    }

    return {
        getAllPublishedAds: getAllPublishedAds,
        getALlTowns: getAllTowns,
        getAllCategories: getAllCategories
    }
});
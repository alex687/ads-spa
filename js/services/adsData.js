'use strict';

adsApp.factory('adsData', function ($resource, $http, serviceBaseUrl, authorization) {

    function getAllPublishedAds(params) {
        return $http({method: 'GET', url: serviceBaseUrl + 'ads/', params: params});
    }

    function getAllCategories() {
        return $http({method: 'GET', url: serviceBaseUrl + 'categories/'});
    }

    function getAllTowns() {
        return $http({method: 'GET', url: serviceBaseUrl + 'towns/'});
    }

    var headers = {'Authorization' :authorization.getHeaders()};
    var resource = $resource(
        'http://softuni-ads.azurewebsites.net/api/user/ads/:id',
        null,
        {
            'save': {method: 'POST', headers: headers},
            'get': {method: 'GET', headers: headers},
            'update': {method: 'PUT', headers: headers},
        });

    function getAllUerAds(params) {
        return resource.get(params);
    }

    function createNewAd(ad) {
        return resource.save(ad);
    }

    function getAdById(id) {
        return resource.get({id: id});
    }

    function editAd(id, ad) {
        return resource.update({id: id}, ad);
    }

    function deleteAd(id) {
        return resource.delete({id: id});
    }


    return {
        getAllPublishedAds: getAllPublishedAds,
        getALlTowns: getAllTowns,
        getAllCategories: getAllCategories,
        getAllUerAds: getAllUerAds,
        createNewAd: createNewAd,
        getAdById: getAdById,
        editAd: editAd,
        deleteAd: deleteAd
    }
});
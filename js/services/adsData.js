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
        serviceBaseUrl +'user/ads/:id',
        null,
        {
            'save': {method: 'POST', headers: headers},
            'get': {method: 'GET', headers: headers},
            'update': {method: 'PUT', headers: headers},
            'delete': {method: 'DELETE', headers: headers},
            'deactivate': {url: serviceBaseUrl + 'user/ads/deactivate/:id', method: 'PUT', params: {id: '@id'}, headers: headers},
            'publishAgain': {url: serviceBaseUrl + 'user/ads/publishAgain/:id', method: 'PUT', params: {id: '@id'}, headers: headers}
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

    function deactivateAd(id){
        return resource.deactivate({id: id});
    }

    function publishAgain(id){
        return resource.publishAgain({id: id});
    }

    var adminResource = $resource(serviceBaseUrl + 'admin/', null , {
        'getAllAds': {url: serviceBaseUrl + 'admin/Ads', method: 'GET', headers: headers},
        'approveAd': {url: serviceBaseUrl + 'admin/Ads/Approve/:id', params: {id: '@id'}, method: 'PUT', headers: headers},
        'rejectAd': {url: serviceBaseUrl + 'admin/Ads/Reject/:id', params: {id: '@id'}, method: 'PUT', headers: headers}
    });

    function getAllAds(params){
        return adminResource.getAllAds(params);
    }

    function approveAd(id){
        return adminResource.approveAd({id: id});
    }

    function rejectAd(id){
        return adminResource.rejectAd({id: id});
    }

    return {
        getAllPublishedAds: getAllPublishedAds,
        getALlTowns: getAllTowns,
        getAllCategories: getAllCategories,
        getAllUerAds: getAllUerAds,
        createNewAd: createNewAd,
        getAdById: getAdById,
        editAd: editAd,
        deleteAd: deleteAd,
        deactivateAd : deactivateAd,
        admin: {
            getAllAds: getAllAds,
            approveAd: approveAd,
            rejectAd: rejectAd
        }
    }
});
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

    var headers = {'Authorization': authorization.getHeaders()};
    var resource = $resource(
        serviceBaseUrl + 'user/ads/:id',
        null,
        {
            'save': {method: 'POST', headers: headers},
            'get': {method: 'GET', headers: headers},
            'update': {method: 'PUT', headers: headers},
            'delete': {method: 'DELETE', headers: headers},
            'deactivate': {
                url: serviceBaseUrl + 'user/ads/deactivate/:id',
                method: 'PUT',
                params: {id: '@id'},
                headers: headers
            },
            'publishAgain': {
                url: serviceBaseUrl + 'user/ads/publishAgain/:id',
                method: 'PUT',
                params: {id: '@id'},
                headers: headers
            }
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

    function deactivateAd(id) {
        return resource.deactivate({id: id});
    }

    function publishAgain(id) {
        return resource.publishAgain({id: id});
    }


    var baseAdminUrl = serviceBaseUrl + 'admin/';
    var adminResource = $resource(serviceBaseUrl + 'admin/', null, {
        'getAllAds': {url: baseAdminUrl + 'Ads', method: 'GET', headers: headers},
        'approveAd': {url: baseAdminUrl + 'Ads/Approve/:id', params: {id: '@id'}, method: 'PUT', headers: headers},
        'rejectAd': {url: baseAdminUrl + 'Ads/Reject/:id', params: {id: '@id'}, method: 'PUT', headers: headers},
        'getAd': {url: baseAdminUrl + 'Ads/:id', params: {id: '@id'}, method: 'GET', headers: headers},
        'editAd': {url: baseAdminUrl + 'Ads/:id', params: {id: '@id'}, method: 'PUT', headers: headers},
        'deleteAd': {url: baseAdminUrl + 'Ads/:id', params: {id: '@id'}, method: 'DELETE', headers: headers},
        'getAllTowns': {url: baseAdminUrl + 'Towns/', method: 'GET', headers: headers},
        'createTown': {url: baseAdminUrl + 'Towns/', method: 'POST', headers: headers},
        'editTown': {url: baseAdminUrl + 'Towns/:id', params: {id: '@id'}, method: 'PUT', headers: headers},
        'deleteTown': {url: baseAdminUrl + 'Towns/:id', params: {id: '@id'}, method: 'DELETE', headers: headers}
    });

    function getAllAds(params) {
        return adminResource.getAllAds(params);
    }

    function approveAd(id) {
        return adminResource.approveAd({id: id});
    }

    function rejectAd(id) {
        return adminResource.rejectAd({id: id});
    }

    function adminEditAd(id, ad) {
        return adminResource.editAd({id: id}, ad);
    }

    function adminGetAd(id) {
        return adminResource.getAd({id: id});
    }

    function adminDeleteAd(id) {
        return adminResource.deleteAd({id: id});
    }

    function adminGetAllTowns(params) {
        return adminResource.getAllTowns(params);
    }

    function adminCreateTown(name) {
        return adminResource.createTown({name: name});
    }

    function adminSaveTownData(town) {
        localStorage.setItem('town_data', JSON.stringify(town));
    }

    function adminGetTownData(townId) {

        var townData = JSON.parse(localStorage.getItem('town_data'));
        if (townData && townData.id == townId) {
            townData.name = townData.username;
            return townData;
        }

        return undefined;
    }

    function adminRemoveTownData() {
        localStorage.removeItem('town_data');
    }

    function editTown(id, name) {
        return adminResource.editTown({'id': id}, {name: name});
    }

    function deleteTown(id){
        return adminResource.deleteTown({'id': id});
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
        deactivateAd: deactivateAd,
        admin: {
            getAllAds: getAllAds,
            approveAd: approveAd,
            rejectAd: rejectAd,
            editAd: adminEditAd,
            getAd: adminGetAd,
            deleteAd: adminDeleteAd,
            towns: {
                getAll: adminGetAllTowns,
                create: adminCreateTown,
                getTown: adminGetTownData,
                saveTownData: adminSaveTownData,
                removeTownData: adminRemoveTownData,
                edit: editTown,
                delete: deleteTown
            }
        }
    }
});
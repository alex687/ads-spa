adsApp.factory('storageData', function ($q, ipCookie) {

    function save(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    function remove(key) {
        localStorage.removeItem(key);
    }

    function get(key) {
       return JSON.parse(localStorage.getItem(key));
    }

    return {
        save: save,
        get: get,
        remove: remove
    }

});
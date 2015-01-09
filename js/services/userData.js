adsApp.factory('userData', function ($resource, serviceBaseUrl, authorization) {
    var baseUserUrl = serviceBaseUrl + 'user/';
    var headers = {'Authorization': authorization.getHeaders()};
    var resource = $resource(
        baseUserUrl,
        null,
        {
            'register': {url: baseUserUrl + 'register/', method: 'POST'},
            'login': {url: baseUserUrl + 'login/', method: 'POST'},
            'getProfile': {url: baseUserUrl + 'profile/', method: 'GET', headers: headers},
            'editProfile': {url: baseUserUrl + 'profile/', method: 'PUT', headers: headers},
            'changePassword': {url: baseUserUrl + 'profile/', method: 'PUT', headers: headers}
        });

    function register(username, password, confirmPassword, name, email, phone, townId) {
        var data = {
            username: username,
            password: password,
            confirmPassword: confirmPassword,
            name: name,
            email: email,
            phone: phone
        };
        if (townId) {
            data.townId = townId;
        }

        return resource.register(data);
    }

    function login(username, password) {
        var data = {
            username: username,
            password: password
        };

        return resource.login(data);
    }

    function getProfile() {
        return resource.getProfile();
    }

    function editProfile(name, email, phone, townId) {
        var data = {
            name: name,
            email: email,
            phoneNumber: phone
        };
        if (townId) {
            data.townId = townId;
        }

        return resource.editProfile(data);
    }

    function changePassword(oldPassword, newPassword, confirmPassword) {
        var data = {
            oldPassword: oldPassword,
            newPassword: newPassword,
            confirmPassword: confirmPassword
        };

        return resource.changePassword(data);
    }

    return {
        register: register,
        login: login,
        getProfile: getProfile,
        editProfile: editProfile,
        changePassword: changePassword
    }
});
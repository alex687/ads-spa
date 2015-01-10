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

    var baseAdminUrl = serviceBaseUrl + 'admin/';
    var adminResource = $resource(
        baseAdminUrl,
        null,
        {
            'getAll': {url: baseAdminUrl + 'Users/', method: 'GET', headers: headers},
            'editUser': {
                url: baseAdminUrl + 'User/:username',
                params: {username: '@username'},
                method: 'PUT',
                headers: headers
            },
            'SetPassword': {
                url: baseAdminUrl + 'SetPassword/',
                method: 'PUT',
                headers: headers
            }
        });

    function getAllUsers(params) {
        return adminResource.getAll(params);
    }

    function saveUserData(user) {
        localStorage.setItem('data', JSON.stringify(user));
    }

    function getSavedUserData() {
        return JSON.parse(localStorage.getItem('data'));
    }

    function adminEditProfile(username, name, email, phone, townId) {
        var data = {
            name: name,
            email: email,
            phoneNumber: phone
        };
        if (townId) {
            data.townId = townId;
        }

        return adminResource.editUser({username: username}, data);
    }

    function adminSetPassword(username, newPassword, confirmPassword)
    {
        var data = {
            username: username,
            newPassword: newPassword,
            confirmPassword: confirmPassword
        };

        return adminResource.SetPassword(data);
    }
    return {
        register: register,
        login: login,
        getProfile: getProfile,
        editProfile: editProfile,
        changePassword: changePassword,
        admin: {
            getAll: getAllUsers,
            saveUserData: saveUserData,
            getSavedUserData: getSavedUserData,
            editProfile: adminEditProfile,
            setPassword:adminSetPassword
        }
    }
});
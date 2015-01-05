adsApp.factory('userData', function ($http, serviceBaseUrl) {

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

        return $http.post(serviceBaseUrl + 'user/register/', data);
    }

    function login(username, password){
        var data = {
            username: username,
            password : password
        };

        return $http.post(serviceBaseUrl + 'user/login/', data);
    }

    return {
        register: register,
        login: login
    }
});
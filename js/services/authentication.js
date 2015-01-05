adsApp.factory('authentication', function ($q, ipCookie) {


    function saveCredentials(credentials) {
        ipCookie('access_token', credentials.access_token, { expires: credentials.expires_in, expirationUnit: 'seconds', path: '/'});
        ipCookie('username', credentials.username, { expires: credentials.expires_in, expirationUnit: 'seconds', path: '/'});
    }

    function isLogged() {
        if(!ipCookie('access_token')){
            return false;
        }
        return true;
    }

    function isUser(){
     //TODO check is user
    }

    return {
        saveCredentials: saveCredentials
    }

});
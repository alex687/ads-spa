adsApp.factory('authorization', function ($q, ipCookie) {


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
        if(isLogged()){
            return true;
        }
        return false;
    }

    function isAdmin(){
        if(isUser()){
            if(ipCookie('admin') == 'true'){
                return true;
            }
        }
        return false;
    }

    return {
        saveCredentials: saveCredentials,
        isUser: isUser,
        isLogged: isLogged,
        isAdmin: isAdmin
    }

});
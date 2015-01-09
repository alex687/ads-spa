adsApp.factory('authorization', function ($q, ipCookie) {

    function saveCredentials(credentials) {
        ipCookie('access_token', credentials.access_token, { expires: credentials.expires_in, expirationUnit: 'seconds', path: '/'});
        ipCookie('username', credentials.username, { expires: credentials.expires_in, expirationUnit: 'seconds', path: '/'});
        ipCookie('admin', credentials.isAdmin, { expires: credentials.expires_in, expirationUnit: 'seconds', path: '/'});
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
            if(ipCookie('admin') == true){
                return true;
            }
        }
        return false;
    }

    function getHeaders(){
        return 'Bearer ' + ipCookie('access_token');
    }

    function logout(){
        ipCookie.remove('access_token', {path : '/'});
        ipCookie.remove('username', {path : '/'});
    }

    return {
        saveCredentials: saveCredentials,
        isUser: isUser,
        isLogged: isLogged,
        isAdmin: isAdmin,
        getHeaders: getHeaders,
        logout : logout
    }

});
define(function () {

    var cookiePrefix = "dc_";

    function cookieName(name) {
        return cookiePrefix + name;
    }


    function store(CookieName, CookieValue, Days) {
        if (Days) {
            var date = new Date();
            date.setTime(date.getTime() + (Days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        }
        else var expires = "";
        document.cookie = CookieName + "=" + CookieValue + expires + "; path=/";
    }

    function retrieve(CookieName) {
        var nameEQ = CookieName + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    function remove(CookieName) {
        set(CookieName, null, -1);
    }

    return {
        store:store,
        retrieve:retrieve,
        remove:remove,
        LANG:cookieName('lang'),
        vNum:cookieName('vNum')
    }
});
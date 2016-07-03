(function(DC) {
    // Modules
    var _ga,
        _cookies,
        _urlParams;

    _ga = (function () {
        //TODO sync report for changing the language

        function trackEvent(category, action, label, value) {
            //value should be null or a number
            value = (value === undefined) ? null : ((typeof value === 'string') ? parseInt(value, 10) : value);
            label = label || null;
            _gaq.push(["_trackEvent", category, action, label, value]);
        }

        function trackEventSync(category, action, label, value) {
            value = (value === undefined) ? null : ((typeof value === 'string') ? parseInt(value, 10) : value);
            label = label || null;

            _gat._getTracker()._trackEvent(category, action, label, value);
        }

        return {
            trackEvent:trackEvent,
            trackEventSync:trackEventSync
        };
    })();

    _cookies = (function () {
        var cookiePrefix = "dc2_";

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
    })();

    _urlParams = (function() {
        var URL_PARAMS=(function(){var a={};var b=window.location.search.substring(1);var c=b.split("&");for(var d=0;d<c.length;d++){var e=c[d].split("=");if(typeof a[e[0]]==="undefined"){a[e[0]]=e[1]}else if(typeof a[e[0]]==="string"){var f=[a[e[0]],e[1]];a[e[0]]=f}else{a[e[0]].push(e[1])}}return a})();

        return URL_PARAMS;
    })();

    // Exports
    DC.ga = _ga;
    DC.cookies = _cookies;
    DC.urlparams = _urlParams;
})(window.DC);
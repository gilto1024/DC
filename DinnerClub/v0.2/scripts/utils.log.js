define(['utils.config'], function(CONFIG) {

    function noop() {}


    function log() {
        // Try to apply console.log as if it were called natively
        try {
            console.log.apply(console, arguments);
        } catch (err) {
            // fallback to logging an array
            try {
                console.log(arguments);
            } catch (err) {
            }
        }
    }


    var log = (function() {

        // read CONFIG flag
        if (!CONFIG.log.enabled) {
            return noop;
        }

        // check for existance of console (the IE-safe way...)
        if (window.console) {
            if (console.log) {
                return log;
            }
        }

        return noop;
    })();


    return log;
});

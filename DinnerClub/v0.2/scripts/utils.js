define(['utils.urlparams', 'utils.cookies', 'utils.i18n', 'mustache'], function(URL_PARAMS, cookies, i18n, mustache) {
    return {
        i18n:i18n,
        mustache:mustache,
        cookies:cookies,
        URL_PARAMS:URL_PARAMS
    }
});
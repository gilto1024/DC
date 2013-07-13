define(function() {

    var URL_PARAMS=function(){var a={};var b=window.location.search.substring(1);var c=b.split("&");for(var d=0;d<c.length;d++){var e=c[d].split("=");if(typeof a[e[0]]==="undefined"){a[e[0]]=e[1]}else if(typeof a[e[0]]==="string"){var f=[a[e[0]],e[1]];a[e[0]]=f}else{a[e[0]].push(e[1])}}return a}();

    var DEFAULT_LANG = 'he',
        currLang,
        data = {
            "en":{
                "dir":"ltr",
                "static":{
                    "btnBackTitle":"Back",
                    "btnRestartTitle":"Restart",
                    "noRestsText":"Oops no options left... please go",
                    "noRestsLeftBack":"Back",
                    "resultsHeading":"You should go to",
                    "btnNextRest":"Next"
                }
            },
            "he":{
                "dir":"rtl",
                "static": {
                    "btnBackTitle":"אחורה",
                    "btnRestartTitle":"מהתחלה",
                    "noRestsText":"אופס... נשארנו בלי מסעדות. חזור",
                    "noRestsLeftBack":"אחורה",
                    "resultsHeading":"כדאי לכם ללכת ל...",
                    "btnNextRest":"הבא"
                }
            }
        }


    /**
     * Return the language, eigher from the URL or default fallback
     * @return {String}
     */
    function getLanguage() {
        if (currLang) return currLang;

        // try to get lang form URL param
        currLang = URL_PARAMS['lang'];
        if (!currLang || !(data[currLang])) { // language not provided or unsupported
            currLang = DEFAULT_LANG
        }

        return currLang;
    }


    /**
     * Get RTL\LTR orientation
     * @return {String} "rtl" -or- "lrt"
     */
    function getDirection() {
        return data[getLanguage()].dir;
    }



    function getStaticTexts() {
        return data[getLanguage()].static;
    }


    return {
        getLanguage:getLanguage,
        getDirection:getDirection,
        getStaticTexts:getStaticTexts
    }
});
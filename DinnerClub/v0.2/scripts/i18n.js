define(['jquery', 'mustache', "text!tmpl/languageSelection-tmpl.html"], function($, mustache, tmpl) {

    //TODO export URL_PARAMS to utils
    //TODO export languageSelection to module?

    var URL_PARAMS=function(){var a={};var b=window.location.search.substring(1);var c=b.split("&");for(var d=0;d<c.length;d++){var e=c[d].split("=");if(typeof a[e[0]]==="undefined"){a[e[0]]=e[1]}else if(typeof a[e[0]]==="string"){var f=[a[e[0]],e[1]];a[e[0]]=f}else{a[e[0]].push(e[1])}}return a}();

    var DEFAULT_LANG = 'he',
        currLang,
        data = {
            "en":{
                "dir":"ltr",
                "static":{
                    "btnBackTitle":"Back",
                    "btnRestartTitle":"Restart",
                    "noRestsText":"Oops... no options left! Please go",
                    "noRestsLeftBack":"Back",
                    "resultsHeading":"You should go to",
                    "btnNextRest":"Next",
                    "restCountLabel":"dinners"
                }
            },
            "he":{
                "dir":"rtl",
                "static": {
                    "btnBackTitle":"אחורה",
                    "btnRestartTitle":"מהתחלה",
                    "noRestsText":"אופס... נשארנו בלי מסעדות! חזור",
                    "noRestsLeftBack":"אחורה",
                    "resultsHeading":"כדאי לכם ללכת ל...",
                    "btnNextRest":"הבא",
                    "restCountLabel":"ארוחות"
                }
            }
        };


    /**
     * Return the language, eigher from the URL or default fallback
     * @return {String}
     */
    function getLanguage() {
        //TODO get language cookie
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


    var languageSelector = (function() {
        function generateLanguageMenu() {
            var languages = [{
                "lang": getLanguage(),
                "selected":true
            }];

            for (var lang in data) {
                if (lang != getLanguage()) {
                    languages.push({
                        "lang":lang
                    });
                }
            }

            var html = mustache.to_html(tmpl, {"languages":languages});
            $("#languageSelectionMenu").html(html);
        }


        function openMenu() {
            $("#languageSelectionMenu").addClass('open');
        }


        function closeMenu() {
            $("#languageSelectionMenu").removeClass('open');
        }


        function setLanguage(lang) {
            //TODO store language cookie

            var langUrl = location.href.split('?')[0] + '?lang=' + lang;
            location.href = langUrl;
        }


        function bindEvents() {
            var mouseOutTimeout,
                mouseOutDuration = 200; //ms

            $("#languageSelectionMenu").hover(
                function() {
                    if (mouseOutTimeout) {
                        clearTimeout(mouseOutTimeout);
                        mouseOutTimeout = null;
                    }

                    openMenu();
                },
                function() {
                    var $this = $(this);

                    if (mouseOutTimeout) {
                        clearTimeout(mouseOutTimeout);
                    }

                    mouseOutTimeout = setTimeout(closeMenu, mouseOutDuration);
                }
            );

            $(".languageSelectionOption").on('click', function() {
                if ($(this).hasClass('languageSelected')) return;

                setLanguage($(this).data('lang'));
            })
        }


        function init() {
            generateLanguageMenu();
            bindEvents();
        }


        return {
            init:init
        }

    })();


    return {
        getLanguage:getLanguage,
        getDirection:getDirection,
        getStaticTexts:getStaticTexts,
        languageSelector:languageSelector
    }
});
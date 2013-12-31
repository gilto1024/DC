define(['jquery', "text!tmpl/languageSelection-tmpl.html", 'utils.urlparams', 'utils.cookies', 'mustache', 'utils.ga'], function ($, tmpl, URL_PARAMS, cookies, mustache, ga) {

    //TODO export languageSelection to module?
    //TODO language select GA doesn't work

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
                    "btnPrevRestTitle":"Previous",
                    "btnNextRestTitle":"Next",
                    "restCountLabel":"Dinners",
                    "copyright":"Copyright &copy; 2013 Hamburg Committee. All Rights Reserved."
                }
            },
            "he":{
                "dir":"rtl",
                "static":{
                    "btnBackTitle":"אחורה",
                    "btnRestartTitle":"מהתחלה",
                    "noRestsText":"אופס... נשארנו בלי מסעדות! חזור",
                    "noRestsLeftBack":"אחורה",
                    "resultsHeading":"כדאי לכם ללכת ל...",
                    "btnPrevRestTitle":"הקודם",
                    "btnNextRestTitle":"הבא",
                    "restCountLabel":"ארוחות",
                    "copyright":"כל הזכויות שמורות &copy; 2013 ועידת המבורג."
                }
            }
        };

    /**
     * Return the language, eigher from the URL or default fallback
     * @return {String}
     */
    function getLanguage() {
        if (currLang) return currLang;

        // try to get lang form URL param
        currLang = URL_PARAMS['lang'];
        if (currLang && (data[currLang])) { // language not provided or unsupported
            return currLang;
        }

        // try to get lang from cookie
        currLang = cookies.retrieve(cookies.LANG);
        if (currLang && (data[currLang])) { // no cookie or unsupported language stored
            // renew the valid cookie
            cookies.store(cookies.LANG, currLang, 365);

            return currLang;
        }

        currLang = DEFAULT_LANG;
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


    var languageSelector = (function () {
        function generateLanguageMenu() {
            var languages = [
                {
                    "lang":getLanguage(),
                    "selected":true
                }
            ];

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
            ga.trackEventSync('language_select', lang);

            cookies.store(cookies.LANG, lang, 365);

            var langUrl = location.href.split('?')[0] + '?lang=' + lang;
            location.href = langUrl;
        }


        function bindEvents() {
            var mouseOutTimeout,
                mouseOutDuration = 200; //ms

            $("#languageSelectionMenu").hover(
                function () {
                    if (mouseOutTimeout) {
                        clearTimeout(mouseOutTimeout);
                        mouseOutTimeout = null;
                    }

                    openMenu();
                },
                function () {
                    var $this = $(this);

                    if (mouseOutTimeout) {
                        clearTimeout(mouseOutTimeout);
                    }

                    mouseOutTimeout = setTimeout(closeMenu, mouseOutDuration);
                }
            );

            $(".languageSelectionOption").on('click', function () {
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
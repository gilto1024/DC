(function(DC) {
    var DEFAULT_LANG = 'en',
        _currentLanguage,
        _data;

    _data = {
        "en":{
            "dir":"ltr",
            "static":{
                "btnBackTitle":"Back",
                "btnRestartTitle":"Restart",
                "noRestsText":"Oops... no options left! Please go",
                "noRestsLeftBack":"Back",
                "resultsHeading":"You should go to...",
                "btnPrevRestTitle":"Previous",
                "btnNextRestTitle":"Next",
                "restCountLabel":"Restaurants",
                "getTable":"Get a table",
                "open_maps":"View in Google",
                "copyright":"Copyright © 2013 Hamburg Committee. All Rights Reserved.",
                "infoIconTitle":"General",
                "mapIconTitle":"Map",
                "restNameTitle":"Menu",
                "price_3Title":"Price is alright...",
                "price_4Title":"Price is higher than average.",
                "price_5Title":"Expensive but worth it."
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
                "restCountLabel":"מסעדות",
                "getTable":"הזמן שולחן",
                "open_maps":"צפה בגוגל",
                "copyright":"כל הזכויות שמורות © 2013 ועידת המבורג.",
                "infoIconTitle":"כללי",
                "mapIconTitle":"מפה",
                "restNameTitle":"תפריט",
                "price_3Title":"המחיר בסדר גמור...",
                "price_4Title":"המחיר מעל הממוצע",
                "price_5Title":"יקר אבל שווה"
            }
        }
    };

    DC.languages = {
        getLanguage: function() {
            if (_currentLanguage)
                return _currentLanguage;

            // Try to get lang from URL param
            _currentLanguage = DC.urlparams['lang'];
            if (_currentLanguage
                && (_data[_currentLanguage])) { // language not provided or unsupported
                return _currentLanguage;
            }

            // Try to get lang from cookie
            _currentLanguage = DC.cookies.retrieve(DC.cookies.LANG);
            if (_currentLanguage
                && (_data[_currentLanguage])) { // no cookie or unsupported language stored
                // renew the valid cookie
                DC.cookies.store(DC.cookies.LANG, _currentLanguage, 365);

                return _currentLanguage;
            }

            // Use default
            _currentLanguage = DEFAULT_LANG;
            return _currentLanguage;
        },
        setLanguage: function(langCode) {
            DC.ga.trackEventSync('language_select', langCode);

            DC.cookies.store(DC.cookies.LANG, langCode, 365);

            var langUrl = location.href.split('?')[0] + '?lang=' + langCode;
            location.href = langUrl;
        },
        getSupportedLanguages: function() {
            var _langs = [
                {
                    "lang": this.getLanguage(),
                    "selected":true
                }
            ],
                _lang;

            for (_lang in _data) {
                if (_lang != this.getLanguage()) {
                    _langs.push({
                        "lang":_lang
                    });
                }
            }

            return _langs;
        },
        getStaticText: function(key) {
            var _text = '',
                _static = _data[this.getLanguage()].static[key];

            if (_static) {
                _text = _static;
            }

            return _text;
        },
        getDirection: function() {
            return _data[this.getLanguage()].dir;
        }
    };
})(window.DC);
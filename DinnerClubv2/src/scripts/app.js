(function(DC, ReactDOM, $) {

    // Render languages menu
    ReactDOM.render(
        <DC.LanguagesMenu data={DC.languages.getSupportedLanguages()} />,
        document.getElementById('dcLanguage')
    );

    // Render the main app

})(window.DC, window.ReactDOM, window.jQuery);
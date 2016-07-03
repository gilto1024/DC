(function(DC, ReactDOM, $) {
    // Set RTL on body if needed
    if (DC.languages.getDirection() === 'rtl') {
        document.body.className = 'rtl';
    }

    // Render languages menu
    ReactDOM.render(
        <DC.LanguagesMenu data={DC.languages.getSupportedLanguages()} />,
        document.getElementById('dcLanguage')
    );

    // Render footer
    ReactDOM.render(
        <DC.Footer text={DC.languages.getStaticText('copyright')} />,
        document.getElementById('dcFooter')
    );

    // Render the main app

})(window.DC, window.ReactDOM, window.jQuery);
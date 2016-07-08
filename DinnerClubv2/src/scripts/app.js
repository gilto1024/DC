(function(DC, ReactDOM, $) {
    var _state;

    function init() {
        setDirectionOnBody();
        setLanguageForData();
        renderStaticContent();
    }

    function setDirectionOnBody() {
        // Set RTL on body if needed
        if (DC.languages.getDirection() === 'rtl') {
            document.body.className = 'rtl';
        }
    }
    // Here we'll render language menu, footer & about
    function renderStaticContent() {
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
    }

    function setLanguageForData() {
        DC.data.story.setLanguage(DC.languages.getLanguage());
        DC.data.questions.setLanguage(DC.languages.getLanguage());
    }

    function initApp() {
        _state = new DC.State(DC.languages.getLanguage());

        renderApp();
    }

    function renderApp() {
        console.log(DC.data.story.getData());
        var _callbacks = {
            answer: reactAnswerCallback,
            goback: reactGoBackCallback
        };
        ReactDOM.render(
            <DC.DCApp callbacks={_callbacks} data={_state.getReactState()}/>,
            document.getElementById('dcApp')
        );
    }

    // Callbacks from React App - Answer Click callback
    function reactAnswerCallback(value) {
        console.log('whaaat ' + value);

        _state.ingestAnswer(value);
        renderApp();
    }
    // Callbacks from React App - Back arrow click
    function reactGoBackCallback() {
        console.log('go back ');

        _state.prevQuestion();
        renderApp();
    }

    init();
    // Wait for data for main app
    DC.data.ready(initApp.bind(this));

})(window.DC, window.ReactDOM, window.jQuery);
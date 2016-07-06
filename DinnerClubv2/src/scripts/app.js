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
    }

    function initApp() {
        _state = new DC.State({
            langCode: DC.languages.getLanguage(),
            story: DC.data.story,
            questions: DC.data.questions,
            restaurants: DC.data.restaurants
        });

        renderApp();
    }

    function renderApp() {
        console.log(DC.data.questions.getData());
        var _callbacks = {
            answer: reactAnswerCallback
        };
        ReactDOM.render(
            <DC.DCApp callbacks={_callbacks} data={_state.getReactState()}/>,
            document.getElementById('dcApp')
        );
    }

    // Callbacks from React App - Answer Click callback
    function reactAnswerCallback(value) {
        console.log('whaaat ' + value);

        var _dummy = {
            isQuestionsPhase: true,
            data: {
                question: 'Soooo?',
                answers: [
                    {
                        text: 'Family',
                        value: 'fam'
                    },
                    {
                        text: 'Business',
                        value: 'business'
                    }
                ]
            }
        };

        var _callbacks = {
            answer: reactAnswerCallback
        };
        ReactDOM.render(
            <DC.DCApp callbacks={_callbacks} data={_dummy}/>,
            document.getElementById('dcApp')
        );
    }
    // Callbacks from React App - Back arrow click


    init();
    // Wait for data for main app
    DC.data.ready(initApp.bind(this));

})(window.DC, window.ReactDOM, window.jQuery);
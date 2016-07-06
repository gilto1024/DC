(function(DC) {
    console.log('State module');

    /* Expected data object :
        {
        langCode: String,
        story: DC.Story,
        questions: DC.Questions,
        restaurants: DC.Restaurants
        }
     */

    /* React state object:
        {
        story: {
            current: string
            new: string // This one will get the typing effect. Null if going backwards
            isBoarding: Boolean // true = blinking cursor will show
        }
        isQuestionsPhase: Boolean (whether we'll render questions or restaurants)
        // For questions
        data: {
            restaurantsCount: Number
            restaurantsLabel: String
            question: String
            answers: Array[Object:{text:string, value:string}]
        }
        // For restaurants
        data: {

        }
        }
     */

    var _StateModel = function _StateModel(oParams) {

        var _getReactState = function() {
            /* Here we'll create a simple state object to be passed as props to the DCApp component.
             * It will contain only the text to be rendered
             */
            var _dummy = {
                isQuestionsPhase: true,
                data: {
                    question: 'Is this a date?',
                    answers: [
                        {
                            text: 'Yes',
                            value: 'date'
                        },
                        {
                            text: 'No',
                            value: null
                        }
                    ]
                }
            };

            return _dummy;
        };

        return {
            getReactState: _getReactState
        }
    };

    // Defining state module
    DC.State = _StateModel;

})(window.DC);
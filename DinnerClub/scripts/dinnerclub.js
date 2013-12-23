define(['jquery', 'rests', 'questions', 'story', 'view', 'history', 'utils'], function ($, rests, questions, story, view, history, utils) {

    //TODO - flight to SF

    //TODO mobile Contact Us
    //TODO rename "Questions" container

    var MATCHING_RESTS_THRESHOLD = 0.75; //original was 0.8 when going down number is going up and down but we can consider that to be ok cause after every choice the order can change

    var userSelection,
        restList,
        questionsList,
        currentQuestionIndex,
        bIsSmallScreen = false;

    // used in the processUserSelection function
    var USER_SELECTION_CONVERSION_CHART = {
        party:{
            date:{
                vertical:'date',
                selection:5
            },
            friends:{
                vertical:'friends',
                selection:5
            },
            family:{
                vertical:'family',
                selection:5
            },
            business:{
                vertical:'business',
                selection:5
            },
            tourists:{
                vertical:'tourists',
                selection:5
            }
        },
        sitting:{
            table:{
                vertical:'table',
                selection:5
            },
            bar:{
                vertical:'bar',
                selection:5
            }
        },
        light:{
            dim:{
                vertical:'light',
                selection:0
            },
            bright:{
                vertical:'light',
                selection:5
            }
        },
        vol:{
            quiet:{
                vertical:'vol',
                selection:0
            },
            loud:{
                vertical:'vol',
                selection:5
            }
        },
        parking:{
            yes:{
                vertical:'parking',
                selection:true
            }
        }
    };


    /**
     * Filter restaurants according to user selection and continue to next question
     *
     * @param {string} vertical current question's assigned vertical
     * @param {string} answer user's selection in the current vertical
     */
    function onUserSelection(vertical, answer) {
        var oSelection;

        history.save(
            currentQuestionIndex,
            restList,
            userSelection,
            rests.getMaxScore()
        );

        // no answer yet for the current vertical, continue on to next question
        // this happens when the vertical is split into multiple questions,
        // like in the party vertical (Date\So)
        if (answer == "") {
            ++currentQuestionIndex;
            updateView(restList);
            return;
        }


        oSelection = processUserSelection(vertical, answer);

        if (oSelection) {
            if (typeof(oSelection.selection) == 'number') {
                restList = rests.rate(restList, oSelection.vertical, oSelection.selection, (oSelection.vertical == 'date' ? 2 : 1));  //(vertical == 'party' ? 2 : 1));
            } else {
                restList = rests.filter(restList, oSelection.vertical, "true");
            }
        }


        // filter rest-list
        var currentFilter = {};
        currentFilter[vertical] = userSelection[vertical] = answer;
        //restList = rests.filter(currentFilter, restList);

        ++currentQuestionIndex;
        if (vertical == 'party' && answer == 'date') {
            // advance two questions if date was chosen (skip the "so" question)
            ++currentQuestionIndex;
        }
        updateView(restList, story[vertical][answer]);
    }


    /**
     * Convert an answer to its corresponding rating (e.g. date) or flag (e.g. parking)
     * @param vertical
     * @param answer
     * @return {Object|undefined} object containing the converted vertical and selection, or undefined if the selection requires no additional actions
     */
    function processUserSelection(vertical, answer) {
        return USER_SELECTION_CONVERSION_CHART[vertical][answer];
    }


    /**
     * Return to the previous question and re-apply previous state
     */
    function onBack() {
        if (currentQuestionIndex == 0) return; // already on first question

        var state = history.restore();
        if (!state) return; // no available history

        currentQuestionIndex = state.currentQuestionIndex;
        restList = state.restList;
        userSelection = state.userSelection;
        rests.setMaxScore(state.maxScore);

        if (!bIsSmallScreen) view.removeStoryChapter();
        updateView(restList);
    }


    /**
     * Alert the user that no restaurants match their current selection
     */
    function noRestsLeft() {
        utils.ga.trackEvent("noRestsLeft", 'view', JSON.stringify(userSelection));
        view.noRestsLeft();
    }


    /**
     * Update the view with the relevant question, rest count and story
     *
     * @param {Array} restList
     * @param {String=} story - New story snippet to display.
     */
    function updateView(restList, story) {
        utils.log("[DinnerClub]", "updateView", 'currentQuestionIndex:', currentQuestionIndex, "userSelection:", userSelection, "restList:", restList);

        var matchingRests = rests.restsAboveThreshold(restList, MATCHING_RESTS_THRESHOLD);

        if (matchingRests.length == 0) {                                    // No mathing rests
            noRestsLeft();
        } else if (currentQuestionIndex >= questionsList.length) {          // No more questions!
            // TODO - do we just display rests above 80% overall match? Or do we want to display the top 5\10, top 20% or whatever?
            displayResults(matchingRests);
        } else {                                                            // Next question
            view.updateRestCount(matchingRests.length);
            view.displayQuestion(questionsList[currentQuestionIndex].id);
        }

        if (story && !bIsSmallScreen) {
            view.addStoryChapter(story);
        }
    }


    function displayResults(restList) {
        view.displayResults(restList);
    }

    /**
     * Reset all current indices,modules & user selections,
     * start over with fresh lists, and reset the view
     */
    function reset() {
        currentQuestionIndex = 0;
        userSelection = {};
        restList = rests.fetch();
        rests.setMaxScore(0);

        history.reset();

        view.removeStoryChapter(true);
        //maybe to fix restart problem we need to reset rest score
        for (var i = 0; i < restList.length; i++) {
            restList[i].score = 0;
        }
        updateView(restList);
    }


    /**
     * Do the init, yes?
     */
    function init() {
        if (utils.isMobile() == "mobile") {
            window.location.href = "http://www.dinnerclub.co.il/mobile";
        }


        questionsList = questions.fetch();
        view.init(this, questionsList);

        reset();

        if (!utils.isSmallScreen()) {
            utils.log("[DinnerClub]", '*** Fetching About...');
            require(['./about'], function (about) {
                utils.log("[DinnerClub]", '*** About Loaded, initing...');
                about.init();
            });
        } else {
            utils.log("[DinnerClub]", '*** No About');
        }

        utils.ga.trackEvent('init', (utils.isMobile() ? 'mobile' : 'desktop'), utils.i18n.getLanguage());

        //TODO remove
        /* currentQuestionIndex = 1;
         updateView(restList);

         view.displayResults(restList);*/
    }


    return {
        init:init,
        onUserSelection:onUserSelection,
        onBack:onBack,
        reset:reset
    };

});
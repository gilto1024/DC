define(['jquery', 'rests', 'questions', 'story', 'view', 'history'], function ($, rests, questions, story, view, history) {

    //TODO - flight to SF

    //TODO cookie (results) - possibly not needed at all
    //TODO JSON format conversion script - add tip
    //TODO mobile Contact Us
    //TODO override black background indicator on mobile (on click)
    //TODO Tips (load from rest list)

    //TODO rename "Questions" container
    //TODO selected language cookie

    function log() {
        var args = [].slice.apply(arguments);
        args.unshift("[DinnerClub]");

        try {
            console.log.apply(console, args);
        } catch (err) {
        }
    }


    var userSelection,
        restList,
        questionsList,
        currentQuestionIndex,
        bIsSmallScreen = false;


    /**
     * Filter restaurants according to user selection and continue to next question
     *
     * @param {string} vertical current question's assigned vertical
     * @param {string} answer user's selection in the current vertical
     */
    function onUserSelection(vertical, answer) {
        history.save(
            currentQuestionIndex,
            restList,
            userSelection
        );

        // no answer yet for the current vertical, continue on to next question
        // this happens when the vertical is split into multiple questions,
        // like in the party vertical (Date\So)
        if (answer == "") {
            nextQuestion();
            updateView();
            return;
        }


        // filter rest-list
        var currentFilter = {};
        currentFilter[vertical] = userSelection[vertical] = answer;
        restList = rests.filter(currentFilter, restList);


        if (!(restList.length)) {
            noRestsLeft();
        } else {
            nextQuestion();
        }

        updateView(story[vertical][answer]);
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

        if (!bIsSmallScreen) view.removeStoryChapter();
        updateView();
    }


    /**
     * Alert the user that no restaurants match their current selection
     */
    function noRestsLeft() {
        view.noRestsLeft();
    }


    /**
     * Update the view with the relevant question, rest count and story
     *
     * @param {String=} story New story snippet to display.
     */
    function updateView(story) {
        log("updateView", 'currentQuestionIndex:', currentQuestionIndex, "userSelection:", userSelection, "restList:", restList);

        if (currentQuestionIndex == questionsList.length) {
            view.displayResults(restList);
        } else {
            view.updateRestCount(restList.length);
            view.displayQuestion(questionsList[currentQuestionIndex].id);
        }

        if (story && !bIsSmallScreen) {
            view.addStoryChapter(story);
        }
    }


    /**
     * Continue to the next question.
     * If a question's assigned vertical has already been selected by the user, it will be skipped
     */
    function nextQuestion() {
        while (questionsList[++currentQuestionIndex] && userSelection[questionsList[currentQuestionIndex].vertical]) {
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

        history.reset();

        view.removeStoryChapter(true);
        updateView();
    }


    /**
     * Do the init, yes?
     */
    function init() {
        questionsList = questions.fetch();
        view.init(this, questionsList);

        reset();

        if (matchMedia) {
            var mq = window.matchMedia("screen and (max-width: 480px)");
            if (mq.matches) {
                bIsSmallScreen = true;
            }
        }

        if (!bIsSmallScreen) {
            require(['./about'], function (about) {
                about.init();
            });
        }
    }


    return {
        init:init,
        onUserSelection:onUserSelection,
        onBack:onBack,
        onReset:reset
    };

});
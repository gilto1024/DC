define(['rests', 'questions', 'story', 'view', 'history'], function (rests, questions, story, view, history) {

    //TODO - flight to SF

    function log() {
        var args = [].slice.apply(arguments);
        args.unshift("[DinnerClub]");

        console.log.apply(console, args);
    }


    var userSelection,
        restList,
        questionsList,
        currentQuestionIndex;


    /**
     * Filter restaurant according to user selection and continue to next question
     *
     * @param {string} vertical current question's assigned vertical
     * @param {string} answer user's selection in the current vertical
     */
    function onUserSelection(vertical, answer) {
        history.save(
            questionsList[currentQuestionIndex].id,
            restList,
            userSelection
        );

        // no answer yet for the current vertical, continue on to next question
        if (answer == "") {
            nextQuestion();
            updateView();
            return;
        }

        var currentFilter = {};
        currentFilter[vertical] = userSelection[vertical] = answer;
        restList = rests.filter(currentFilter, restList);


        log("Rest List:", restList);

        if (!(restList.length)) {
            noRestsLeft();
            return;
        }

        nextQuestion();
        updateView(story[vertical][answer]);
    }


    /**
     * Return to the previous question and re-apply previous state
     */
    function onBack() {
        var state = history.restore();
        if (!state) return; // no available

        restList = state.restList;
        userSelection = state.userSelection;
        var questionId = state.questionId;

        while (questionId !== questionsList[currentQuestionIndex].id && currentQuestionIndex > 0) {
            currentQuestionIndex--;
        }

        view.removeStoryChapter();
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
        if (currentQuestionIndex == questionsList.length) {
            view.displayResults(restList);
        } else {
            view.displayQuestion(questionsList[currentQuestionIndex]);
        }

        view.updateRestCount(restList.length);
        if (story) {
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


    /**
     * Reset all current indices,modules & user selections,
     * start over with fresh lists, and reset the view
     */
    function reset() {
        currentQuestionIndex = 0;
        userSelection = {};
        restList = rests.fetch();
        questionsList = questions.fetch();

        history.reset();

        view.removeStoryChapter(true);
        updateView();
    }


    /**
     * Do the init, yes?
     */
    function init() {
        reset();
    }


    return {
        init:init,
        onUserSelection:onUserSelection,
        onBack: onBack,
        onReset: reset
    };

});
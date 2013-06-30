define(['rests', 'questions', 'story', 'view'], function (rests, questions, story, view) {

    //TODO - flight to SF

    /*
     * TODO
     * ----
     * History
     * Back
     */

    function log() {
        var args = [].slice.apply(arguments);
        args.unshift("[DinnerClub]");

        console.log.apply(console, args);
    }


    var userSelection,
        restList,
        currentQuestionIndex;


    function onUserSelection(vertical, answer) {
        //TODO - history.save()

        // no answer yet for this vertical, continue
        if (answer == "") {
            return nextQuestion();
        }

        var currentFilter = {};
        currentFilter[vertical] = userSelection[vertical] = answer;
        restList = rests.filter(currentFilter, restList);


        log("Rest List:", restList);

        if (!(restList.length)) {
            return noRestsLeft();
        }

        view.updateRestCount(restList.length);
        view.updateStory(story[vertical][answer]);

        nextQuestion();
    }


    function noRestsLeft() {
        view.noRestsLeft();
    }


    function nextQuestion() {
        while (questionsList[currentQuestionIndex] && userSelection[questionsList[currentQuestionIndex].vertical]) {
            currentQuestionIndex++;
        }

        if (currentQuestionIndex == questionsList.length) {
            view.displayResults(restList);
        } else {
            view.displayQuestion(questionsList[currentQuestionIndex]);
        }


    }


    function reset() {
        currentQuestionIndex = 0;
        userSelection = {};
        restList = rests.fetch();
        questionsList = questions.fetch();

        view.displayQuestion(questionsList[0]);
    }


    function init() {
        reset();
    }


    return {
        init:init,
        onUserSelection:onUserSelection
    };

});
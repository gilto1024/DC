define(['text!models/questionsList.json'], function (questionsList) {

    questionsList = JSON.parse(questionsList);


    function fetch() {
        return questionsList;
    }

    return {
        fetch:fetch
    }
});
define(['text!models/questionsList.json.txt', 'utils'], function (questionsList, utils) {

    questionsList = JSON.parse(questionsList)[utils.i18n.getLanguage()];


    function fetch() {
        return questionsList;
    }

    return {
        fetch:fetch
    }
});
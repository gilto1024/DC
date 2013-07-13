define(['text!models/questionsList.json.txt', 'i18n'], function (questionsList, i18n) {

    questionsList = JSON.parse(questionsList)[i18n.getLanguage()];


    function fetch() {
        return questionsList;
    }

    return {
        fetch:fetch
    }
});
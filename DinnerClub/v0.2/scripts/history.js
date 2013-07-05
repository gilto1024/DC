define(function () {

    var log;


    function save(currentQuestionIndex, restList, userSelection) {
        if (!log) log = [];

        log.push({
            currentQuestionIndex: currentQuestionIndex,
            restList: restList,
            userSelection:$.extend({}, userSelection) // clone to new object
        });
    }


    function restore() {
        return log.pop();
    }


    function reset() {
        log = [];
    }


    return {
        save:save,
        restore:restore,
        reset:reset
    }
});
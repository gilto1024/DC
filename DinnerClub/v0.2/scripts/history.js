define(function () {

    var log;


    function save(questionId, restList, userSelection) {
        if (!log) log = [];

        log.push({
            questionId: questionId,
            restList: restList,
            userSelection: userSelection
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
define(function () {

    var log;


    function save(currentQuestionIndex, restList, userSelection, maxScore) {
        if (!log) log = [];

        log.push({
            currentQuestionIndex: currentQuestionIndex,
            restList: deepCopyList(restList),
            userSelection:$.extend({}, userSelection), // clone to new object
            maxScore:maxScore
        });
    }


    function deepCopyList(list) {
        var newList = [];
        $.each(list, function(i, elm) {
            newList.push($.extend({}, elm));
        });

        return newList;
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
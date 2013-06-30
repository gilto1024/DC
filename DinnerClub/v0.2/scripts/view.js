define([], function () { // Loaded by main.js: jQuery, jQuery.tmpl, jQuery.hoverIntent


    function log() {
        var args = [].slice.apply(arguments);
        args.unshift("[VIEW]");

        console.log.apply(console, args);
    }


    function updateRestCount(count) {
        log("updateRestCount", count);
    }


    function updateStory(chapter) {
        if (!chapter) {
            log("updateStory", '--deleting--');
        }

        log("updateStory", chapter);
    }


    function displayQuestion(question) {
        log("displayQuestion", question);
    }


    function displayResults(results) {
        log("displayResults", results);
    }


    function noRestsLeft() {
        log("noRestsLeft");
    }


    return {
        updateRestCount:updateRestCount,
        updateStory:updateStory,
        displayQuestion:displayQuestion,
        noRestsLeft:noRestsLeft,
        displayResults:displayResults
    };

});
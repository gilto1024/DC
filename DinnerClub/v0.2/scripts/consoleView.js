define([], function () { // Loaded by main.js: jQuery, jQuery.tmpl, jQuery.hoverIntent


    function log() {
        var args = [].slice.apply(arguments);
        args.unshift("[VIEW]");

        console.log.apply(console, args);
    }


    function updateRestCount(count) {
        log("updateRestCount", count);
    }


    function addStoryChapter(chapter) {
        if (!chapter) {
            log("addStoryChapter", '-- No story to append --');
            return;
        }

        log("addStoryChapter", chapter);
    }


    function removeStoryChapter(bAll) {
        if (bAll) {
            log("removeStoryChapter", "Removing ALL stories");
        } else {
            log("removeStoryChapter", "Removing last Story");
        }
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
        displayQuestion:displayQuestion,
        updateRestCount:updateRestCount,
        addStoryChapter:addStoryChapter,
        removeStoryChapter:removeStoryChapter,
        noRestsLeft:noRestsLeft,
        displayResults:displayResults
    };

});
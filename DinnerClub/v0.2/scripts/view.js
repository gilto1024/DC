define(['mustache', 'text!tmpl/questions-tmpl.html'], function (mustache, tmplQuestions) {

    var dcController,
        currentQuestionId;

    // Elements
    var $questions,
        $restCount,
        $story;


    function log() {
        var args = [].slice.apply(arguments);
        args.unshift("[VIEW]");

        console.log.apply(console, args);
    }


    function bindEvents() {

        // reset scroll position to current question
        $(window).on('resize', function () {
            displayQuestion();
        });

        $(document)
            .on('click', '#questions li', onAnswerClicked);

        $("#btnBack").on('click', dcController.onBack);

        $("#btnRestart").on('click', dcController.onReset);
    }


    function cacheElements() {
        $questions = $("#questions");
        $restCount = $("#restCount");
        $story = $("#story");
    }


    function onAnswerClicked() {
        var $elm = $(this),
            answer = $elm.data('value'),
            vertical = $elm.parents("article").data('vertical');

        log('onAnswerClicked', 'vertical:', vertical, 'answer:', answer);
        dcController.onUserSelection(vertical, answer);
    }


    function updateRestCount(count) {
        $restCount
            .stop()
            .animate({count:count}, {
                duration:800,
                easing:"easeOutQuad",
                step:function (num) {
                    $restCount.html(Math.round(num));
                },
                complete:function () {
                    $restCount.html(count);
                }
            });
    }


    function addStoryChapter(chapter) {
        if (!chapter) return;

        $story.queue(function(next) {
            var $spanChapter = $("<span></span>").appendTo($story);
            $spanChapter.teletype({ text: chapter }, next);
        });
    }


    function removeStoryChapter(bAll) {
        $story.stop(false, true); // complete & clear animation queue

        var $elm = bAll ? $story.children('span') : $story.children('span').last();
        $elm.remove();
    }


    /**
     * Scroll to display a question.
     *
     * @param {String=} questionId ID of question. if omitted, adjust scroll to current question
     */
    function displayQuestion(questionId) {
        currentQuestionId = questionId || currentQuestionId;

        $questions.stop().scrollTo("#question" + currentQuestionId, {
            duration:1000,
            easing:"easeOutBack"
        });
    }


    function displayResults(results) {
        //TODO - displayResults
    }


    function noRestsLeft() {
        //TODO - noRestsLeft
    }


    /**
     * render questions HTML, bind event listeners
     *
     * @param controller
     * @param {Array} questionsList
     */
    function init(controller, questionsList) {
        log('init');
        dcController = controller;

        cacheElements();
        bindEvents();

        // render questions HTML
        var htmlQuestions = mustache.to_html(tmplQuestions, {"questions":questionsList});
        $questions.html(htmlQuestions);

        $(".hidden").removeClass('hidden');
    }


    return {
        init:init,
        displayQuestion:displayQuestion,
        updateRestCount:updateRestCount,
        addStoryChapter:addStoryChapter,
        removeStoryChapter:removeStoryChapter,
        noRestsLeft:noRestsLeft,
        displayResults:displayResults
    };

});
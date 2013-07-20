define(
    ['jquery', 'plugins', 'utils', 'text!tmpl/questions-tmpl.html'],
    function ($, plugins, utils, tmplQuestions) {

        //TODO override TAB key
        //TODO restart img + hover
        //TODO Contact Us close-arrow - rtl+ltr images + hover
        //TODO next\prev img + hover
        //TODO media queries - missing "480-960" query
        //TODO hide rest count in the second questions as well
        //TODO do not header.slideDown() on mobile
        //TODO something

        var dcController,
            currentSectionId,
            resultsRestList,
            resultsCurrentRest;

        // Elements
        var $header,
            $questions,
            $restCount,
            $restCountLabel,
            $story,
            $btnBackContainer,
            $btnBack,
            $btnRestart,
            $restInfo,
            $restLink,
            $restName,
            $restPhone,
            $restAddress,
            $restTip,
            $btnPrevRest,
            $btnNextRest,
            $noRestsLeft,
            $noRestsLeftBack;


        function log() {
            var args = [].slice.apply(arguments);
            args.unshift("[VIEW]");

            try {
                console.log.apply(console, args);
            } catch (err) {
            }
        }


        function bindEvents() {


            window.onorientationchange = function () {
                window.scrollTo(0, 1);
                scrollToSection();
            };

            // reset scroll position to current question
            $(window).on('resize', function (e) {
                scrollToSection();
            });

            $(document)
                .on('click', '#questions li', onAnswerClicked)
                .on('questionShown', function (e, qId) {
                    log('on questionShown', arguments);
                    log('on questionShown', "1st q id:", $questions.find(".questionArticle").first().attr('id').replace('question', ''))

                    if (qId == $questions.find(".questionArticle").first().attr('id').replace('question', '')) {
                        log('on questionShown', 'hiding');
                        $restCount.hide();
                        $restCountLabel.hide();
                        $btnBackContainer.fadeOut();
                        $header.slideUp('fast');
                    } else {
                        log('on questionShown', 'showing');
                        $restCount.show(); // make sure the rest count is visible
                        $restCountLabel.show();
                        $btnBackContainer.fadeIn();
                        $header.slideDown('fast');
                    }
                });

            $btnBack.on('click', dcController.onBack);
            $btnPrevRest.on('click', onPrevResult);
            $btnRestart.on('click', dcController.onReset);
            $btnNextRest.on('click', onNextResult);
            $noRestsLeftBack.on('click', onNoRestsLeftBack);
        }


        function cacheElements() {
            $header = $("header");
            $questions = $("#questions");
            $restCount = $("#restCount");
            $restCountLabel = $("#restCountLabel");
            $story = $("#story");
            $btnBackContainer = $("#btnBackContainer");
            $btnBack = $("#btnBack");
            $btnRestart = $("#btnRestart");
            $restInfo = $("#restInfo");
            $restLink = $("#restLink");
            $restName = $("#restName");
            $restPhone = $("#restPhone");
            $restAddress = $("#restAddress");
            $btnPrevRest = $("#btnPrevRest");
            $btnNextRest = $("#btnNextRest");
            $noRestsLeft = $("#noRestsLeft");
            $noRestsLeftBack = $("#noRestsLeftBack");
            $restTip = $("#restTip");
        }


        function onAnswerClicked() {
            var $elm = $(this),
                answer = $elm.data('value'),
                vertical = $elm.parents("article").data('vertical');

            log('onAnswerClicked', 'vertical:', vertical, 'answer:', answer);
            dcController.onUserSelection(vertical, answer);
        }


        function updateRestCount(count) {

            var currNum = parseInt($restCount.html()) || 0;
            if (currNum == count) return;

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

            var $spanChapter = $("<span class='chapter'></span>");
            $("#storyCursor").before($spanChapter);
            $spanChapter.yotyper({ text:chapter }, $story);
        }


        /**
         * Remove the last chapter from the story
         * @param {bool=} bAll flag to completely clear the story
         */
        function removeStoryChapter(bAll) {
            $story.stop(false, true); // complete & clear animation queue

            var $elm = bAll ? $story.children('span.chapter') : $story.children('span.chapter').last();
            $elm.remove();
        }


        /**
         * Scroll to display a question.
         *
         * @param {String=} questionId ID of question. if omitted, adjust scroll to current question
         */
        function displayQuestion(questionId) {
            scrollToSection("#question" + questionId);

            if (questionId) { // trigger event if new question shown
                $(document).trigger('questionShown', questionId);
            }
        }


        function shuffle(array) {
            var currentIndex = array.length
                , temporaryValue
                , randomIndex
                ;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        }


        function displayResults(results) {
            resultsRestList = shuffle(results);
            resultsCurrentRest = 0;

            if (resultsRestList.length == 1) {
                $("#btnNextRest").hide();
            } else {
                $("#btnNextRest").show();
            }

            $restCount.stop().fadeOut();
            $restCountLabel.stop().fadeOut();
            scrollToSection("#results");

            displayRest();
        }


        function displayRest() {
            var rest = resultsRestList[resultsCurrentRest].info;

            $restInfo.stop().animate({'opacity':0}, {
                duration:100,
                complete:function () {

                    $restName.html(rest.name);
                    $restPhone.html(rest.phone);
                    $restAddress.html(rest.address);
                    $restLink.attr('href', rest.url);

                    $restInfo.stop().animate({'opacity':1}, 700);
                }
            });

            $restTip.stop().animate({'opacity':0}, {
                duration:100,
                complete:function () {
                    $(this).html(rest.tip).stop().animate({'opacity':1}, 700);
                }
            });
        }


        function onPrevResult() {
            resultsCurrentRest--;

            if (resultsCurrentRest < 0) {
                resultsCurrentRest = resultsRestList.length - 1;
            }

            displayRest();
        }


        function onNextResult() {
            resultsCurrentRest++;

            if (resultsCurrentRest == resultsRestList.length) {
                resultsCurrentRest = 0;
            }

            displayRest();
        }


        function noRestsLeft() {
            $noRestsLeft.fadeIn();
        }


        function onNoRestsLeftBack() {
            $noRestsLeft.fadeOut();
            dcController.onBack();
        }


        function scrollToSection(sectionId) {
            currentSectionId = sectionId || currentSectionId;

            $questions.stop().scrollTo(currentSectionId, {
                duration:1000,
                easing:"easeOutBack"
            });
        }


        function handleI18n() {
            // Adjust view to language specific settings
            $('html').attr('dir', utils.i18n.getDirection());

            var texts = utils.i18n.getStaticTexts();
            // Generic handling - by ID\Class
            for (var key in texts) {
                var elm = $("#" + key);
                if (!(elm.length)) {
                    elm = $("." + key);
                }

                if (elm.length) {
                    elm.html(texts[key]);
                }
            }

            // specific handling for titles
            $btnBack.attr('title', texts.btnBackTitle);
            $btnPrevRest.attr('title', texts.btnPrevRestTitle);
            $btnRestart.attr('title', texts.btnRestartTitle);
            $btnNextRest.attr('title', texts.btnNextRestTitle);

            utils.i18n.languageSelector.init();
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

            // render questions HTML
            var htmlQuestions = utils.mustache.to_html(tmplQuestions, {"questions":questionsList});
            $("#questions .placeholder").first().after(htmlQuestions);

            cacheElements();
            bindEvents();

            handleI18n();

            if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
                $("#restCountWrapper").addClass('iphone');
            }

            window.scrollTo(0, 1);
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
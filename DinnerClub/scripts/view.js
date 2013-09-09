define(
    ['jquery', 'plugins', 'utils', 'text!tmpl/questions-tmpl.html', 'vendor/add2home'],
    function ($, plugins, utils, tmplQuestions, add2home) {

        //TODO override TAB key
        //TODO media queries - missing "570-960" query
        //TODO landscape orientation mefia query for bigger mobile phones (Idoz's)
        //TODO hide rest count in the second questions as well
	    //TODO refactor the isMobile & isSmallScreen dependant code
        //TODO refactor language-menu code to utils.i18n
	    //TODO show language on results screen (mobile)
        //TODO GA when clicking address, phone
        //TODO replace drop down arrow in language selection menu
        //TODO bugfix - bold text when running as web-app

        //TODO - rest count fixed on "mobile" resolution
        //TODO - main-sprite, mobile-sprite

        var dcController,
            currentSectionId,
            resultsRestList,
            resultsCurrentRest;

        // Elements
        var $header,
            $questions,
            $restCountContent,
            $restCount,
            $restCountLabel,
            $story,
            $btnBackContainer,
            $btnBack,
            $btnRestart,
            $restInfo,
            $restLink,
            $restName,
            $restPhoneLink,
            $restPhone,
            $restAddressLink,
            $restAddress,
            $restTip,
            $btnPrevRest,
            $btnNextRest,
            $noRestsLeft,
            $noRestsLeftBack,
            $footer;


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
                    utils.log("[VIEW]", 'on questionShown', arguments);
                    utils.log("[VIEW]", 'on questionShown', "1st q id:", $questions.find(".questionArticle").first().attr('id').replace('question', ''));

                    // First Question
                    if (qId == $questions.find(".questionArticle").first().attr('id').replace('question', '')) {
                        utils.log("[VIEW]", 'on questionShown', 'hiding');
                        $btnBackContainer.fadeOut();
                        $restCountContent.hide();
                        hideHeader();
                        if (utils.isSmallScreen()) {
                            $("#languageSelectionWrapper").fadeIn();
                        }
                        $footer.fadeIn();

                    } else {    // Not the first question
                        utils.log("[VIEW]", 'on questionShown', 'showing');
                        $restCountContent.show();
                        $btnBackContainer.fadeIn();
                        showHeader();
                        if (utils.isSmallScreen()) {
                            $("#languageSelectionWrapper").fadeOut();
                            $footer.fadeOut();
                        }
                    }
                });

            $btnBack.on('click', onBack);
            $btnPrevRest.on('click', onPrevResult);
            $btnRestart.on('click', onRestart);
            $btnNextRest.on('click', onNextResult);
            $noRestsLeftBack.on('click', onBack);

            $restLink.on('click', function () {
                utils.ga.trackEvent('results', 'click_rest_name', $(this).data('rest-name'));

                return true; // allow normal behavior
            });
        }


        function showHeader() {
            if (!utils.isSmallScreen()) {
                $header.slideDown('fast');

            }
        }


        function hideHeader() {
            if (!utils.isSmallScreen()) {
                $header.slideUp('fast');
            }
        }


        function cacheElements() {
            $header = $("header");
            $questions = $("#questions");
            $restCountContent = $("#restCountContent");
            $restCount = $("#restCount");
            $restCountLabel = $("#restCountLabel");
            $story = $("#story");
            $btnBackContainer = $("#btnBackContainer");
            $btnBack = $("#btnBack");
            $btnRestart = $("#btnRestart");
            $restInfo = $("#restInfo");
            $restLink = $("#restLink");
            $restName = $("#restName");
            $restPhoneLink = $("#restPhoneLink");
            $restPhone = $("#restPhone");
            $restAddressLink = $("#restAddressLink");
            $restAddress = $("#restAddress");
            $btnPrevRest = $("#btnPrevRest");
            $btnNextRest = $("#btnNextRest");
            $noRestsLeft = $("#noRestsLeft");
            $noRestsLeftBack = $("#noRestsLeftBack");
            $restTip = $("#restTip");
            $footer = $("footer");
        }


        function onAnswerClicked() {
            var $elm = $(this),
                $questionElm = $elm.parents("article"),
                answer = $elm.data('value'),
                vertical = $questionElm.data('vertical'),
                questionGaName = $questionElm.data('ga-name');

            utils.log("[VIEW]", 'onAnswerClicked', 'vertical:', vertical, 'answer:', answer);

            utils.ga.trackEvent(questionGaName, (answer == '' ? 'no' : answer));

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
                $btnNextRest.hide();
                $btnPrevRest.hide();
            } else {
                $btnNextRest.show();
                $btnPrevRest.show();
            }

            $restCount.stop();
            $restCountContent.stop().fadeOut();
            scrollToSection("#results");

            displayRest();
        }


        function setRestInfo(rest) {
            $restName.html(rest.name).blur();
            $restPhone.html(rest.phone);
            $restAddress.html(rest.address);
            $restLink.attr('href', rest.url).data('rest-name', rest.gaName);

            if (utils.isMobile()) {
                $restAddressLink.attr('href', "http://maps.apple.com/?q=israel, Tel aviv, " + rest.address);
                $restPhoneLink.attr("href", "tel:" + rest.phone);
            }
        }


        function displayRest() {
            var rest = $.extend({}, resultsRestList[resultsCurrentRest].info, resultsRestList[resultsCurrentRest].info[utils.i18n.getLanguage()]);

            utils.ga.trackEvent('results', 'show_rest', rest.gaName);

            $restInfo.stop().animate({'opacity':0}, {
                duration:100,
                complete:function () {
                    setRestInfo(rest);
                    $restInfo.stop().animate({'opacity':1}, 700);
                }
            });

            if (!utils.isSmallScreen()) {
                $restTip.stop().animate({'opacity':0}, {
                    duration:100,
                    complete:function () {
                        $(this).html(rest.tip).stop().animate({'opacity':1}, 700);
                    }
                });
            }
        }


        function onPrevResult() {
            utils.ga.trackEvent('results', 'click', 'prev');

            resultsCurrentRest--;

            if (resultsCurrentRest < 0) {
                resultsCurrentRest = resultsRestList.length - 1;
            }

            displayRest();
        }


        function onNextResult() {
            utils.ga.trackEvent('results', 'click', 'next');

            resultsCurrentRest++;

            if (resultsCurrentRest == resultsRestList.length) {
                resultsCurrentRest = 0;
            }

            displayRest();
        }


        function onRestart() {
            utils.ga.trackEvent('btnRestart', 'click', $(currentSectionId).data('ga-name'));

            dcController.reset();
        }


        function noRestsLeft() {
            $noRestsLeft.fadeIn();
        }


        function onBack() {
            utils.ga.trackEvent($(this).attr('id'), 'click', $(currentSectionId).data('ga-name'));

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
            utils.log("[VIEW]", 'init');
            dcController = controller;

            // render questions HTML
            var htmlQuestions = utils.mustache.to_html(tmplQuestions, {"questions":questionsList});
            $("#questions .placeholder").first().after(htmlQuestions);

            cacheElements();
            bindEvents();

            handleI18n();

            if ((navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i)) && !window.navigator.standalone) {
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
define(['mustache', 'text!tmpl/questions-tmpl.html'], function (mustache, tmplQuestions) {

    var dcController,
        currentSectionId,
        resultsRestList,
        resultsCurrentRest,
        jscrollPane,
        isAboutOpen = false;


    // Elements
    var $questions,
        $restCount,
        $story,
        $btnBack,
        $btnRestart,
        $restInfo,
        $restLink,
        $restName,
        $restPhone,
        $restAddress,
        $aboutUsBtn,
        $btnNextRest;


    function log() {
        var args = [].slice.apply(arguments);
        args.unshift("[VIEW]");

        console.log.apply(console, args);
    }

    function setScrollbar() {
        jscrollPane = $("#aboutUsContentWrapper").jScrollPane({
            verticalDragMinHeight:70,
            verticalDragMaxHeight:249,
            verticalGutter:10,
            showArrows:false
        }).data('jsp');
    }

    function bindEvents() {

        // reset scroll position to current question and reinitialise jscroll
        $(window).on('resize', function (e) {
            scrollToSection();
            jscrollPane.reinitialise();
        });

        $(document)
            .on('click', '#questions li', onAnswerClicked)
            .on('questionShown', function (e, qId) {
                log('on questionShown', arguments);
                log('on questionShown', "1st q id:", $questions.find(".questionArticle").first().attr('id').replace('question', ''))

                if (qId == $questions.find(".questionArticle").first().attr('id').replace('question', '')) {
                    log('on questionShown', 'hiding');
                    $btnBack.fadeOut();
                } else {
                    log('on questionShown', 'showing');
                    $btnBack.fadeIn();
                }
            });

        $btnBack.on('click', dcController.onBack);
        $btnRestart.on('click', dcController.onReset);
        $btnNextRest.on('click', onNextResult);
        $aboutUsBtn.on('click', onAboutUsBtn);

        $(document).on("click", "#questions , #headerContent", function () {
            if (isAboutOpen) {
                closeContact();
                closeAbout();
            }
        });

        $(document).on("click", "#contact_submit", function () {
            if ($(this).hasClass("close")) {
                closeContact();
                closeAbout();
                $(this).removeClass("close").addClass("send");
            }
            else {
                $("#contact_submit").removeClass("send").addClass("loader");
                $(".loader_gif").show();
                var details = getContactFormDetails();
                if (details.message) {
                    sendContactMail(details);
                }
                else {
                    finishContactFormProc();
                    //TODO: user message
                }
            }
        });
        $(document).on("click", "#mailUs", function () {
            openContact();
        });
        $(document).on("click", "#mailUsClose", function () {
            isAboutOpen = false;
            closeContact();
            closeAbout();

        });
    }


    function cacheElements() {
        $questions = $("#questions");
        $restCount = $("#restCount");
        $story = $("#story");
        $btnBack = $("#btnBack");
        $btnRestart = $("#btnRestart");
        $restInfo = $("#restInfo");
        $restLink = $("#restLink");
        $restName = $("#restName");
        $restPhone = $("#restPhone");
        $restAddress = $("#restAddress");
        $btnNextRest = $("#btnNextRest");
        $aboutUsBtn = $("#aboutUsBtn");


    }

    function onAboutUsBtn() {
        if ($("#aboutUsWrapper").hasClass("off")) {
            openAbout();
        }
        else {
            closeAbout();
        }
    }

    function openAbout() {
        isAboutOpen = true;
        $($aboutUsBtn).hide();
        $("#aboutUsWrapper").removeClass("off").addClass("on");
        $("#aboutUsWrapper").animate({left:"0px"}, 500);
    }

    function closeAbout() {
        isAboutOpen = false;
        $("#aboutUsWrapper").removeClass("on").addClass("off");
        $("#aboutUsWrapper").animate({left:"-440px"}, 500, function () {
            $aboutUsBtn.css({left:"436px"});
            $aboutUsBtn.fadeIn();
        });
    }

    function closeContact() {
        $(".loader_gif").hide();
        $("#contact_submit").html("").removeClass("loader");
        $("#contactUsWrapper").animate({"left":"-550"}, 500, function () {
            $("#name").val("");
            $("#customer_mail").val("");
            $("#Message").val("");
            $("#fixed_element_contact").hide();
        });

    }

    function openContact() {
        $("#contactUsWrapper").show().animate({"left":"440"}, 500);

    }

    function sendContactMail(details) {
        $.ajax({
            url:"send_contact_gm.php",
            type:"POST",
            data:{
                name:details.name,
                customerMail:details.customerMail,
                message:details.message
            },
            success:function (data) {
                console.log(data);
                finishContactFormProc();


            },
            error:function (data) {
                finishContactFormProc();
                console.log("error - " + data);
            }

        });

    }

    function finishContactFormProc() {
        $(".loader_gif").hide();
        $("#contact_submit").removeClass("loader").addClass("close");
        clearContactForm();
    }

    function clearContactForm() {
        $("#name").val("");
        $("#customer_mail").val("");
        $("#Message").val("");
    }

    function getContactFormDetails() {
        var details = {};
        details.name = $("#name").val();
        details.customerMail = $("#customer_mail").val();
        details.message = $("#Message").val();
        return details;
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

        $story.queue(function (next) {
            var $spanChapter = $("<span></span>").appendTo($story);
            $spanChapter.teletype({ text:chapter }, next);
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
        $restCount.show(); // make sure the rest count is visible

        scrollToSection("#question" + questionId);

        if (questionId) { // trigger event if new question shown
            $(document).trigger('questionShown', "#question" + questionId);
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

        $restCount.stop().fadeOut();
        scrollToSection("#results");

        displayRest();
    }


    function displayRest() {
        $restInfo.stop().animate({'opacity':0}, {
            duration:100,
            complete:function () {
                var rest = resultsRestList[resultsCurrentRest].info;

                $restName.html(rest.name);
                $restPhone.html(rest.phone);
                $restAddress.html(rest.address);
                $restLink.attr('href', rest.url);

                $restInfo.stop().animate({'opacity':1}, 700);
            }
        });
    }


    function onNextResult() {
        resultsCurrentRest++;

        if (resultsCurrentRest == resultsRestList.length) {
            resultsCurrentRest = 0;
        }

        displayRest();
    }


    function noRestsLeft() {
        //TODO - noRestsLeft
    }


    function scrollToSection(sectionId) {
        currentSectionId = sectionId || currentSectionId;

        $questions.stop().scrollTo(currentSectionId, {
            duration:1000,
            easing:"easeOutBack"
        });
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
        var htmlQuestions = mustache.to_html(tmplQuestions, {"questions":questionsList});
        $("#questions").html(htmlQuestions);

        cacheElements();
        bindEvents();
        setScrollbar();
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
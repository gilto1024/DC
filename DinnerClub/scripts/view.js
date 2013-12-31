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
            clickTableUrl,
            map,
            visitsNumber,
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
            $textMadeInTLV,
            $footer;


        function bindEvents() {


            /*$('#show').avgrund({
             height:200,
             holderClass:'custom',
             showClose:true,
             showCloseText:'close',
             onBlurContainer:'.container',
             template:'<p>היי, בא לכאן הרבה?</p>' +
             '<p>שתף לחברים למה לא?</p>' +
             '<div>' +
             '<div id="facebookPopShare"></div>' +
             ' <div class="fb-like" data-href="https://www.facebook.com/Dinnerclubcoil" data-width="160" data-layout="button_count" data-show-faces="false" data-send="false"></div>' +
             '</div>'
             });*/

            window.onorientationchange = function () {
                window.scrollTo(0, 1);
                scrollToSection();
            };

            // reset scroll position to current question
            $(window).on('resize', function (e) {
                scrollToSection();
            });


            //SHARE COOKIE FEATURE
            /* visitsNumber = utils.cookies.retrieve(utils.cookies.vNum) || "0";
             if (visitsNumber % 10 == 0 && visitsNumber != 0) {
             $('#show').click();
             }
             var newNumOfVisits = parseInt(visitsNumber);
             newNumOfVisits++;
             utils.cookies.store(utils.cookies.vNum, newNumOfVisits.toString(), 365);*/

            //SHARE COOKIE FEATURE


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
                        $btnBackContainer.fadeIn();
                        showHeader();
                        if (utils.isSmallScreen()) {
                            $("#languageSelectionWrapper").fadeOut();
                            $footer.fadeOut();
                        }
                        else {
                            $restCountContent.show();
                        }
                    }
                });

            $btnBack.on('click', onBack);
            $btnPrevRest.on('click', onPrevResult);
            $btnRestart.on('click', onRestart);
            $btnNextRest.on('click', onNextResult);
            $noRestsLeftBack.on('click', onBack);
            /* $("#facebookPopShare").on('click', function () {
             window.open('http://www.facebook.com/sharer/sharer.php?u=www.dinnerclub.co.il&t=Hello&summary=YOUR_SUMMARY', 'facebook_share', 'height=320, width=640, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, directories=no, status=no');
             });*/

            $restLink.on('click', function () {
                utils.ga.trackEvent('results', 'click_rest_name', $(this).data('rest-name'));

                return true; // allow normal behavior
            });

            //TODO - change to jquery constants
            $infoIcon.on("click", onInfoClick);
            $mapIcon.on("click", onMapClick);
            $open_maps.on("click", function () {
                utils.ga.trackEvent('maps', 'click_open_maps', "open_maps");
                var latLng = $(this).attr("lat") + "," + $(this).attr("lng");
                window.open("http://maps.google.com/?q=" + latLng, '_blank');
            });

            $getTable.on("click", onClickTable);
            $textMadeInTLV.on("click", function () {
                utils.ga.trackEvent('site', 'click_madeintlv', "madeintlv");
                window.open("http://madeintlv.org", '_blank');
            })

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
            $infoIcon = $("#infoIcon");
            $mapIcon = $("#mapIcon");
            $tip_dish = $("#tip_dish");
            $tip_seating = $("#tip_seating");
            $tip_parking = $("#tip_parking");
            $open_maps = $("#open_maps");
            $getTable = $("#getTable");
            $dollar = $("#dollar");
            $textMadeInTLV = $("#textMadeInTLV");
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

            /* // HAPPY NEW YEAR
             if (answer == "table" || answer == "bar") {
             setTimeout(function(){$(".hny").fadeIn()},400);
             }
             else{
             $(".hny").hide("fast");
             }
             //HAPPEY NEW YEAR*/
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
            if ((rest.menuUrl).toLowerCase() != "false") {
                $restLink.attr('href', rest.menuUrl).data('rest-name', rest.gaName);
            }
            else {
                $restLink.attr('href', rest.url).data('rest-name', rest.gaName);
            }

            $tip_dish.html(rest.tip_dish);
            $tip_seating.html(rest.tip_seating);
            $tip_parking.html(rest.tip_parking);
            var dir = utils.i18n.getDirection();
            $dollar.attr("src", "img/" + (parseInt(rest.price) + "_" + dir) + ".png");
            var texts = utils.i18n.getStaticTexts();
            var price = parseInt(rest.price);
            var priceTitle;
            switch (price) {
                case 3:
                    priceTitle = texts.price_3Title;
                    break;
                case 4:
                    priceTitle = texts.price_4Title;
                    break;
                case 5:
                    priceTitle = texts.price_5Title;
                    break;

            }
            $dollar.attr('title', priceTitle);

            setClickTable(rest);

            setGoogleMap(rest);

            if (utils.isMobile()) {
                $restAddressLink.attr('href', "http://maps.apple.com/?q=israel, Tel aviv, " + rest.address);
                $restPhoneLink.attr("href", "tel:" + rest.phone);
            }
        }


        function displayRest() {

            $("#map").animate({top:"-369px"}, "fast"); //hide map so it wont work when hidden
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
                $tip_dish.stop().animate({'opacity':0}, {
                    duration:100,
                    complete:function () {
                        $tip_dish.html(rest.tip_dish).stop().animate({'opacity':1}, 700);
                    }
                });
                $tip_seating.stop().animate({'opacity':0}, {
                    duration:100,
                    complete:function () {
                        $tip_seating.html(rest.tip_seating).stop().animate({'opacity':1}, 700);
                    }
                });
                $tip_parking.stop().animate({'opacity':0}, {
                    duration:100,
                    complete:function () {
                        $tip_parking.html(rest.tip_parking).stop().animate({'opacity':1}, 700);
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
            $infoIcon.click();
            displayRest();
        }


        function onNextResult() {
            //SHARE CONCEPT AFTER A FEW CLICKS HERE
            //$('#show').click();
            //SHARE CONCEPT AFTER A FEW CLICKS HERE


            utils.ga.trackEvent('results', 'click', 'next');

            resultsCurrentRest++;

            if (resultsCurrentRest == resultsRestList.length) {
                resultsCurrentRest = 0;
            }
            $infoIcon.click();
            displayRest();
        }


        function onRestart() {
            $infoIcon.click();
            utils.ga.trackEvent('btnRestart', 'click', $(currentSectionId).data('ga-name'));

            dcController.reset();
        }


        function noRestsLeft() {
            $noRestsLeft.fadeIn();
        }


        function onBack() {
            $infoIcon.click();
            /* //HAPPY NEW YEAR
             $(".hny").hide("fast");
             //HAPPY NEW YEAR*/
            /* $infoIcon.click();*/
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

        function onClickTable() {
            var url = $getTable.attr("data");
            utils.ga.trackEvent("results", 'click_table', "url");

            window.open(url, '_blank');
        }


        function onInfoClick() {
            utils.ga.trackEvent('results', 'info_click', "info");
            //sets to false so the user cant move the map while its in opacity 0
            map.setOptions({draggable:false});

            //TODO - change to jquery constants
            if ($infoIcon.hasClass("sel") == false) {
                removeSelectedClass();
                hideAndShowOtherTabs("info");
                $infoIcon.addClass("sel");
            }


        }

        function onMapClick() {
            utils.ga.trackEvent('results', 'maps', "map_click");
            //sets to false so the user cant move the map while its in opacity 1
            map.setOptions({draggable:true});
            if ($mapIcon.hasClass("sel") == false) {
                //setGoogleMap();
                removeSelectedClass();
                hideAndShowOtherTabs("map");
                $mapIcon.addClass("sel");
            }
        }


        function setGoogleMap(rest) {

            //set open in google maps attr
            $open_maps.attr("lat", rest.location.lat);
            $open_maps.attr("lng", rest.location.lng);


            if (rest.parking.lat && rest.location.lat == rest.parking.lat) {
                //means that there is no parking
                var locations = [
                    ['Location', rest.location.lat, rest.location.lng, 2, "Location"]
                ];
                setMap(rest, locations)
            }
            else {
                $.ajax({
                    url:"http://maps.googleapis.com/maps/api/geocode/json?latlng=" + rest.parking.lat + "," + rest.parking.lng + "&sensor=true",
                    success:function (res) {
                        var address;
                        if (res.results[0]) {
                            address = res.results[0].formatted_address;
                        }
                        else {
                            address = "Parking";
                        }

                        var locations = [
                            ['Location', rest.location.lat, rest.location.lng, 2, "Location"],
                            [address, rest.parking.lat, rest.parking.lng, 1, "Parking"]
                        ];
                        setMap(rest, locations)
                    }
                })


            }


        }

        function setMap(rest, locations) {

            var myLatlng = new google.maps.LatLng(rest.location.lat, rest.location.lng);

            map = new google.maps.Map(document.getElementById('map-canvas'), {
                zoom:15,
                center:myLatlng,
                draggable:false,
                mapTypeId:google.maps.MapTypeId.ROADMAP
            });

            var infowindow = new google.maps.InfoWindow();

            var marker, i;

            for (i = 0; i < locations.length; i++) {
                marker = new google.maps.Marker({
                    position:new google.maps.LatLng(locations[i][1], locations[i][2]),
                    map:map
                });
                marker.setIcon('img/' + locations[i][4] + '.png');

                google.maps.event.addListener(marker, 'click', (function (marker, i) {
                    return function () {
                        infowindow.setContent(locations[i][0]);
                        infowindow.open(map, marker);
                    }
                })(marker, i));
            }
            /* //hide the map so it won't work in bg

             $("#map").animate({"opacity":"0"}, function () {
             $("#map").css("display", "none");
             */
            /*$(this).hide();*/
            /*
             map.setZoom(15);
             });*/


        }

        function setClickTable(rest) {
            var url = (rest.clickTableUrl).toLowerCase();
            if (url != "false" && url != "") {
                $getTable.show();
                url = url.substr(6);
                $getTable.attr("data", "http://" + url)
            }
            else {
                $getTable.hide();
            }

        }


        function hideAndShowOtherTabs(id) {
            $(".tabs").each(function (index) {
                $(this).animate({"opacity":"0"}, function () {

                    $(this).css("width", "0px");
                    $(this).css("height", "0px");
                    $("#map").animate({top:"-369px"}, "fast");
                });
            });
            $("#" + id).animate({"width":"280px", "height":"309px"}, 10, function () {
                $("#" + id).animate({opacity:1}, 10);
                if (id == "map") {
                    $("#" + id).animate({top:"47px"}, 10);
                }
            });
        }

        function removeSelectedClass() {
            $(".icons").each(function (index) {
                $(this).removeClass("sel");
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


            $btnBack.attr('title', texts.btnBackTitle);
            $btnPrevRest.attr('title', texts.btnPrevRestTitle);
            $btnRestart.attr('title', texts.btnRestartTitle);
            $btnNextRest.attr('title', texts.btnNextRestTitle);
            $mapIcon.attr('title', texts.mapIconTitle);
            $infoIcon.attr('title', texts.infoIconTitle);
            $("#restName").attr('title', texts.restNameTitle);

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
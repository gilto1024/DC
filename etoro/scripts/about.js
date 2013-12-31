define(['jquery', 'utils', 'text!style/jquery.jscrollpane.css', 'mousewheel', 'jscrollpane'], function ($, utils, jScrollPaneCss) {

    //TODO detach background color (grey\pink) to separate divs (for opacity)
    //TODO form validation
    //TODO add full screen white overlay behind the panels
    //TODO single HTML for structure, insert text using i18n module\templates

    var jScrollPane,
        isAboutOpen = false,
        $aboutUsBtn,
        animationSpeed = 300;


    var animationDir = ($("html").attr('dir') == 'rtl' ? 'right' : 'left'),
        closeLabel = (animationDir == 'right' ? 'סגור' : "Close"),
        sendLabel = (animationDir == 'right' ? 'שלח' : "Send");


    function cacheElements() {
        $aboutUsBtn = $("#aboutUsBtn");
    }


    function bindEvents() {
        // reset scroll position to current question and reinitialise jscroll
        $(window).on('resize', function (e) {
            if (isAboutOpen) {
                jscrollPane.reinitialise();
            }
        });

        $aboutUsBtn.off('click').on('click', onAboutUsBtn);

        $(document).on("click", function (e) {
            var aboutOrContactClicked = ($(e.target).parents('#aboutUsWrapper').length > 0) ||
                ($(e.target).parents('#contactUsWrapper').length > 0);

            if (!aboutOrContactClicked && isAboutOpen) {
                closeContact();
                closeAbout();
            }
        });

        $("#contact_submit").on("click", function () {
            if ($(this).hasClass("close")) {
                closeContact();
                closeAbout();
                $(this).removeClass("close").addClass("send").text(sendLabel);
            }
            else {
                utils.ga.trackEvent('about', 'click', 'send_form');

                $("#contact_submit").removeClass("send").addClass("loader").text('');
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

        $("#mailUs").on("click", function () {
            openContact();
        });

        $("#mailUsClose, #aboutUsClose").on("click", function () {
            utils.ga.trackEvent('about', 'click', 'close');

            isAboutOpen = false;
            closeContact();
            closeAbout();
        });
    }


    function initScrollbar() {
        jscrollPane = $("#aboutUsContentWrapper").jScrollPane({
            verticalDragMinHeight:70,
            verticalDragMaxHeight:249,
            verticalGutter:10,
            showArrows:false
        }).data('jsp');
    }


    function onAboutUsBtn() {
        if ($("#aboutUsWrapper").hasClass("off")) {
            utils.ga.trackEvent('about', 'click', 'i_btn');

            openAbout();
        }
        else {
            closeAbout();
        }
    }


    function openAbout() {
        if (!jScrollPane) {
            initScrollbar();
        }

        isAboutOpen = true;
        $($aboutUsBtn).hide();
        $("#aboutUsWrapper").removeClass("off").addClass("on");

        var animationObj = {};
        animationObj[animationDir] = "0px";
        $("#aboutUsWrapper").animate(animationObj, animationSpeed);
    }


    function closeAbout() {
        isAboutOpen = false;
        $("#aboutUsWrapper").removeClass("on").addClass("off");

        var animationObj = {};
        animationObj[animationDir] = "-500px";
        $("#aboutUsWrapper").animate(animationObj, animationSpeed, function () {
            var animationObj = {};
            animationObj[animationDir] = "500px";

            $aboutUsBtn.css(animationObj);
            $aboutUsBtn.fadeIn();
        });
    }


    function closeContact() {
        $(".loader_gif").hide();
        $("#contact_submit").html(sendLabel).removeClass("loader");

        var animationObj = {};
        animationObj[animationDir] = "-550px";
        $("#contactUsWrapper").animate(animationObj, animationSpeed, function () {
            $("#name").val("");
            $("#customer_mail").val("");
            $("#Message").val("");
            $("#fixed_element_contact").hide();
        });

    }


    function openContact() {
        utils.ga.trackEvent('about', 'click', 'contact');

        var animationObj = {};
        animationObj[animationDir] = "441px";
        $("#contactUsWrapper").show().animate(animationObj, animationSpeed);

        // Preload the loader image
        var preload = new Image();
        preload.src = "img/ajax-loader.gif";
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
                utils.log(data);
                finishContactFormProc();


            },
            error:function (data) {
                finishContactFormProc();
                utils.log("error - " + data);
            }

        });

    }


    function finishContactFormProc() {
        $(".loader_gif").hide();
        $("#contact_submit").removeClass("loader").addClass("close").text(closeLabel);
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


    function init() {

        // Doing this using jQuery doesn't work on IE and FF for some reason
        //$('head').append('<link type="test/css" rel="stylesheet" href="style/about.css" />');
        var aboutcss=document.createElement("link");
        aboutcss.setAttribute("rel", "stylesheet");
        aboutcss.setAttribute("type", "text/css");
        aboutcss.setAttribute("href", "style/about.css");

        document.getElementsByTagName("head")[0].appendChild(aboutcss);

        $('head').append('<style type="text/css">' + jScrollPaneCss + '</style>');

        utils.log('[ABOUT]', 'getting about HTML');
        require(['text!tmpl/about-tmpl-' + utils.i18n.getLanguage() + '.html'], function (html) {
            utils.log('[ABOUT]', 'HTML received, appending');
            $('body').append(html);

            cacheElements();
            bindEvents();

            setTimeout(function() {
                utils.log('[ABOUT]', 'fading in');
                $aboutUsBtn.fadeIn();
            }, 100);
        });
    }


    return {
        init:init
    }
});
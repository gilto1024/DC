define([], function (html, css) {

    var jscrollPane,
        isAboutOpen = false,
        $aboutUsBtn;

    var animationDir = ($("html").attr('dir') == 'rtl' ? 'right' : 'left'),
        i18nArrow = (animationDir == 'right' ? '&#x25B6;' : "&#x25C0;");

    function cacheElements() {
        $aboutUsBtn = $("#aboutUsBtn");
    }


    function bindEvents() {
        // reset scroll position to current question and reinitialise jscroll
        $(window).on('resize', function (e) {
            jscrollPane.reinitialise();
        });

        $aboutUsBtn.on('click', onAboutUsBtn);

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

        $("#mailUs").on("click", function () {
            openContact();
        });

        $("#mailUsClose").on("click", function () {
            isAboutOpen = false;
            closeContact();
            closeAbout();
        });
    }


    function setScrollbar() {
        jscrollPane = $("#aboutUsContentWrapper").jScrollPane({
            verticalDragMinHeight:70,
            verticalDragMaxHeight:249,
            verticalGutter:10,
            showArrows:false
        }).data('jsp');
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

        var animationObj = {};
        animationObj[animationDir] = "0px";
        $("#aboutUsWrapper").animate(animationObj, 500);
    }


    function closeAbout() {
        isAboutOpen = false;
        $("#aboutUsWrapper").removeClass("on").addClass("off");

        var animationObj = {};
        animationObj[animationDir] = "-440px";
        $("#aboutUsWrapper").animate(animationObj, 500, function () {
            var animationObj = {};
            animationObj[animationDir] = "436px";

            $aboutUsBtn.css(animationObj);
            $aboutUsBtn.fadeIn();
        });
    }


    function closeContact() {
        $(".loader_gif").hide();
        $("#contact_submit").html("").removeClass("loader");

        var animationObj = {};
        animationObj[animationDir] = "-550px";
        $("#contactUsWrapper").animate(animationObj, 500, function () {
            $("#name").val("");
            $("#customer_mail").val("");
            $("#Message").val("");
            $("#fixed_element_contact").hide();
        });

    }


    function openContact() {
        var animationObj = {};
        animationObj[animationDir] = "440px";
        $("#contactUsWrapper").show().animate(animationObj, 500);

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


    function init() {
        cacheElements();
        bindEvents();

        $("#mailUsClose").html(i18nArrow);

        setScrollbar();
    }


    return {
        init:init
    }
});
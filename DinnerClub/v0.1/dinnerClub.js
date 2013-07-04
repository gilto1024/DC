var currentStage = "type";
var dateArray = [];
var sittingArray = [];
var soArray = [];
var lightArray = [];
var volumeArray = [];
var resultArray = [];
var dateFlag = false;
var cameFrom = '';
var $container;
var $fixed_element_about_content = null;
var $fixed_element_counter = null;
var $end_result_text = null;
var $flip_it = null;
var $end_result_tel = null;
var $end_result_name = null;
var $end_result_address = null;
var rest = [];
var resizeFlag = true;
var nextResultOption = 0;
var $ruler = $("<span id='ruler'></span>");
var story;
var typeWriterIsOn = false;
var date = true;
var so = true;
var sitting = true;
var light = true;
var vol = true;
var parking = true;
var screenWidth;
var jscrollPane = null;
var isAboutOpen = false;
var passwordsArr = ["Alba", "Brasserie", "Tapas", "1", "haam", "Popina", "Radio", "Rosco", "Taizu", "Sola", "Mel", "&", "Michel", "Shila", "Toto", "Bread", "Story", "Kitchen", "Market", "Tapeo", "Onami", "Messa", "Catit", "Rafael", "Cocuina", "Tamar", "Port", "Said", "Tourkiz", "Boya", "Alma", "Zepra", "Yafo", "Tel", "Aviv", "Coffee", "Bar", "Juz", "&", "Luz", "Delicatessen", "Viki", "Christina", "Kalamata", "Nanuchka", "Abraxas", "North", "Mtbach", "Laila", "Yavne", "Montifiore", "Hotel", "Montefiore", "Hazer", "Goldman", "Mizlala", "Herbert", "Samuel", "Café", "Italia", "Flee", "Market", "Social", "Club", "Cantina", "HaShulchan", "Café", "Europa", "Joya", "Yassu", "Heder", "Ochel", "Dallal", "Makom", "Shel", "Basar", "Suzanna", "Vong", "Pronto", "Yakimono", "Mul", "Yam", "David", "veYosef", "Trumpeldor", "10", "Sardinia", "Berti", "Adora", "Ouzeria", "Hanoi"];
var countAnimationTimer = null;

$.fn.teletype = function (opts, callback) {
    var $this = this,
        defaults = {
            animDelay:50
        },
        settings = $.extend(defaults, opts);

    $.each(settings.text.split(''), function (i, letter) {
        setTimeout(function () {
            $this.html($this.html() + letter);
        }, settings.animDelay * i);
    });
};


$(document).ready(function () {
    if (mobilecheck()) {
        document.location = "mobile.html"
    }
    console.log(DNCookie.getCookie("DN_password"));
    if (DNCookie.getCookie("DN_password") == "correct") {
        $("#pass_welcome").fadeOut();
        $("#container").fadeIn();
        init();
        setStyle();
        setupEvents();
    }
    else {
        setupPwEvents();
    }

});

function setupPwEvents() {
    $("#pass_welcome").on("keydown", '#passwordInput', function (event) {
        if (event.keyCode == 13) {
            $("#passwordInput").blur();
            handlePassword($(this).val());
        }
    });

    $("#pass_welcome").on("click", '#enter_pass', function (event) {
        handlePassword($("#passwordInput").val());
    });

    $("#pass_welcome").on("focus", '#passwordInput', function (event) {
        if ($("#enter_pass").hasClass("red"))
            $("#enter_pass").fadeOut(200, function () {
                $("#enter_pass").text("Enter");
                $("#enter_pass").removeClass("red");
                $("#enter_pass").fadeIn();
            });
    });
}


function setupEvents() {
    var windowWasSmall = false;
    $(window).resize(function () {
        jscrollPane.reinitialise();
        var currentUrl = location.href;
        var section = currentUrl.split("#");
        if (($(window).width() < 1250 || $(window).height() < 650) && resizeFlag) {
            $("#resizeBG").show(500, function () {
                $("#resize_msg").show(200, function () {
                    windowWasSmall = true;
                    /*setStyle();*/
                    console.log("show resize msg");
                });
            });
            resizeFlag = false;
        }
        if ($(window).width() > 1250 && $(window).height() > 650) {
            $("#resize_msg").hide(500, function () {
                $("#resizeBG").hide(200, function () {
                    if (windowWasSmall) {
                        windowWasSmall = false;
                        console.log("hide resize msg");
                        //init();
                        //document.location.reload(true);
                        setStyle();
                    }
                });
            });
            resizeFlag = true;
        }
    });

    $container.on("click", ".date_select", function () {
        var selected = $(this).attr("value");
        if (selected == "yes") {
            dateFlag = true;
            dateChosen("yes");
            if (date) {
                date = false; //setting back the flag for typing the story
                $('#date_text').teletype({
                    animDelay:30, // the bigger the number the slower the typing
                    text:story.date.date
                });
            }
        }
        else {
            dateFlag = false;
            dateChosen("no");
        }
        cameFrom = "date";
        trackEvent("date_choice", "click", selected);
    });
    $container.on("click", ".so_select", function () {
        var selected = $(this).attr("value");
        if (so) {
            so = false; //setting back the flag for typing the story
            $('#so_text').teletype({
                animDelay:30, // the bigger the number the slower the typing
                text:story.date[selected]
            });
        }
        soChosen(selected);
        $("#sitting").show();
        cameFrom = "so";
        trackEvent("so_choice", "click", selected);
    });
    $container.on("click", ".sitting_select", function () {
        var selected = $(this).attr("value");
        sittingChosen(selected);
        if (sitting) {
            sitting = false; //setting back the flag for typing the story
            $('#sitting_text').teletype({
                animDelay:30, // the bigger the number the slower the typing
                text:story.barTable[selected]
            });
        }

        cameFrom = "sitting";
        trackEvent("sitting_choice", "click", selected)
    });
    $container.on("click", ".light_select", function () {
        var selected = $(this).attr("value");
        lightChosen(selected);
        if (light) {
            light = false; //setting back the flag for typing the story
            $('#light_text').teletype({
                animDelay:30, // the bigger the number the slower the typing
                text:story.dimBright[selected]
            });
        }

        $("#volume").show();
        cameFrom = "light";
        trackEvent("light_choice", "click", selected);
    });
    $container.on("click", ".volume_select", function () {
        var selected = $(this).attr("value");
        volumeChosen(selected);
        if (vol) {
            vol = false; //setting back the flag for typing the story
            $('#volume_text').teletype({
                animDelay:30, // the bigger the number the slower the typing
                text:story.quietLoud[selected]
            });
        }

        cameFrom = "vol";
        trackEvent("volume_choice", "click", selected);
    });
    $container.on("click", ".parking_select", function () {
        var selected = $(this).attr("value");
        parkingChosen(selected);
        if (parking) {
            parking = false; //setting back the flag for typing the story
            $('#parking_text').teletype({
                animDelay:30, // the bigger the number the slower the typing
                text:story.parking[selected]
            });
        }

        cameFrom = "parking";
        trackEvent("parking", "click", selected);

    });
    $container.on("click", ".fixed_element_back_button, #no_options_msg_back", function () {
        trackEvent("back_btn", "click", cameFrom);
        $fixed_element_counter.show();
        if ($(this).attr("id") == "no_options_msg_back") {
            $("#no_options_msg").fadeOut(function () {
                $("#blackBG").fadeOut();
            });
        }
        $("#" + cameFrom + "Menu").click();
        switch (cameFrom) {
            case "date":
                date = true; //setting back the flag for typing the story
                $("#date_text").html("");
                $fixed_element_counter.hide().html('');
				writeOptions([]);
                $(".fixed_element_back_button").hide();
                break;
            case "so":
                so = true;
                $("#so_text").html("");
                writeOptions(dateArray);
                cameFrom = "date";
                break;
            case "sitting":
                sitting = true;
                $("#sitting_text").html("");
                if (dateFlag) {
                    writeOptions(dateArray);
                }
                else {
                    writeOptions(soArray);
                }
                cameFrom = "so";
                break;
            case "light":
                light = true;
                $("#light_text").html("");
                writeOptions(sittingArray);
                cameFrom = "sitting";
                break;
            case "vol":
                vol = true;
                $("#volume_text").html("");
                writeOptions(lightArray);
                cameFrom = "light";
                break;
            case "parking":
                parking = true;
                $("#parking_text").html("");
                writeOptions(volumeArray);
                cameFrom = "vol";
                break;
        }
    });
    $container.on("click", "#result_next", function () {
        trackEvent("result", "click", "next_result");
        $flip_it.removeClass("fliped").removeClass("not_flip").addClass("not_flip");
        var randOption = Math.floor((Math.random() * resultArray.length));
        $("#result_rest").fadeOut(500, function () {
            showNextResult();
        });
    });
    $container.on("click", "#resizeBG", function () {
        $("#resize_msg").hide(500, function () {
            $("#resizeBG").hide(200, function () {
            });
        });
    });
    $container.on("click", "#contact_submit", function () {
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
    $container.on("click", "#mailUs", function () {
        openContact();
    });
    $container.on("click", "#mailUsClose", function () {
        isAboutOpen = false;
        closeContact();
        closeAbout();

    });
    $container.on("click", "#about_btn , #aboutUsClose", function () {
        if ($fixed_element_about_content.hasClass("off")) {
            openAbout();
        }
        else {
            closeAbout();
        }
    });
    $container.on("click", "#result_rest , #result_details", function () {
        if ($("#result_details").hasClass("not_flip")) {
            showRestDetails();
        }
        else {
            hideRestDetails();
        }
    });
    $container.on("click", ".sectionNew", function () {
        if (isAboutOpen) {
            closeContact();
            closeAbout();
        }
    });


    var locationPath = filterPath(location.pathname);
    var scrollElem = scrollableElement('html', 'body');

    $('a[href*=#]').each(function () {
        var thisPath = filterPath(this.pathname) || locationPath;
        if (locationPath == thisPath
            && (location.hostname == this.hostname || !this.hostname)
            && this.hash.replace(/#/, '')) {
            var $target = $(this.hash), target = this.hash;
            if (target) {
                var targetOffset = $target.offset().top;
                $(this).click(function (event) {
                    event.preventDefault();
                    $(scrollElem).animate({scrollTop:targetOffset}, 400, function () {
                        location.hash = target;
                    });
                });
            }
        }
    });
}


function showNextResult() {
    $("#result_details").removeClass("fliped").addClass("not_flip");
    $("#result_details").animate({right:"-" + (screenWidth + 50)}, 750);
    if (nextResultOption < resultArray.length) {
        if (resultArray[nextResultOption].name == $end_result_name.text()) {
            nextResultOption++;
        }
        populateResult(nextResultOption);
    }
    else {
        nextResultOption = 0;
        populateResult(nextResultOption);
    }
    nextResultOption++;
    $("#result_rest").fadeIn("fast", function () {
    });
}


function populateResult(idx) {
    $("#result_tel").text(resultArray[idx].Tel);
    $("#result_rest").text(resultArray[idx].name);
    $("#result_address").text(resultArray[idx].Address);
}


function getContactFormDetails() {
    var details = {};
    details.name = $("#name").val();
    details.customerMail = $("#customer_mail").val();
    details.message = $("#Message").val();
    return details;
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


function openAbout() {
    isAboutOpen = true;
    $("#about_btn").hide();
    $fixed_element_about_content.removeClass("off").addClass("on");
    $fixed_element_about_content.animate({left:"-2px"}, 500);
    trackEvent("about", "click", "show");
}


function closeAbout() {
    isAboutOpen = false;
    $fixed_element_about_content.removeClass("on").addClass("off");
    $fixed_element_about_content.animate({left:"-440px"}, 500, function () {
        $("#about_btn").css({left:"436px"});
        $("#about_btn").fadeIn();
    });
    trackEvent("about", "click", "hide");
}


function showRestDetails() {
    $("#result_details").removeClass("not_flip").addClass("fliped");
    $("#result_details").animate({right:"0px"}, 750);
    trackEvent("result", "click", "flip");
}


function hideRestDetails() {
    $("#result_details").removeClass("fliped").addClass("not_flip");
    $("#result_details").animate({right:"-" + (screenWidth + 50)}, 750);
    trackEvent("result", "click", "back_flip");
}


function handlePassword(passVal) {
    if (passwordsArr.indexOf(passVal) != -1) {
        trackEvent("password", "enter", passVal);
        console.log(passwordsArr.indexOf(passVal));
        $("#pass_welcome").fadeOut();
        $("#container").fadeIn();
        init();
        setStyle();
        setupEvents();
        DNCookie.set_Cookie('DN_password', 'correct', 1, '/', '', '');
        console.log(DNCookie.getCookie("DN_password"));

    }
    else {
        $("#passwordInput").blur();
        $("#passwordInput").val("");
        $("#enter_pass").fadeOut(200, function () {
            $("#enter_pass").text("Incorrect");
            $("#enter_pass").addClass("red");
            $("#enter_pass").fadeIn();
        });
    }
    /* setTimeout(function () {
     $("#enter_pass").fadeOut(200, function () {
     $("#enter_pass").text("Enter");
     $("#enter_pass").removeClass("red");
     $("#enter_pass").fadeIn();
     });
     }, 1000);*/
}


function closeContact() {
    $(".loader_gif").hide();
    $("#contact_submit").html("").removeClass("loader");
    $("#fixed_element_contact").animate({"left":"-550"}, 500, function () {
        $("#name").val("");
        $("#customer_mail").val("");
        $("#Message").val("");
        $("#fixed_element_contact").hide();
    });
    trackEvent("contact", "click", "hide");
}


function openContact() {
    $("#fixed_element_contact").show().animate({"left":"434"}, 500);
    trackEvent("contact", "click", "show");
}


function checkIfNoMoreOptions(optionsArray) {
    if (optionsArray.length == 0) {
        $("#blackBG").fadeIn(function () {
            $("#no_options_msg").fadeIn();
        });
    }
}


function filterPath(string) {
    return string
        .replace(/^\//, '')
        .replace(/(index|default).[a-zA-Z]{3,4}$/, '')
        .replace(/\/$/, '');
}


// use the first element that is "scrollable"
function scrollableElement(els) {
    for (var i = 0, argLength = arguments.length; i < argLength; i++) {
        var el = arguments[i],
            $scrollElement = $(el);
        if ($scrollElement.scrollTop() > 0) {
            return el;
        } else {
            $scrollElement.scrollTop(1);
            var isScrollable = $scrollElement.scrollTop() > 0;
            $scrollElement.scrollTop(0);
            if (isScrollable) {
                return el;
            }
        }
    }
    return [];
}


function setStyle() {
    console.log("setstyle");
    var h = $(window).height();
    var w = $(window).width();
    screenWidth = w;
    //$(".section").css({width:w, height:h});
    var sectionNewWidth = w * 0.8;
    $(".sectionNew").css({width:sectionNewWidth, height:h});
    $(".sectionRes").css({width:w, height:h});
    jscrollPane = $("#about_content").jScrollPane({
        verticalDragMinHeight:70,
        verticalDragMaxHeight:249,
        verticalGutter:10,
        showArrows:false
    }).data('jsp');
}


function dateChosen(isDate) {
    $(".fixed_element_back_button").show();
    $("#fixed_element_counter").show();
    dateArray = [];
    for (var i = 0; i < rest.length; i++) {
        if (isDate == "yes") {
            for (var j = 0; j < (rest[i].date).length; j++) {

                if (rest[i].date[j] == isDate) {
                    dateArray.push(rest[i]);
                }
            }
        }//its not a date
        else {
            if (rest[i].so[0] !== "") {
                dateArray.push(rest[i]);
            }
        }

    }

    console.log(dateArray);
    writeOptions(dateArray);
}


function sittingChosen(sittingType) {
    var activeArray = [];
    sittingArray = [];
    if (dateFlag) {
        for (var i = 0; i < dateArray.length; i++) {
            for (var j = 0; j < (dateArray[i].sitting).length; j++) {
                if ((dateArray[i].sitting[j]) == sittingType) {
                    sittingArray.push(dateArray[i]);
                }
            }
        }
    }
    else {
        for (var i = 0; i < soArray.length; i++) {
            for (var j = 0; j < (soArray[i].sitting).length; j++) {
                if ((soArray[i].sitting[j]) == sittingType) {
                    sittingArray.push(soArray[i]);
                }
            }
        }
    }
    checkIfNoMoreOptions(sittingArray);
    console.log(sittingArray);
    writeOptions(sittingArray);
}


function soChosen(so) {
    soArray = [];
    for (var i = 0; i < dateArray.length; i++) {
        for (var j = 0; j < (dateArray[i].so).length; j++) {
            if ((dateArray[i].so[j]) == so) {
                soArray.push(dateArray[i]);
            }
        }
    }
    checkIfNoMoreOptions(soArray);
    console.log(soArray);
    writeOptions(soArray);
}


function lightChosen(light) {
    lightArray = [];
    dateFlag = true;
    if (dateFlag) {
        for (var i = 0; i < sittingArray.length; i++) {
            if (sittingArray[i].light == light) {
                lightArray.push(sittingArray[i]);
            }
        }
    }
    else {
        for (var i = 0; i < soArray.length; i++) {
            if (soArray[i].light == light) {
                lightArray.push(soArray[i]);
            }
        }
    }
    checkIfNoMoreOptions(lightArray);
    console.log(lightArray);
    writeOptions(lightArray);
}


function volumeChosen(selected) {
    volumeArray = [];
    for (var i = 0; i < lightArray.length; i++) {
        if (lightArray[i].vol == selected) {
            volumeArray.push(lightArray[i]);
        }
    }
    checkIfNoMoreOptions(volumeArray);
    console.log(volumeArray);
    writeOptions(volumeArray);
}


function parkingChosen(selected) {
    resultArray = [];
    if (selected == "yes") {
        for (var i = 0; i < volumeArray.length; i++) {
            if (volumeArray[i].parking == selected || volumeArray[i].parking == "paid" || volumeArray[i].parking == "vallet") {
                resultArray.push(volumeArray[i]);
            }
        }
    }
    else {
        resultArray = volumeArray;
    }
    wrapItUp(resultArray);
}


function wrapItUp(resultArray) {
    $end_result_text.empty();
    var resultArrayLen = resultArray.length;
    if (resultArrayLen == 1) {
        $("#end_result_next").hide();
    }
    var rand = Math.floor((Math.random() * resultArrayLen));
    $(".fixed_element_rest_list, #fixed_element_counter").hide();
    if (resultArrayLen != 0) {
        console.log(resultArray[rand].name + "-" + resultArray[rand].Tel + "-" + resultArray[rand].Address);
        $("#result_rest").text(resultArray[rand].name/* + '<br>'*/);
        $("#result_tel").text(resultArray[rand].Tel);
        $("#result_address").text(resultArray[rand].Address);
        $("#result_details").removeClass("fliped").removeClass("not_flip").addClass("not_flip");
    }


    checkIfNoMoreOptions(resultArray);
    console.log(resultArray);
    writeOptions(resultArray);
    trackEvent("result", "first_result", resultArray[rand].name);
}


function writeOptions(options) {
    var newNumber = options.length;
    var currentNumber = parseInt($fixed_element_counter.html());
	if (!currentNumber) {
        // workaround..
		$fixed_element_counter.stop().animate({count:newNumber}, 0, function() {
			$(this).html(newNumber);
		});
    } else {
		$fixed_element_counter.stop().animate({count:newNumber}, { 
			duration: 1000, 
			step: function(currCount){
				$(this).html(Math.round(currCount));
			},
			complete: function() {
				$(this).html(newNumber);
			}
		});
	}
}


function increment(newNumber) {
	// stop any existing animations
	if (countAnimationTimer) {
		clearTimeout(countAnimationTimer);
		countAnimationTimer = null;
	}
	
    $fixed_element_counter.text(parseFloat($fixed_element_counter.text()) - 1);
    if (parseFloat($fixed_element_counter.text()) > newNumber) {
        setTimeout(increment, 90, newNumber)
    }

}


function decrement(newNumber) {
	// stop any existing animations
	if (countAnimationTimer) {
		clearTimeout(countAnimationTimer);
		countAnimationTimer = null;
	}
	
    
    $fixed_element_counter.text(parseFloat($('#fixed_element_counter').text()) + 1);
    if (parseFloat($fixed_element_counter.text()) < newNumber) {
        setTimeout(decrement, 90, newNumber)
    }

}


function calculateContentSize(str) {
    $ruler.html(str);
    return $ruler.innerWidth();
}


function init() {
    $("body").append($ruler);
    checkForWindowSize();
    rest = restList.getList();
    story = storyLine.getStory();
    $container = $('#container');
    $fixed_element_about_content = $("#fixed_element_about_content");
    $fixed_element_counter = $('#fixed_element_counter');
    $end_result_text = $('.end_result_text');
    $flip_it = $("#flip_it");
    $end_result_tel = $("#result_tel");
    $end_result_name = $("#result_rest");
    $end_result_address = $("#result_address");

    $('a').click(function () {
        var elementClicked = $(this).attr("href");
        var destination = $(elementClicked).offset().top;
        $("html:not(:animated),body:not(:animated)").animate({ scrollTop:destination + 15}, 1000, function () {

        });

    });
    $('html').animate({scrollTop:0}, 1000);//IE, FF
    $('body').animate({scrollTop:0}, 1000);
}


function checkForWindowSize() {
    var h = $(window).height();
    var w = $(window).width();
    if (w < 1250 || h < 600) {
        $("#resizeBG").show(500, function () {
            $("#resize_msg").show(200, function () {
            });
        });
    }
}


function trackEvent(category, action, label, value) {
    //value should be null or a number
    value = (value === undefined) ? null : ((typeof value === 'string') ? parseInt(value, 10) : value);
    _gaq.push(["_trackEvent", category, action, label, value]);
}

window.mobilecheck = function () {
    var check = false;
    (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))check = true
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
}

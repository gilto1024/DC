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


/*$.easing.easeOutBack = function (e, f, a, i, h, g) {
 if (g == undefined) {
 g = 1.70158
 }
 return i * ((f = f / h - 1) * f * ((g + 1) * f + g) + 1) + a;
 };*/

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
    init();
    setStyle();
    setupEvents();

    DNCookie.set_Cookie('DN_used_rest', 'yes', 365, '/', '', '');
    console.log(DNCookie.getCookie("DN_used_rest"));
});

function setupEvents() {
    var windowWasSmall = false;
    $(window).resize(function () {
        var currentUrl = location.href;
        var section = currentUrl.split("#");
        if ($(window).width() < 1250 && resizeFlag) {
            $("#resizeBG").show(500, function () {
                $("#resize_msg").show(200, function () {
                    windowWasSmall = true;
                });
            });
            resizeFlag = false;
        }
        if ($(window).width() > 1250) {
            $("#resize_msg").hide(500, function () {
                $("#resizeBG").hide(200, function () {
                    if (windowWasSmall) {
                        init();
                        document.location.reload(true);
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

    });
    $container.on("click", ".fixed_element_back_button, #no_options_msg_back", function () {
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
                writeOptions([]);
                $(".fixed_element_back_button").hide();
                $fixed_element_counter.hide();
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
        $flip_it.removeClass("fliped").removeClass("not_flip").addClass("not_flip");
        var randOption = Math.floor((Math.random() * resultArray.length));
        $("#result_rest").fadeOut(500, function () {
            $("#result_details").removeClass("fliped").addClass("not_flip");
            $("#result_details").animate({right:"-100%"});
            if (nextResultOption < resultArray.length) {
                if (resultArray[nextResultOption].name == $end_result_name.text()) {
                    nextResultOption++;
                }
                $("#result_tel").text(resultArray[nextResultOption].Tel);
                $("#result_rest").text(resultArray[nextResultOption].name);
                $("#result_address").text(resultArray[nextResultOption].Address);

            }
            else {
                nextResultOption = 0;
                $("#result_tel").text(resultArray[nextResultOption].Tel);
                $("#result_rest").text(resultArray[nextResultOption].name);
                $("#result_address").text(resultArray[nextResultOption].Address);
            }
            /*  var tel = $end_result_tel.text();
             var name = $end_result_name.text();
             var address = $end_result_address.text();*/
            /*var telLen = calculateContentSize(tel);
             var nameLen = calculateContentSize(name);
             var addressLen = calculateContentSize(address);*/
            /*   $("#end_result_info").css("left", "-" + Math.max(addressLen, telLen) + "px");
             $("#visiable").css("width", nameLen + 70);//70 is for the next btn*/
            nextResultOption++;
            $("#result_rest").fadeIn("fast", function () {
            });
        });
    });
    $container.on("click", "#resizeBG", function () {
        $("#resize_msg").hide(500, function () {
            $("#resizeBG").hide(200, function () {
            });
        });
    });
    $container.on("click", "#contact_submit", function () {
        $("#contact_submit").html("").addClass("loader");
        var name = $("#name").val();
        var customerMail = $("#customer_mail").val();
        var message = $("#Message").val();
        if (name || customerMail || message) {
            $.ajax({
                url:"send_contact_gm.php",
                type:"POST",
                data:{
                    name:name,
                    customerMail:customerMail,
                    message:message
                },
                success:function (data) {
                    closeContact();
                    console.log(data);
                },
                error:function (data) {

                    console.log("error - " + data);
                }
            });
        }
        else {
            closeContact();
        }


        //debugger;


    });
    $container.on("click", "#mailUs", function () {
        $("#fixed_element_contact").show().animate({"left":"436"}, 500);
    });
    $container.on("click", "#mailUsClose", function () {
        $("#fixed_element_contact").animate({"left":"-550"}, 500, function () {
            $("#fixed_element_contact").hide();
            $fixed_element_about_content.removeClass("on").addClass("off");
            $fixed_element_about_content.animate({left:"-436px"}, 500, function () {
                $("#about_btn").css({left:"436px"});
                $("#about_btn").fadeIn();
            });
        });
    });
    $container.on("click", "#about_btn , #aboutUsClose", function () {
        if ($fixed_element_about_content.hasClass("off")) {
            $("#about_btn").hide();
            //$("#about_btn").css({left:"460px"});
            $fixed_element_about_content.removeClass("off").addClass("on");
            $fixed_element_about_content.animate({left:"0px"}, 500);
        }
        else {
            $fixed_element_about_content.removeClass("on").addClass("off");
            $fixed_element_about_content.animate({left:"-436px"}, 500, function () {
                $("#about_btn").css({left:"436px"});
                $("#about_btn").fadeIn();
            });

            // $("#about_btn").css({left:"500px"});
        }

    });
    $container.on("click", "#result_rest , #result_details", function () {
        if ($("#result_details").hasClass("not_flip")) {
            $("#result_details").removeClass("not_flip").addClass("fliped");
            //$("#visiable").css({width:(addressLen) + 30});
            $("#result_details").animate({right:"0%"});
        }
        else {
            $("#result_details").removeClass("fliped").addClass("not_flip");
            $("#result_details").animate({right:"-3000px"});
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

function closeContact() {
    $("#contact_submit").html("").removeClass("loader");
    $("#fixed_element_contact").animate({"left":"-550"}, 500, function () {
        $("#name").val("");
        $("#customer_mail").val("");
        $("#Message").val("");
        $("#fixed_element_contact").hide();
    });
}


function slotmachine(id, changeto) {
    var thisid = '#' + id;
    var $obj = $(thisid);
    $obj.css('opacity', '.3');
    var original = $obj.text();

    var spin = function () {
        return Math.floor(Math.random() * 10);
    };

    var spinning = setInterval(function () {
        $obj.text(function () {
            var result = '';
            for (var i = 0; i < original.length; i++) {
                result += spin().toString();
            }
            return result;
        });
    }, 50);

    var done = setTimeout(function () {
        clearInterval(spinning);
        $obj.text(changeto).css('opacity', '1');
    }, 1000);
}

function checkIfNoMoreOptions(optionsArray) {
    /* var flag = false;*/
    if (optionsArray.length == 0) {
        flag = true;
        $("#blackBG").fadeIn(function () {
            $("#no_options_msg").fadeIn();

        });//animate({"background-color":"black",opacity:0.5},1000);
    }
    /*return flag;*/
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
    var h = $(window).height();
    var w = $(window).width();
    $(".section").css({width:w, height:h});
    $(".sectionRes").css({width:w, height:h});
    var resWidth = w * 0.8;
   /* $(".result_pos").css({width:resWidth});*/

    // $(".section").first().css({height:h+100});
}

function dateChosen(isDate) {
    $(".fixed_element_back_button").show();
    $("#fixed_element_counter").show();
    dateArray = [];
    for (var i = 0; i < rest.length; i++) {
        if (rest[i].date == isDate) {
            dateArray.push(rest[i]);
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
}


function writeOptions(options) {
    var newNumber = options.length;
    var currentNumber = $("#fixed_element_counter").html();
    if (!currentNumber) {
        $fixed_element_counter.empty().append(newNumber);
    }
    else {
        currentNumber = parseInt(currentNumber);
        if (newNumber > currentNumber) {
            decrement(newNumber);
        }
        else if (newNumber < currentNumber) {

            increment(newNumber);
        }
        else {
            //do nothing numbers are equal
        }

    }


}

function increment(newNumber) {
    $fixed_element_counter.text(parseFloat($fixed_element_counter.text()) - 1);
    if (parseFloat($fixed_element_counter.text()) > newNumber) {
        setTimeout(increment, 90, newNumber)
    }
}

function decrement(newNumber) {
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
    $end_result_tel = $("#end_result_tel");
    $end_result_name = $("#end_result_name");
    $end_result_address = $("#end_result_address");

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
    if (w < 1250 || h < 500) {
        $("#resizeBG").show(500, function () {
            $("#resize_msg").show(200, function () {
                /* var h = $(window).height();
                 $(".section").css('height', h + '1px');*/
                //init();
            });
        });
    }
}

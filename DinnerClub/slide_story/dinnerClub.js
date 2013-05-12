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
var rest = [];
var resizeFlag = true;
var nextResultOption = 0;
var $ruler = $("<span id='ruler'></span>");
var story;

$.easing.easeOutBack = function (e, f, a, i, h, g) {
    if (g == undefined) {
        g = 1.70158
    }
    return i * ((f = f / h - 1) * f * ((g + 1) * f + g) + 1) + a;
};

$.fn.teletype = function (opts) {
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
                    /* var h = $(window).height();
                     $(".section").css('height', h + '1px');*/
                    //init();
                });
            });

            resizeFlag = false;
            //location.href = currentUrl;
        }
        if ($(window).width() > 1250) {
            $("#resize_msg").hide(500, function () {
                $("#resizeBG").hide(200, function () {
                    if (windowWasSmall) {
                        init();
                        document.location.reload(true);
                    }

                    /* var h = $(window).height();
                     $(".section").css('height',h + '1px');*/
                    //init();
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
            $('#date_text').teletype({
                animDelay:30, // the bigger the number the slower the typing
                text:story.date.date
            });
        }
        else {
            dateFlag = false;

            dateChosen("no");
        }
        cameFrom = "date";
    });
    $container.on("click", ".so_select", function () {
        var selected = $(this).attr("value");
        $('#so_text').teletype({
            animDelay:30, // the bigger the number the slower the typing
            text:story.date[selected]
        });
        soChosen(selected);
        $("#sitting").show();
        cameFrom = "so";
    });
    $container.on("click", ".sitting_select", function () {
        var selected = $(this).attr("value");
        sittingChosen(selected);
        $('#sitting_text').teletype({
            animDelay:30, // the bigger the number the slower the typing
            text:story.barTable[selected]
        });
        cameFrom = "sitting";
    });
    $container.on("click", ".light_select", function () {
        var selected = $(this).attr("value");
        lightChosen(selected);
        $('#light_text').teletype({
            animDelay:30, // the bigger the number the slower the typing
            text:story.dimBright[selected]
        });
        $("#volume").show();
        cameFrom = "light";
    });
    $container.on("click", ".volume_select", function () {
        var selected = $(this).attr("value");
        volumeChosen(selected);
        $('#volume_text').teletype({
            animDelay:30, // the bigger the number the slower the typing
            text:story.quietLoud[selected]
        });
        cameFrom = "vol";
    });
    $container.on("click", ".parking_select", function () {
        var selected = $(this).attr("value");
        parkingChosen(selected);
        $('#parking_text').teletype({
            animDelay:30, // the bigger the number the slower the typing
            text:story.parking[selected]
        });
        cameFrom = "parking";

    });
    $container.on("click", ".fixed_element_back_button, #no_options_msg_back", function () {
        $(".fixed_element_counter").show();
        if ($(this).attr("id") == "no_options_msg_back") {
            $("#no_options_msg").fadeOut(function () {
                $("#blackBG").fadeOut();
            });
        }
        $("#" + cameFrom + "Menu").click();
        switch (cameFrom) {
            case "date":
                $("#date_text").html("");
                writeOptions([]);
                $(".fixed_element_back_button").hide();
                $("#fixed_element_counter").hide();
                break;
            case "so":
                $("#so_text").html("");
                writeOptions(dateArray);
                cameFrom = "date";
                break;
            case "sitting":
                $("#sitting_text").html("");
                writeOptions(soArray);
                cameFrom = "so";
                break;
            case "light":
                $("#light_text").html("");
                writeOptions(sittingArray);
                cameFrom = "sitting";
                break;
            case "vol":
                $("#volume_text").html("");
                writeOptions(lightArray);
                cameFrom = "light";
                break;
            case "parking":
                $("#parking_text").html("");
                writeOptions(volumeArray);
                cameFrom = "vol";
                break;
        }
    });
    $container.on("click", "#end_result_next", function () {
        $("#flip_it").removeClass("fliped").removeClass("not_flip").addClass("not_flip");
        var randOption = Math.floor((Math.random() * resultArray.length));
        $("#end_result_info").fadeOut(500, function () {
            if (nextResultOption < resultArray.length) {
                $("#end_result_tel").text(resultArray[nextResultOption].Tel);
                $("#end_result_name").text(resultArray[nextResultOption].name);
                $("#end_result_address").text(resultArray[nextResultOption].Address);

            }
            else {
                nextResultOption = 0;
                $("#end_result_tel").text(resultArray[nextResultOption].Tel);
                $("#end_result_name").text(resultArray[nextResultOption].name);
                $("#end_result_address").text(resultArray[nextResultOption].Address);
            }
            var tel = $("#end_result_tel").text();
            var name = $("#end_result_name").text();
            var address = $("#end_result_address").text();
            var telLen = calculateContentSize(tel);
            var nameLen = calculateContentSize(name);
            var addressLen = calculateContentSize(address);
            $("#end_result_info").css("left", "-" +  Math.max(nameLen,addressLen) + "px");// assume address is longer then phone
            $("#visiable").css("width", Math.max(nameLen,addressLen) + 70);//40 is for the next btn
            nextResultOption++;
            $("#end_result_info").fadeIn("fast", function () {
            });
        });
    });
    $container.on("click", "#resizeBG", function () {
        $("#resize_msg").hide(500, function () {
            $("#resizeBG").hide(200, function () {
            });
        });
    });
    $container.on("click", "#blackBG", function () {

    });
    $container.on("click", "#about_btn", function () {
        if ($("#fixed_element_about_content").hasClass("off")) {
            $("#fixed_element_about_content").removeClass("off").addClass("on");
            $("#fixed_element_about_content").animate({left:"0px"}, 500, "easeOutBack");
        }
        else {
            $("#fixed_element_about_content").removeClass("on").addClass("off");
            $("#fixed_element_about_content").animate({left:"-500px"}, 500, "easeOutBack");
        }

    });
    $container.on("click", "#end_result_name , #end_result_tel", function () {
        var tel = $("#end_result_tel").text();
        var name = $("#end_result_name").text();
        var address = $("#end_result_address").text();
        var telLen = calculateContentSize(tel);
        var nameLen = calculateContentSize(name);
        var addressLen = calculateContentSize(address);
        var currentPos = parseInt($("#end_result_info").css("left"));

        if ($("#flip_it").hasClass("not_flip")) {

            $("#flip_it").removeClass("not_flip").addClass("fliped");
            $("#visiable").css({width: Math.max(nameLen,addressLen) + 30});
            $("#end_result_info").animate({left:currentPos +  Math.max(nameLen,addressLen) + 20});

        }
        else {
            $("#flip_it").removeClass("fliped").addClass("not_flip");
            $("#visiable").css("width");
            $("#end_result_info").animate({left:"-" + addressLen}, function () {
                $("#visiable").css("width", nameLen + 70);
            });


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
                    $(scrollElem).animate({scrollTop:targetOffset}, 400, "easeOutBack", function () {
                        location.hash = target;
                    });
                });
            }
        }
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
    if (optionsArray.length == 0) {
        $("#blackBG").fadeIn(function () {
            $("#no_options_msg").fadeIn();
        });//animate({"background-color":"black",opacity:0.5},1000);
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
    var h = $(window).height();
    var w = $(window).width();
    $(".section").css({width:w, height:h});
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
        $(".next_option").hide();
    }
    var rand = Math.floor((Math.random() * resultArrayLen));
    //$("#result").append(resultArray[rand].name);
    $(".fixed_element_rest_list, #fixed_element_counter").hide();
    var nameLen = calculateContentSize(resultArray[rand].name);
    var telLen = calculateContentSize(resultArray[rand].Tel);
    var addressLen = calculateContentSize(resultArray[rand].Address);


    $("#end_result_name").text(resultArray[rand].name/* + '<br>'*/);
    $("#end_result_tel").text(resultArray[rand].Tel);
    $("#end_result_address").text(resultArray[rand].Address);
    $("#end_result_info").css("left", "-" + ( Math.max(nameLen,addressLen)) + "px");// assume address is longer then phone
    $("#visiable").css("width",  Math.max(nameLen,addressLen) + 70);//40 is for the next btn
    $("#flip_it").removeClass("fliped").removeClass("not_flip").addClass("not_flip");

    // $end_result_text.css("width", nameLen);
    /* $("#flip_it").removeClass("fliped").removeClass("not_flip").addClass("not_flip");
     $("#flip_it").css("width", nameLen + 110); //next length + 2* 20 margin
     $("#end_result_name").text(resultArray[rand].name*/
    /* + '<br>'*/
    /*);
     $("#end_result_tel").text(resultArray[rand].Tel);*/
    checkIfNoMoreOptions(resultArray);
    console.log(resultArray);
    writeOptions(resultArray);
}


function writeOptions(options) {
    var newNumber = options.length;
    var currentNumber = $("#fixed_element_counter").html();
    if (!currentNumber) {
        $("#fixed_element_counter").empty().append(newNumber);
    }
    else {
        currentNumber = parseInt(currentNumber);
        //slotmachine('fixed_element_counter', newNumber)
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
    /* $('#fixed_element_counter').fadeOut(20, "swing", function () {
     $('#fixed_element_counter').text(parseFloat($('#fixed_element_counter').text()) - 1);
     $('#fixed_element_counter').fadeIn(20);
     });*/

    $('#fixed_element_counter').text(parseFloat($('#fixed_element_counter').text()) - 1);

    if (parseFloat($('#fixed_element_counter').text()) > newNumber) {
        setTimeout(increment, 170, newNumber)
    }
}

function decrement(newNumber) {
    /* $('#fixed_element_counter').fadeOut(20, "swing", function () {
     $('#fixed_element_counter').text(parseFloat($('#fixed_element_counter').text()) - 1);
     $('#fixed_element_counter').fadeIn(20);
     });*/

    $('#fixed_element_counter').text(parseFloat($('#fixed_element_counter').text()) + 1);

    if (parseFloat($('#fixed_element_counter').text()) < newNumber) {
        setTimeout(decrement, 170, newNumber)
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
    $end_result_text = $('.end_result_text');
    $('a').click(function () {
        var elementClicked = $(this).attr("href");
        var destination = $(elementClicked).offset().top;
        $("html:not(:animated),body:not(:animated)").animate({ scrollTop:destination + 15}, 1000, "easeOutBack", function () {

        });

    });
    $('html').animate({scrollTop:0}, 1000, "easeOutBack");//IE, FF
    $('body').animate({scrollTop:0}, 1000, "easeOutBack");
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

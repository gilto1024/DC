String.prototype.wiFormat = function () {
    var pattern = /\{\d+\}/g;
    var args = arguments;
    return this.replace(pattern, function (capture) {
        return args[capture.match(/\d+/)];
    });
};

String.prototype.console = function () {
    // $("#consoleText").append(this.toString() + "<br/>");
    jscrollPane.getContentPane().append(this.toString() + "<br/>");
    jscrollPane.reinitialise();

};

function getModule(moduleName) {
    return require(moduleName);
}


var html = '<section id="questions" class="hidden">' +
    '<article class="placeholder"></article>' +
    '<article id="results" data-ga-name="results">' +
    '    <div class="questionBox">' +
    '       <span id="resultsHeading">You should go to...</span><br/>' +
    '  </div>' +
    ' <div class="questionBox">' +
    '    <div id="restInfo">' +
    '       <a id="restLink" href="javascript:void(0)" target="_blank">' +
    '          <span id="restName"></span>' +
    '     </a>' +
    '    <br/>' +
    '   <a id="restPhoneLink" href="javascript:void(0)">' +
    '      <span id="restPhone"></span>' +
    ' </a>' +
    '<br/>' +
    '              <a id="restAddressLink" href="javascript:void(0)">' +
    '                 <span id="restAddress"></span>' +
    '            </a>' +
    '               <div id="getTable" data="">Get a table</div>' +
    '                <br/>' +
    '           </div>' +
    '          <br/>' +
    '            <div id="restNavigationPane">' +
    '               <div id="btnPrevRest"></div>' +
    '              <div id="btnRestart"></div>' +
    '             <div id="btnNextRest"></div>' +
    '        </div>' +
    '   </div>' +
    '  <div class="questionBox questionBoxLast">' +
    '     <div id="iconBar">' +
    '        <div id="infoIcon" class="icons sel"></div>' +
    '       <div id="mapIcon" class="icons"></div>' +
    '     <div id="clickTableIcon" class="icons"></div>' +
    ' </div>' +
    '<div id="info" class=" infoDis tabs">' +
    '                <span id="restTip" class="storyStyle"></span>' +
    '               <span id="tip_dish" class="storyStyle"></span>' +
    '              <span id="tip_seating" class="storyStyle"></span>' +
    '             <span id="tip_parking" class="storyStyle"></span></br>' +
    '            <span id="tip_price" class="storyStyle"><img id="dollar" src=""></span>' +
    '       </div>' +
    '      <div id="map" class=" mapDis tabs" data="">' +
    '         <div id="map-canvas" style="width:280px;height:280px;"></div>' +
    '        <div id="open_maps" lat="" lng="">View in Google</div>' +
    '   </div>' +
    '        </div>' +
    '    </article>' +
    '   <article class="placeholder"></article>' +
    '</section>';

var contacts = (function () {


    function init() {

        var path = getModule('path');
        currentPath = path.dirname(path.dirname(process.mainModule.filename));

        childProcess = getModule('child_process');
        console.log(childProcess);
        setFileName("restList");
        //childProcess.execFile("explorer", "", "", function(){alert("no");});

        setupEvents();
        //set the default amount text


    }

    function setupEvents() {


        $("#container").on("click", "#go", function () {

        });
        $("#container").on('change', "#files", handleFileSelect);


    }

    function addRest() {
        isNewRest = true;
        var id = restJson.length + 1;
        if (id < 100) {
            id = "REST0" + id;
        }
        else {
            id = "REST" + id;
        }

        var singleRest = {
            "id":id,
            "info":{
                "phone":'',
                "url":'',
                "location":{
                    "lat":"123",
                    "lng":"456"
                },
                "parking":{
                    "lat":"123",
                    "lng":"456"
                },
                "en":{
                    "name":"Café Italia",
                    "address":"Kremintzki 6",
                    "tip":"Ideal for friends.",
                    "tip_dish":"Eat the head.",
                    "tip_seating":"Sit on head.",
                    "tip_parking":"Park in head.",
                    "menuUrl":"en menu link"
                },
                "he":{
                    "name":"קפה איטליה",
                    "address":"קרמניצקי 6",
                    "tip":"מושלם לערב עם חברים.",
                    "tip_dish":"Eat the head.",
                    "tip_seating":"Sit on head.",
                    "tip_parking":"Park in head.",
                    "menuUrl":"en menu link"
                },
                "price":"0",
                "clickTableUrl":"click table link"
            },
            "ratings":{
                "date":'',
                "friends":'',
                "family":'',
                "business":'',
                "tourists":'',
                "table":'',
                "bar":'',
                "light":'',
                "vol":'',
                "parking":''
            }
        };

        var restToDisplay = singleRest;

        var tmplComment = $("#restDetailsTemplate").html();
        $("#restDetailsContainer").html(Mustache.to_html(tmplComment, {data:restToDisplay}));

    }


    function collectData() {
        var id = $("#info").attr("mediaId");
        var phone = $($("#phone").find("input")[0]).val();
        var url = $($("#url").find("input")[0]).val();
        var en_name = $($("#en_name").find("input")[0]).val();
        var en_address = $($("#en_address").find("input")[0]).val();
        var en_tip = $($("#en_tip").find("input")[0]).val();
        var en_tip_dish = $($("#en_tip_dish").find("input")[0]).val();
        var en_tip_seating = $($("#en_tip_seating").find("input")[0]).val();
        var en_tip_parking = $($("#en_tip_parking").find("input")[0]).val();
        var he_name = $($("#he_name").find("input")[0]).val();
        var he_address = $($("#he_address").find("input")[0]).val();
        var he_tip = $($("#he_tip").find("input")[0]).val();
        var he_tip_dish = $($("#he_tip_dish").find("input")[0]).val();
        var he_tip_seating = $($("#he_tip_seating").find("input")[0]).val();
        var he_tip_parking = $($("#he_tip_parking").find("input")[0]).val();
        var bar = $($("#bar").find("input")[0]).val();
        var business = $($("#business").find("input")[0]).val();
        var date = $($("#date").find("input")[0]).val();
        var family = $($("#family").find("input")[0]).val();
        var friends = $($("#friends").find("input")[0]).val();
        var light = $($("#light").find("input")[0]).val();
        var parking = $($("#parking").find("input")[0]).val();
        var table = $($("#table").find("input")[0]).val();
        var tourists = $($("#tourists").find("input")[0]).val();
        var vol = $($("#vol").find("input")[0]).val();


        var location_lat = $($("#location_lat").find("input")[0]).val();
        var location_lng = $($("#location_lng").find("input")[0]).val();
        var parking_location_lat = $($("#parking_location_lat").find("input")[0]).val();
        var parking_location_lng = $($("#parking_location_lng").find("input")[0]).val();
        var he_menuUrl = $($("#he_menuUrl").find("input")[0]).val();
        var en_menuUrl = $($("#en_menuUrl").find("input")[0]).val();
        var price = $($("#price").find("input")[0]).val();
        var clickTableUrl = $($("#clickTableUrl").find("input")[0]).val();

        var isRankingValid = validateRanking({
            "date":date,
            "friends":friends,
            "family":family,
            "business":business,
            "tourists":tourists,
            "table":table,
            "bar":bar,
            "light":light,
            "vol":vol
        });
        var validUrl = validateURL(url);
        if (isRankingValid && validUrl) {
            var singleRest = {
                "id":id,
                "info":{
                    "phone":phone,
                    "url":url,
                    "location":{
                        "lat":location_lat,
                        "lng":location_lng
                    },
                    "parking":{
                        "lat":parking_location_lat,
                        "lng":parking_location_lng
                    },
                    "en":{
                        "name":en_name,
                        "address":en_address,
                        "tip":en_tip,
                        "tip_dish":en_tip_dish,
                        "tip_seating":en_tip_seating,
                        "tip_parking":en_tip_parking,
                        "menuUrl":en_menuUrl



                    },
                    "he":{
                        "name":he_name,
                        "address":he_address,
                        "tip":he_tip,
                        "tip_dish":he_tip_dish,
                        "tip_seating":he_tip_seating,
                        "tip_parking":he_tip_parking,
                        "menuUrl":he_menuUrl
                    },
                    "price":price,
                    "clickTableUrl":clickTableUrl
                },
                "ratings":{
                    "date":date,
                    "friends":friends,
                    "family":family,
                    "business":business,
                    "tourists":tourists,
                    "table":table,
                    "bar":bar,
                    "light":light,
                    "vol":vol,
                    "parking":parking
                }
            };
            console.log(isNewRest);

            if (isNewRest) {
                isNewRest = false;
                pushRestToList(singleRest);
            }
            else {
                replaceInOriginal(singleRest);
            }

        }


    }

    function deleteRest() {
        var id = $("#info").attr("mediaId");
        console.log("in del rest with id:   " + id);
        console.log("list len before del:   " + restJson.length);
        var restToDelete = getId(id);
        console.log("restToDelete:   " + restToDelete);
        restJson.splice(restToDelete, 1);
        console.log(restJson);
        arrangeListNumbers();
        writeToFile(restJson);
        console.log("list len after del:   " + restJson.length);
        var tmplComment = $("#restTemplate").html();
        $("#restList").empty();
        $("#restList").html(Mustache.to_html(tmplComment, {data:restJson}));


    }

    function arrangeListNumbers() {
        var fullNumber;
        for (var i = 0; i < restJson.length; i++) {
            if (i < 9) {
                fullNumber = "REST00" + (i + 1);
            }
            else if (i < 99) {
                fullNumber = "REST0" + (i + 1);
            }
            restJson[i].id = fullNumber;

        }
    }

    function pushRestToList(singleRest) {
        restJson.push(singleRest);
        var tmplComment = $("#restTemplate").html();
        $("#restList").empty();
        $("#restList").html(Mustache.to_html(tmplComment, {data:restJson}));

        writeToFile(restJson);
    }

    function validateURL(textval) {
        var urlregex = new RegExp(
            "^(http:\/\/www.|https:\/\/www.|ftp:\/\/www.|www.){1}([0-9A-Za-z]+\.)");
        if (urlregex.test(textval)) {
            $("#url").removeClass("invalidInput");
            return true;
        }
        else {
            alert("URL is not valid");
            $("#url").addClass("invalidInput");
            return false;
        }

    }

    function validateRanking(ranking) {

        jQuery.each(ranking, function (i, val) {
            if (isNumeric(val)) {
                $("#" + i).removeClass("invalidInput");
            }
            else {
                alert(i + " is not valid, should be a number 0-5");
                $("#" + i.toLowerCase()).addClass("invalidInput");
                return false;

            }
        });
        return true;

    }

    function replaceInOriginal(singleRest) {
        var restToReplace = getId(singleRest.id);
        restJson[restToReplace] = singleRest;
        console.log(restJson);
        writeToFile(restJson);


    }

    function autoSave() {
        writeToFile(restJson);
    }

    function populateInfoBox(id) {
        var restToDisplay = restJson[id];

        console.log(restJson[id]);

        var tmplComment = $("#restDetailsTemplate").html();
        $("#restDetailsContainer").html(Mustache.to_html(tmplComment, {data:restToDisplay}));


    }

    function getId(restId) {

        var id = restId.substr(4, 3); //get the number from REST001
        id = parseInt(id);
        id = id - 1;// for the array starts from 0
        return id;
    }


    function downloadJSON2CSV() {

        window.open("data:text/csv;charset=utf-8," + JSON.stringify(restJson))
    }


    /**
     * handles the file upload event
     * @param evt - the file upload event
     */
    function handleFileSelect(evt) {
        var files = evt.target.files; // FileList object
        for (var i = 0, f; f = files[i]; i++) {
            var reader = new FileReader();
            reader.onload = (function (theFile) {
                return function (e) {
                    processData(e.target.result);   //
                };
            })(f);
            reader.readAsText(f);   //read the file as text
        }

    }

    /**
     * process the data that is red from the file
     * the text is assumed to be arranged as - company_name    company_website_url:    www.01net.com   (need to make example like we have company name also)
     * @param allText - is the text from the uploaded file
     */
    function processData(allText) {
        restJson = JSON.parse(allText);
        console.log(restJson);
        buildTable(restJson);
    }

    function buildTable(restJson) {
        //alert("1");
        //console.log(restJson);

        for (var i = 0; i < 1; i++) {

            var price = (parseInt(restJson[i].info.price) + 3) + ".png";
            var html = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html dir="rtl" xmlns="http://www.w3.org/1999/html">' +
                '<head>' +
                ' <script type="text/javascript">' +
                '                        if (location.href.indexOf("dir=rtl") != -1) {' +
                '                           document.getElementsByTagName("html")[0].dir = "rtl";' +
                '                      } else if (location.href.indexOf("dir=ltr") != -1) {' +
                '                         document.getElementsByTagName("html")[0].dir = "ltr";' +
                '                    }' +
                '                   var _gaq = _gaq || [];' +
                '                  _gaq.push(["_setAccount", "UA-39583513-1"]);' +
                '                 _gaq.push(["_setDomainName", "none"]);' +
                '                _gaq.push(["_trackPageview"]);' +
                '               (function () {' +
                '                  var ga = document.createElement("script");' +
                '                 ga.type = "text/javascript";' +
                '                ga.async = true;' +
                '               ga.src = ("https:" == document.location.protocol ? "https://ssl" : "http://www") + ".google-analytics.com/ga.js";' +
                '              var s = document.getElementsByTagName("script")[0];' +
                '             s.parentNode.insertBefore(ga, s);' +
                '        })();' +
                '   </script>' +
                '  <title>DinnerClub</title>' +
                '</head>'+
                '<section id="questions" class="hidden">' +
                '<article class="placeholder"></article>' +
                '<article id="results" data-ga-name="results">' +
                '    <div class="questionBox">' +
                '       <span id="resultsHeading">You should go to...</span><br/>' +
                '  </div>' +
                ' <div class="questionBox">' +
                '    <div id="restInfo">' +
                '       <a id="restLink" href="javascript:void(0)" target="_blank">' +
                '          <span id="restName">' + restJson[i].info.he.name + '</span>' +
                '     </a>' +
                '    <br/>' +
                '   <a id="restPhoneLink" href="javascript:void(0)">' +
                '      <span id="restPhone">' + restJson[i].info.phone + '</span>' +
                ' </a>' +
                '<br/>' +
                '              <a id="restAddressLink" href="javascript:void(0)">' +
                '                 <span id="restAddress">' + restJson[i].info.he.address + '</span>' +
                '            </a>' +
                '               <div id="getTable" data="">Get a table</div>' +
                '                <br/>' +
                '           </div>' +
                '          <br/>' +
                '            <div id="restNavigationPane">' +
                '               <div id="btnPrevRest"></div>' +
                '              <div id="btnRestart"></div>' +
                '             <div id="btnNextRest"></div>' +
                '        </div>' +
                '   </div>' +
                '  <div class="questionBox questionBoxLast">' +
                '     <div id="iconBar">' +
                '        <div id="infoIcon" class="icons sel"></div>' +
                '       <div id="mapIcon" class="icons"></div>' +
                '     <div id="clickTableIcon" class="icons"></div>' +
                ' </div>' +
                '<div id="info" class=" infoDis tabs">' +
                '                <span id="restTip" class="storyStyle">' + restJson[i].info.he.tip + '</span>' +
                '               <span id="tip_dish" class="storyStyle">' + restJson[i].info.he.tip_dish + '</span>' +
                '              <span id="tip_seating" class="storyStyle"' + restJson[i].info.he.tip_seating + '></span>' +
                '             <span id="tip_parking" class="storyStyle">' + restJson[i].info.he.tip_parking + '</span></br>' +
                '            <span id="tip_price" class="storyStyle"><img id="dollar" src="img/' + price + '"></span>' +
                '       </div>' +
                '      <div id="map" class=" mapDis tabs" data="">' +
                '         <div id="map-canvas" style="width:280px;height:280px;"></div>' +
                '        <div id="open_maps" lat="" lng="">View in Google</div>' +
                '   </div>' +
                '        </div>' +
                '    </article>' +
                '   <article class="placeholder"></article>' +
                '</section>';
            writeToFile(html);

        }

    }

    /**
     * checks if value is a number
     * @param value
     * @return {Boolean}
     */
    function isNumeric(value) {
        var isNumber = !(isNaN(+value));
        if (isNumber) {
            var num = parseInt(value);
            if (num >= 0 && num <= 5) {
                return true;
            }
        }

        return false;
    }


    function writeToFile(restJson) {

        fs.writeFile(fullFileNameToWrite, JSON.stringify(restJson), 'utf8', function (err) {
            if (err) {
                return console.log(err)
            }
            else {
                console.log("file saved");
                $("#msgWindow").html("File Saved...");
                setTimeout(function () {
                    $("#msgWindow").html("");
                }, 5000);
            }

        });
    }


    function setFileName(fileName) {
        var fName = fileName;
        console.log(fName);

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var h = today.getHours();
        var m = today.getMinutes();

        var yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        var justDay = mm + '_' + dd + '_' + yyyy;
        today = justDay + '_' + h + "_" + m + "_";

        folderName = currentPath + "\\" + justDay;
        fs.mkdir(folderName + "\\", function (err) {
            if (err) console.log("directory:   " + folderName + "\\" + "already exists");
            console.log(folderName + "\\  created");
        });
        //fullFileNameToWrite = folderName + "\\" + today + fName + ".csv";
        fullFileNameToWrite = folderName + "\\" + justDay + fName + ".txt";


        /**
         * just to root
         *  fs.mkdir("c:\\" + justDay + "\\", function (err) {
                     if (err) console.log("directory:    c:\\" + justDay + "\\" + "already exists");
                     console.log("c:\\" + justDay + "\\  created");
                 });
         folderName = "c:\\" + justDay + "\\";
         fullFileNameToWrite = "c:\\" + justDay + "\\" + today + fName + ".csv";
         */

    }


    return {
        init:init
    }
}());
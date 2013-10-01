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

var contacts = (function () {
    setInterval(function () {
        var rand = Math.floor((Math.random() * 9) + 1);
        $(".fredy").css("background", "url(../style/Are_you_looking_at_me/logo_" + rand + ".png)");
    }, 10000);


    var singleRest = {
        "id":"REST001",
        "info":{
            "phone":"03-5612888",
            "url":"http://www.mouse.co.il/CM.food_item_place,382,213,8464,.aspx",
            "gaName":"Café Italia",
            "location":{
                "lat":123,
                "lng":456
            },
            "parking":{
                "lat":123,
                "lng":456
            },
            "en":{
                "name":"Café Italia",
                "address":"Kremintzki 6",
                "tip":"Ideal for friends.",
                "tip_dish":"Eat the head.",
                "tip_seating":"Sit on head.",
                "tip_parking":"Park in head."
            },
            "he":{
                "name":"קפה איטליה",
                "address":"קרמניצקי 6",
                "tip":"מושלם לערב עם חברים.",
                "tip_dish":"Eat the head.",
                "tip_seating":"Sit on head.",
                "tip_parking":"Park in head."
            }
        },
        "verticals":{
            "party":["friends", "family", "date"],
            "sitting":["bar", "table"],
            "light":"bright",
            "vol":"loud",
            "parking":["yes", "no"]
        },
        "ratings":{
            "date":5,
            "friends":5,
            "family":5,
            "business":0,
            "tourists":0,
            "table":5,
            "bar":5,
            "light":5,
            "vol":5,
            "parking":true
        }
    };
    var restJson;
    var fullFileNameToWrite;
    var folderName;
    var childProcess;
    var currentPath;
    var currentRestPresented;
    var isNewRest = false;

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

        $(document).bind('keydown', function (e) {
            if (e.ctrlKey && (e.which == 83)) {
                e.preventDefault();
                collectData();
                return false;
            }
        });


        $("#container").on("click", ".rest_item", function () {
            var id = getId($(this).attr("mediaId"));
            $(".rest_item").each(function (index, elm) {

                $(this).removeClass("highlighted");
            });
            $(this).addClass("highlighted");
            populateInfoBox(id);
        })
        $("#container").on("click", "#save", function () {

            var data = collectData();
        });
        $("#container").on("click", "#addRest", function () {
            isNewRest = true;
            addRest();
            $("#cancelAddRest").show();
        });
        $("#container").on("click", "#cancelAddRest", function () {
            isNewRest = false;
            populateInfoBox(0);
            $($("#restList").find(".rest_item")[0]).addClass("highlighted");
            $("#cancelAddRest").hide();
        });
        $("#container").on("click", "#download", function () {
            downloadJSON2CSV();
        });
        $("#container").on("click", "#reload", function () {
            document.location.reload(true);
        });
        $("#container").on('change', "#files", handleFileSelect);

        $("#restDetailsContainer").on("click", "#en", function () {
            $(".enContainer").show();
        });
        $("#restDetailsContainer").on("click", "#he", function () {
            $(".heContainer").show();
        });
        $("body").on("click", "#open_folder", function () {
            childProcess.exec("%SystemRoot%\\explorer.exe \"" + folderName);
        });

        $("#container").on("click", "#reload", function () {
            var data = collectData();
        });


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
                "en":{
                    "name":'',
                    "address":'',
                    "tip":''
                },
                "he":{
                    "name":'',
                    "address":'',
                    "tip":''
                }
            },
            /* "verticals":{
             "party":["friends", "family", "date"],
             "sitting":["bar", "table"],
             "light":"bright",
             "vol":"loud",
             "parking":["yes", "no"]
             },*/
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
        var he_name = $($("#he_name").find("input")[0]).val();
        var he_address = $($("#he_address").find("input")[0]).val();
        var he_tip = $($("#he_tip").find("input")[0]).val();
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
                    "en":{
                        "name":en_name,
                        "address":en_address,
                        "tip":en_tip
                    },
                    "he":{
                        "name":he_name,
                        "address":he_address,
                        "tip":he_tip
                    }
                },
                /* "verticals":{
                 "party":["friends", "family", "date"],
                 "sitting":["bar", "table"],
                 "light":"bright",
                 "vol":"loud",
                 "parking":["yes", "no"]
                 },*/
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
            console.log(singleRest);
            if (isNewRest) {
                isNewRest = false;
                pushRestToList(singleRest);
            }
            else {
                replaceInOriginal(singleRest);
            }

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
        $("#control").hide();
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

        var tmplComment = $("#restTemplate").html();
        $("#restList").html(Mustache.to_html(tmplComment, {data:restJson}));

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
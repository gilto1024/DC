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


var contacts = (function () {

        setInterval(function () {
            var rand = Math.floor((Math.random()*9)+1);
            $(".fredy").css("background", "url(style/Are_you_looking_at_me/logo_" + rand + ".png)");
        }, 10000);

        var singleRest = {
            "id":"REST001",
            "info":{
                "phone":"03-5612888",
                "url":"http://www.mouse.co.il/CM.food_item_place,382,213,8464,.aspx",
                "gaName":"Café Italia",
                "en":{
                    "name":"Café Italia",
                    "address":"Kremintzki 6",
                    "tip":"Ideal for friends."
                },
                "he":{
                    "name":"קפה איטליה",
                    "address":"קרמניצקי 6",
                    "tip":"מושלם לערב עם חברים."
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

        function init() {


            setupEvents();
            //set the default amount text


        }

        function setupEvents() {

            $("#container").on("click", ".rest_item", function () {
                var id = getId($(this).attr("mediaId"));
                populateInfoBox(id);
            })
            $("#container").on("click", "#save", function () {
                var data = collectData();
            });
            $("#container").on("click", "#download", function () {
                downloadJSON2CSV();
            });
            $("#container").on('change', "#files", handleFileSelect);

            $("#restDetailsContainer").on("click", "#en", function () {
                $(".enContainer").show();
            });
            $("#restDetailsContainer").on("click", "#he", function () {
                $(".heContainer").show();
            });


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

            var isValid = validateRanking({
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
            if (isValid) {
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
                replaceInOriginal(singleRest);
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


        return {
            init:init
        }
    }())
    ;
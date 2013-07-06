require.config({
    baseUrl:'scripts/',
    paths:{
        "models":"../models",
        "tmpl":"../tmpl",

        "text":"libs/text",
        "mustache":"libs/mustache.min",

        //"view":"view-console"
        "view":"view"
    }
});

require(
    [
        "dinnerclub"
    ],
    function (dinnerclub) {

        // using window.onload to make sure custom fonts are loaded
        // before we display any text
        //$(window).on('load', function () {
        $(function(){
            dinnerclub.init();

            //TODO - remove
            window.dc = dinnerclub;

            console.log('DinnerClub ON');
        });
    }
);

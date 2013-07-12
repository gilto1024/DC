require.config({
    baseUrl:'scripts/',
    paths:{
        "models":"../models",
        "tmpl":"../tmpl",
        "style":"../style",

        "text":"libs/text",
        "mustache":"libs/mustache.min",
        "mousewheel":"libs/jquery.mousewheel.min",
        "jscrollpane":"libs/jquery.jscrollpane.min",

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

            window.scrollTo(0, 1);

            dinnerclub.init();

            console.log('DinnerClub ON');
        });
    }
);

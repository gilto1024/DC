require.config({
    baseUrl:'scripts/',
    paths:{
        'jquery':'http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min',

        "models":"../models",
        "tmpl":"../tmpl",
        "style":"../style",

        "text":"libs/text",
        "mustache":"libs/mustache.min",
        'plugins':'libs/plugins.min',
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

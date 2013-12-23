require.config({
    baseUrl:'scripts/',
    paths:{
        'jquery':'http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min',
        'tooltipster':'libs/jquery.tooltipster',
        'avgrund':'libs/jquery.avgrund',

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
        "dinnerclub", "utils"
    ],
    function (dinnerclub, utils) {

        $(function(){

            dinnerclub.init();

            utils.log('DinnerClub ON');
        });
    }
);

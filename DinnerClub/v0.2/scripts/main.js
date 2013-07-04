require.config({
    baseUrl:'scripts/',
    paths:{
        //jQuery:'http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min'
        "models":"../models",
        "text":"libs/text"
    }
});

require(
    [
        "dinnerclub", "text"
    ],
    function (dinnerclub, text) {
        dinnerclub.init();

        window.dc = dinnerclub;

        console.log('DinnerClub ON');
    }
);

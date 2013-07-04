require.config({
    paths:{
        //jQuery:'http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min'
        "models":"../models"
    }
});

require(
    [
        "dinnerclub"
    ],
    function (dinnerclub) {
        dinnerclub.init();

        window.dc = dinnerclub;

        console.log('DinnerClub ON');
    }
);

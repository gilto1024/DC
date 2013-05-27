var storyLine = (function () {
    var story =
        {
            "date":{
                "date":"You're going on a date.",
                "friends":"You're going out with friends.",
                "business":"You're going out for business.",
                "tourists":"You're inviting some tourist friends for dinner.",
                "family":"You're going out for a meal with family."
            },
            "barTable":{
                "bar":"Looking for a place to sit at the bar,",
                "table":"Looking for a place to sit at a table,"
            },
            "dimBright":{
                "dim":"in a dim,",
                "bright":"in a bright,"
            },
            "quietLoud":{
                "quiet":"quiet place.",
                "loud":"loud place."
            },
            "parking":{
                "no":"You don't need parking.",
                "yes":"You're desperate for parking."
            }
        }

    ;


    function getStory() {
        return story;
    }

    return {
        getStory:getStory

    }

})
    ();

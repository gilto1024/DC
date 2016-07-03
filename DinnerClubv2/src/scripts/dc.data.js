(function(DC, $) {
    console.log('Data module');

    var storyUrl = 'data/story.json',
        questionsUrl = '',
        restaurantsUrl = '';


    var Story = function() {

    };

    var Questions = function() {

    };

    var Restaurants = function() {

    };

    // Defining data module
    DC.data = {
        Story: new Story(),
        Questions: new Questions(),
        Restaurants: new Restaurants()
    };

})(window.DC, window.jQuery);
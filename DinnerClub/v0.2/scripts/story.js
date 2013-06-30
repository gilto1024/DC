define(['text!../models/story.json'], function (story) {

    story = JSON.parse(story);

    return story;
});
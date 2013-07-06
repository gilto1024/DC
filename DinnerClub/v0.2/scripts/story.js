define(['text!models/story.json.txt'], function (story) {

    story = JSON.parse(story);

    return story;
});
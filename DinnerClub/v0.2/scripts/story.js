define(['text!models/story.json.txt', 'utils'], function (story, utils) {

    story = JSON.parse(story)[utils.i18n.getLanguage()];

    return story;
});
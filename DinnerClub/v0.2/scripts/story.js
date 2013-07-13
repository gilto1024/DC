define(['text!models/story.json.txt', 'i18n'], function (story, i18n) {

    story = JSON.parse(story)[i18n.getLanguage()];

    return story;
});
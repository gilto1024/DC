define(['jquery', 'text!models/restList.json.txt', 'utils'], function ($, restList, utils) {

    restList = JSON.parse(restList);

    // Support deprecated V1 rests JSON format, just in case
    if (restList[utils.i18n.getLanguage()]) {
        restList = restList[utils.i18n.getLanguage()];
    }


    var MAX_RATE = 5,
        maxScore = 0;


    function getMaxScore() {
        return maxScore;
    }


    function setMaxScore(score) {
        maxScore = score;
    }


    function fetch() {
        return restList;
    }


    /**
     * Filter a restaurants list by specific vertical selection
     * @param list - list to filter
     * @param vertical - vertical to filter by
     * @param selection - selection to filter by
     * @return {*} Filtered List
     */
    function filter(list, vertical, selection) {
        list = list || restList;

        var filteredList = $.grep(list, function (rest) {
            return (rest.ratings[vertical] == selection)
        });

        return filteredList;
    }


    /**
     * Rate & sort restaurant list by user selection.
     *
     * @param list - list to rate
     * @param vertical - vertical to rate by
     * @param rating - selection rating
     * @param [factor] - factor of this vertical in the rating (default = 1)
     */
    function rate(list, vertical, rating, factor) {
        factor = factor || 1;
        maxScore += (5 * factor); // every question adds up to 5*factor to the overall score

        $.each(list, function(i, rest) {
            var score;

            score = factor * (MAX_RATE - Math.abs(rating - rest.ratings[vertical]));

            rest.score = rest.score || 0;
            rest.score += score;
        });

        return list.sort(function(restA, restB) {
            return restB.score - restA.score; // higher scores will be first in the array
        });
    }


    /**
     * Return a list of rests with scores above a threashold
     *
     * @param list - rests
     * @param threshhold - threshold to filter by (0.0 - 1.0)
     * @return {Array} filtered list
     */
    function restsAboveThreshold(list, threshhold) {
        var newList = $.grep(list, function(rest) {

            // no max score, potentially all rests match. Should this be always false instead?
            if (maxScore == 0) return true;

            rest.score = rest.score || 0;

            var scorePercent = rest.score / maxScore;
            if (scorePercent >= threshhold) {
                return true;
            }

            return false;
        });

        return newList;
    }


    return {
        fetch:fetch,
        filter:filter,
        rate:rate,
        restsAboveThreshold:restsAboveThreshold,
        getMaxScore:getMaxScore,
        setMaxScore:setMaxScore
    }
});
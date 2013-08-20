define(['jquery', 'text!models/restList.json.txt', 'utils'], function ($, restList, utils) {

    restList = JSON.parse(restList);


    function fetch() {
        return restList;
    }


    /**
     * Filter a restaurants list by specific verticals
     * @param filterObj - object containing vertical-value pairs
     * @param (opt) list - list to filter
     * @return {*} Filtered List
     */
    function filter(filterObj, list) {
        list = list || restList;

        var filteredList = $.grep(list, function (rest) {
            for (var vertical in filterObj) {
                if (!(filterObj.hasOwnProperty(vertical))) continue;

                var answer = filterObj[vertical];


                // Compare the filter object's answers with the
                // restaurant's verticals

                // String vertical
                if (typeof(rest.verticals[vertical]) === 'string') {
                    if (answer != rest.verticals[vertical]) {
                        return false;
                    }
                }

                // Array
                else if (typeof(rest.verticals[vertical]) === 'object' && rest.verticals[vertical].length) {
                    if ($.inArray(answer, rest.verticals[vertical]) == -1) {
                        return false;
                    }
                }
            }

            return true;
        });

        return filteredList;
    }

    return {
        fetch:fetch,
        filter:filter
    }
});
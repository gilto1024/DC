define(function () {


    function trackEvent(category, action, label, value) {
        //value should be null or a number
        value = (value === undefined) ? null : ((typeof value === 'string') ? parseInt(value, 10) : value);
        label = label || null;
        _gaq.push(["_trackEvent", category, action, label, value]);
    }


    function trackEventSync(category, action, label, value) {
        value = (value === undefined) ? null : ((typeof value === 'string') ? parseInt(value, 10) : value);
                label = label || null;

        _gat._getTracker()._trackEvent(category, action, label, value);
    }


    return {
        trackEvent:trackEvent,
        trackEventSync:trackEventSync
    };
});
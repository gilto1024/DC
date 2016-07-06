(function(DC, $) {
    console.log('Data module');

    var _storyUrl = 'data/story.json',
        _questionsUrl = 'data/questions.json',
        _restaurantsUrl = '',
        _isReady = false,
        _readynessInterval,
        _intervalIterationsMax = 50,
        _readynessCallback;

    var _Story = (function() {
        var _data,
            _lang;

        // API
        var _isReady = function() {
            return (_data !== null);
        };

        // Load data
        $.ajax({
            url: _storyUrl,
            dataType: 'json',
            cache: false,
            success: function(data) {
                _data = data;
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(storyUrl, status, err.toString());
            }.bind(this)
        });

        return {
            isReady: _isReady,
            setLanguage: function(_langCode) {
                _lang = _langCode;
            },
            getData: function() {
                return _data;
            }
        }
    })();

    var _Questions = (function() {
        var _data,
            _lang;

        // API
        var _isReady = function() {
            return (_data !== null);
        };

        // Load data
        $.ajax({
            url: _questionsUrl,
            dataType: 'json',
            cache: false,
            success: function(data) {
                _data = data;
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(_questionsUrl, status, err.toString());
            }.bind(this)
        });

        return {
            isReady: _isReady,
            setLanguage: function(_langCode) {
                _lang = _langCode;
            },
            getData: function() {
                return _data;
            }
        }
    })();

    var _Restaurants = (function() {
        var _data = {};

        // API
        var _isReady = function() {
            return (_data !== null);
        };

        return {
            isReady: _isReady
        }
    })();

    // Check for ready-ness
    clearInterval(_readynessInterval);
    _readynessInterval = setInterval(function() {
        if (_Story.isReady()
            && _Questions.isReady()
            && _Restaurants.isReady()) {
                clearInterval(_readynessInterval);
                _isReady = true;
                if (_readynessCallback)
                    _readynessCallback();
        } else if (_intervalIterationsMax === 0) {
            clearInterval(_readynessInterval);
        }
        _intervalIterationsMax--;
    }.bind(this), 200);

    // Defining data module
    DC.data = {
        story: _Story,
        questions: _Questions,
        restaurants: _Restaurants,
        ready: function(_callback) {
            if (_isReady) {
                _callback();
            } else {
                _readynessCallback = _callback;
            }
        }
    };

})(window.DC, window.jQuery);
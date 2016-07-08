(function(DC) {
    console.log('State module');

    /* Expected data object :
        {
        langCode: String,
        story: DC.Story,
        questions: DC.Questions,
        restaurants: DC.Restaurants
        }
     */

    /* React state object:
        {
        story: {
            current: string
            new: string // This one will get the typing effect. Null if going backwards
            showCursor: Boolean // true = blinking cursor will show
        }
        isQuestionsPhase: Boolean (whether we'll render questions or restaurants)
        // For questions
        questionData: {
            rests: {
                count: Number, // Currently filtered restaurants
                label: String, // Restaurants text label depending on language
                show: Boolean // Hidden on first question (but still rendered)
            },
            q: {
                question: String
                answers: Array[Object:{text:string, value:string}]
            }
        }
        // For restaurants
        data: {

        }
        }
     */

    var _RestaurantsBrain = function() {
        var MAX_RATE = 5,
            MATCHING_RESTS_THRESHOLD = 0.75,
            maxScore = 0;

        function getMaxScore() {
            return maxScore;
        }

        function setMaxScore(score) {
            maxScore = score;
        }

        /**
         * Filter a restaurants list by specific vertical selection
         * @param list - list to filter
         * @param vertical - vertical to filter by
         * @param selection - selection to filter by
         * @return {*} Filtered List
         */
        function filter(list, vertical, selection) {

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
        function restsAboveThreshold(list) {
            var newList = $.grep(list, function(rest) {

                // no max score, potentially all rests match. Should this be always false instead?
                if (maxScore == 0) return true;

                rest.score = rest.score || 0;

                var scorePercent = rest.score / maxScore;
                if (scorePercent >= MATCHING_RESTS_THRESHOLD) {
                    return true;
                }

                return false;
            });

            return newList;
        }

        function resetScores(list) {
            setMaxScore(0);
            for (var i = 0; i < list.length; i++) {
                list[i].score = 0;
            }
        }

        return {
            filter:filter,
            rate:rate,
            restsAboveThreshold:restsAboveThreshold,
            getMaxScore:getMaxScore,
            setMaxScore:setMaxScore,
            reset: resetScores
        }
    };

    var _StateModel = function _StateModel(_langCode) {
        // Variables
        var _currentQuestionIndex = 0,
            _verticals = {},
            _questions = DC.data.questions.getData(),
            _story = DC.data.story.getData(),
            _restsBrain = new _RestaurantsBrain(),
            _restList = DC.data.restaurants.getData(),
            _storyTextCurrent = '',
            _storyTextNew = '',
            USER_SELECTION_CONVERSION_CHART = {
                party:{
                    date:{
                        vertical:'date',
                        selection:5
                    },
                    friends:{
                        vertical:'friends',
                        selection:5
                    },
                    family:{
                        vertical:'family',
                        selection:5
                    },
                    business:{
                        vertical:'business',
                        selection:5
                    },
                    tourists:{
                        vertical:'tourists',
                        selection:5
                    }
                },
                sitting:{
                    table:{
                        vertical:'table',
                        selection:5
                    },
                    bar:{
                        vertical:'bar',
                        selection:5
                    }
                },
                light:{
                    dim:{
                        vertical:'light',
                        selection:0
                    },
                    bright:{
                        vertical:'light',
                        selection:5
                    }
                },
                vol:{
                    quiet:{
                        vertical:'vol',
                        selection:0
                    },
                    loud:{
                        vertical:'vol',
                        selection:5
                    }
                },
                parking:{
                    yes:{
                        vertical:'parking',
                        selection:true
                    }
                }
            };

        // Internal Methods

        var _processUserSelection = function(vertical, answer) {
            return USER_SELECTION_CONVERSION_CHART[vertical][answer];
        };

        var _processVerticals = function() {
            _restsBrain.reset(_restList);
            for (var _vertical in _verticals) {
                var oSelection = _processUserSelection(_vertical, _verticals[_vertical]);
                if (oSelection) {
                    if (typeof(oSelection.selection) == 'number') {
                        _restList = _restsBrain.rate(_restList, oSelection.vertical, oSelection.selection, (oSelection.vertical == 'date' ? 2 : 1));
                    } else {
                        _restList = _restsBrain.filter(_restList, oSelection.vertical, "true");
                    }
                }
            }
        };

        var _getVerticalsStory = function() {
            var _storyText = '';
            for (var _vertical in _verticals) {
                var _verticalVal = _verticals[_vertical];
                _storyText += _story[_vertical][_verticalVal];
            }

            return _storyText;
        };

        var _getStaticRestaurantsText = function() {
            return DC.languages.getStaticText('restCountLabel');
        };

        var _verticalAlreadyExists = function(_verticalName) {
            return (typeof _verticals[_verticalName] !== 'undefined');
        };

        var _haveFullStory = function() {
            var _verticalLength = Object.getOwnPropertyNames(_verticals).length,
                _storyLength = Object.getOwnPropertyNames(DC.data.story.getData()).length;

            return (_verticalLength === _storyLength);
        };

        var _nextQuestion = function() {
            // Update question index
            _currentQuestionIndex++;
            _currentQuestionIndex = Math.min(_questions.length-1, _currentQuestionIndex);

            // No need to go to next question if vertical already answered
            if (_verticalAlreadyExists(_questions[_currentQuestionIndex].vertical)
                && !_haveFullStory()) {
                _nextQuestion();
            }
        };

        // Exposed methods

        var _prevQuestion = function() {
            // Update question index
            _currentQuestionIndex--;
            _currentQuestionIndex = Math.max(0, _currentQuestionIndex);

            var _question = _questions[_currentQuestionIndex];

            // Undo current questions vertical
            _verticals[_question.vertical] = null;
            delete _verticals[_question.vertical];

            // Set current story (not getting typed)
            _storyTextCurrent = _getVerticalsStory();
            _storyTextNew = '';

            // Calculate rests
            _processVerticals();
        };

        var _ingestAnswer = function(answerValue) {
            var _question = _questions[_currentQuestionIndex];

            // Set current story (not getting typed)
            _storyTextCurrent = _getVerticalsStory();

            // Add answer to verticals
            if (answerValue !== '' && answerValue !== null) {
                _verticals[_question.vertical] = answerValue;
            }

            // Calculate rests
            _processVerticals();

            // Set newly added text to story
            _storyTextNew = _story[_question.vertical][answerValue];

            // Bump question
            _nextQuestion();
        };

        var _getReactState = function() {
            /* Here we'll create a simple state object to be passed as props to the DCApp component.
             * It will contain only the text to be rendered
             */
            var _question = _questions[_currentQuestionIndex],
                _matchingRests = _restsBrain.restsAboveThreshold(_restList),
                _oState = {},
                _oStory,
                _oQuestion,
                _oRestaurants,
                _isQuestionsPhase = !_haveFullStory();

            console.log('>>> _haveFullStory? ' + _haveFullStory())

            // Calculate Story object
            _oStory = {
                current: _storyTextCurrent,
                new: _storyTextNew,
                showCursor: _isQuestionsPhase
            };

            // Calculate Question object
            _oQuestion = {
                rests: {
                    count: _matchingRests.length,
                    label: _getStaticRestaurantsText(),
                    show: (_currentQuestionIndex > 0)
                },
                q: {
                    question: _question.text,
                    answers: _question.answers
                }
            };

            var _dummy = {
                story: _oStory,
                isQuestionsPhase: _isQuestionsPhase,
                questionData: _oQuestion
            };

            return _dummy;
        };

        return {
            getReactState: _getReactState,
            prevQuestion: _prevQuestion,
            ingestAnswer: _ingestAnswer
        }
    };

    // Defining state module
    DC.State = _StateModel;

})(window.DC);
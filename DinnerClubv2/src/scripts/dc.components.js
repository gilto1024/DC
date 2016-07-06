(function(DC, React, $) {
    // Static
    class LanguagesMenu extends React.Component {
        constructor() {
            super();
            this.state = {
                isOpen: false
            };
            this.handleMenuClick = this.handleMenuClick.bind(this);
            this.handleItemClick = this.handleItemClick.bind(this);
        }
        handleMenuClick() {
            this.setState({
                isOpen: !this.state.isOpen
            });
        }
        handleItemClick(event) {
            var _currentLang = DC.languages.getLanguage(),
                _langCode = event.currentTarget.getAttribute('data-lang');

            if (_currentLang !== _langCode)
                DC.languages.setLanguage(_langCode);
        }
        render() {
            var menuItems = this.props.data.map(function(item) {
                return (
                    <li key={item.lang}
                        data-lang={item.lang}
                        className={item.selected? 'selected' : null}
                        onClick={this.handleItemClick}>
                        {item.lang}
                    </li>
                );
            }.bind(this));

            return (
                <ul className={this.state.isOpen? 'language-menu open' : 'language-menu'}
                    onClick={this.handleMenuClick}>
                    {menuItems}
                </ul>
            );
        }
    }
    class Footer extends React.Component {
        render() {
            return (
                <span className="footer-copyright">{this.props.text}</span>
            );
        }
    }

    // App

    // Only the question + answers area (used in StoryQuestions component)
    class Question extends React.Component {
        constructor(props) {
            super(props);
        }
        handleAnswerClick(i, props) {
            var _anwerVal = props.data.answers[i].value;
            props.callback(_anwerVal);
        }
        render() {
            return (
                <div className="dc-app-filters-questions">
                    <div className="filters-question">
                        {this.props.data.question}
                    </div>
                    <ul className="filters-answers">
                        {this.props.data.answers.map(function(answer, i) {
                            return (
                                <li onClick={this.handleAnswerClick.bind(this, i, this.props)} key={i}>{answer.text}</li>
                            );
                        }.bind(this))}
                    </ul>
                </div>
            )
        }
    }

    // Only the restaurants counter (used in StoryQuestions component)
    class RestaurantsCounter extends React.Component {
        constructor(props) {
            super(props);
        }
        componentDidMount() {
            // Cache jquery ref
            this.$counter = $(this.refs.restaurantsCount);
        }
        componentWillUnmount() {
            // Clean up
        }
        shouldComponentUpdate(nextProps, nextState) {
            if (nextProps.count != this.props.count) {
                this.update(nextProps.count);
            }
            // We'll do the updatin' via jQuery counter animation
            return false;
        }
        update(_count) {
            _count = parseInt(_count);
            if (this.$counter) {
                this.$counter
                    .stop()
                    .animate({count:_count},
                    {
                        duration:800,
                        easing:"easeOutQuad",
                        step:function (num) {
                            this.innerHTML = Math.round(num);
                        },
                        complete:function () {
                            this.innerHTML = Math.round(count);
                        }
                    });
            }
        }
        render() {
            return (
                <div className="dc-app-filters-restaurants">
                    <span className="restaurants-label">
                        Restaurants
                    </span>
                    <span ref="restaurantsCount"
                          className="restaurants-num" >
                        {this.props.count}
                    </span>
                </div>
            );
        }
    }

    // The gray panel where story progresses as user anwers questions
    class Story extends  React.Component {

        shouldDisplayCursor() {
            return true;
        }
        render() {
            return (
                <div className="dc-app-filters-display">
                    <div className="display-text">
                        <span id="story" className="filters-text">You're going on a date.</span>
                        {this.shouldDisplayCursor()? <span className="filters-text cursor">|</span> : null}
                    </div>
                </div>
            )
        }
    }

    // The arrow up - to go undo verticals
    class StoryNav extends React.Component {
        render() {
            return (
                <div className="dc-app-filters-nav">
                    <span className="arrow-up-icon"></span>
                </div>
            )
        }
    }

    // The Q&A and restaurants counter panel
    class StoryQuestions extends React.Component {
        constructor(props) {
            super(props);
            this.answerClickHandler = this.answerClickHandler.bind(this);
        }
        answerClickHandler(value) {
            this.props.callback(value);
        }
        render() {
            var obj = {
                question: 'What is?',
                answers: [ {text: 'YESSS', value: 'yes'}, {text: 'NOOOOO', value: 'no'}]
            };
            return (
                <div className="dc-app-filters">
                    <Question data={this.props.data} callback={this.answerClickHandler}/>
                    <RestaurantsCounter count="0"/>
                </div>
            )
        }
    }

    // The app itself (without static content)
    class DCApp extends React.Component {
        constructor(props) {
            super(props);
            this.answerCallbackHandler = this.answerCallbackHandler.bind(this);
        }
        answerCallbackHandler(value) {
            this.props.callbacks.answer(value);
        }
        render() {
            return (
                <span>
                    <Story />
                    <StoryNav />
                    {this.props.data.isQuestionsPhase?
                        <StoryQuestions callback={this.answerCallbackHandler} data={this.props.data.data}/> : null}
                </span>
            )
        }
    }

    DC.LanguagesMenu = LanguagesMenu;
    DC.Footer = Footer;
    DC.Question = Question;
    DC.RestaurantsCounter = RestaurantsCounter;
    DC.StoryQuestions = StoryQuestions;

    DC.DCApp = DCApp;

})(window.DC, window.React, window.jQuery);
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
            this.$component = $(this.refs.panel);
        }
        componentWillUnmount() {
            // Clean up
        }
        shouldComponentUpdate(nextProps, nextState) {
            if (nextProps.data.show != this.props.data.show) {
                nextProps.data.show?
                    this.refs.panel.className = "dc-app-filters-restaurants" :
                    this.refs.panel.className = "dc-app-filters-restaurants hidden";
            }
            if (nextProps.data.count != this.props.data.count) {
                this.update(nextProps.data.count);
            }
            // We'll do the updatin' via jQuery
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
                            this.innerHTML = Math.round(_count);
                        }
                    });
            }
        }
        render() {
            var _className = this.props.data.show? "dc-app-filters-restaurants" : "dc-app-filters-restaurants hidden";
            return (
                <div className={_className} ref="panel">
                    <span className="restaurants-label">
                        {this.props.data.label}
                    </span>
                    <span ref="restaurantsCount"
                          className="restaurants-num" >
                        {this.props.data.count}
                    </span>
                </div>
            );
        }
    }

    // The gray panel where story progresses as user anwers questions
    class Story extends  React.Component {
        constructor(props) {
            super(props);
        }
        componentDidMount() {
            // Cache jquery ref
            this.$component = $(this.refs.story);
        }
        componentWillUnmount() {
            // Clean up
        }
        shouldComponentUpdate(nextProps, nextState) {

            // Empty story
            this.$component.empty();

            // Append current text
            $("<span class='chapter'>"+ nextProps.data.current +"</span>")
                .appendTo(this.$component)

            // Add new chapter if any
            $("<span class='chapter'></span>").appendTo(this.$component)
                .yotyper({ text:nextProps.data.new }, this.$component);

            // We'll do the updatin' via jQuery
            return false;
        }
        render() {
            return (
                <div className="dc-app-filters-display">
                    <div className="display-text">
                        <span ref="story" className="filters-text">{this.props.data.current + this.props.data.new}</span>
                        <span className="filters-text cursor">|</span>
                    </div>
                </div>
            )
        }
    }

    // The arrow up - to go undo verticals
    class StoryNav extends React.Component {
        constructor(props) {
            super(props);
            this.backClickHandler = this.backClickHandler.bind(this);
        }
        backClickHandler() {
            this.props.callback();
        }
        render() {
            var _className = this.props.show? "dc-app-filters-nav" : "dc-app-filters-nav hidden";
            return (
                <div className={_className}>
                    <span className="arrow-up-icon" onClick={this.backClickHandler}></span>
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
            return (
                <div className="dc-app-filters">
                    <Question data={this.props.data.q}
                              callback={this.answerClickHandler}/>
                    <RestaurantsCounter data={this.props.data.rests}/>
                </div>
            )
        }
    }

    // The restaurants display panel
    class RestaurantsCarousel extends React.Component {
        render() {
            return (
                <div class="dc-app-restaurants">
                    <div class="dc-app-restaurants-display">
                        <div class="restaurants-go-to">
                            You should go to...
                        </div>
                        <div class="restaurants-info">
                            <h1>Tapas 1 Ha'am</h1>
                            <p>
                                <span id="restaurantPhoneNum">03-5666966</span>
                                <span id="restaurantAddress">Ehad Ha'am 27</span>
                            </p>
                            <h3>Get a table</h3>
                        </div>
                        <div class="restaurants-description">
                            <ul class="restaurants-description-tabs">
                                <li></li>
                            </ul>
                            <div class="restaurants-description-content">

                            </div>
                        </div>
                    </div>
                    <div class="dc-app-restaurants-nav">

                    </div>
                </div>
            )
        }
    }

    // The app itself (without static content)
    class DCApp extends React.Component {
        constructor(props) {
            super(props);
            this.answerCallbackHandler = this.answerCallbackHandler.bind(this);
            this.goBackCallbackHandler = this.goBackCallbackHandler.bind(this);
            this.resetCallbackHandler = this.resetCallbackHandler.bind(this);
        }
        answerCallbackHandler(value) {
            this.props.callbacks.answer(value);
        }
        goBackCallbackHandler() {
            this.props.callbacks.goback();
        }
        resetCallbackHandler() {
            this.props.callbacks.reset();
        }
        render() {
            var _data = this.props.data;
            return (
                <span>
                    {
                        _data.isFirstQuestion? null : <Story data={_data.story}/>
                    }
                    <StoryNav callback={this.goBackCallbackHandler} show={!_data.isFirstQuestion}/>
                    {_data.isQuestionsPhase?
                        <StoryQuestions callback={this.answerCallbackHandler} data={_data.questionData}/>
                        : <RestaurantsCarousel callback={this.resetCallbackHandler} data={_data.restaurantsData}/> }
                </span>
            )
        }
    }

    DC.LanguagesMenu = LanguagesMenu;
    DC.Footer = Footer;
    DC.DCApp = DCApp;

})(window.DC, window.React, window.jQuery);
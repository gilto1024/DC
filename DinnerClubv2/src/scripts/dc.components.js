(function(DC, React) {
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
              <div className="footer-copyright">{this.props.text}</div>
            );
        }
    }

    DC.LanguagesMenu = LanguagesMenu;
    DC.Footer = Footer;

})(window.DC, window.React);
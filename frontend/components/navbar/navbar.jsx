import React from 'react';
import { hashHistory, router } from 'react-router';
import TradeModal from '../trade/trade';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ticker: "", populate: []};
    this.handleSignUpClick = this.handleSignUpClick.bind(this);
    this.handleLogInClick = this.handleLogInClick.bind(this);
    this.handleLogOutClick = this.handleLogOutClick.bind(this);
    this.handleGuestClick = this.handleGuestClick.bind(this);
    this.handlePortfolioButton = this.handlePortfolioButton.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    if (this.props.url.includes("login") || this.props.url.includes("signup")) {
      $("html").css("background", "grey");
    } else {
      $("html").css("background", "#F3F3F4");
    }
   }

  componentWillReceiveProps(nextProps) {
    debugger;
    if (nextProps.url !== this.props.url) {
      if (nextProps.url.includes("login") ||
        nextProps.url.includes("signup")) {
          $("html").css("background", "grey");
      } else {
        $("html").css("background", "#F3F3F4");
      }
    }
  }

  handleSignUpClick(e) {
    e.preventDefault();
    hashHistory.push('/signup');
    this.props.removeErrors();
  }

  handleLogInClick(e) {
    e.preventDefault();
    hashHistory.push('/login');
    this.props.removeErrors();
  }

  handleLogOutClick(e) {
    e.preventDefault();
    this.props.clearPortfolio();
    this.props.logout().then(() => hashHistory.push("/"));
  }

  handleGuestClick(e) {
    e.preventDefault();
    this.props.loginGuest({ username: 'Guest', password: 'password' })
      .then(() => hashHistory.push("/login"));
  }

  handlePortfolioButton(e) {
    e.preventDefault();
    hashHistory.push('/portfolio');
  }

  handleFilterChange() {
    return e => {
      this.setState({ ticker: e.target.value });
    };
  }

  handleSearchSubmit(e) {
    e.preventDefault();
    let ticker = this.state.ticker.toUpperCase();
    hashHistory.push(`/company/${ticker}`);
    this.setState({ "ticker": "" });
  }

  render() {
    let logo = (
      <div className="logo-container">
        <img src={'https://s3-us-west-1.amazonaws.com/fantasyinvesting-dev/logo.png'} alt='Logo' height="38" width="35" />
      </div>
    );

    if (this.props.currentUser) {
      return (
        <nav id="main-nav-logged-in">
          <div className='left-nav'>
            <div className='logo'>
              {logo}
            </div>
          </div>
          <div className='middle-nav'>
            <form className="header-search">
              <i className="fa fa-search"></i>
              <input className="search-input"
                placeholder="Search Ticker Ex: MSFT"
                onChange={this.handleFilterChange("ticker")} id="search"
                value={ `${this.state.ticker}` }/>
              <button className='header-search-button'
                onClick={this.handleSearchSubmit}>
              </button>
            </form>
          </div>
          <div className='right-nav'>
            <div className='auth'>
              <TradeModal removeStockErrors={this.props.removeStockErrors}/>
              <button
                className="portfolio-button"
                onClick={this.handlePortfolioButton}>Portfolio
              </button>
              <button
                className="logout-button"
                onClick={this.handleLogOutClick}>
                Logout
              </button>
            </div>
          </div>
        </nav>
      );
    } else {
      return (
        <nav id="main-nav">
          <div className='left-nav'>
            <div className='logo'>
              {logo}
            </div>
          </div>
          <div className='right-nav'>
            <div className='auth'>
              <button
                className="signup-button"
                onClick={this.handleSignUpClick}>Register</button>
              <button
                className="login-button"
                onClick={this.handleLogInClick}>Log In</button>
              <button
                className="demo-button"
                onClick={this.handleGuestClick}> Guest
              </button>
            </div>
          </div>
        </nav>
      );
    }
  }
}

export default NavBar;

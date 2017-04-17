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
  }

  handleSignUpClick(e) {
    e.preventDefault();
    this.props.removeErrors();
    hashHistory.push('/signup');
  }

  handleLogInClick(e) {
    e.preventDefault();
    this.props.removeErrors();
    hashHistory.push('/login');
  }

  handleLogOutClick(e) {
    e.preventDefault();
    debugger;
    this.props.clearPortfolio();
    this.props.logout();
    let timesRun = 0;
    let interval = setInterval(function(){
      timesRun += 1;
      if(timesRun === 1){
        clearInterval(interval);
      }
      hashHistory.push("/");
    }, 200);
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
    let username = "d6166222f6cd23d2214f20c0de1d4cc3";
    let password = "6fbb48d898d18930d6fc1e2d4e1bd54b";
    let auth = "Basic " + new Buffer(username + ':' + password).toString('base64');

    return e => {
      this.setState({ ticker: e.target.value });
      // $.ajax({
      //   url: `https://api.intrinio.com/companies?query=${e.target.value}`,
      //   method: 'GET',
      //   dataType: 'json',
      //   headers: {
      //     "Authorization": "Basic " + btoa(username + ":" + password)
      //   },
      //   success: (res) => {
      //     let array =[];
      //     res.data.forEach(company => {
      //       array.push(company.ticker);
      //     });
      //     this.setState({ populate: array });
      //     $( "#search" ).autocomplete({
      //       source: array
      //     });
      //   }
      // });
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

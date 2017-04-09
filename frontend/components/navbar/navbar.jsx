import React from 'react';
import { hashHistory, router } from 'react-router';
import TradeModal from '../trade/trade';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
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
    this.props.loginGuest({ user: { username: 'guest@gmail.com', password: 'password' } })
      .then(() => hashHistory.push("/login"));
  }

  handlePortfolioButton(e) {
    e.preventDefault();
    hashHistory.push('/portfolio');
  }

  handleFilterChange(filter) {
    return e => {
      this.setState({ [filter]: e.target.value });
    };
  }

  handleSearchSubmit(e) {
    e.preventDefault();
    let ticker = this.state.ticker.toUpperCase();
    hashHistory.push(`/company/${ticker}`);
    this.setState({ ["ticker"]: "" });
  }

  render() {
    let logo = (
      <div className="logo-container">
        <img className='logo' src={'https://ibb.co/k2Tdvk'} alt='Logo' />
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
            <label className="header-search-label"> Search Company
              <input className="search-input"
                placeholder="Search Ticker Ex: MSFT"
                onChange={this.handleFilterChange("ticker")} />
              <button className='header-search-button'
                onClick={this.handleSearchSubmit}>
              </button>
            </label>
          </form>
          </div>
          <div className='right-nav'>
               <TradeModal />

            <div className='auth'>
              <button
                className="portfolio-button"
                onClick={this.handlePortfolioButton}>Portfolio
              </button>
              <button
                className="logout-button"
                onClick={this.handleLogOutClick}>
                Log Out
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

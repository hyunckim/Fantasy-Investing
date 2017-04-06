import React from 'react';
import { hashHistory, router } from 'react-router';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleSignUpClick = this.handleSignUpClick.bind(this);
		this.handleLogInClick = this.handleLogInClick.bind(this);
		this.handleLogOutClick = this.handleLogOutClick.bind(this);
    this.handleGuestClick = this.handleGuestClick.bind(this);
    this.handlePortfolioButton = this.handlePortfolioButton.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.state = this.props.filters;
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
    this.props.logout().then(() => hashHistory.push("/"));
  }

  handleGuestClick(e) {
    e.preventDefault();
    this.props.loginGuest({user: {username: 'guest@gmail.com', password: 'password'}})
    .then(() => hashHistory.push("/login"));
  }

  handlePortfolioButton(e) {
    e.preventDefault();
    hashHistory.push('/portfolio');
  }

  handleFilterChange(filter) {
    return e => {
      this.setState({[filter]: e.target.value});
    };
  }

  handleSearchSubmit(e) {
    e.preventDefault();
    let ticker = this.state.ticker.toUpperCase();
    hashHistory.push(`/company/${ticker}`);
    this.setState({["ticker"]: ""});
  }

  render() {
    let logo = (
      <div className="logo-container">
        <p className="logo-text">Fantasy Investing</p>
      </div>
    );


    if (this.props.currentUser) {
      return (

        <nav className="main-nav">
          {logo}
          <form className="header-search">
            <label className="header-search-label"> Select Company by ticker
              <input className="search-input"
                placeholder="Type ticker"
                onChange={this.handleFilterChange("ticker")}/>
              <button className='header-search-button'
                onClick={this.handleSearchSubmit}>
                <i className="fa fa-search" aria-hidden="true"></i>
              </button>
            </label>
          </form>
          <button className="portfolio-button"
            onClick={this.handlePortfolioButton}>Portfolio</button>
          <button className="logout-button" onClick={this.handleLogOutClick}>
            Log Out</button>
        </nav>


    );} else {
      return (
        <nav className="main-nav">
          {logo}
          <button className="signup-button"
            onClick={this.handleSignUpClick}>Register</button>
          <button className="login-button"
            onClick={this.handleLogInClick}>Log In</button>
          <button className="demo-button"
            onClick={this.handleGuestClick}> Guest
          </button>
        </nav>
      );
    }
  }
}

export default NavBar;

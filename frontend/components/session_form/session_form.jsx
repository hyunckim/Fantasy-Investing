import React from 'react';
import { Link, withRouter, hashHistory } from 'react-router';

class SessionForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = { username: "", password: "", first_name: "",
      last_name: ""};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSignUpClick = this.handleSignUpClick.bind(this);
		this.handleLogInClick = this.handleLogInClick.bind(this);
	}

	componentDidUpdate() {
		this.redirectIfLoggedIn();
	}

	redirectIfLoggedIn() {
		if (this.props.loggedIn) {
			this.props.router.push("/portfolio");
		}
	}

	update(field) {
		return e => this.setState({
			[field]: e.currentTarget.value
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		const user = this.state;
		this.props.removeErrors();
		if (this.state.password.length > 5 || this.props.formType === 'login') {
			this.props.processForm(user);
		} else {
			this.props.receiveErrors("Your password should be at least 6 characters long");
		}
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

	navButton() {
		if (this.props.formType === "signup") {
			return (<button className="redirect-form-button"
			onClick={this.handleLogInClick}>Log In</button>);
		} else {
			return (<button className="redirect-form-button"
			onClick={this.handleSignUpClick}>Register</button>);
		}
	}

	renderErrors() {
		return(
			<ul className="login-form-errors">
				{this.props.errors.map((error, i) => (
					<li key={`error-${i}`}>
						{error}
					</li>
				))}
			</ul>
		);
	}

	render() {
		let firstName = "";
		let lastName = "";
		let submitText = "Log In";
		let message = "Log in to Fantasy Investing";
		let redirectMessage = "Don't have an account?";

		if (this.props.formType === "signup") {
			firstName = (
				<input type="text"
					placeholder="First Name"
					value={this.state.first_name}
					onChange={this.update("first_name")}
					className="first-name-input" />
				);
			lastName = (
				<input type="text"
					placeholder="Last Name"
					value={this.state.last_name}
					onChange={this.update("last_name")}
					className="last-name-input" />
			);
			submitText = "Register";
			message = "Register to Fantasy Investing";
			redirectMessage = "Already a member?";
		}

		return (
			<div className="login-form-container">
				<div className='login-form'>
					<form onSubmit={this.handleSubmit} className="login-form-box">
						<div className='session-title-container'>
							<div className="session-form-message">{message}</div>
						</div>
						{this.renderErrors()}

						<div className="first-last-names">
							{firstName}
							{lastName}
						</div>

						<div className="login-form-info">
							<input type="text"
								placeholder="Username"
								value={this.state.username}
								onChange={this.update("username")}
								className="email-input" />
							<input type="password"
								placeholder="Password"
								value={this.state.password}
								onChange={this.update("password")}
								className="password-input" />
							<input type="submit" value={submitText} className="submit-button" />
						</div>
						<div className="bottom-message-form">
							<p className="redirect-message">{redirectMessage}</p>
							{this.navButton()}
						</div>
					</form>
				</div>


			</div>
		);
	}
	}

export default withRouter(SessionForm);

import React from 'react';

class PortfolioForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            main: false,
            user: this.props.currentUser
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updatePortfolio = this.updatePortfolio.bind(this);
    }

    componentWillReceiveProps(nextProps) {
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.createPortfolio(this.state)
        .then(() => this.props.closeModal());
    }

    updatePortfolio(event) {
        this.setState({ title: event.target.value });
    }

  render () {
    return (
      <div className='portfolio-form'>
        <div className='portfolio-form-title'>
            Create A New Portfolio
        </div>
        <form onSubmit={ this.handleSubmit} className="new-portfolio-form">
          <input
            onChange={ this.updatePortfolio }
            type="text"
            placeholder="Portfolio Title"
            className = "new-portfolio-input"
            value={ this.state.title } />
         <input
            type="submit"
            id="submit-button"
            className="form-submit-button"
            value="Submit"
            />
        </form>
      </div>
    );
  }
}

export default PortfolioForm;

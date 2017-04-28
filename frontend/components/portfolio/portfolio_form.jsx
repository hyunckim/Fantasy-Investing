import React from 'react';

class PortfolioForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            main: false,
            user: this.props.currentUser,
            formState: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updatePortfolio = this.updatePortfolio.bind(this);
    }

    handleSubmit(e) {
      e.preventDefault();
      this.props.removePortfolioErrors();
      if (this.state.title.length > 0) {
        this.props.createPortfolio(this.state);
        this.setState({formState: true});

        setTimeout(() =>
          closeModal(),
          3000);

        const closeModal = () => {
          this.setState({formState: false});
          this.props.modal.closeModal();
        };
      } else {
        this.props.receivePortfolioErrors("Please enter name for watchlist");
      }
    }

    updatePortfolio(event) {
        this.setState({ title: event.target.value });
    }

  render () {
    let formHtml = (
      <div className='portfolio-form'>
        <div className='portfolio-form-title'>
            Create A New Watchlist
        </div>
        <p className="portfolio-form-errors">{this.props.errors}</p>
        <form onSubmit={ this.handleSubmit}>
          <input
            onChange={ this.updatePortfolio }
            type="text"
            placeholder="Watchlist Title"
            value={ this.state.title }
            className="portfolio-form-input"/>
          <input
              type="submit"
              id="portfolio-submit-button"
              value="Submit"/>
        </form>
      </div>
    );
    if (this.state.formState) {
      formHtml = (
        <div className='portfolio-confirmation-container'>
          <p>{this.state.title} created!</p>
        </div>
      );
    }

    return (
      <div>
        {formHtml}
      </div>
    );
  }
}

export default PortfolioForm;

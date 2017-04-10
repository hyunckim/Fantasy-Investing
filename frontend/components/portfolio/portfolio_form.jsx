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
        <div className='createMessage'>
            Create A New Portfolio
        </div>
        <form onSubmit={ this.handleSubmit}>
          <input
            onChange={ this.updatePortfolio }
            type="text"
            placeholder="Portfolio Title"
            value={ this.state.title } />
        </form>

      </div>
    );
  }
}

export default PortfolioForm;

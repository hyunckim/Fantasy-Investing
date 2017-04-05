import React from 'react';

class Company extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchCompany();
  }

  render() {
    let company;
    if (this.props.company) {
      company = this.props.company.title;
    }

    return (
      <div>Am I working?</div>
    );
  }
}

export default Company;

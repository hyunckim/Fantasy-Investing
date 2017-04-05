import React from 'react';

class Company extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let company;

    if (this.props.company) {
      company = this.props.company.title;
    }

    return (
      <div>{ company }</div>
    );
  }
}

export default Company;

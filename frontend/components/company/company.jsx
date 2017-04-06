import React from 'react';

class Company extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchCompany();
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.company && nextProps.company) {
      this.props.fetchCompany();
    } else if ( this.props.params.ticker !== nextProps.params.ticker ) {
      nextProps.fetchCompany();
    }
  }

  render() {
    return (
      <div>hi</div>
    );
  }
}

export default Company;

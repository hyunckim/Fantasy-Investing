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
    let title;
    let price;
    let earning_share;
    let percent_change;
    let ticker;
    let volume;
    let prev_close;
    let dividend;
    let year_high;
    let year_low;

    if (this.props.company) {
      title = this.props.company.title;
      price = this.props.company.price;
      earning_share = this.props.company.earning_share;
      percent_change = this.props.company.percent_change;
      ticker = this.props.company.ticker;
      volume = this.props.company.volume;
      prev_close = this.props.company.prev_close;
      dividend = this.props.company.dividend;
      year_high = this.props.company.year_high;
      year_low = this.props.company.year_low;
    }

    return (
      <div>
        { title }
        { price }
        { earning_share }
        { percent_change }
        { ticker }
        { prev_close }
        { dividend }
        { year_high }
        { year_low }
      </div>
    );
  }
}

export default Company;

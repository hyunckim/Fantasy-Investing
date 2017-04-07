import React from 'react';
import TradeModal from '../trade/trade';

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
    let earningShare;
    let percentChange;
    let ticker;
    let volume;
    let prevClose;
    let dividend;
    let yearHigh;
    let yearLow;

    if (this.props.company.title !== undefined ) {
      title = this.props.company.title;
      price = this.props.company.price;
      earningShare = this.props.company.earning_share;
      percentChange = this.props.company.percent_change;
      ticker = this.props.company.ticker;
      volume = this.props.company.volume;
      prevClose = this.props.company.prev_close;
      if (this.props.company.dividend === null) {
        dividend = "N/A";
      } else {
        dividend = this.props.company.dividend;
      }
      yearHigh = this.props.company.year_high;
      yearLow = this.props.company.year_low;

    }



    return (
      <div className="company-content">
        <div className="company-info">
          <span className="company-title">{ title } { ticker }</span>
          <span className="company-price">{ price } ({ percentChange })</span>
          <TradeModal />
        </div>
        <div className="company-summary">
          <div className="company-detail">
            <div className="company-nums">
              <span>Earning Share</span>
              <span>{ earningShare }</span>
            </div>
            <div className="company-nums">
              <span>Previous Close</span>
              <span>{ prevClose }</span>
            </div>
            <div className="company-nums">
              <span>Dividend</span>
              <span>{ dividend }</span>
            </div>
            <div className="company-nums">
              <span>Yr. High</span>
              <span>{ yearHigh }</span>
            </div>
            <div className="company-nums">
              <span>Yr. Low</span>
              <span>{ yearLow }</span>
            </div>
            <div className="company-nums">
              <span>Volume</span>
              <span>{ volume }</span>
            </div>
          </div>
          <svg className="company-graph">

          </svg>


        </div>
      </div>
    );
  }
}

export default Company;

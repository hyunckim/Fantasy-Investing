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

      let margin = {top: 30, right: 20, bottom: 30, left: 50},
        width = 600 - margin.left - margin.right,
        height = 270 - margin.top - margin.bottom;


      let date = this.props.company.past_year_info.map(el => el[0]);
      let close = this.props.company.past_year_info.map(el => el[1]);

      // Set the ranges
      let x = d3.time.scale().range([0, width]);
      let y = d3.scale.linear().range([height, 0]);

      // Define the axes
      let xAxis = d3.svg.axis().scale(x)
        .orient("bottom").ticks(5);

      let yAxis = d3.svg.axis().scale(y)
        .orient("left").ticks(5);

      // Define the line
      let valueline = d3.svg.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.close); });

      // Adds the svg canvas
      let svg = d3.select('svg'),
        margin = {top: 20, right: 20, bottom: 30, left: 50},
        width= svg.attr("width") - margin.left - margin.right,
        height = svg.attr("height")
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
        .append('g')
          .attr('transform',
                  'translate(' + margin.left + ',' + margin.top + ')');


    }



    return (
      <div className="company-content">
        <div className="company-info">
          <span className="company-title">{ title } { ticker }</span>
          <span className="company-price">{ price } ({ percentChange })</span>
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

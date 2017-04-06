import React from 'react';
import { merge } from  'lodash';

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
    let past_year_info;
    let sample;
    let drawD3Document = function() {};

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
      past_year_info = jQuery.extend(true, [], this.props.company.past_year_info);
      // let Date = this.props.company.past_year_info.map(el => el[0]);
      // let Close = this.props.company.past_year_info.map(el => el[1]);
      //
      // // Set the ranges
      // let x = d3.time.scale().range([0, width]);
      // let y = d3.scale.linear().range([height, 0]);
      //
      // // Define the axes
      // let xAxis = d3.svg.axis().scale(x)
      //   .orient("bottom").ticks(5);
      //
      // let yAxis = d3.svg.axis().scale(y)
      //   .orient("left").ticks(5);
      //
      // // Define the line
      // let valueline = d3.svg.line()
      //   .x(function(d) { return x(d.Date); })
      //   .y(function(d) { return y(d.Close); });
      //
      // // Adds the svg canvas
      // let svg = d3.select('svg'),
      //   margin = {top: 20, right: 20, bottom: 30, left: 50},
      //   width= svg.attr("width") - margin.left - margin.right,
      //   height = svg.attr("height") - margin.top - margin.bottom,
      //   g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    sample =  [
  {
    "date": "1-May-12",
    "close": "582.13"
  },
  {
    "date": "30-Apr-12",
    "close": "583.98"
  },
  {
    "date": "27-Apr-12",
    "close": "603.00"
  },
  {
    "date": "26-Apr-12",
    "close": "607.70"
  },
  {
    "date": "25-Apr-12",
    "close": "610.00"
  },
  {
    "date": "24-Apr-12",
    "close": "560.28"
  },
  {
    "date": "23-Apr-12",
    "close": "571.70"
  },
  {
    "date": "20-Apr-12",
    "close": "572.98"
  },
  {
    "date": "19-Apr-12",
    "close": "587.44"
  },
  {
    "date": "18-Apr-12",
    "close": "608.34"
  },
  {
    "date": "17-Apr-12",
    "close": "609.70"
  },
  {
    "date": "16-Apr-12",
    "close": "580.13"
  },
  {
    "date": "13-Apr-12",
    "close": "605.23"
  },
  {
    "date": "12-Apr-12",
    "close": "622.77"
  },
  {
    "date": "11-Apr-12",
    "close": "626.20"
  },
  {
    "date": "10-Apr-12",
    "close": "628.44"
  },
  {
    "date": "9-Apr-12",
    "close": "636.23"
  },
  {
    "date": "5-Apr-12",
    "close": "633.68"
  },
  {
    "date": "4-Apr-12",
    "close": "624.31"
  },
  {
    "date": "3-Apr-12",
    "close": "629.32"
  },
  {
    "date": "2-Apr-12",
    "close": "618.63"
  },
  {
    "date": "30-Mar-12",
    "close": "599.55"
  },
  {
    "date": "29-Mar-12",
    "close": "609.86"
  },
  {
    "date": "28-Mar-12",
    "close": "617.62"
  },
  {
    "date": "27-Mar-12",
    "close": "614.48"
  },
  {
    "date": "26-Mar-12",
    "close": "606.98"
  },
  {
    "date": "23-Mar-12",
    "close": "596.05"
  },
  {
    "date": "22-Mar-12",
    "close": "599.34"
  },
  {
    "date": "21-Mar-12",
    "close": "602.50"
  },
  {
    "date": "20-Mar-12",
    "close": "605.96"
  },
  {
    "date": "19-Mar-12",
    "close": "601.10"
  },
  {
    "date": "16-Mar-12",
    "close": "585.57"
  },
  {
    "date": "15-Mar-12",
    "close": "585.56"
  },
  {
    "date": "14-Mar-12",
    "close": "589.58"
  },
  {
    "date": "13-Mar-12",
    "close": "568.10"
  },
  {
    "date": "12-Mar-12",
    "close": "552.00"
  },
  {
    "date": "9-Mar-12",
    "close": "545.17"
  },
  {
    "date": "8-Mar-12",
    "close": "541.99"
  },
  {
    "date": "7-Mar-12",
    "close": "530.69"
  },
  {
    "date": "6-Mar-12",
    "close": "530.26"
  },
  {
    "date": "5-Mar-12",
    "close": "533.16"
  },
  {
    "date": "2-Mar-12",
    "close": "545.18"
  },
  {
    "date": "1-Mar-12",
    "close": "544.47"
  },
  {
    "date": "29-Feb-12",
    "close": "542.44"
  },
  {
    "date": "28-Feb-12",
    "close": "535.41"
  },
  {
    "date": "27-Feb-12",
    "close": "525.76"
  },
  {
    "date": "24-Feb-12",
    "close": "522.41"
  },
  {
    "date": "23-Feb-12",
    "close": "516.39"
  },
  {
    "date": "22-Feb-12",
    "close": "513.04"
  },
  {
    "date": "21-Feb-12",
    "close": "514.85"
  },
  {
    "date": "17-Feb-12",
    "close": "502.12"
  },
  {
    "date": "16-Feb-12",
    "close": "502.21"
  },
  {
    "date": "15-Feb-12",
    "close": "497.67"
  },
  {
    "date": "14-Feb-12",
    "close": "509.46"
  },
  {
    "date": "13-Feb-12",
    "close": "502.60"
  },
  {
    "date": "10-Feb-12",
    "close": "493.42"
  },
  {
    "date": "9-Feb-12",
    "close": "493.17"
  },
  {
    "date": "8-Feb-12",
    "close": "476.68"
  },
  {
    "date": "7-Feb-12",
    "close": "468.83"
  },
  {
    "date": "6-Feb-12",
    "close": "463.97"
  },
  {
    "date": "3-Feb-12",
    "close": "459.68"
  },
  {
    "date": "2-Feb-12",
    "close": "455.12"
  }];




      let WIDTH = 700, HEIGHT = 300;

      let yAxisLabel = "Price ($)";

      let parseDate = d3.time.format("%d-%b-%y").parse;

      let margin = {
          top: 20,
          right: 20,
          bottom: 30,
          left: 50
      }, width = WIDTH - margin.left - margin.right, height = HEIGHT - margin.top - margin.bottom;

      let x = d3.time.scale().range([0, width ]);
      let y = d3.scale.linear().range([height, 0]);

      let xAxis = d3.svg.axis().scale(x).orient("bottom");
      let yAxis = d3.svg.axis().scale(y).orient("left");

      let line = d3.svg.line().interpolate("basic").x(function(d) {
        return x(d.date);
      }).y(function(d) {
        return y(d.close);
      });

      let svg = d3.select("#canvas-svg").append("svg").attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      drawD3Document = function(data) {
        let summary = jQuery.extend(true, [], data);
          data.forEach(function(d) {
              d.date = parseDate(d.date);
              d.close = parseFloat(d.close).toFixed(2);
          });
          x.domain(d3.extent(data, function(d) {
              return d.date;
          }));
          y.domain(d3.extent(data, function(d) {
              return d.close;
          }));
          svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis);
          svg.append("g").attr("class", "y axis").call(yAxis).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").text(yAxisLabel);
          svg.append("path").datum(data).attr("class", "line").attr("d", line);
      };
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
          <div id="canvas-svg">
            { drawD3Document(past_year_info) }
          </div>
        </div>
      </div>
    );
  }
}

export default Company;

import React from 'react';
import { merge } from  'lodash';
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
      d3.select("svg").remove();
      this.props.fetchCompany();
    } else if ( this.props.params.ticker !== nextProps.params.ticker ) {
      d3.select("svg").remove();
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
      d3.select("svg").remove();
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
          <div className="company-name-price">
            <span className="company-title">{ title } { ticker }</span>
            <span className="company-price">{ price } ({ percentChange })</span>
          </div>
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
          <div id="canvas-svg">
            { drawD3Document(past_year_info) }
          </div>
          <svg className="company-graph">

          </svg>
        </div>
      </div>
    );
  }
}

export default Company;

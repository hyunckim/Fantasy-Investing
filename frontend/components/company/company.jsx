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
    let pastYearInfo;
    let sample;
    let open;
    let fiftytwoWeekHigh;
    let fiftytwoWeekLow;
    let marketCap;
    let dividendShare;
    let fiftyDayMovingAvg;
    let twoHundredDayMovingAvg;
    let ebitda;
    let eps;
    let avgVolume;
    let forwardPE;
    let peg;
    let pricePerSale;
    let pricePerBook;
    let shortRatio;

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
      pastYearInfo = jQuery.extend(true, [], this.props.company.past_year_info);
      open = this.props.company.open;
      fiftytwoWeekHigh = this.props.company.fiftytwo_week_high;
      fiftytwoWeekLow = this.props.company.fiftytwo_week_low;
      marketCap = this.props.company.market_cap;
      if (this.props.company.dividend_share === null) {
        dividendShare = "N/A";
      } else {
        dividendShare = this.props.company.dividend_share;
      }
      fiftyDayMovingAvg = this.props.company.fifty_day_moving_avg;
      twoHundredDayMovingAvg = this.props.company.two_hundred_day_moving_avg;
      ebitda = this.props.company.ebitda;
      eps = this.props.company.EPS_next_year;
      avgVolume = this.props.company.avg_volume;
      forwardPE = Math.round( this.props.company.EPS_estimate_next_year * 10 ) / 10;
      peg = Math.round( this.props.company.earnings_growth_ratio * 10 ) / 10
      pricePerSale = Math.round( this.props.company.price_per_sale * 10 ) / 10;
      pricePerBook = Math.round( this.props.company.price_per_book * 10 ) / 10;
      shortRatio =   Math.round( this.props.company.short_ratio * 10 ) / 10;

      let https = require('https');
      let username = "d6166222f6cd23d2214f20c0de1d4cc3";
      let password = "6fbb48d898d18930d6fc1e2d4e1bd54b";
      let auth = "Basic " + new Buffer(username + ':' + password).toString('base64');

      $.ajax({
        type: "GET",
        url: "https://api.intrinio.com/news?ticker=AAPL",
        dataType: 'json',
        headers: {
          "Authorization": "Basic " + btoa(username + ":" + password)
        },
        success: function (res){
          console.log(res);
        }
      });

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
            <span className="company-price">${ price } ({ percentChange })</span>
          </div>
        </div>
        <div className="company-summary">
          <div className="company-detail">
            <div className="company-nums">
              <p >Open</p>
              <p className='value'>${ open }</p>
            </div>
            <div className="company-nums">
              <p>Previous Close</p>
              <p className='value'>${ prevClose }</p>
            </div>
            <div className="company-nums">
              <p >EPS</p>
              <p className='value'>${ eps }</p>
            </div>
            <div className="company-nums">
              <p >52 Week-high</p>
              <p className='value'>${ fiftytwoWeekHigh }</p>
            </div>
            <div className="company-nums">
              <p >52 Week-low</p>
              <p className='value'>${ fiftytwoWeekLow }</p>
            </div>
            <div className="company-nums">
              <p >Market Cap</p>
              <p className='value'>${ marketCap }</p>
            </div>
            <div className="company-nums">
              <p>Daily Avg. Volume</p>
              <p className='value'>{ avgVolume }</p>
            </div>
            <div className="company-nums">
              <p>Dividend per Share</p>
              <p className='value'>{ dividendShare }</p>
            </div>
            <div className="company-nums">
              <p>Dividend Yield</p>
              <p className='value'>{ dividend }</p>
            </div>
            <div className="company-nums">
              <p>50-day Moving Avg</p>
              <p className='value'>${ fiftyDayMovingAvg }</p>
            </div>
            <div className="company-nums">
              <p>200-day Moving Avg</p>
              <p className='value'>${ twoHundredDayMovingAvg }</p>
            </div>
            <br></br>
            <div className="company-nums">
              <p>Forward P/E</p>
              <p className='value'>{ forwardPE }x</p>
            </div>
            <div className="company-nums">
              <p>PEG</p>
              <p className='value'>{ peg }x</p>
            </div>
            <div className="company-nums">
              <p>Price / Sales</p>
              <p className='value'>{ pricePerSale }x</p>
            </div>
            <div className="company-nums">
              <p>Price / Book</p>
              <p className='value'>{ pricePerBook }x</p>
            </div>
            <div className="company-nums">
              <p>Short Ratio</p>
              <p className='value'>{ shortRatio }%</p>
            </div>
          </div>
          <div id="canvas-svg">
            { drawD3Document(pastYearInfo) }
          </div>
          <svg className="company-graph">

          </svg>
        </div>
      </div>
    );
  }
}

export default Company;

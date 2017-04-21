import React from 'react';
import { merge } from  'lodash';

class Company extends React.Component {

  constructor(props) {
    super(props);
    this.state = {news : ""};
  }

  componentDidMount() {
    this.props.fetchCompany();
    this.props.fetchPortfolios();
    this.receiveNews(this.props.ticker);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.company && nextProps.company) {
      this.props.fetchCompany();
      this.receiveNews(nextProps.ticker);
    } else if ( this.props.params.ticker !== nextProps.params.ticker ) {
      nextProps.fetchCompany();
      this.receiveNews(nextProps.ticker);
    }
  }

  numberWithCommas (num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  addToWatchlist(watchlist) {
    return (event) => {
      event.preventDefault();
      let stock = {
        ticker: this.props.ticker
      };
      stock["purchase_price"] = 0;
      let today = new Date();
      stock["purchase_date"] =
        `${today.getFullYear}-${today.getMonth() + 1}-${today.getDate()}`;
      stock["number_of_shares"] = 1;
      stock["portfolio"] = watchlist;
      this.props.createStock(stock);
    };
  }

  receiveNews(ticker) {
    let username = "d6166222f6cd23d2214f20c0de1d4cc3";
    let password = "6fbb48d898d18930d6fc1e2d4e1bd54b";
    let auth = "Basic " + new Buffer(username + ':' + password).toString('base64');

    $.ajax({
      type: "GET",
      url: `https://api.intrinio.com/news?ticker=${ticker}`,
      dataType: 'json',
      headers: {
        "Authorization": "Basic " + btoa(username + ":" + password)
      },
      success: (res) => {
        this.setState({ news: res.data.slice(0, 7) });
      }
    });
  }

  timeSince(date) {

  let seconds = Math.floor((new Date() - new Date(date)) / 1000);

  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes";
  }
  return Math.floor(seconds) + " seconds";
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
    let newsContent;
    let watchlists;
    let daysLow;
    let daysHigh;

    if (this.props.company.title !== undefined ) {
      title = this.props.company.title;
      price = this.props.company.price.toFixed(2);
      earningShare = this.props.company.earning_share;
      percentChange = this.props.company.percent_change;
      ticker = this.props.company.ticker;
      volume = this.numberWithCommas(this.props.company.volume);
      prevClose = this.props.company.prev_close.toFixed(2 );
      if (this.props.company.dividend === null) {
        dividend = "N/A";
      } else {
        dividend = this.props.company.dividend.toFixed(2);
      }
      yearHigh = this.props.company.year_high;
      yearLow = this.props.company.year_low;
      pastYearInfo = jQuery.extend(true, [], this.props.company.past_year_info);
      if (this.props.company.open !== null) {
        open = this.props.company.open.toFixed(2);
      } else { this.props.fetchCompany(); }
      fiftytwoWeekHigh = this.props.company.fiftytwo_week_high.toFixed(2);
      fiftytwoWeekLow = this.props.company.fiftytwo_week_low.toFixed(2);
      marketCap = this.props.company.market_cap;
      if (this.props.company.dividend_share === null) {
        dividendShare = "N/A";
      } else {
        dividendShare = this.props.company.dividend_share.toFixed(2);
      }
      fiftyDayMovingAvg = this.props.company.fifty_day_moving_avg;
      twoHundredDayMovingAvg = this.props.company.two_hundred_day_moving_avg;
      ebitda = this.props.company.ebitda;
      eps = this.props.company.EPS_next_year;
      avgVolume = this.numberWithCommas(this.props.company.avg_volume);
      forwardPE = Math.round( this.props.company.EPS_estimate_next_year * 10 ) / 10;
      peg = Math.round( this.props.company.earnings_growth_ratio * 10 ) / 10;
      pricePerSale = Math.round( this.props.company.price_per_sale * 10 ) / 10;
      pricePerBook = Math.round( this.props.company.price_per_book * 10 ) / 10;
      shortRatio = Math.round( this.props.company.short_ratio * 10 ) / 10;
      if (this.props.company.days_low) {
        daysLow = this.props.company.days_low.toFixed(2);
      }
      if (this.props.company.days_high) {
        daysHigh = this.props.company.days_high.toFixed(2);
      }
      let seriesDataMap = {};
      let config = {};
      config.xAxis = "date";
      config.yAxis = ticker;
      config.width = 600;
      config.height = 250;
      config.xAxisLabel = "Date";
      config.yAxisLabel = "Price";
      config.title = "1-year Price History";
      config.title2 = "1-week Price History";

      let data = pastYearInfo;
      let color = "orange";
          seriesDataMap = {
            color: color,
            name: ticker,
            date: [],
            data: []
          };
      let yAxisTypeMap = {};
      let yAxisType = "";

      let count = 0;
      for (let i = 0; i < data.length; i++) {
        seriesDataMap.data.push({x: count, y: data[data.length-1-i].close });
        seriesDataMap.date.push(data[data.length-1-i].date);
        count++;
      }

      let seriesData = [];
      let darray = seriesDataMap.data;
        seriesData.push({
          color: seriesDataMap.color,
          name: seriesDataMap.name,
          date: seriesDataMap.date,
          data: darray
      });

      let margin = {top: 20, left: 20, bottom: 30, right: 50};
      let width = config.width, height = config.height;

      $("#canvas-svg .title").show();
      $("#canvas-svg .title").html(config.title);
      height -= $("#canvas-svg .title").height();

      if ($('#canvas-svg').find('.x_axis')) {
        $('#canvas-svg').find('svg').remove();
        $('#canvas-svg').find('.x_axis').remove();
        $('#canvas-svg').find('.y_axis').remove();
        $('#canvas-svg').find('.chart').remove();

        $('#canvas-svg2').find('svg').remove();
        $('#canvas-svg2').find('.x_axis').remove();
        $('#canvas-svg2').find('.y_axis').remove();
        $('#canvas-svg2').find('.chart').remove();
      }

      $('<div class="chart"></div>').appendTo($(".chart_container"));
      $('<div class="y_axis"></div>').appendTo($(".chart_container"));
      $('<div class="x_axis"></div>').appendTo($(".chart_container"));

      if ($('#canvas-svg').find('.chart')[0]) {
        let graph = new Rickshaw.Graph( {
          element: $('#canvas-svg').find('.chart')[0],
          width: width - margin.left - margin.right,
          height: height - margin.top - margin.bottom,
          min: "auto",
          renderer: 'line',
          series: seriesData
        } );

        graph.render();

        let commaFormat = d3.format("0,000");

        let hoverDetail = new Rickshaw.Graph.HoverDetail( {
          graph: graph,
          formatter: function(series, x, y) {
            let content = ": $" + commaFormat(y);
            let date = series.date[x];
            return date + content;
          }
        } );

        let shelving = new Rickshaw.Graph.Behavior.Series.Toggle( {
          graph: graph
        } );

        let axes = new Rickshaw.Graph.Axis.Time( {
          graph: graph
        } );

        function yFormat(n) {
          return Rickshaw.Fixtures.Number.formatKMBT(n);
        }

        let yAxis = new Rickshaw.Graph.Axis.Y({
          graph: graph,
          orientation: 'left',
          tickFormat: yFormat,
          element: $('#canvas-svg').find('.y_axis')[0]
        });

        let format = function(n) {
          if (data[data.length-1-n]) {
            return data[data.length-1-n][config.xAxis];
          } else {
            return "";
          }
        }

        let xAxis = new Rickshaw.Graph.Axis.X( {
          graph: graph,
          orientation: 'bottom',
          element: $('#canvas-svg').find('.x_axis')[0],
          pixelsPerTick: 100,
          tickFormat: format
        } );
        yAxis.render();
        xAxis.render();

        axes.render();

        // append label
        let xAxisBBox = d3.select("#canvas-svg")
        .select(".x_axis")
        .select('g.x_ticks_d3').node().getBBox();

        d3.select("#canvas-svg").select(".x_axis").append("div")
        .attr("class", "xAxisLabel")
        .style("width", (xAxisBBox.width - 10) + "px")
        .style("top", (25) + "px")
        .text(config.xAxisLabel);

        d3.select("#canvas-svg").select(".y_axis").append("div")
        .attr("class", "yAxisLabel")
        .style("left", (-10) + "px")
        .style("top", (-15) + "px")
        .html(config.yAxisLabel);

        // fix x_axis svg width
        let x_axis_svg = d3.select("#canvas-svg").select(".x_axis").select("svg");
        x_axis_svg.attr("width", x_axis_svg.select("g.x_ticks_d3").node().getBBox().width + 40);

        // fix up title
        $("#canvas-svg .title").width($("#canvas-svg .chart_container").width());

        // second graph


        $('<div class="chart"></div>').appendTo($(".chart_container2"));
        $('<div class="y_axis"></div>').appendTo($(".chart_container2"));
        $('<div class="x_axis"></div>').appendTo($(".chart_container2"));

        $("#canvas-svg2 .title").show();
        $("#canvas-svg2 .title").html(config.title2);
        height -= $("#canvas-svg2 .title").height();

        let seriesData2 = [];
        let darray2 = seriesDataMap.data.slice(seriesDataMap.data.length-7);
          seriesData2.push({
            color: seriesDataMap.color,
            name: seriesDataMap.name,
            date: seriesDataMap.date,
            data: darray2
        });

        let graph2 = new Rickshaw.Graph( {
          element: $('#canvas-svg2').find('.chart')[0],
          width: width - margin.left - margin.right,
          height: height - margin.top - margin.bottom,
          min: "auto",
          renderer: 'line',
          series: seriesData2
        } );

        graph2.render();

        let hoverDetail2 = new Rickshaw.Graph.HoverDetail( {
          graph: graph2,
          formatter: function(series, x, y) {
            let content = ": $" + commaFormat(y);
            let date = series.date[x];
            return date + content;
          }
        } );

        let shelving2 = new Rickshaw.Graph.Behavior.Series.Toggle( {
          graph: graph2
        } );

        let axes2 = new Rickshaw.Graph.Axis.Time( {
          graph: graph2
        } );

        let yAxis2 = new Rickshaw.Graph.Axis.Y({
          graph: graph2,
          orientation: 'left',
          tickFormat: yFormat,
          element: $('#canvas-svg2').find('.y_axis')[0]
        });

        let xAxis2 = new Rickshaw.Graph.Axis.X( {
          graph: graph2,
          orientation: 'bottom',
          element: $('#canvas-svg2').find('.x_axis')[0],
          pixelsPerTick: 100,
          tickFormat: format
        } );
        yAxis2.render();
        xAxis2.render();

        axes2.render();

        let xAxisBBox2 = d3.select("#canvas-svg2")
        .select(".x_axis")
        .select('g.x_ticks_d3').node().getBBox();

        d3.select("#canvas-svg2").select(".x_axis").append("div")
        .attr("class", "xAxisLabel")
        .style("width", (xAxisBBox.width - 10) + "px")
        .style("top", (25) + "px")
        .text(config.xAxisLabel);

        d3.select("#canvas-svg2").select(".y_axis").append("div")
        .attr("class", "yAxisLabel")
        .style("left", (-10) + "px")
        .style("top", (-15) + "px")
        .html(config.yAxisLabel);

        // fix x_axis svg width
        let x_axis_svg2 = d3.select("#canvas-svg2").select(".x_axis").select("svg");
        x_axis_svg2.attr("width", x_axis_svg2.select("g.x_ticks_d3").node().getBBox().width + 40);

        // fix up title
        $("#canvas-svg2 .title").width($("#canvas-svg2 .chart_container2").width());
      }

      if (this.props.watchlists) {
        watchlists = this.props.watchlists.map((watchlist, idx) => {
          return (
            <button key={idx} onClick={ this.addToWatchlist(watchlist) }>
              <div className='index-dropdown-title' >{watchlist.title}</div>
            </button>
          );
        });
      }


      if (this.state.news.length) {
        newsContent = this.state.news.map((news, idx) => {
          return (
            <div key={ idx } className="news-content">
              <div className="news-summary">
                <a href={ news.url }>{ news.summary }</a>
              </div>
              <div className="news-date">
                { this.timeSince(news.publication_date) } ago
              </div>
            </div>);
        });
      }
    }
    let change;
    if (percentChange) {
      if (percentChange[0] === "-") {
        change = "portfolio-red";
      } else { change = "portfolio-green"; }
    }

    return (
      <div className="company-content">
        <div className="company-info">
          <div className="company-header">
            <div className="company-name-price">
              <span className="company-title">{ title } { ticker }</span>
              <span className="company-price">${ price } <span className={change}>({ percentChange })</span></span>
            </div>
            <div className="watchlist-button">
              <div className='watchlist-dropdown'>
                <span>Add to Watchlist</span>
                <div className="dropdown-content">
                  { watchlists }
                </div>
              </div>
            </div>
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
              <p>Day's Range</p>
              <p className='value'>${ daysLow } - { daysHigh }</p>
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
              <p>Volume</p>
              <p className='value'>{ volume }</p>
            </div>
            <div className="company-nums">
              <p>Daily Avg. Volume</p>
              <p className='value'>{ avgVolume }</p>
            </div>
            <div className="company-nums">
              <p>Dividend per Share</p>
              <p className='value'>${ dividendShare }</p>
            </div>
            <div className="company-nums">
              <p>Dividend Yield</p>
              <p className='value'>{ dividend }%</p>
            </div>
            <div className="company-nums">
              <p>Trailing EBITDA</p>
              <p className='value'>${ ebitda }</p>
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
            <br/>
          </div>
          <div className = "company-graphs">
            <div id="canvas-svg2">
              <div className="title">Title</div>
              <div className="chart_container2"></div>
            </div>
            <div id="canvas-svg">
              <div className="title">Title</div>
              <div className="chart_container"></div>
            </div>
          </div>
          <div className="company-news">
            <div className="news-header">
              Company News
            </div><br/>
            <div className="company-news-summary">
              { newsContent }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Company;

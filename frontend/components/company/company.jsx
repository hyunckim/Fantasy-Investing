import React from 'react';
import { merge } from  'lodash';
import { username, password } from '../../intrio_account';

class Company extends React.Component {

  constructor(props) {
    super(props);
    this.state = {news : ""};
    this.data = {};
  }

  componentDidMount() {
    this.props.fetchPortfolios();
    this.fetchData(this.props.ticker);
    this.receiveNews(this.props.ticker);
  }

  componentWillReceiveProps(nextProps) {
    if ( this.props.params.ticker !== nextProps.params.ticker ) {
      this.fetchData(nextProps.ticker);
      this.receiveNews(nextProps.ticker);
    }
  }

  fetchData(ticker, index = 0) {
    let items = "name,last_price,change,adj_high_price,adj_low_price,52_week_high,52_week_low,adj_volume,average_daily_volume,marketcap,adj_open_price,forward_dividend_rate,forward_dividend_yield,ebitda,totalrevenue,dilutedeps,pricetonextyearearnings,pricetonextyearrevenue,evtoebitda,pricetobook";
    let today = new Date();
    let endDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    let yearAgo = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
    let startDate = `${yearAgo.getFullYear()}-${yearAgo.getMonth() + 1}-${yearAgo.getDate()}`;

    $.ajax({
        type: "GET",
        url: `https://api.intrinio.com/data_point?identifier=${ticker}&item=${items}`,
        dataType: 'json',
        headers: {
          "Authorization": "Basic " + btoa(username[index] + ":" + password[index])
        },
        success: (res) => {
          if (res.missing_access_codes) {
            this.fetchData(ticker, index + 1);
          } else {
            this.handleCompanyData(res);
          }
        }
    });

    $.ajax({
        type: "GET",
        url: `https://api.intrinio.com/historical_data?identifier=${ticker}&item=adj_close_price&start_date=${startDate}&end_date=${endDate}&page_size=350`,
        dataType: 'json',
        headers: {
          "Authorization": "Basic " + btoa(username[index] + ":" + password[index])
        },
        success: (res) => {
          if (res.missing_access_codes) {
            this.fetchData(ticker, index + 1);
          } else {
            this.handlePriceData(res);
          }
        }
    });
  }

  handleCompanyData(data) {
    for (let i = 0; i < data.data.length; i++) {
      let ticker = data.data[i].identifier;
      if (!this.data[ticker]) {
        this.data[ticker] = {};
      }
      this.data[ticker][data.data[i].item] = data.data[i].value;
    }
    this.setState({data:true});
  }

  handlePriceData(data) {
    this.data['historical'] = data.data;
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

  receiveNews(ticker, index = 0) {
    $.ajax({
      type: "GET",
      url: `https://api.intrinio.com/news?ticker=${ticker}`,
      dataType: 'json',
      headers: {
        "Authorization": "Basic " + btoa(username[index] + ":" + password[index])
      },
      success: (res) => {
        if (res.missing_access_codes) {
          this.receiveNews(ticker, index + 1);
        } else {
          this.setState({ news: res.data.slice(0, 10) });
        }
      },
      error: (res) => {
        this.receiveNews(ticker, index + 1);
      }
    });
  }

  timeSince(date) {

      let seconds = Math.floor((new Date() - new Date(date)) / 1000);

      let interval = Math.floor(seconds / 31536000);

      if (interval > 1) {
        return interval + " years";
      }
      if (interval === 1) {
        return interval + " year";
      }
      interval = Math.floor(seconds / 2592000);
      if (interval > 1) {
        return interval + " months";
      }
      if (interval === 1) {
        return interval + " month";
      }
      interval = Math.floor(seconds / 86400);
      if (interval > 1) {
        return interval + " days";
      }
      interval = Math.floor(seconds / 86400);
      if (interval === 1) {
        return interval + " day";
      }
      interval = Math.floor(seconds / 3600);
      if (interval > 1) {
        return interval + " hours";
      }
      if (interval === 1) {
        return interval + " hour";
      }
      interval = Math.floor(seconds / 60);
      if (interval > 1) {
        return interval + " minutes";
      }
      if (interval === 1) {
        return interval + " minute";
      }
      return Math.floor(seconds) + " seconds";
    }

  render() {
    let title;
    let price;
    let priceChange;
    let percentChange;
    let ticker;
    let volume;
    let prevClose;
    let dividendYield;
    let pastYearInfo;
    let sample;
    let open;
    let fiftytwoWeekHigh;
    let fiftytwoWeekLow;
    let marketCap;
    let dividendShare;
    let ebitda;
    let eps;
    let avgVolume;
    let forwardPE;
    let pricePerSale;
    let pricePerBook;
    let newsContent;
    let watchlists;
    let daysLow;
    let daysHigh;
    let evToEbitda;
    let revenue;

    if (this.data[this.props.ticker] ) {
      title = this.data[this.props.ticker]['name'];
      price = (Math.round(this.data[this.props.ticker]['last_price'] * 100) / 100).toFixed(2);
      priceChange = (this.data[this.props.ticker]['change']).toFixed(2);
      percentChange = Math.round(this.data[this.props.ticker]['change'] /
        (this.data[this.props.ticker]['last_price'] -
        this.data[this.props.ticker]['change']) * 10000) / 100;
      ticker = this.props.ticker;
      volume = this.numberWithCommas(Math.round(this.data[this.props.ticker]['adj_volume']));
      prevClose = (Math.round((this.data[this.props.ticker]['last_price'] - this.data[this.props.ticker]['change']) * 100) / 100).toFixed(2);
      dividendYield = (Math.round(this.data[this.props.ticker]['forward_dividend_yield']* 1000) / 10).toFixed(2);
      open = (Math.round(this.data[this.props.ticker]['adj_open_price'] * 100) / 100).toFixed(2);
      fiftytwoWeekHigh = (Math.round(this.data[this.props.ticker]['52_week_high'] * 100) / 100).toFixed(2);
      fiftytwoWeekLow = (Math.round(this.data[this.props.ticker]['52_week_low'] * 100) / 100).toFixed(2);
      marketCap = (this.data[this.props.ticker]['marketcap'] / 1000000000).toFixed(1);
      dividendShare = (this.data[this.props.ticker]['forward_dividend_rate']).toFixed(2);
      revenue = (this.data[this.props.ticker]['totalrevenue'] / 1000000000).toFixed(1);
      ebitda = (this.data[this.props.ticker]['ebitda'] / 1000000000).toFixed(1);
      eps = (this.data[this.props.ticker]['dilutedeps']).toFixed(2);
      avgVolume = this.numberWithCommas(Math.round(this.data[this.props.ticker]['average_daily_volume']));
      forwardPE = (Math.round(this.data[this.props.ticker]['pricetonextyearearnings'] * 10) / 10).toFixed(1);
      pricePerSale = (Math.round(this.data[this.props.ticker]['pricetonextyearrevenue'] * 10) / 10).toFixed(1);
      pricePerBook = (Math.round(this.data[this.props.ticker]['pricetobook'] * 10) / 10).toFixed(1);
      evToEbitda = (Math.round(this.data[this.props.ticker]['evtoebitda'] * 10) / 10).toFixed(1);
      daysLow = (Math.round(this.data[this.props.ticker]['adj_low_price'] * 100) / 100).toFixed(2);
      daysHigh = (Math.round(this.data[this.props.ticker]['adj_high_price'] * 100) / 100).toFixed(2);
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

      let data = this.data['historical'];
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
      if (data) {
        for (let i = 0; i < data.length; i++) {
          seriesDataMap.data.push({x: count, y: (Math.round(data[data.length-1-i].value * 100) / 100) });
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

        // adjust height
        if (config.title !== '') {
          $("#canvas-svg .title").show();
          $("#canvas-svg .title").html(config.title);
          height -= $("#canvas-svg .title").height();
        }

        function yFormat(n) {
          if (yAxisType === "$") {
             return Rickshaw.Fixtures.Number.formatKMBT(n);
           } else {
             return Rickshaw.Fixtures.Number.formatKMBT(n);
           }
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
          };

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
        .style("left", (5) + "px")
        .style("top", (-5) + "px")
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
        .style("left", (0) + "px")
        .style("top", (0) + "px")
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
              <div className="news-title">
                <a href={ news.url }>{ news.title }</a>
              </div>
              <div className="news-date">
                { this.timeSince(news.publication_date) } ago
              </div>
            </div>);
        });
      }
    }

    let change;
    let value;
    if (percentChange || percentChange === 0) {
      if (percentChange < 0) {
        change = "portfolio-red";
      } else { change = "portfolio-green";}
      if (change === 'portfolio-red') {
        value = (
          <span className="company-price">${ price } <span className={change}>${priceChange}  ({ percentChange })%</span></span>
        );
      } else {
        value = (
          <span className="company-price">${ price } <span className={change}>$+{priceChange}  ({ percentChange })%</span></span>
        );
      }
    }






    let watchlistDropdown = (<div></div>);
    if (watchlists && watchlists.length > 0) {
      watchlistDropdown = (
        <div className="watchlist-button">
          <div className='watchlist-dropdown'>
            <span>Add to Watchlist</span>
            <div className="dropdown-content">
              { watchlists }
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="company-content">
        <div className="company-info">
          <div className="company-header">
            <div className="company-name-price">
              <span className="company-title">{ title } { ticker }</span>
              { value }
            </div>
            {watchlistDropdown}
          </div>
        </div>
        <div className="company-summary">
        <div className="company-detail-tables">
          <div className="company-detail">
            <div className='company-nums-title'>
              <p>Company Financials</p>
            </div>
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
              <p className='value'>${ marketCap }Bn</p>
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
              <p className='value'>{ dividendYield }%</p>
            </div>
            <div className="company-nums">
              <p>Trailing EBITDA</p>
              <p className='value'>${ ebitda }Bn</p>
            </div>
            <div className="company-nums">
              <p>Revenue</p>
              <p className='value'>${ revenue }Bn</p>
            </div>
          </div>
          <div className="company-detail">
            <div className='company-nums-title'>
              <p>Financial Ratios</p>
            </div>
            <div className="company-nums">
              <p>Forward P/E</p>
              <p className='value'>{ forwardPE }x</p>
            </div>
            <div className="company-nums">
              <p>EV/EBITDA</p>
              <p className='value'>{ evToEbitda }x</p>
            </div>
            <div className="company-nums">
              <p>Price / Sales</p>
              <p className='value'>{ pricePerSale }x</p>
            </div>
            <div className="company-nums">
              <p>Price / Book</p>
              <p className='value'>{ pricePerBook }x</p>
            </div>
          </div>
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
            </div>
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

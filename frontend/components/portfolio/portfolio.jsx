import React from 'react';
import { fetchStockPrice } from '../../util/stock_api_util';
import {Link} from 'react-router';
import PortfolioModal from './portfolio_modal.jsx';
import PortfolioFormContainer from './portfolio_form_container';
import { username, password } from '../../intrio_account';

class Portfolio extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          currentPortfolio: this.props.portfolio[0],
          data: false,
          news: ""
      };
      this.data = {};
      this.handleClick = this.handleClick.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
      this.handleData = this.handleData.bind(this);
      this.handleCompanyData = this.handleCompanyData.bind(this);
      this.positionsPieChart = this.positionsPieChart.bind(this);
      this.receiveNews = this.receiveNews.bind(this);
      this.timeSince = this.timeSince.bind(this);
    }

    componentDidMount() {
      let stockTicker = [];
      this.props.fetchPortfolios().then(portfolios => {
        this.handleData(portfolios);
        let newsStock = [];
        for (let i = 0; i < portfolios.portfolios[0].stocks.length; i++) {
          newsStock.push(portfolios.portfolios[0].stocks[i].ticker);
        }
        if (newsStock.length > 0) {
          this.receiveNews(newsStock.join(','));
        }
      });
    }

    componentWillReceiveProps(nextProps) {
      debugger;
      if (nextProps.portfolio.length === this.props.portfolio.length) {
        for (let i = 0; i < nextProps.portfolio.length; i++) {
          if (nextProps.portfolio[i].stocks.length > this.props.portfolio[i].stocks.length) {
            var newStock = nextProps.portfolio[i].stocks[nextProps.portfolio[i].stocks.length - 1].ticker;
            var portfolioType = nextProps.portfolio[i].main;
            let items = 'last_price,change,name';
            if (!portfolioType) {
              items += ',adj_high_price,adj_low_price,52_week_high,52_week_low,adj_volume,average_daily_volume,marketcap,industry_group';
            }
            this.fetchData(newStock, items);
            break;
          }
        }
      }
    }

    handleData(portfolios, index = 0) {

      let mainTickers = ``;
      let watchlistTickers = ``;
      for (let i = 0; i < portfolios.portfolios.length; i++) {
        for (let j = 0; j < portfolios.portfolios[i].stocks.length; j++) {
          if (portfolios.portfolios[i].main === true) {
            mainTickers += `${portfolios.portfolios[i].stocks[j].ticker},`;
          } else {
            watchlistTickers += `${portfolios.portfolios[i].stocks[j].ticker},`;
          }
        }
      }
      mainTickers = mainTickers.slice(0,-1);
      watchlistTickers = watchlistTickers.slice(0,-1);
      let indexTickers = '$SPX,$DJI,$RUT';
      let etfTickers = "SPY,DIA,IWM";
      let priceData = [];

      if (mainTickers.length > 0) {
        this.fetchData(mainTickers, 'name,last_price,change');
      }
      if (watchlistTickers.length > 0) {
        this.fetchData(watchlistTickers, 'name,last_price,change,adj_high_price,adj_low_price,52_week_high,52_week_low,adj_volume,average_daily_volume,marketcap,industry_group');
      }
      this.fetchData(indexTickers, 'close_price');
      this.fetchData(etfTickers, 'percent_change');
    }

    fetchData(tickers, items, index = 0) {

      $.ajax({
          type: "GET",
          url: `https://api.intrinio.com/data_point?identifier=${tickers}&item=${items}`,
          dataType: 'json',
          headers: {
            "Authorization": "Basic " + btoa(username[index] + ":" + password[index])
          },
          success: (res) => {
            if (res.missing_access_codes) {
              this.fetchData(tickers, items, index + 1);
            } else {
              this.handleCompanyData(res);
            }
          }
      });
    }

    receiveNews(ticker, index = 0) {

      $.ajax({
        type: "GET",
        url: `https://api.intrinio.com/news?ticker=${ticker}&page_size=20`,
        dataType: 'json',
        headers: {
          "Authorization": "Basic " + btoa(username[index] + ":" + password[index])
        },
        success: (res) => {
          if (res.missing_access_codes) {
            this.receiveNews(ticker, index + 1);
          } else {
            this.setState({ news: res.data});
          }
        },
        error: (res) => {
          this.receiveNews(ticker, index + 1);
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

    componentWillMount() {
      this.props.fetchPortfolios();
    }

    handleClick(event){
        this.setState({ currentPortfolio: event });
    }

    handleDelete(e){
        this.props.deletePortfolio({id: e.id});
        let main;
        for (let i = 0; i < this.props.portfolio.length; i++) {
          if (this.props.portfolio[i].main === true) {
            main = this.props.portfolio[i];
            break;
          }
        }
        this.setState({ currentPortfolio: main});
    }

    weekLineChart(){
      google.charts.load('current', {packages: ['corechart', 'line']});
      google.charts.setOnLoadCallback(drawLineColors);

      function drawLineColors() {
        let data = new google.visualization.DataTable();
        data.addColumn('number', 'X');
        data.addColumn('number', 'Cats');

        data.addRows([
          [0, 0, 0],    [1, 10, 5],   [2, 23, 15],  [3, 17, 9],   [4, 18, 10],  [5, 9, 5],
          [6, 11, 3],   [7, 27, 19],  [8, 33, 25],  [9, 40, 32],  [10, 32, 24], [11, 35, 27],
          [12, 30, 22], [13, 40, 32], [14, 42, 34], [15, 47, 39], [16, 44, 36], [17, 48, 40],
          [18, 52, 44], [19, 54, 46], [20, 42, 34], [21, 55, 47], [22, 56, 48], [23, 57, 49],
          [24, 60, 52], [25, 50, 42], [26, 52, 44], [27, 51, 43], [28, 49, 41], [29, 53, 45],
          [30, 55, 47], [31, 60, 52], [32, 61, 53], [33, 59, 51], [34, 62, 54], [35, 65, 57],
          [36, 62, 54], [37, 58, 50], [38, 55, 47], [39, 61, 53], [40, 64, 56], [41, 65, 57],
          [42, 63, 55], [43, 66, 58], [44, 67, 59], [45, 69, 61], [46, 69, 61], [47, 70, 62],
          [48, 72, 64], [49, 68, 60], [50, 66, 58], [51, 65, 57], [52, 67, 59], [53, 70, 62],
          [54, 71, 63], [55, 72, 64], [56, 73, 65], [57, 75, 67], [58, 70, 62], [59, 68, 60],
          [60, 64, 56], [61, 60, 52], [62, 65, 57], [63, 67, 59], [64, 68, 60], [65, 69, 61],
          [66, 70, 62], [67, 72, 64], [68, 75, 67], [69, 80, 72]
        ]);

        var options = {
          hAxis: {
            title: 'Time'
          },
          vAxis: {
            title: 'Popularity'
          },
          colors: ['#a52714', '#097138']
        };

        var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    }
    }
    portfolioPieChart(equity, cash) {
      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {

        let data = google.visualization.arrayToDataTable([
          ['Type', 'Amount'],
          ['Equity', equity],
          ['Cash', cash]
        ]);

        let options = {
            title: 'Portfolio Breakdown',
            colors: ['#c1432e', '#ce9e62', '#4b6777' ],
            pieHole: 0.5,
            width: 200,
            height: 200,
            backgroundColor: '#FFF',
            titleTextStyle: {
                fontName: "Helvetica",
                fontSize: 16,
                color: '#676a6c'
            },
            chartArea: {'width': '80%', 'height': '80%'},
            legend: {
                position: 'bottom',
                textStyle: {
                    color: '#676a6c',
                    fontSize: 12
                },
            }
        };
        if (document.getElementById('piechart')) {
          let chart = new google.visualization.PieChart(document.getElementById('piechart'));
          // delete data.gvjs_S.qg[1];
          chart.draw(data, options);
        }
      }
    }

    positionsPieChart(stocks) {
      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {

        let data = google.visualization.arrayToDataTable([]);

        data.addColumn('string', "Company");
        data.addColumn('number', "Value");
        let positionsArray = [];
        for (let i = 0; i < stocks.length; i++) {
          data.addRow([stocks[i][0], stocks[i][1]]);
        }

        let options = {
            title: 'Investments Breakdown',
            colors: ['#c1432e', '#ce9e62', '#4b6777', "#AD1457", "#AB47BC",
              "#90CAF9", "#6D4C41", "#9E9E9E", "#00838F", "#9CCC65", "#A1887F",
              "#616161", "#EF9A9A", "#004D40", "#CDDC39", "#FB8C00", "#263238"],
            pieHole: 0.5,
            width: 200,
            height: 200,
            backgroundColor: '#FFF',
            titleTextStyle: {
                fontName: "Helvetica",
                fontSize: 16,
                color: '#676a6c'
            },
            chartArea: {'width': '100%', 'height': '80%'},
            legend: {
                position: 'bottom',
                textStyle: {
                    color: '#676a6c',
                    fontSize: 12
                },
            }
        };
        if (document.getElementById('positions-piechart')) {
          let chart = new google.visualization.PieChart(document.getElementById('positions-piechart'));
          chart.draw(data, options);
        }
      }
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


    numberWithCommas (num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }

    render() {

      let indexHtml = (<div></div>);
      if (this.data['$SPX']) {
        let spyPrev = this.numberWithCommas(Math.round(this.data["$SPX"]['close_price'] * 100) / 100);
        let djiPrev = this.numberWithCommas(Math.round(this.data["$DJI"]['close_price'] * 100) / 100);
        let rusPrev = this.numberWithCommas(Math.round(this.data["$RUT"]['close_price'] * 100) / 100);
        let spyPercent = (Math.round(this.data["SPY"]['percent_change']
          * 10000) / 100).toFixed(2);
        let djiPercent = (Math.round(this.data["DIA"]['percent_change']
          * 10000) / 100).toFixed(2);
        let rusPercent = (Math.round(this.data["IWM"]['percent_change']
          * 10000) / 100).toFixed(2);
        let spyLast = this.numberWithCommas(Math.round(this.data["$SPX"]['close_price']
          * (1 + this.data["SPY"]['percent_change']) * 100) / 100);
        let djiLast = this.numberWithCommas(Math.round(this.data["$DJI"]['close_price']
          * (1 + this.data["DIA"]['percent_change']) * 100) / 100);
        let rusLast = this.numberWithCommas(Math.round(this.data["$RUT"]['close_price']
          * (1 + this.data["IWM"]['percent_change']) * 100) / 100);
        let spyChange = Math.round(this.data["$SPX"]['close_price'] *
          this.data["SPY"]['percent_change'] * 100) / 100;
        let djiChange = Math.round(this.data["$DJI"]['close_price'] *
          this.data["DIA"]['percent_change'] * 100) / 100;
        let rusChange = Math.round(this.data["$RUT"]['close_price'] *
          this.data["IWM"]['percent_change'] * 100) / 100;

        let spyClass = spyPercent < 0 ? "red" : "green";
        let djiClass = djiPercent < 0 ? "red" : "green";
        let rusClass = rusPercent < 0 ? "red" : "green";

        indexHtml = (
          <div className="indices-container">
            <div className="market-index">
              <p>S&P 500</p>
              <p>${spyLast}</p>
              <p className={spyClass}>{spyChange} {spyPercent}%</p>
            </div>
            <div className="market-index">
              <p>Dow Jones</p>
                <p>${djiLast}</p>
                <p className={djiClass}> {djiChange} {djiPercent}%</p>
            </div>
            <div className="market-index">
              <p>Russell 2000</p>
              <p>${rusLast}</p>
              <p className={rusClass}>{rusChange} {rusPercent}%</p>
            </div>
          </div>
        );
      }


        let portfolioTable;
        let portfolioIndex = [];
        debugger;
        let mainPortfolio = this.state.currentPortfolio;
        for (let i = 0; i < this.props.portfolio.length; i++) {
            if (this.props.portfolio[i].main === true && mainPortfolio === undefined) {
                mainPortfolio = this.props.portfolio[i];
            }
        }
        if (this.props.portfolio.length > 0) {
            portfolioIndex = this.props.portfolio.map((portfolio, idx) => {
                return (
                    <button key={idx} onClick={() => this.handleClick(portfolio)}>
                        <div className='index-dropdown-title' >{portfolio.title}</div>
                    </button>
                );
            });
        }

        if (mainPortfolio && mainPortfolio.main) {
          let percentChange;
          let totalPercentChange;
          let stocks = mainPortfolio.stocks.map((stock, idx) => {
            if (this.data[stock.ticker]) {
              percentChange = (this.data[stock.ticker]['change'] /
                (this.data[stock.ticker]['last_price'] -
                this.data[stock.ticker]['change']) * 100).toFixed(1);
              totalPercentChange = (((this.data[stock.ticker]['last_price'] - stock.purchase_price) /
                  stock.purchase_price) * 100).toFixed(1);
              if (totalPercentChange === "-0.0") {
                totalPercentChange = "0.0";
              }
              return (

              <tr key={idx} className='lalign'>

                <td><Link to={`company/${stock.ticker}`}>{ stock.ticker }</Link></td>
                <td>{ this.data[stock.ticker]['name'] }</td>
                <td>{ stock.number_of_shares }</td>
                <td>${ Math.round(this.data[stock.ticker]['last_price'] * 100) / 100 } </td>
                <td>{ percentChange }% </td>
                <td>${ this.numberWithCommas(Math.round(this.data[stock.ticker]['last_price'] * stock.number_of_shares))}</td>
                <td>${ stock.purchase_price.toFixed(2) }</td>
                <td>${ this.numberWithCommas(stock.purchase_price * stock.number_of_shares.toFixed(2)) }</td>
                <td>${ this.numberWithCommas(Math.round((this.data[stock.ticker]['last_price'] - stock.purchase_price) * stock.number_of_shares))}</td>
                <td>{ totalPercentChange }% </td>
                </tr>);
            }
          });

          if (this.props.currentUser) {
            var totalValue = this.props.currentUser.investor.balance;

            var unrealizedGain = 0;
            let initialValue = 0;
            let costBasis = 0;
            let prevDayValue = 0;

            for (let i = 0; i < mainPortfolio.stocks.length; i++) {
              let stock = mainPortfolio.stocks[i];
              if (this.data[stock.ticker]) {
                totalValue += (this.data[stock.ticker]['last_price'] * stock.number_of_shares);
                initialValue += (stock.purchase_price * stock.number_of_shares);
                prevDayValue += ((this.data[stock.ticker]['last_price'] - this.data[stock.ticker]['change'])
                * stock.number_of_shares);
              }
            }
            prevDayValue += this.props.currentUser.investor.balance;
            unrealizedGain = totalValue - initialValue - this.props.currentUser.investor.balance;
            var percentageChange;
            if (initialValue === 0) {
              percentageChange = 0;
            } else {
              percentageChange = (unrealizedGain / initialValue) * 100;
            }
            let totalDailyChange = ((totalValue  - prevDayValue) / prevDayValue * 100).toFixed(1);
            if (totalDailyChange === "-0.0") {
              totalDailyChange = "0.0";
            }
            if (percentageChange < 0 && percentageChange > -0.1) {
              percentageChange = 0;
            }
            portfolioTable =
                <table id='portfolioTable'>
                    <thead>
                        <tr>
                            <th><span>Symbol</span></th>
                            <th><span>Title</span></th>
                            <th><span>Quantity</span></th>
                            <th><span>Price</span></th>
                            <th><span>Daily Change</span></th>
                            <th><span>Value</span></th>
                            <th><span>Purchase Price</span></th>
                            <th><span>Cost Basis</span></th>
                            <th><span>Unrealized Gain / Loss</span></th>
                            <th><span>% Change</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {stocks}
                        <tr>
                          <td>Cash</td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td>${this.numberWithCommas(Math.round(this.props.currentUser.investor.balance))}</td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr id="total-row">
                          <td>Total</td>
                          <td ></td>
                          <td></td>
                          <td></td>
                          <td>{totalDailyChange}%</td>
                          <td>${this.numberWithCommas(Math.round(totalValue))}</td>
                          <td></td>
                          <td></td>
                          <td>${this.numberWithCommas(Math.round(unrealizedGain))}</td>
                          <td>{percentageChange.toFixed(1)}%</td>
                        </tr>
                    </tbody>
                </table>;
          }

        }
        let value = (<p></p>);
        let className = 'portfolio-green';
        if (mainPortfolio && mainPortfolio.main) {
          if (percentageChange < 0) {
            className = 'portfolio-red';
          }
          if ((percentageChange || percentageChange === 0) && className === 'portfolio-red') {
            value = (
              <div className='portfolio-performance'>
                <p className='total-value'>${this.numberWithCommas(Math.round(totalValue))}</p>
                <p className={className} id="portfolio-change"  >  <span>${this.numberWithCommas(Math.round(unrealizedGain))}</span>   ({percentageChange.toFixed(1)}%)</p>
              </div>
              );
          } else if((percentageChange || percentageChange === 0) && className === 'portfolio-green') {
            value = (
              <div className='portfolio-performance'>
                <p className='total-value'>${this.numberWithCommas(Math.round(totalValue))}</p>
                <p className={className} id="portfolio-change">  <span>+${this.numberWithCommas(Math.round(unrealizedGain))}</span>   ({percentageChange.toFixed(1)}%)</p>
              </div>
              );
          }

        } else if (mainPortfolio && mainPortfolio.main === false && Object.keys(this.data).length > 0) {
          let stocks = mainPortfolio.stocks.map((stock, idx) => {
            let percentChange = (this.data[stock.ticker]['change'] /
              (this.data[stock.ticker]['last_price'] -
              this.data[stock.ticker]['change']) * 100).toFixed(1);

            return (

            <tr key={idx} className='lalign'>

              <td><Link to={`company/${stock.ticker}`}>{ stock.ticker }</Link></td>
              <td>{ this.data[stock.ticker]['name'] }</td>
              <td>${ Math.round(this.data[stock.ticker]['last_price'] * 100) / 100} </td>
              <td>{ this.data[stock.ticker]['change'] }</td>
              <td>{percentChange}%</td>
              <td>{ this.data[stock.ticker]['industry_group'] }</td>
              <td>{this.numberWithCommas(Math.round(this.data[stock.ticker]['adj_volume']))}</td>
              <td>{ this.numberWithCommas(Math.round(this.data[stock.ticker]['average_daily_volume'])) }</td>
              <td>${this.data[stock.ticker]['adj_low_price']} - {this.data[stock.ticker]['adj_high_price']}</td>
              <td>${this.data[stock.ticker]['52_week_low']} - {this.data[stock.ticker]['52_week_high']}</td>
              <td>${ (this.data[stock.ticker]['marketcap'] / 1000000000).toFixed(1)}B</td>
            </tr>);
          });

          portfolioTable = (<table id='portfolioTable'>
              <thead>
                  <tr>
                      <th><span>Symbol</span></th>
                      <th><span>Title</span></th>
                      <th><span>Price</span></th>
                      <th><span>Change</span></th>
                      <th><span>Daily Change</span></th>
                      <th><span>Sector</span></th>
                      <th><span>Volume</span></th>
                      <th><span>Avg Volume</span></th>
                      <th><span>Day Range</span></th>
                      <th><span>52-week Range</span></th>
                      <th><span>Market Cap</span></th>
                  </tr>
              </thead>
              <tbody>
                  {stocks}
              </tbody>
          </table>);
        } else {
          portfolioTable = (<table id='portfolioTable'>
              <thead>
                  <tr>
                      <th><span>Symbol</span></th>
                      <th><span>Title</span></th>
                      <th><span>Price</span></th>
                      <th><span>Change</span></th>
                      <th><span>Daily Change</span></th>
                      <th><span>Sector</span></th>
                      <th><span>Volume</span></th>
                      <th><span>Avg Volume</span></th>
                      <th><span>Day Range</span></th>
                      <th><span>52-week Range</span></th>
                      <th><span>Market Cap</span></th>
                  </tr>
              </thead>
              <tbody>
              </tbody>
          </table>);
        }


        let deleteButton = (<div></div>);
        if (mainPortfolio && !mainPortfolio.main) {
          deleteButton = (<button className = 'delete-button'
            onClick={() => this.handleDelete(mainPortfolio)}>Delete Portfolio</button>);
        }
          let newsContent;
          let newsHeader;
          if (this.state.news.length) {
            if ($('#news-scroll-header').find('.news')) {
              $('#news-scroll-header').empty();
            }
            newsContent = this.state.news.map((news, idx) => {
              return (
                <div key={ idx } className="news-content-item">
                  <div className="news-title">
                    <a href={ news.url }>{ news.title }</a>
                  </div>
                  <div className="news-summary">
                    <a href={ news.url }>{ news.summary}...</a>
                  </div>
                  <div className="news-date">
                    { this.timeSince(news.publication_date) } ago
                  </div>
                </div>
                );
            }).slice(0, 10);
            let elements = $();
            this.state.news.forEach((news , idx) => {
                elements = elements.add(`<a href=${ news.url } class='news' key=${idx}>${news.title} <div>${this.timeSince(news.publication_date)} ago</div></a>`);
            });
            $('#news-scroll-header').append(elements);
            $('#news-scroll-header').marquee({duration: 15000, duplicate: true});
          }

        if (this.props.currentUser && mainPortfolio) {

          if ($('#positions-piechart')) {
            $('#piechart').remove();
            $('#positions-piechart').remove();
          }

            if (mainPortfolio.stocks.length > 0 && mainPortfolio.main) {
              let stocks = [];
              for (let i = 0; i < mainPortfolio.stocks.length; i++) {
                let ticker = mainPortfolio.stocks[i].ticker;
                if (this.data[ticker]) {
                  stocks.push([ticker, this.data[ticker]['last_price'] * mainPortfolio.stocks[i].number_of_shares]);
                }
              }
              $('.piechart-container').append('<div id="positions-piechart"></div>');
               $('#positions-piechart').append(this.positionsPieChart(stocks));
            }
            if (mainPortfolio.main) {
                $('.piechart-container').append('<div id="piechart"></div>');
                $('#piechart').append(this.portfolioPieChart(totalValue - this.props.currentUser.investor.balance,this.props.currentUser.investor.balance));
            }
            debugger
            return (
              <div className='main-portfolio-index'>
                <ul id='news-scroll-header'></ul>
                <div className="portfolio-header">
                  <div className='portfolio-title'>
                    <div className='greeting'>Welcome {this.props.currentUser.username}</div>
                    <div className='current-portfolio-title'>
                      <span>{mainPortfolio.title}</span>
                    </div>
                    <div>
                      { indexHtml }
                    </div>

                  </div>
                  <div className='portfolio-mid'>
                    <div className='mid-header'>
                      { value }
                      <div className='portfolio-buttons'>
                        <div className='dropdown'>
                          <span>Portfolio List</span>
                          <div className="dropdown-content">
                            {portfolioIndex}
                            <PortfolioModal/>
                          </div>
                        </div>
                        {deleteButton}
                      </div>
                    </div>
                     <div className='portfolio-table'>
                        {portfolioTable}
                      </div>
                  </div>
                  <div className='piechart-container'></div>


                </div>

                <div className='news-content'>
                  <div className='news-content-title'>
                    <span> Recent Fantasy Investing New </span>
                  </div>
                  {newsContent}
                </div>
              </div>
            );
        } else {
            return (
                <div></div>
            );
        }
    }
}

export default Portfolio;

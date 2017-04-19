import React from 'react';
import { fetchStockPrice } from '../../util/stock_api_util';
import {Link} from 'react-router';
import PortfolioModal from './portfolio_modal.jsx';
import PortfolioFormContainer from './portfolio_form_container';


class Portfolio extends React.Component {
    constructor(props) {
      super(props);
        this.state = {
            currentPortfolio: undefined,
            data: false
        };
        this.data = {};
        this.handleClick = this.handleClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleData = this.handleData.bind(this);
        this.handleCompanyData = this.handleCompanyData.bind(this);
    }

    componentDidMount() {
      let stockTicker = [];
      this.props.fetchPortfolios().then(portfolios => this.handleData(portfolios));
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
      let mainTickersArray = mainTickers.split(",");
      let watchlistTickersArray = watchlistTickers.split(",");
      let priceData = [];

      let username = ["d6166222f6cd23d2214f20c0de1d4cc3", "0f51c94416c5a029ced069c9c445bcf4"];
      let password = ["6fbb48d898d18930d6fc1e2d4e1bd54b", "dfb23653432156bdbf868393255d9f3d"];

      $.ajax({
          type: "GET",
          url: `https://api.intrinio.com/data_point?identifier=${mainTickers}&item=${'last_price,change'}`,
          dataType: 'json',
          headers: {
            "Authorization": "Basic " + btoa(username[index] + ":" + password[index])
          },
          success: (res) => {
            if (res.missing_access_codes) {
              this.handleData(portfolios, index + 1);
            } else {
              this.handleCompanyData(res);
            }
          }
        });

      $.ajax({
          type: "GET",
          url: `https://api.intrinio.com/data_point?identifier=${watchlistTickers}&item=${'last_price,change,adj_high_price,adj_low_price,52_week_high,52_week_low,adj_volume,average_daily_volume,marketcap,industry_group'}`,
          dataType: 'json',
          headers: {
            "Authorization": "Basic " + btoa(username[index] + ":" + password[index])
          },
          success: (res) => {
            if (res.missing_access_codes) {
              this.handleData(portfolios, index + 1);
            } else {
              this.handleCompanyData(res);
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
            is3D: true,
            backgroundColor: '#2c2c2c',
            titleTextStyle: {
                fontName: "Helvetica",
                fontSize: 30,
                color: '#F5F1F2'
            },
            legend: {
                textStyle: {
                    color: '#F5F1F2',
                    fontSize: 16
                }
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
          data.addRow([stocks[i].ticker, stocks[i].number_of_shares * stocks[i].current_price]);
        }

        let options = {
            title: 'Investments Breakdown',
            colors: ['#c1432e', '#ce9e62', '#4b6777', "#AD1457", "#AB47BC",
              "#90CAF9", "#6D4C41", "#9E9E9E", "#00838F", "#9CCC65", "#A1887F",
              "#616161", "#EF9A9A", "#004D40", "#CDDC39", "#FB8C00", "#263238"],
            is3D: true,
            backgroundColor: '#2c2c2c',
            titleTextStyle: {
                fontName: "Helvetica",
                fontSize: 30,
                color: '#F5F1F2'
            },
            legend: {
                textStyle: {
                    color: '#F5F1F2',
                    fontSize: 16
                }
            }
        };
        if (document.getElementById('positions-piechart')) {
          let chart = new google.visualization.PieChart(document.getElementById('positions-piechart'));
          chart.draw(data, options);
        }
      }
    }


    numberWithCommas (num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }

    render() {
        let portfolioTable;
        let portfolioIndex = [];
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


        if (mainPortfolio && Object.keys(this.data).length > 0) {

          let stocks = mainPortfolio.stocks.map((stock, idx) => {
            let percentChange = ((this.data[stock.ticker]['change'] /
              this.data[stock.ticker]['last_price'] -
              this.data[stock.ticker]['change']) * 100).toFixed(1);


            return (

            <tr key={idx} className='lalign'>

              <td><Link to={`company/${stock.ticker}`}>{ stock.ticker }</Link></td>
              <td>{ this.data[stock.ticker]['name'] }</td>
              <td>{ stock.number_of_shares }</td>
              <td>${ this.data[stock.ticker]['last_price'] } </td>
              <td>{ percentChange }% </td>
              <td>${ this.numberWithCommas(Math.round(this.data[stock.ticker]['last_price'] * stock.number_of_shares))}</td>
              <td>${ stock.purchase_price.toFixed(2) }</td>
              <td>${ this.numberWithCommas(Math.round(stock.purchase_price * stock.number_of_shares)) }</td>
              <td>${ this.numberWithCommas(Math.round((stock.current_price - stock.purchase_price)  * stock.number_of_shares))}</td>
              <td>{ (((stock.current_price - stock.purchase_price) /
                  stock.purchase_price) * 100).toFixed(1) }% </td>
            </tr>);
          });

          if (this.props.currentUser) {
            var totalValue = this.props.currentUser.investor.balance;

            let unrealizedGain = 0;
            let initialValue = 0;
            let costBasis = 0;
            let prevDayValue = 0;

            for (let i = 0; i < mainPortfolio.stocks.length; i++) {
              let stock = mainPortfolio.stocks[i];
              totalValue += (this.data[stock.ticker]['last_price'] * stock.number_of_shares);
              initialValue += (stock.purchase_price * stock.number_of_shares);
              prevDayValue += ((this.data[stock.ticker]['last_price'] - this.data[stock.ticker]['change'])
              * stock.number_of_shares);
            }
            prevDayValue += this.props.currentUser.investor.balance;
            unrealizedGain = totalValue - initialValue - this.props.currentUser.investor.balance;
            var percentageChange = (unrealizedGain / initialValue) * 100;
            let totalDailyChange = ((totalValue  - prevDayValue) / prevDayValue * 100).toFixed(1);
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
          if (percentageChange) {
            value = (
              <div className='portfolio-performance'>
                <p>Total Value: ${this.numberWithCommas(Math.round(totalValue))}</p>
                <p className={className} id="portfolio-change"> {percentageChange.toFixed(1)}%</p>
              </div>
              );
          }

        } else if (mainPortfolio && mainPortfolio.main === false) {
          let stocks = mainPortfolio.stocks.map((stock, idx) => {
            let percentChange = ((this.data[stock.ticker]['change'] /
              this.data[stock.ticker]['last_price'] -
              this.data[stock.ticker]['change']) * 100).toFixed(1);

            return (

            <tr key={idx} className='lalign'>

              <td><Link to={`company/${stock.ticker}`}>{ stock.ticker }</Link></td>
              <td>{ this.data[stock.ticker]['name'] }</td>
              <td>${ this.data[stock.ticker]['last_price'] } </td>
              <td>{ this.data[stock.ticker]['change'] }</td>
              <td>{percentChange}%</td>
              <td>{ this.data[stock.ticker]['industry_group'] }</td>
              <td>{this.numberWithCommas(Math.round(this.data[stock.ticker]['volume']))}</td>
              <td>{ this.numberWithCommas(Math.round(this.data[stock.ticker]['average_daily_volume'])) }</td>
              <td>${this.data[stock.ticker]['adj_low_price']} - {this.data[stock.ticker]['adj_high_price']}</td>
              <td>${this.data[stock.ticker]['52_week_low']} - {this.data[stock.ticker]['52_week_high']}</td>
              <td>${ this.data[stock.ticker]['marketcap'] }</td>
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
                      <th><span>Currency</span></th>
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
        }

        if (this.props.currentUser && mainPortfolio) {

          if ($('#positions-piechart')) {
            $('#piechart').remove();
            $('#positions-piechart').remove();
          }

            if (mainPortfolio.stocks.length > 0 && mainPortfolio.main) {
              $('.piechart-container').append('<div id="positions-piechart"></div>');
               $('#positions-piechart').append(this.positionsPieChart(mainPortfolio.stocks));
            }
            if (mainPortfolio.main) {
                $('.piechart-container').append('<div id="piechart"></div>');
                $('#piechart').append(this.portfolioPieChart(totalValue - this.props.currentUser.investor.balance,this.props.currentUser.investor.balance));
            }
            return (
                <div className='main-portfolio-index'>

                  <div className="portfolio-header">
                    <div className='portfolio-title'>
                      {mainPortfolio.title}
                      {value}
                    </div>

                    <div className = 'portfolio-buttons'>
                      <div className='dropdown'>
                        <span>Portfolios</span>
                        <div className="dropdown-content">
                          {portfolioIndex}
                          <PortfolioModal />
                        </div>
                      </div>
                      <button className = 'delete-button' onClick={() => this.handleDelete(mainPortfolio)}>Delete Portfolio</button>
                  </div>
                </div>

                    <div>
                        {portfolioTable}
                    </div>

                    <div className='piechart-container'>
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

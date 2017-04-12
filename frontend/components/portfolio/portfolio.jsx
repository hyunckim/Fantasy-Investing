import React from 'react';
import { fetchStockPrice } from '../../util/stock_api_util';
import {Link} from 'react-router';
import PortfolioModal from './portfolio_modal.jsx';
import PortfolioFormContainer from './portfolio_form_container';


class Portfolio extends React.Component {
    constructor(props) {
      super(props);
        this.state = {
            currentPortfolio: undefined
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
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
                fontSize: 36,
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
            colors: ['#c1432e', '#ce9e62', '#4b6777' ],
            is3D: true,
            backgroundColor: '#2c2c2c',
            titleTextStyle: {
                fontName: "Helvetica",
                fontSize: 36,
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
                        <h5 className='index-dropdown-title' >{portfolio.title}</h5>
                    </button>
                );
            });
        }


        if (mainPortfolio) {
          let stocks = mainPortfolio.stocks.map((stock, idx) => {

            return (

            <tr key={idx} className='lalign'>

              <td><Link to={`company/${stock.ticker}`}>{ stock.ticker }</Link></td>
              <td>{ stock.title }</td>
              <td>{ stock.number_of_shares }</td>
              <td>${ stock.current_price.toFixed(2) } </td>
              <td>${ this.numberWithCommas(Math.round(stock.current_price * stock.number_of_shares))}</td>
              <td>${ stock.purchase_price.toFixed(2) }</td>
              <td>${ this.numberWithCommas(Math.round(stock.purchase_price * stock.number_of_shares)) }</td>
              <td>${ this.numberWithCommas(Math.round((stock.current_price - stock.purchase_price)  * stock.number_of_shares))}</td>
              <td>{ Math.round(((stock.current_price - stock.purchase_price) /
                  stock.purchase_price) * 100) }% </td>
            </tr>);
          });

          if (this.props.currentUser) {
            var totalValue = this.props.currentUser.investor.balance;

            let unrealizedGain = 0;
            let initialValue = 0;

            for (let i = 0; i < mainPortfolio.stocks.length; i++) {
              let stock = mainPortfolio.stocks[i];
              totalValue += (stock.current_price * stock.number_of_shares);
              initialValue += (stock.purchase_price * stock.number_of_shares);

            }
            unrealizedGain = totalValue - initialValue - this.props.currentUser.investor.balance;
            let percentageChange = ((unrealizedGain) / (initialValue - this.props.currentUser.investor.balance)) * 100;

            portfolioTable =
                <table id='portfolioTable'>
                    <thead>
                        <tr>
                            <th><span>Symbol</span></th>
                            <th><span>Title</span></th>
                            <th><span>Quantity</span></th>
                            <th><span>Price</span></th>
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
                          <td>${this.numberWithCommas(Math.round(this.props.currentUser.investor.balance))}</td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr className="total-row">
                        <td>Total</td>
                          <td></td>
                            <td></td>
                            <td></td>
                            <td>${this.numberWithCommas(Math.round(totalValue))}</td>
                            <td></td>
                            <td></td>
                            <td>${this.numberWithCommas(Math.round(unrealizedGain))}</td>
                            <td>{Math.round(percentageChange)}%</td>
                        </tr>
                    </tbody>
                </table>;
          }

        }


        if (this.props.currentUser && mainPortfolio) {
            return (
                <div className='main-portfolio-index'>
                  <div className='portfolio-title'>
                      {mainPortfolio.title}
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

                    <div>
                        {portfolioTable}
                    </div>

                    <div className='piechart-container'>
                      <div id="piechart">
                          {this.portfolioPieChart(totalValue - this.props.currentUser.investor.balance,
                              this.props.currentUser.investor.balance)}
                      </div>
                      <div id="positions-piechart">
                        {this.positionsPieChart(mainPortfolio.stocks)}
                      </div>
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

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

    pieChart(equity, cash) {
      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {

        let data = google.visualization.arrayToDataTable([
          ['Type', 'Amount'],
          ['Equity', equity],
          ['Cash', cash]
        ]);

        let options = {
          title: 'Portfolio Breakdown'
        };
        if (document.getElementById('piechart')) {
          let chart = new google.visualization.PieChart(document.getElementById('piechart'));
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
                    <button key = {idx} onClick={() => this.handleClick(portfolio)}>
                        <h5>{portfolio.title}</h5>
                    </button>
                );
            });
        }

        if (mainPortfolio) {
          let stocks = mainPortfolio.stocks.map((stock, idx) => {

            return (<tr key={idx}>
              <td>{ stock.ticker }</td>
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

          var totalValue = this.props.currentUser.investor.balance;
          let unrealizedGain = 0;
          let initialValue = 0;

          for (let i = 0; i < mainPortfolio.stocks.length; i++) {
            let stock = mainPortfolio.stocks[i];
            totalValue += (stock.current_price * stock.number_of_shares);
            initialValue += (stock.purchase_price * stock.number_of_shares);
          }
          let percentageChange = ((totalValue - initialValue) / initialValue) * 100;

          portfolioTable = <table>
            <tbody>
              <tr>
                <th>Symbol</th>
                <th>Title</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Value</th>
                <th>Purchase Price</th>
                <th>Cost Basis</th>
                <th>Unrealiezed Gain / Loss</th>
                <th>% Change</th>
              </tr>
              { stocks }
              <tr>Cash
                <th></th>
                <th></th>
                <th></th>
                <th>${this.numberWithCommas(Math.round(this.props.currentUser.investor.balance))}</th>
              </tr>
              <tr>Total
                <th></th>
                <th></th>
                <th></th>
                <th>${this.numberWithCommas(Math.round(totalValue))}</th>
                <th></th>
                <th></th>
                <th>${this.numberWithCommas(Math.round(totalValue - initialValue))}</th>
                <th>{Math.round(percentageChange)}%</th>
              </tr>

            </tbody>
          </table>;
        }
        if (this.props.currentUser && mainPortfolio) {
            return (
                <div className='main-portfolio-index'>
                    <div>
                    </div>
                    <div>
                        {portfolioTable}
                    </div>
                    {portfolioIndex}
                    <PortfolioModal />
                    <button onClick={() => this.handleDelete(mainPortfolio)}>Delete Portfolio</button>
                    <div id="piechart">
                        {this.pieChart(totalValue - this.props.currentUser.investor.balance,
                            this.props.currentUser.investor.balance)}
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

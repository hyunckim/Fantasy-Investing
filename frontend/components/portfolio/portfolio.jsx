import React from 'react';
import { fetchStockPrice } from '../../util/stock_api_util';
import {Link} from 'react-router';  
import PortfolioFormContainer from './portfolio_form_container';


class Portfolio extends React.Component {
    constructor(props) {
      super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            currentPortfolio: undefined
        };
    }
    componentDidMount() {
      this.props.fetchPortfolios();
    }

    componentWillReceiveProps(){

    }

    handleClick(event){
        this.setState({ currentPortfolio: event });
    }

    render() {
        let portfolioTable;
        if (this.props.portfolio[0]) {
          let stocks = this.props.portfolio[0].stocks.map((stock, idx) => {

            let title = undefined;

            // let currentPrice;
            //   fetchStockPrice(stock.ticker).then(response => {
            //
            //     title = response.title;
            //     currentPrice = response.price;
            //   });

            return (<tr key={idx}>
              <td>{ stock.ticker }</td>
              <td>{ stock.title }</td>
              <td>{ stock.number_of_shares }</td>

              <td> { stock.current_price } </td>
              <td>{ stock.current_price * stock.number_of_shares }</td>

              <td> {stock.purchase_price }</td>
              <td>{ stock.purchase_price * stock.number_of_shares }</td>
            </tr>);
          });

          portfolioTable = <table>
            <tbody>
              <tr>
                <th>Symbol</th>
                <th>Title</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Value</th>
                <th>Unit Cost</th>
                <th>Cost Basis</th>
              </tr>
              { stocks }
            </tbody>
          </table>;
        }

        return (
            <div>
              { portfolioTable }
            </div>
        );
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

        // if (this.props.portfolio.length > 0) {
        //     portfolioIndex = this.props.portfolio.map((portfolio, idx) => {
        //         if (this.props.portfolio[idx].main === true) {
        //             return (
        //                 <Link to={`portfolio/`}>
        //                     <h5>{portfolio.title}</h5>
        //                 </Link>
        //             );
        //         } else {
        //             return (
        //                 <Link to={`portfolio/${portfolio.id}`}>
        //                     <h5>{portfolio.title}</h5>
        //                 </Link>
        //             );
        //         }

        //     });
        // }

        if (this.props.portfolio.length > 0) {
            portfolioIndex = this.props.portfolio.map((portfolio, idx) => {
                return (
                    <button onClick={() => this.handleClick(portfolio)}>
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
              <td> { stock.current_price } </td>
              <td>{ stock.current_price * stock.number_of_shares }</td>
              <td> { stock.purchase_price }</td>
              <td>{ stock.purchase_price * stock.number_of_shares }</td>
            </tr>);
          });

          portfolioTable = <table>
            <tbody>
              <tr>
                <th>Symbol</th>
                <th>Title</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Value</th>
                <th>Unit Purchase Price</th>
                <th>Cost Basis</th>
              </tr>
              { stocks }
            </tbody>
          </table>;
        }
        return (
            <div className='main-portfolio-index'>
                <div>
                    <br />
                    <div>
                        {portfolioIndex}
                    </div>
                </div>
              { portfolioTable }
              <PortfolioFormContainer />
            </div>
        );
    }
}

export default Portfolio;

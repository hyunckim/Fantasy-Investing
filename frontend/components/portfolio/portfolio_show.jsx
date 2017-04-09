import React from 'react';
import { fetchStockPrice } from '../../util/stock_api_util';
import {Link} from 'react-router';  
class Portfolio extends React.Component {
    constructor(props) {
      super(props);
    }
    componentDidMount() {
      this.props.fetchPortfolios();
    }
   
    render() {
        
        let portfolioTable;
        let currentPortfolio;
        let portfolioIndex = [];

        
        if (currentPortfolio) {
          let stocks = currentPortfolio.stocks.map((stock, idx) => {
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
                    <h1>My Portfolios</h1>
                    <br />
                    <div>
                        {portfolioIndex}
                    </div>
                </div>
              { portfolioTable }
            </div>
        );
    }
}

export default Portfolio;
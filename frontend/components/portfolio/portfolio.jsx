import React from 'react';
import { fetchStockPrice } from '../../util/stock_api_util';

class Portfolio extends React.Component {
    constructor(props) {
      super(props);
    }
    componentDidMount() {
      this.props.fetchPortfolios();
    }

    render() {
        let portfolioTable;
        if (this.props.portfolio[0]) {
          debugger;
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
}

export default Portfolio;

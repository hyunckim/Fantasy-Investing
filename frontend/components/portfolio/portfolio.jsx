import React from 'react';
import { fetchStockPrice } from '../../util/stock_api_util';
import {Link} from 'react-router';  
import PortfolioModal from './portfolio_modal.jsx';
import Modal from 'react-modal';


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

    componentWillReceiveProps(nextProps){
        if (this.props.portfolio !== nextProps.portfolio) {
            this.props.fetchPortfolios();
        }
    }

    handleClick(event){
        this.setState({ currentPortfolio: event });
    }

    handleDelete(e){
        this.props.deletePortfolio({id: e.id});
    }
    componentDidMount() {
      this.props.fetchPortfolios().then(this.closeModal);
    }

    render() {
        let portfolioTable;
        let portfolioIndex = [];
        let mainPortfolio = this.state.currentPortfolio;
        console.log('first');
        console.log(mainPortfolio);
        for (let i = 0; i < this.props.portfolio.length; i++) {
            if (this.props.portfolio[i].main === true && mainPortfolio === undefined) {
                mainPortfolio = this.props.portfolio[i];
            }
        }
        console.log(mainPortfolio);
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
        if (this.props.currentUser) {
            return (
            <div className='main-portfolio-index'>
                <div>
                </div>
                <div>
                    { portfolioTable }
                </div>
                {portfolioIndex}
                <PortfolioModal />
                <button onClick={() => this.handleDelete(mainPortfolio)}>Delete Portfolio</button>
            </div>
        );
        }else{
            return (
            <div>Must be logged in to view</div>
            );
        }
        
    }
}

export default Portfolio;


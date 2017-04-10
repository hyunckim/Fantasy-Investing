import { connect } from 'react-redux';
import { createStock, updateStock, deleteStock, receiveStockErrors,
  removeStockErrors}
  from '../../actions/stock_actions';
import { fetchCompany } from "../../actions/company_actions";
import { updateInvestor } from "../../actions/investor_actions";
import TradeForm from './trade_form';


const mapStateToProps = (state) => {
  let currentStocks;
  for (let i = 0; i < state.portfolio.length; i++) {
    if (state.portfolio[i].main === true) {
      currentStocks = state.portfolio[i].stocks;
    }
  }

  return {
    balance: state.currentUser.investor.balance,
    currentStocks: currentStocks,
    stock: { ticker: "", purchase_price: "", purchase_date: "", number_of_shares: "",
      action: ""},
    investor: state.currentUser.investor,
    portfolio: state.portfolio
  };

};

const mapDispatchToProps = (dispatch, { location }) => {
  return {
    createStock: stock => dispatch(createStock(stock)),
    updateStock: stock => dispatch(updateStock(stock)),
    deleteStock: stockId => dispatch(deleteStock(stockId)),
    removeStockErrors: () => dispatch(removeStockErrors()),
    receiveStockErrors: errors => dispatch(receiveStockErrors(errors)),
    updateInvestor: investor => dispatch(updateInvestor(investor)),
    fetchCompany: ticker => dispatch(fetchCompany(ticker))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TradeForm);

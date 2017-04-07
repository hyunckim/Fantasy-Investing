import { connect } from 'react-redux';
import { createStock, updateStock, removeStock, receiveStockErrors,
  removeStockErrors}
  from '../../actions/stock_actions';
import { updateInvestor } from "../../actions/investor_actions";
import TradeForm from './trade_form';

const mapStateToProps = (state) => ({
  balance: state.currentUser.investor.balance,
  currentStocks: Object.keys(state.portfolio[0].stocks)
    .map(id => state.portfolio[0].stocks[id]),
  stock: { ticker: "", purchase_price: "", purchase_date: "", number_of_shares: "",
    action: ""},
  investor: state.currentUser.investor
});

const mapDispatchToProps = (dispatch, { location }) => {
  return {
    createStock: stock => dispatch(createStock(stock)),
    updateStock: stock => dispatch(updateStock(stock)),
    deleteStock: stockId => dispatch(removeStock(stockId)),
    removeStockErrors: () => dispatch(removeStockErrors()),
    receiveStockErrors: errors => dispatch(receiveStockErrors(errors)),
    updateInvestor: investor => dispatch(updateInvestor(investor))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TradeForm);

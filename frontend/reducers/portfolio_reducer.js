import { RECEIVE_PORTFOLIOS, RECEIVE_PORTFOLIO } from '../actions/portfolio_actions';
import { RECEIVE_STOCK, REMOVE_STOCK } from '../actions/stock_actions';
import { merge } from 'lodash';

const PortfolioReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case RECEIVE_PORTFOLIOS:
          return action.portfolios;
        case RECEIVE_PORTFOLIO:
          return merge({}, state, action.portfolio);
        case RECEIVE_STOCK:
          let newStock = { [action.stock.id]: action.stock };
          let newStocks = merge({}, state.stocks, newStock);
          return merge({}, state, newStocks);
        case REMOVE_STOCK:
          let nextState = merge({}, state);
          delete nextState["stocks"][action.stockId];
          return nextState;
        default:
          return state;
    }
};

export default PortfolioReducer;

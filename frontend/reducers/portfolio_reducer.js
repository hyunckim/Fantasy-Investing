import { RECEIVE_PORTFOLIOS, RECEIVE_PORTFOLIO } from '../actions/portfolio_actions';
import { CREATE_STOCK, UPDATE_STOCK, REMOVE_STOCK } from '../actions/stock_actions';
import { merge } from 'lodash';

const PortfolioReducer = (state = {}, action) => {
    let nextState = merge({}, state);
    switch (action.type) {
        case RECEIVE_PORTFOLIOS:
          return action.portfolios;
        case RECEIVE_PORTFOLIO:
          return merge({}, state, action.portfolio);
        case CREATE_STOCK:
          nextState[0].stocks.push(action.stock);
          return nextState;
        case UPDATE_STOCK:
          for (let i = 0; i < state[0].stocks.length; i++) {
            if (state[0].stocks[i].id === action.stock.id) {
              nextState[0].stocks[i] = action.stock;
              break;
            }
          }
          return nextState;
        case REMOVE_STOCK:
          for (let i = 0; i < state[0].stocks.length; i++) {
            if (state[0].stocks[i].id === action.stock.id) {
              nextState[0].stocks.splice(i, 1);
              break;
            }
          }
          return nextState;
        default:
          return state;
    }
};

export default PortfolioReducer;

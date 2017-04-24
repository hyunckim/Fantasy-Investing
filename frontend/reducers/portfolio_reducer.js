import { RECEIVE_PORTFOLIOS, RECEIVE_PORTFOLIO, REMOVE_PORTFOLIO, CLEAR_PORTFOLIO} from '../actions/portfolio_actions';
import { CREATE_STOCK, UPDATE_STOCK, REMOVE_STOCK } from '../actions/stock_actions';
import { merge } from 'lodash';

const PortfolioReducer = (state = [], action) => {
    let nextState = merge([], state);

    let portfolioIdx;
    if (action.stock) {
      for (let i = 0; i < nextState.length; i++) {
        if (nextState[i].id === action.stock.portfolio) {
          portfolioIdx = i;
        }
      }
    }

    switch (action.type) {
        case RECEIVE_PORTFOLIOS:
            return action.portfolios;
        case RECEIVE_PORTFOLIO:
            let portfolio = action.portfolio;
            portfolio['stocks'] = [];
            nextState.push(portfolio);
            return nextState;
        case REMOVE_PORTFOLIO:
            for (let i = 0; i < state.length; i++) {
                if (state[i].id === action.portfolio.id) {
                    nextState.splice(i, 1);
                    break;
                }
            }
            return nextState;
        case CREATE_STOCK:
          nextState[portfolioIdx].stocks.push(action.stock);
          return nextState;
        case UPDATE_STOCK:

          for (let i = 0; i < nextState[portfolioIdx].stocks.length; i++) {
            if (nextState[portfolioIdx].stocks[i].id === action.stock.id) {
              nextState[portfolioIdx].stocks[i] = action.stock;
              break;
            }
          }
          return nextState;
        case REMOVE_STOCK:
          let idx;

          for (let i = 0; i < nextState.length; i++) {
            if (nextState[i].main === true) {
              idx = i;
            }
          }

          for (let i = 0; i < nextState[idx].stocks.length; i++) {
            if (nextState[idx].stocks[i].id === action.stock.id) {
              nextState[idx].stocks.splice(i, 1);
              break;
            }
          }
          return nextState;
          case CLEAR_PORTFOLIO:
            return [];
        default:
          return state;
    }
};

export default PortfolioReducer;

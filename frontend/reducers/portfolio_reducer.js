import { RECEIVE_PORTFOLIOS, RECEIVE_PORTFOLIO, REMOVE_PORTFOLIO} from '../actions/portfolio_actions';
import { merge } from 'lodash';

const PortfolioReducer = (state = {}, action) => {
    let nextState = merge({}, state);
    switch (action.type) {
        case RECEIVE_PORTFOLIOS:
            return action.portfolios;
        case RECEIVE_PORTFOLIO:
            return merge({}, state, action.portfolio);
        case REMOVE_PORTFOLIO:
            for (let i = 0; i < state[0].portfolio.length; i++) {
                if (state[0].portfolio[i].id === action.portfolio.id) {
                    nextState[0].portfolio.splice(i, 1);
                    break;
                }
            }
            return nextState;
        default:
            return state;
    }
};

export default PortfolioReducer;

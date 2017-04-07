import { RECEIVE_PORTFOLIOS, RECEIVE_PORTFOLIO } from '../actions/portfolio_actions';
import { merge } from 'lodash';

const PortfolioReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case RECEIVE_PORTFOLIOS:
            return action.portfolios;
        case RECEIVE_PORTFOLIO:
            return merge({}, state, action.portfolio);
        default:
            return state;
    }
};

export default PortfolioReducer;

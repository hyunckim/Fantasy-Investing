import { RECEIVE_PORTFOLIOS, RECEIVE_PORTFOLIO, START_LOADING_PORTFOLIO, START_LOADING_PORTFOLIOS } from '../actions/portfolio_actions';


const initialState = {
  loading: false
};

const LoadingReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_PORTFOLIO:
    case RECEIVE_PORTFOLIOS:
    case START_LOADING_PORTFOLIO:
    case START_LOADING_PORTFOLIOS:
      return Object.assign({}, state, { loading: true });
    default:
      return state;
  }
};

export default LoadingReducer;

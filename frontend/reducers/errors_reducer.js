import { RECEIVE_SESSION_ERRORS, REMOVE_SESSION_ERRORS } from
  '../actions/session_actions';
import { RECEIVE_STOCK_ERRORS, REMOVE_STOCK_ERRORS }
  from "../actions/stock_actions";
import { RECEIVE_PORTFOLIO_ERRORS, REMOVE_PORTFOLIO_ERRORS }
  from "../actions/portfolio_actions";
import merge from 'lodash/merge';


const _nullErrors = Object.freeze({
  session: [],
  stock: [],
  portfolio: []
});

const ErrorsReducer = (state = _nullErrors, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SESSION_ERRORS:
      const session = [];
      let nextState = merge({}, state);
      if (action.errors) {
        if (action.errors.username) {
          if (action.errors.username[0].includes('blank')) {
            session.push("Please enter a username");
          } else if (action.errors.username[0].includes('exist')) {
            session.push("A user with that username already exists");
          }
        }
        if (action.errors.password){
          if (action.errors.password[0].includes('blank')) {
            session.push("Please enter a password");
          }
        }
        if (action.errors.responseText) {
          session.push(action.errors.responseText);
        }
        if (typeof action.errors === 'string' && action.errors.includes("6")) {
          session.push(action.errors);
        }
        nextState.session = session;
        return nextState;
      } else {
        return action.errors;
      }
    case REMOVE_SESSION_ERRORS:
      let newState = merge({}, state);
      newState.session = [];
      return newState;
    case RECEIVE_STOCK_ERRORS:
      const stock = action.errors;
      return merge({}, _nullErrors, { stock });
    case REMOVE_STOCK_ERRORS:
      return _nullErrors;
    case RECEIVE_PORTFOLIO_ERRORS:
      const portfolio = action.errors;
      return merge({}, _nullErrors, { portfolio });
    case REMOVE_PORTFOLIO_ERRORS:
      return _nullErrors;
    default:
      return state;
  }
};

export default ErrorsReducer;

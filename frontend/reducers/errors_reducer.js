import { RECEIVE_SESSION_ERRORS, REMOVE_SESSION_ERRORS } from
  '../actions/session_actions';
import { RECEIVE_STOCK_ERRORS, REMOVE_STOCK_ERRORS } from "../actions/stock_actions";
import merge from 'lodash/merge';

const _nullErrors = Object.freeze({
  session: [],
  stock: []
});

const ErrorsReducer = (state = _nullErrors, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SESSION_ERRORS:
      const session = [];
      let nextState = merge({}, state);
      if (action.errors.responseText) {
        session.push(action.errors.responseText);
      } else {
        let keys = Object.keys(action.errors);
        for (let i = 0; i < keys.length; i++) {
          if (keys[i] === 'username') {
            session.push("Please input username");
          } else {
            session.push("Please input password");
          }
        }
      }
      nextState.session = session;
      return nextState;
    case REMOVE_SESSION_ERRORS:
      let newState = merge({}, state);
      newState.session = [];
      return newState;
    case RECEIVE_STOCK_ERRORS:
      const stock = action.errors;
      return merge({}, _nullErrors, { stock });
    case REMOVE_STOCK_ERRORS:
      return _nullErrors;
    default:
      return state;
  }
};

export default ErrorsReducer;

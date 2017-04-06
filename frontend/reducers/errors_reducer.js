import { RECEIVE_SESSION_ERRORS, REMOVE_SESSION_ERRORS } from
  '../actions/session_actions';
import merge from 'lodash/merge';

const _nullErrors = Object.freeze({
  session: []
});

const ErrorsReducer = (state = _nullErrors, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_SESSION_ERRORS:
      const sessionErrors = action.errors;
      newState.session = sessionErrors;
      return newState;
    case REMOVE_SESSION_ERRORS:
      newState.session = [];
      return newState;
    default:
      return state;
  }
};

export default ErrorsReducer;

import { RECEIVE_SESSION_ERRORS, REMOVE_SESSION_ERRORS } from
  '../actions/session_actions';
import merge from 'lodash/merge';

const _nullErrors = Object.freeze({
  session: []
});

const ErrorsReducer = (state = _nullErrors, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SESSION_ERRORS:
      const session = action.errors;
      return merge({}, _nullErrors, { session });
    case REMOVE_SESSION_ERRORS:
      let newState = merge({}, state);
      newState.errors = [];
      return newState;
    default:
      return state;
  }
};

export default ErrorsReducer;

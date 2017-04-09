import { RECEIVE_CURRENT_USER } from
  '../actions/session_actions';
import { RECEIVE_INVESTOR } from "../actions/investor_actions";
import { merge } from 'lodash';

const _nullUser = null;

const SessionReducer = (state = _nullUser, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return action.currentUser;
    case RECEIVE_INVESTOR:
      let newState = merge({}, state);
      newState['investor'] = action.investor;
      return newState;
    default:
      return state;
  }
};

export default SessionReducer;

import { RECEIVE_CURRENT_USER } from
  '../actions/session_actions';

const _nullUser = null;

const SessionReducer = (state = _nullUser, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return action.currentUser;
    default:
      return state;
  }
};

export default SessionReducer;

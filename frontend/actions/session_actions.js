import * as APIUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const REMOVE_SESSION_ERRORS = "REMOVE_SESSION_ERRORS";

export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

export const receiveErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

export const removeErrors = () => ({
  type: REMOVE_SESSION_ERRORS
});

export const signup = user => dispatch => (
  APIUtil.signup(user).then(res => dispatch(receiveCurrentUser(res)),
  err => dispatch(receiveErrors(err.responseJSON)))
);

export const login = user => dispatch => (
  APIUtil.login(user).then(res => dispatch(receiveCurrentUser(res)),
  err => dispatch(receiveErrors(err)))
);

export const logout = () => dispatch => (
  APIUtil.logout().then(res => dispatch(receiveCurrentUser(null)))
);

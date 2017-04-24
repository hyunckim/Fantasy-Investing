import { combineReducers } from 'redux';
import SessionReducer from './session_reducer';
import PortfolioReducer from './portfolio_reducer';
import ErrorsReducer from './errors_reducer';

const rootReducer = combineReducers({
  currentUser: SessionReducer,
  portfolio: PortfolioReducer,
  errors: ErrorsReducer
});

export default rootReducer;

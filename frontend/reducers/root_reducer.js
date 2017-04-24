import { combineReducers } from 'redux';
import SessionReducer from './session_reducer';
import PortfolioReducer from './portfolio_reducer';
import ErrorsReducer from './errors_reducer';
import LoadingReducer from './loading_reducer';


const rootReducer = combineReducers({
  currentUser: SessionReducer,
  portfolio: PortfolioReducer,
  errors: ErrorsReducer,
  loading: LoadingReducer
});

export default rootReducer;

import { combineReducers } from 'redux';
import CompanyReducer from './company_reducer';
import SessionReducer from './session_reducer';
import PortfolioReducer from './portfolio_reducer';
import ErrorsReducer from './errors_reducer';
import LoadingReducer from './loading_reducer';


const rootReducer = combineReducers({
  company: CompanyReducer,
  currentUser: SessionReducer,
  portfolio: PortfolioReducer,
  errors: ErrorsReducer,
  loading: LoadingReducer
});

export default rootReducer;

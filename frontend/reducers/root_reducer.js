import { combineReducers } from 'redux';
import CompanyReducer from './company_reducer';

const rootReducer = combineReducers({
  company: CompanyReducer
});

export default rootReducer;

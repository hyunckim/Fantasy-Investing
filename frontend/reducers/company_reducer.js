import { RECEIVE_COMPANY } from '../actions/company_actions';
import { merge } from 'lodash';

const CompanyReducer = (state = {}, action) => {
  switch(action.type) {
    case RECEIVE_COMPANY:
      return action.company;
  }
};

export default CompanyReducer;

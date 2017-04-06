export const RECEIVE_COMPANY = "RECEIVE_COMPANY";

import * as CompanyAPIUtil from '../util/company_api_util';

export const fetchCompany = ticker => dispatch => (
  CompanyAPIUtil.fetchCompany(ticker)
    .then(company => dispatch(receiveCompany(company)))
);

const receiveCompany = company => ({
  type: RECEIVE_COMPANY,
  company
});

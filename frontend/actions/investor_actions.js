import * as InvestorAPIUtil from "../util/investor_api_util";

export const RECEIVE_INVESTOR = "RECEIVE_INVESTOR";

export const  receiveInvestor = investor => ({
  type: RECEIVE_INVESTOR,
  investor
});

export const updateInvestor = investor => dispatch => (
  InvestorAPIUtil.updateBalance(investor).then(res => dispatch(receiveInvestor(res)))
);

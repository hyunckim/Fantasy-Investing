import * as InvestorAPIUtil from "../util/investor_api_util";

export const RECEIVE_INVESTOR = "RECEIVE_INVESTOR";

export const  receiveInvestor = stock => ({
  type: RECEIVE_INVESTOR,
  stock
});

export const updateInvestor = stock => dispatch => (
  InvestorAPIUtil.updateInvestor(stock).then(res => dispatch(receiveInvestor(res)))
);

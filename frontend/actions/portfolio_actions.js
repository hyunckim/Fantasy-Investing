
import * as PortfolioAPIUtil from '../util/portfolio_api_util';
export const RECEIVE_PORTFOLIO = "RECEIVE_PORTFOLIO";
export const RECEIVE_PORTFOLIOS = "RECEIVE_PORTFOLIOS";


export const receivePortfolios = portfolios => ({
  type: RECEIVE_PORTFOLIOS,
  portfolios
});
const receivePortfolio = (portfolio) => ({
  type: RECEIVE_PORTFOLIO,
  portfolio
});


export const fetchPortfolios = () => (dispatch) => (
  PortfolioAPIUtil.fetchPortfolios()
  .then((portfolio) => dispatch(receivePortfolios(portfolio)))
);

export const fetchPortfolio = portfolioId => dispatch => (
  PortfolioAPIUtil.fetchPortfolio(portfolioId)
    .then(portfolio => dispatch(receivePortfolio(portfolio)))
);

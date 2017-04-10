import * as PortfolioAPIUtil from '../util/portfolio_api_util';
export const RECEIVE_PORTFOLIO = "RECEIVE_PORTFOLIO";
export const RECEIVE_PORTFOLIOS = "RECEIVE_PORTFOLIOS";
export const REMOVE_PORTFOLIO = "REMOVE_PORTFOLIO";

export const receivePortfolios = (portfolios) => ({
  type: RECEIVE_PORTFOLIOS,
  portfolios
});

export const receivePortfolio = (portfolio) => ({
  type: RECEIVE_PORTFOLIO,
  portfolio
});

export const removePortfolio = (portfolio) => ({
    type: REMOVE_PORTFOLIO,
    portfolio
});

export const createPortfolio = (portfolio) => (dispatch) => (
    PortfolioAPIUtil.createPortfolio(portfolio).then(newPortfolio => dispatch(receivePortfolio(newPortfolio)))
);

export const deletePortfolio = (portfolio) => (dispatch) => (
  PortfolioAPIUtil.deletePortfolio(portfolio)
    .then( () => dispatch(removePortfolio(portfolio)))
);

export const fetchPortfolios = () => (dispatch) => (
  PortfolioAPIUtil.fetchPortfolios()
  .then((portfolios) => dispatch(receivePortfolios(portfolios)))
);

export const fetchPortfolio = portfolioId => dispatch => (
  PortfolioAPIUtil.fetchPortfolio(portfolioId)
  .then(portfolio => dispatch(receivePortfolio(portfolio)))
);

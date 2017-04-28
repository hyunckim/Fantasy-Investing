import * as PortfolioAPIUtil from '../util/portfolio_api_util';
export const RECEIVE_PORTFOLIO = "RECEIVE_PORTFOLIO";
export const RECEIVE_PORTFOLIOS = "RECEIVE_PORTFOLIOS";
export const REMOVE_PORTFOLIO = "REMOVE_PORTFOLIO";
export const CLEAR_PORTFOLIO = "CLEAR_PORTFOLIO";
export const START_LOADING_PORTFOLIO = "START_LOADING_PORTFOLIO";
export const START_LOADING_PORTFOLIOS = "START_LOADING_PORTFOLIOS";
export const RECEIVE_PORTFOLIO_ERRORS = "RECEIVE_PORTFOLIO_ERRORS";
export const REMOVE_PORTFOLIO_ERRORS = "REMOVE_PORTFOLIO_ERRORS";

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

export const startLoadingPortfolio = () => ({
  type: START_LOADING_PORTFOLIO
});
export const startLoadingPortfolios = () => ({
  type: START_LOADING_PORTFOLIOS
});

export const clearPortfolio = () => ({
  type: CLEAR_PORTFOLIO,
});

export const receivePortfolioErrors = (errors) => ({
  type: RECEIVE_PORTFOLIO_ERRORS,
  errors
});

export const removePortfolioErrors = () => ({
  type: REMOVE_PORTFOLIO_ERRORS
});

export const createPortfolio = (portfolio) => (dispatch) => (
  PortfolioAPIUtil.createPortfolio(portfolio).then(newPortfolio => dispatch(receivePortfolio(newPortfolio)))
);

export const deletePortfolio = (portfolio) => (dispatch) => (
  PortfolioAPIUtil.deletePortfolio(portfolio)
    .then( () => dispatch(removePortfolio(portfolio)))
);

export const fetchPortfolios = () => (dispatch) => {
  dispatch(startLoadingPortfolios());
  return (
    PortfolioAPIUtil.fetchPortfolios()
      .then(portfolios => dispatch(receivePortfolios(portfolios)))
  );
};

export const fetchPortfolio = portfolioId => dispatch => {
  dispatch(startLoadingPortfolio());
  return(
    PortfolioAPIUtil.fetchPortfolio(portfolioId)
      .then(portfolio => dispatch(receivePortfolio(portfolio)))
  );
};

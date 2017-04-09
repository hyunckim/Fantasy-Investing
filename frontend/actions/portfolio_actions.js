import * as PortfolioAPIUtil from '../util/portfolio_api_util';
export const RECEIVE_PORTFOLIO = "RECEIVE_PORTFOLIO";
export const RECEIVE_PORTFOLIOS = "RECEIVE_PORTFOLIOS";
export const REMOVE_PORTFOLIO = "REMOVE_PORTFOLIO";


export const receivePortfolios = portfolios => ({
  type: RECEIVE_PORTFOLIOS,
  portfolios
});
const receivePortfolio = (portfolio) => ({
  type: RECEIVE_PORTFOLIO,
  portfolio
});

export const removePortfolio = (portfolio) => ({
    type: REMOVE_PORTFOLIO,
    portfolio
});

export const createPortfolio = (comment) => (dispatch) => (
    PortfolioAPIUtil.createPortfolio(comment)
        .then(newPortfolio => dispatch(receivePortfolio(newPortfolio)))
);

export const deleteComment = (comment) => (dispatch) => (
  PortfolioAPIUtil.deleteComment(comment)
    .then( () => dispatch(removePortfolio(comment)))
);

export const fetchPortfolios = () => (dispatch) => (
  PortfolioAPIUtil.fetchPortfolios()
  .then((portfolios) => dispatch(receivePortfolios(portfolios)))
);

export const fetchPortfolio = portfolioId => dispatch => (
  PortfolioAPIUtil.fetchPortfolio(portfolioId)
  .then(portfolio => dispatch(receivePortfolio(portfolio)))
);



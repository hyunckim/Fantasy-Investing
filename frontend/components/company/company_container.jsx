import { connect } from 'react-redux';
import { fetchCompany } from '../../actions/company_actions';
import { fetchPortfolios } from '../../actions/portfolio_actions';
import { createStock } from '../../actions/stock_actions';
import Company from './company';

const mapStateToProps = (state, { params }) => {

  let portfolio;

  if (state.portfolio.length) {
    portfolio = state.portfolio.filter((port) => {
      return port.main === false;
    });
  }
  return ({
    company: state.company,
    ticker: params.ticker,
    watchlists: portfolio
  });
};

const mapDispatchToProps = (dispatch, { params }) => {
  return ({
    fetchCompany:() => dispatch(fetchCompany(params.ticker)),
    fetchPortfolios:() => dispatch(fetchPortfolios()),
    createStock:(stock) => dispatch(createStock(stock)) 
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Company);

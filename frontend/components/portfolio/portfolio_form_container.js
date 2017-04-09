import { connect } from 'react-redux';
import PortfolioForm from './portfolio_form';
import { createPortfolio, updatePortfolio } from '../../actions/portfolio_actions';

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    portfolio: state.portfolio
  };
};

const mapDispatchToProps = (dispatch) => ({
  createPortfolio: () => dispatch(createPortfolio()),
  updatePortfolio: () => dispatch(updatePortfolio())
});

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioForm);



import { connect } from 'react-redux';
import PortfolioForm from './portfolio_form';
import { createPortfolio, updatePortfolio } from '../../actions/portfolio_actions';

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    portfolio: state.portfolio
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {

  return {
    createPortfolio: (portfolio) => dispatch(createPortfolio(portfolio)),
    closeModal: () => ownProps.closeModal
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioForm);

import { connect } from 'react-redux';
import PortfolioForm from './portfolio_form';
import { createPortfolio, updatePortfolio, receivePortfolioErrors,
  removePortfolioErrors} from '../../actions/portfolio_actions';

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    portfolio: state.portfolio,
    errors: state.errors.portfolio
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {

  return {
    createPortfolio: (portfolio) => dispatch(createPortfolio(portfolio)),
    closeModal: () => ownProps.closeModal,
    receivePortfolioErrors: errors => dispatch(receivePortfolioErrors(errors)),
    removePortfolioErrors: () => dispatch(removePortfolioErrors())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioForm);

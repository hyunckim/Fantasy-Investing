import { connect } from 'react-redux';
import PortfolioForm from './portfolio_form';
import { createPortfolio, updatePortfolio } from './portfolio_form.jsx';

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  };
};

const mapDispatchToProps = (dispatch) => ({
  createPortfolio: () => dispatch(createTrack()),
  updatePortfolio: () => dispatch(updatePortfolio())
});

export default connect(mapStateToProps,mapDispatchToProps)(PortfolioForm);
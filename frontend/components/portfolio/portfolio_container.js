import { connect } from 'react-redux';
import { fetchPortfolios } from '../../actions/portfolio_actions';
import Portfolio from './portfolio';

const mapStateToProps = state => {
  return ({
    currentUser: state.currentUser,
    portfolio: Object.keys(state.portfolio).map(id => state.portfolio[id])
  });
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchPortfolios: () => dispatch(fetchPortfolios())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Portfolio);

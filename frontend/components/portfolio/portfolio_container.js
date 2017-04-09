import { connect } from 'react-redux';
import { fetchPortfolios } from '../../actions/portfolio_actions';
import Portfolio from './portfolio';

const mapStateToProps = state => {
<<<<<<< HEAD
    return {
        currentUser: state.currentUser,
        portfolio: state.portfolio
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return ({
        fetchPortfolios: () => dispatch(fetchPortfolios())
    });
};
=======
  return ({
    currentUser: state.currentUser,
    portfolio: Object.keys(state.portfolio).map(id => state.portfolio[id])
  });
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchPortfolios: () => dispatch(fetchPortfolios())
});
>>>>>>> master

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Portfolio);

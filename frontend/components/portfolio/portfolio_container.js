import { connect } from 'react-redux';
import { fetchPortfolios, deletePortfolio } from '../../actions/portfolio_actions';
import Portfolio from './portfolio';

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser,
        portfolio: state.portfolio
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return ({
        fetchPortfolios: () => dispatch(fetchPortfolios()),
        deletePortfolio: (portfolioId) => dispatch(deletePortfolio(portfolioId))
    });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Portfolio);

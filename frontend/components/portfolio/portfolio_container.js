import { connect } from 'react-redux';
import { fetchPortfolios, deletePortfolio, removePortfolioErrors }
  from '../../actions/portfolio_actions';
import Portfolio from './portfolio';

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser,
        portfolio: state.portfolio,
        loading: state.loading
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return ({
        fetchPortfolios: () => dispatch(fetchPortfolios()),
        deletePortfolio: (portfolioId) => dispatch(deletePortfolio(portfolioId)),
        removeErrors: () => dispatch(removePortfolioErrors())
    });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Portfolio);

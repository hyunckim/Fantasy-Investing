import { connect } from 'react-redux';
import { fetchPortfolios } from '../../actions/portfolio_actions';
import PortfolioShow from './portfolio';

const mapStateToProps = state => {
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

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioShow);

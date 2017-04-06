import { connect } from 'react-redux';
import { fetchPortfolios } from '../../actions/portfolio_actions';
import Portfolio from './portfolio';

const mapStateToProps = state => {
    console.log('state');
    console.log(state);
    return {
        currentUser: state.currentUser,
        portfolio: state.portfolio
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    console.log('ownProps');
    console.log(ownProps);
    return ({
        fetchPortfolios: (user) => dispatch(fetchPortfolios(user))
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);

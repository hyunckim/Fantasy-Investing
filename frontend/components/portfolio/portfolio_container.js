import { connect } from 'react-redux';
import { fetchPortfolios } from '../../actions/portfolio_actions';
import Portfolio from './portfolio';

const mapStateToProps = state => {
    return {
  
    };
};

const mapDispatchToProps = (dispatch) => {
    return ({
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);

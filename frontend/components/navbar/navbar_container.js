import { connect } from 'react-redux';
import { logout, removeErrors, login } from '../../actions/session_actions';
import { removeStockErrors} from '../../actions/stock_actions';
import NavBar from './navbar';

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  filters: state.filters
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  removeErrors: () => dispatch(removeErrors()),
  loginGuest: user => dispatch(login(user)),
  removeStockErrors: () => dispatch(removeStockErrors()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);

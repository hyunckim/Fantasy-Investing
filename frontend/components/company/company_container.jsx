import { connect } from 'react-redux';
import { fetchCompany } from '../../actions/company_actions';
import Company from './company';

const mapStateToProps = state => ({
  company: state.company
});

const mapDispatchToProps = ({ params }) => dispatch => ({
  fetchCompany:() => dispatch(fetchCompany(params.ticker))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Company);

import { connect } from 'react-redux';
import { fetchCompany } from '../../actions/company_actions';
import Company from './company';

const mapStateToProps = (state, { params }) => ({
  company: state.company,
  ticker: params.ticker
});

const mapDispatchToProps = (dispatch, { params }) => {
  return ({
    fetchCompany:() => dispatch(fetchCompany(params.ticker))
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Company);

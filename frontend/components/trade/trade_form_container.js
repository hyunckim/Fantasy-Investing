// import { connect } from 'react-redux';
// import { login, logout, signup, removeErrors } from '../../actions/session_actions';
// import SessionForm from './session_form';
//
// const mapStateToProps = (state) => ({
//   loggedIn: Boolean(state.currentUser),
//   errors: state.errors.session
// });
//
// const mapDispatchToProps = (dispatch, { location }) => {
//   const formType = location.pathname.slice(1);
//   const processForm = (formType === 'login') ? login : signup;
//
//   return {
//     processForm: user => dispatch(processForm(user)),
//     removeErrors: () => dispatch(removeErrors()),
//     formType
//   };
// };
//
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(SessionForm);

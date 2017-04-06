import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './app';
import CompanyContainer from './company/company_container';
import SessionFormContainer from './session_form/session_form_container';

const Root = ({ store }) => {

  const _redirectIfLoggedIn = (nextState, replace) => {
      const currentUser = store.getState().currentUser;
      if (currentUser) {
        replace('/portfolio');
      }
    };

  const _redirectIfNotLoggedIn = (nextState, replace) => {
    const currentUser = store.getState().currentUser;
    if (!currentUser) {
      replace('/');
    }
  };

  return (
    <Provider store={ store }>
      <Router history={ hashHistory }>
        <Route path="/" component={ App } >
          <Route path="company/:ticker" component={ CompanyContainer } />
          <Route path="/login" component={ SessionFormContainer }
            onEnter={_redirectIfLoggedIn}/>
          <Route path="/signup" component={ SessionFormContainer }
            onEnter={_redirectIfLoggedIn}/>
        </Route>
      </Router>
    </Provider>
  );
};

export default Root;

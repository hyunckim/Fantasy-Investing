import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './app';
import CompanyContainer from './company/company_container';

const Root = ({ store }) => {
  return (
    <Provider store={ store }>
      <Router history={ hashHistory }>
        <Route path="/" component={ App } >
          <Route path="company/:ticker" component={ CompanyContainer } />
        </Route>
      </Router>
    </Provider>
  );
};

export default Root;

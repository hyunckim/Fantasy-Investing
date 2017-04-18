import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
import { persistStore, autoRehydrate } from 'redux-persist';
import { fetchPortfolios } from "./actions/portfolio_actions";

window.fetchPortfolios = fetchPortfolios;

document.addEventListener('DOMContentLoaded',() => {
  let store;

  if (window.currentUser) {
    const preloadedState = { currentUser: window.currentUser };
    store = configureStore(preloadedState);
  } else {
    store = configureStore();
  }

  if (store.getState().currentUser) {

    localStorage.setItem("currentUser", store.getState().currentUser);
  }

  persistStore(store);
  window.store = store;

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={ store } />, root);
});

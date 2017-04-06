import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';


document.addEventListener('DOMContentLoaded',() => {
  let store;

  if (localStorage.currentUser) {
    const preloadedState = { currentUser: localStorage.currentUser };
    store = configureStore(preloadedState);
  } else {
    store = configureStore();
  }
  
  if (store.getState().currentUser) {

    localStorage.setItem("currentUser", store.getState().currentUser);
  }

  window.store = store;

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={ store } />, root);
});

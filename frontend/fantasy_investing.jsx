import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
import { persistStore, autoRehydrate } from 'redux-persist';

document.addEventListener('DOMContentLoaded',() => {
  let store = configureStore();

  persistStore(store);

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={ store } />, root);
});

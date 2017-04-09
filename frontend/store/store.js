import { compose, createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/root_reducer';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';


const configureStore = (preloadedState = {}) => (
  createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(thunk),
      autoRehydrate()
    )
  )
);

export default configureStore;

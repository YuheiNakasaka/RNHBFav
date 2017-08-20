import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import app from './reducers';

export default function configureStore() {
  const store = createStore(app, applyMiddleware(promiseMiddleware));
  return store;
}

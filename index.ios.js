/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import {
  AppRegistry,
} from 'react-native';

import { Provider } from 'react-redux';
import configureStore from './src/configureStore';
import App from './src/App';

const store = configureStore();

const RNHBFav = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent('RNHBFav', () => RNHBFav);

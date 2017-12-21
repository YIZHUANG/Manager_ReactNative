/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { Text, View } from "react-native";
import firebase from "firebase";
import { Provider } from "react-redux";
import { createStore , applyMiddleware } from "redux";
import ReduxThunk from 'redux-thunk';
import LoginForm from './src/components/LoginForm';
import reducers from "./src/reducers";
import RouterFlux from './src/Router';

export default class App extends Component{
  componentWillMount() {
    const config = {
      apiKey: "", //with yours
      authDomain: "",
      databaseURL: "",
      projectId: "",
      storageBucket: "",
      messagingSenderId: ""
    };
    firebase.initializeApp(config);
  }

  render() {
    const store =createStore(reducers,{},applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <RouterFlux />
      </Provider>
    );
  }
}

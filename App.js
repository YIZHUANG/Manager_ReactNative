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
      apiKey: "AIzaSyCOZ-wqkdoq2giuVp5sRjyBi5dVybQhmYc", //with
      authDomain: "authentication-2dae3.firebaseapp.com",
      databaseURL: "https://authentication-2dae3.firebaseio.com",
      projectId: "authentication-2dae3",
      storageBucket: "authentication-2dae3.appspot.com",
      messagingSenderId: "1048715646051"
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

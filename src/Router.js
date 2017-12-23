import React, { Component } from "react";
import { Scene, Router, Actions } from "react-native-router-flux";
import firebase from 'firebase';
import LoginForm from "./components/LoginForm";
import EmployeeList from "./components/EmployeeList";
import CreateEmployee from "./components/CreateEmployee";
import EmployeeEdit from "./components/EmployeeEdit";

export default class RouterFlux extends Component {
  render() {
    return (
      // fix the styling issue when adding router to the app.
      <Router sceneStyle={{ paddingTop: 65 }}>
        <Scene key="auth">
          <Scene key="login" component={LoginForm} title="log in" initial />
        </Scene>
        <Scene key="main">
          <Scene
            onRight={() => Actions.createEmployee()}
            rightTitle="Add"
            onLeft={()=>firebase.auth().signOut()}
            leftTitle="Log out"
            key="employeeList"
            component={EmployeeList}
            title="Dashboard"
            initial
          />
          <Scene
            key="createEmployee"
            component={CreateEmployee}
            title="Hire employees"
          />
          <Scene
            key="employeeEdit"
            component={EmployeeEdit}
            title="Edit employee information"
          />
        </Scene>
      </Router>
    );
  }
}

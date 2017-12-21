import React, { Component } from "react";
import { Scene, Router, Actions } from "react-native-router-flux";
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
            key="employeeList"
            component={EmployeeList}
            title="Employees"
            initial
          />
          <Scene
            key="createEmployee"
            component={CreateEmployee}
            title="Create Employee"
          />
          <Scene
            key="employeeEdit"
            component={EmployeeEdit}
            title="Edit Employee"
          />
        </Scene>
      </Router>
    );
  }
}

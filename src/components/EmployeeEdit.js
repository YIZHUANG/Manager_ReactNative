import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import Communications from "react-native-communications";
import { View, Text } from "react-native";
import { Card, Confirm, CardSection, Input, Button, Spinner } from "./common";
import {
  employeeUpdate,
  employeeSave,
  employeeDelete
} from "../actions/EmployeeActions";
import EmployeeForm from "./EmployeeForm";

class EmployeeEdit extends Component {
  state = { showModal: false }; //component level state to decide the showing of modal.

  componentWillMount() {
    // pre-load / pre-populate the employess that we are editing.
    _.each(this.props.employees, (value, prop) => {
      this.props.employeeUpdate({ prop, value });
    });
  }

  onButtonPress() {
    const { name, phone, shift } = this.props;
    this.props.employeeSave({
      name,
      phone,
      shift,
      uid: this.props.employees.uid // the id of the employee, not the user.
    });
  }

  onTextPress() {
    //send text message, only works on real devices or android simulator, does not work on ios simulator.
    const { name, phone, shift } = this.props;
    Communications.text(phone, `Your shift has changed to ${shift}`);
  }

  onAccept() {
    const { uid } = this.props.employees;
    this.props.employeeDelete({ uid }); // the id of the employee, not the user.
  }

  onDecline() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <Card>
        <EmployeeForm />
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>Save changes</Button>
        </CardSection>
        <CardSection>
          <Button onPress={this.onTextPress.bind(this)}>Text Schedules</Button>
        </CardSection>
        <CardSection>
          <Button
            onPress={() => this.setState({ showModal: !this.state.showModal })}
          >
            Fire employee
          </Button>
        </CardSection>
        <Confirm
          visible={this.state.showModal}
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
        >
          Are you sure you want to fire this guy?
        </Confirm>
      </Card>
    );
  }
}

function mapStateToProps(state) {
  const { name, phone, shift } = state.employeeForm;
  return { name, phone, shift };
}

export default connect(mapStateToProps, {
  employeeUpdate,
  employeeSave,
  employeeDelete
})(EmployeeEdit);

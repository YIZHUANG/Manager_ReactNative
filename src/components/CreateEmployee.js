import React, { Component } from "react";
import { employeeUpdate, createEmployee } from "../actions/EmployeeActions";
import { Card, CardSection, Input, Button, Spinner } from "./common";
import { connect } from "react-redux";
import EmployeeForm from "./EmployeeForm";

class CreateEmployee extends Component {
  onButtonPress() {
    const { name, phone, shift } = this.props;
    this.props.createEmployee({ name, phone, shift: shift || "Monday" }); // if shift is empty string, defalut Monday.
  }

  render() {
    // pass down all the props to the form.
    return (
      <Card>
        <EmployeeForm {...this.props} />
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>Create</Button>
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  pickerTextStyle: {
    fontSize: 18,
    paddingLeft: 20
  }
};

function mapStateToProps(state) {
  const { name, phone, shift } = state.employeeForm;
  return { name, phone, shift };
}

export default connect(mapStateToProps, {
  employeeUpdate,
  createEmployee
})(CreateEmployee);

import React, { Component } from "react";
import { View, Text, Picker } from "react-native";
import { Card, CardSection, Input, Button, Spinner } from "./common";
import { connect } from "react-redux";
import { employeeUpdate } from "../actions/EmployeeActions";

class EmployeeForm extends Component {
  render() {
    return (
      <View>
        <CardSection>
          <Input
            label="Name"
            placeholder="name"
            value={this.props.name}
            onChangeText={name => this.props.employeeUpdate({ prop: "name", value: name }) }
          />
        </CardSection>
        <CardSection>
          <Input
            label="Phone"
            placeholder="phone number"
            value={this.props.phone}
            onChangeText={phone => this.props.employeeUpdate({ prop: "phone", value: phone })}
          />
        </CardSection>
        <CardSection style={{ flexDirection: "column" }}>
          <Text style={styles.pickerTextStyle}>Shift</Text>
          <Picker
            selectedValue={this.props.shift}
            onValueChange={day => this.props.employeeUpdate({ prop: "shift", value: day })}
              >
            <Picker.Item label="Monday" value="Monday" />
            <Picker.Item label="Tuesday" value="Tuesday" />
            <Picker.Item label="Wednesday" value="Wednesday" />
            <Picker.Item label="Thursday" value="Thursday" />
            <Picker.Item label="Friday" value="Friday" />
            <Picker.Item label="Saturday" value="Saturday" />
            <Picker.Item label="Sunday" value="Sunday" />
          </Picker>
        </CardSection>
      </View>
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
  const { name, phone, shift } = state.employeeForm;  // coming from the reducer.
  return { name, phone, shift };
}

export default connect(mapStateToProps, { employeeUpdate })(EmployeeForm);

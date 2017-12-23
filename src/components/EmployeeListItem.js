import React, { Component } from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Separator
} from "native-base";
import { CardSection } from "./common";
import { Actions } from "react-native-router-flux";

class EmployeeListItem extends Component {
  onRowPress() {
    // goes to the edit page when a row is clicked
    Actions.employeeEdit({ employees: this.props.employees }); // EmployeeListItem has been mapped already so it will know
    // which item we are passing onto.
  }

  render() {
    const { name } = this.props.employees;
    return (
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
        <ListItem>
          <Text style={styles.titleStyle}>{name}</Text>
        </ListItem>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
};

export default EmployeeListItem;

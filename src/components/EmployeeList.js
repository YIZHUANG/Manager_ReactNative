import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Separator
} from "native-base";
import { connect } from "react-redux";
import { EmployeeFetch } from "../actions/EmployeeActions";
import EmployeeListItem from "./EmployeeListItem";

import _ from "lodash";

class EmployeeList extends Component {
  componentWillMount() {
    this.props.EmployeeFetch(); //slower than the render.
  }

  renderEmployees() {
    const list = this.props.employees.map(employees => (
      <EmployeeListItem employees={employees} />
    ));
    return list;
  }

  render() {
    return (
      <Container>
        <Content>
          <List>
            <Separator bordered>
              <Text style={{ fontSize: 20 }}>Employee information</Text>
            </Separator>
            {this.renderEmployees()}
          </List>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const employees = _.map(state.employees, (val, uid) => {
    return { ...val, uid }; // populate the object so that it shows the uid of each employee extra , not the user's uid itself.
  });
  return { employees };
};

export default connect(mapStateToProps, { EmployeeFetch })(EmployeeList);

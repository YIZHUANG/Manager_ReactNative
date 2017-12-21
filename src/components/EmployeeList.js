import React, { Component } from "react";
import { ListView, View, Text } from "react-native";
import { connect } from "react-redux";
import { EmployeeFetch } from "../actions/EmployeeActions";
import EmployeeListItem from "./EmployeeListItem";
import _ from "lodash";

class EmployeeList extends Component {
  componentWillMount() {
    this.props.EmployeeFetch(); //slower than the render.
    this.createDataSource(this.props); //so the props will be null when the page finished loading.
  }

  componentWillReceiveProps(nextProps) {
    // wait for the EmployeeFetch to happen and producer a next props.
    this.createDataSource(nextProps);
  }

  createDataSource({ employees }) {
    //have no idea, but i don't care
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(employees);
  }

  renderRow(employees) {
    //employees comes from the dataSource.
    return <EmployeeListItem employees={employees} />;
  }

  render() {
    return (
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
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

import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import {
  emailChanged,
  passwordChanged,
  loginUser,
  loginFail,
  loginSucess
} from "../actions/index";
import EmployeeList from "./EmployeeList";
import { Card, CardSection, Input, Button, Spinner } from "./common";

class LoginForm extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;

    this.props.loginUser({ email, password }); // from the actions.
  }

  renderError() {
    if (this.props.error) {
      return (
        <View style={{ backgroundColor: "white" }}>
          <Text>{this.props.error}</Text>
        </View>
      );
    }
  }

  renderButton() {
    // if user is loading or not..
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
    return <Button onPress={this.onButtonPress.bind(this)}>Login</Button>;
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Email"
            placeholder="email@gmail.com"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
          />
        </CardSection>
        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="password"
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
          />
        </CardSection>
        <CardSection>
          {this.renderError()}
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return {
    email: state.auth.email,
    password: state.auth.password,
    error: state.auth.error,
    loading: state.auth.loading
  };
}

export default connect(mapStateToProps, {
  emailChanged,
  passwordChanged,
  loginUser, //loading starts from here
  loginFail, // ends from here
  loginSucess // and could end from here too if everything goes smoothly.
})(LoginForm);

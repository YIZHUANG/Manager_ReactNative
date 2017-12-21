import firebase from "firebase";
import { Actions } from "react-native-router-flux";

export const EMAIL_CHANGED = "email_changed";
export const PASSWORD_CHANGED = "password_changed";
export const LOGIN_SUCCESS = "login_sucess";
export const LOGIN_FAIL = "login_fail";
export const LOGIN_ING = "login_ing";

export const emailChanged = text => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = text => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const loginUser = ({ email, password }) => {
  return dispatch => {
    dispatch({
      type: LOGIN_ING
    }); //returns the spinner
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => loginSucess(dispatch, user)) // where the spinner stops, and the log-in user is returned.
    .catch(() => {firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => loginSucess(dispatch, user)) // do the same thing as above again.
      .catch(() => loginFail(dispatch)); // stops the spinner, returns the error message in the reducer.
    });
  };
};

const loginFail = dispatch => {
  dispatch({ type: LOGIN_FAIL });
};

const loginSucess = (dispatch, user) => {
  dispatch({
    type: LOGIN_SUCCESS,
    payload: user
  });
  Actions.main();
};

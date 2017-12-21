import firebase from "firebase";
import { Actions } from "react-native-router-flux";

export const EMPLOYEE_UPDATE = "employee_update";
export const EMPLOYEE_CREATE = "employee_create";
export const EMPLOYEES_FETCH_SUCCESS = "employees_fetch_success";
export const EMPLOYEE_SAVED = "employee_saved";

export const employeeUpdate = ({ prop, value }) => {
  return {
    type: EMPLOYEE_UPDATE,
    payload: { prop, value }
  };
};

export const createEmployee = ({ name, phone, shift }) => {
  const { currentUser } = firebase.auth();
  return dispatch => {
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .push({ name, phone, shift })
      .then(() => {
        dispatch({ type: EMPLOYEE_CREATE }); // reset the input value for the form in the reducer
        Actions.employeeList({ type: "reset" });  // remove the stack layer that is added.
      });
  };
};

export const EmployeeFetch = () => {
  const { currentUser } = firebase.auth();
  return dispatch => {
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .on("value", snapshot => {
        dispatch({
          type: EMPLOYEES_FETCH_SUCCESS,
          payload: snapshot.val()
        });
      });
  };
};

export const employeeSave = ({ name, phone, shift, uid }) => {
  const { currentUser } = firebase.auth();
  return dispatch => {
    firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
    .set({ name, phone, shift })
      .then(() => {
        dispatch({
          type: EMPLOYEE_SAVED // reset the input value for the form in the reducer.
        });
        Actions.employeeList({ type: "reset" }); // remove the stack layer that is added.
      });
  };
};

export const employeeDelete = ({ uid }) => {
  const { currentUser } = firebase.auth();
  return dispatch => {
    firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
      .remove()
      .then(() => {
        Actions.employeeList({ type: "reset" }); // remove the stack layer that is added.
      });
  };
};

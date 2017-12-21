import { EMPLOYEES_FETCH_SUCCESS } from "../actions/EmployeeActions";

export default (state = {}, action) => {
  switch (action.type) {
    case EMPLOYEES_FETCH_SUCCESS:
      //return {...state,[id]:action.payload}; findById
      return action.payload;
    default:
      return state;
  }
};

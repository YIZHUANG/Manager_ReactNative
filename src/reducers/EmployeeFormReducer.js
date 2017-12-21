import {
  EMPLOYEE_UPDATE,
  EMPLOYEE_CREATE,
  EMPLOYEE_SAVED
} from "../actions/EmployeeActions";

const INITIAL_STATE = {
  name: "",
  phone: "",
  shift: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMPLOYEE_UPDATE: // inherits the previous state.
      return { ...state, [action.payload.prop]: action.payload.value }; // the same as 'prop':'email','value':email
    case EMPLOYEE_CREATE:
      return INITIAL_STATE; //remember to set everything back to empty string.
    case EMPLOYEE_SAVED:
      return INITIAL_STATE; //remember to set everything back to empty string.
    default:
      return state;
  }
};

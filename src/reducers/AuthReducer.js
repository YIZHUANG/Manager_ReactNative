import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_ING
} from "../actions/index";

const INITIAL_STATE = {
  email: "",
  password: "",
  user: null,
  error: "",
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_ING:
      return { ...state, loading: true, error: "" }; //init the error back to empty string if failed before , and starts the spinner..
    case LOGIN_SUCCESS:
      return { ...state,...INITIAL_STATE, user: action.payload}; //reset everything back to empty string.
    case LOGIN_FAIL:
      return { ...state, error: "Authentication failed", password: "" , loading: false};
    default:
      return state;
  }
};

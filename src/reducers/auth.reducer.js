import { authConstants } from "../actions/constants";

const initState = {
  name: "",
  email: "",
  isAdmin: false,
  authenticating: false,
  authenticated: false,
  error: null,
};

export default (state = initState, action) => {
  // console.log(action);
  switch (action.type) {
    case `${authConstants.USER_LOGIN}_REQUEST`:
      // console.log(action);
      state = {
        ...state,
        authenticating: true,
      };
      break;

    case `${authConstants.USER_LOGIN}_SUCCESS`:
      state = {
        ...state,
        ...action.payload.user,
        authenticated: true,
        authenticating: false,
      };
      break;

    case `${authConstants.USER_LOGIN}_FAILURE`:
      state = {
        ...state,
        authenticated: false,
        authenticating: false,
        error: action.payload.error,
      };
      break;

    case `${authConstants.USER_LOGOUT}_REQUEST`:
      break;

    case `${authConstants.USER_LOGOUT}_SUCCESS`:
      state = {
        ...initState,
      };
      break;

    case `${authConstants.USER_LOGOUT}_FAILURE`:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;

    case `${authConstants.DELETE_USER}_REQUEST`:
      break;

    case `${authConstants.DELETE_USER}_SUCCESS`:
      state = {
        ...initState,
      };
      break;

    case `${authConstants.DELETE_USER}_FAILURE`:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;
  }

  return state;
};

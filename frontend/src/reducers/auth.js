import { AUTH } from "../constants/actionTypes";

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      return { ...state, authData: action?.data };
    default:
      return state;
  }
};

export default authReducer;
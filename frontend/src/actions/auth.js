import { AUTH, FETCH_ALL } from "../constants/actionTypes";
import * as api from "../api/index.js";

export const login = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.login(formData);
    dispatch({ type: AUTH, data });
    navigate("/");
  } catch (error) {
    navigate("/errorInvalidCred");
    // console.log(error);
  }
};

export const register = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.register(formData);
    dispatch({ type: AUTH, data });
    navigate("/home");
  } catch (error) {
    alert('Already Registered')
    console.log(error);
  }
};

export const getUser = () => async (dispatch) => {
  try {
    const { data } = await api.getUser();
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

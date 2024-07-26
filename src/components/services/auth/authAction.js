import * as AT from "./authTypes";
import axios from "axios";

const AUTH_URL = "http://localhost:8080/authenticate";

export const authenticateUser =
  (userName, userPassword) => async (dispatch) => {
    dispatch(loginRequest());
    try {
      const response = await axios.post(AUTH_URL, {
        userName: userName,
        userPassword: userPassword,
      });
      localStorage.setItem("jwtToken", response.data.token);
      dispatch(success({ username: response.data.name, isLoggedIn: true }));
      return Promise.resolve(response.data);
    } catch (error) {
      dispatch(failure());
      return Promise.reject(error);
    }
  };

const loginRequest = () => {
  return {
    type: AT.LOGIN_REQUEST,
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch(logoutRequest());
    localStorage.removeItem("jwtToken");
    dispatch(success(false));
  };
};

const logoutRequest = () => {
  return {
    type: AT.LOGOUT_REQUEST,
  };
};

const success = (isLoggedIn) => {
  return {
    type: AT.SUCCESS,
    payload: isLoggedIn,
  };
};

const failure = (isLoggedIn) => {
  return {
    type: AT.FAILURE,
    payload: false,
  };
};

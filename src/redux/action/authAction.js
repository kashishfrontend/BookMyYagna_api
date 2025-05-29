import axios from 'axios';

// Action Types
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const RESET_LOGIN = 'LOGIN_RESET';
export const AUTH_LOADED = 'AUTH_LOADED';
export const SET_AUTHENTICATED = 'SET_AUTHENTICATED';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
export const RESET_LOGOUT_STATE = 'RESET_LOGOUT_STATE';

// Login action
export const login = (email, password) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const response = await axios.post(
      `https://bookmyyogna.onrender.com/user/loginUser`,
      { email, password },
      {
        withCredentials: true,
      }
    );

    dispatch({ type: LOGIN_SUCCESS, payload: response.data });

    setTimeout(() => {
      dispatch({ type: SET_AUTHENTICATED });
    }, 1000);

  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response?.data?.error,
    });
  }
};

export const resetLogin = () => ({
  type: RESET_LOGIN,
});

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT_REQUEST });
    const response = await axios.get(
      'https://bookmyyogna.onrender.com/user/logoutUser',
      { withCredentials: true }
    );

    dispatch({ type: LOGOUT_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: LOGOUT_FAILURE });
  }
};

export const resetLogoutState = () => {
  return {
    type: RESET_LOGOUT_STATE,
  };
};

export const checkAuth = () => async (dispatch) => {
  try {
    const response = await axios.get(
      'https://bookmyyogna.onrender.com/user/authenticateUser',
      { withCredentials: true }
    );

    dispatch({ type: SET_AUTHENTICATED });
  } catch (error) {
    dispatch({ type: LOGOUT_SUCCESS });
  } finally {
    dispatch({ type: AUTH_LOADED });
  }
};
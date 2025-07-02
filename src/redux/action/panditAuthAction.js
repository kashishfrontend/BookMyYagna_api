import axios from 'axios';

// Action Types
export const LOGIN_PANDIT_REQUEST = 'LOGIN_PANDIT_REQUEST';
export const LOGIN_PANDIT_SUCCESS = 'LOGIN_PANDIT_SUCCESS';
export const LOGIN_PANDIT_FAILURE = 'LOGIN_PANDIT_FAILURE';
export const RESET_PANDIT_LOGIN = 'RESET_PANDIT_LOGIN';

export const LOGOUT_PANDIT_REQUEST = 'LOGOUT_PANDIT_REQUEST';
export const LOGOUT_PANDIT_SUCCESS = 'LOGOUT_PANDIT_SUCCESS';
export const LOGOUT_PANDIT_FAILURE = 'LOGOUT_PANDIT_FAILURE';
export const RESET_PANDIT_LOGOUT_STATE = 'RESET_PANDIT_LOGOUT_STATE';

export const SET_PANDIT_AUTHENTICATED = 'SET_PANDIT_AUTHENTICATED';
export const AUTH_PANDIT_LOADED = 'AUTH_PANDIT_LOADED';

// Login action
export const loginPandit = (userName, password) => async (dispatch) => {
  dispatch({ type: LOGIN_PANDIT_REQUEST });

  try {
    const response = await axios.post(
      `https://bookmyyogna.onrender.com/pandit/loginPandit`,
      { userName, password },
      { withCredentials: true }
    );

    dispatch({ type: LOGIN_PANDIT_SUCCESS, payload: response.data });

    setTimeout(() => {
      dispatch({ type: SET_PANDIT_AUTHENTICATED });
    }, 1000);
  } catch (error) {
    dispatch({
      type: LOGIN_PANDIT_FAILURE,
      payload: error.response?.data?.error || 'Login failed',
    });
  }
};

export const resetLoginPandit = () => ({
  type: RESET_PANDIT_LOGIN,
});

// Logout action
export const logoutPandit = () => async (dispatch) => {
  dispatch({ type: LOGOUT_PANDIT_REQUEST });

  try {
    const response = await axios.get(
      'https://bookmyyogna.onrender.com/user/logoutUser',
      { withCredentials: true }
    );

    dispatch({ type: LOGOUT_PANDIT_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: LOGOUT_PANDIT_FAILURE,
      payload: error.response?.data?.error || 'Logout failed',
    });
  }
};

export const resetLogoutPanditState = () => ({
  type: RESET_PANDIT_LOGOUT_STATE,
});

// Check auth status
export const checkPanditAuth = () => async (dispatch) => {
  try {
    await axios.get(
      'https://bookmyyogna.onrender.com/pandit/authenticationPandit',
      { withCredentials: true }
    );

    dispatch({ type: SET_PANDIT_AUTHENTICATED });
  } catch (error) {
    dispatch({ type: LOGOUT_PANDIT_SUCCESS }); // Automatically log out if not authenticated
  } finally {
    dispatch({ type: AUTH_PANDIT_LOADED });
  }
};

import axios from 'axios';

// Action Types
export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const RESET_USER_LOGIN = 'RESET_USER_LOGIN';

export const LOGOUT_USER_REQUEST = 'LOGOUT_USER_REQUEST';
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';
export const LOGOUT_USER_FAILURE = 'LOGOUT_USER_FAILURE';
export const RESET_USER_LOGOUT_STATE = 'RESET_USER_LOGOUT_STATE';

export const SET_USER_AUTHENTICATED = 'SET_USER_AUTHENTICATED';
export const AUTH_USER_LOADED = 'AUTH_USER_LOADED';

// Login User
export const login = (email, password) => async (dispatch) => {
  dispatch({ type: LOGIN_USER_REQUEST });

  try {
    const response = await axios.post(
      'https://bookmyyogna.onrender.com/user/loginUser',
      { email, password },
      { withCredentials: true }
    );
    console.log("Login Response:", response.data);
    dispatch({ type: LOGIN_USER_SUCCESS, payload: response.data });

    // Dispatch auth with user and role from response.data.user
    dispatch({
      type: SET_USER_AUTHENTICATED,
      payload: {
        user: response.data.user,
        role: response.data.user?.role,
      },
    });

    return { success: true, data: response.data };
  } catch (error) {
    dispatch({
      type: LOGIN_USER_FAILURE,
      payload: error.response?.data?.error || 'Login failed',
    });

    return {
      success: false,
      error: error.response?.data?.error || 'Login failed',
    };
  }
};

// Reset login state
export const resetLogin = () => ({
  type: RESET_USER_LOGIN,
});

// Logout User
export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT_USER_REQUEST });

  try {
    const { data } = await axios.get(
      'https://bookmyyogna.onrender.com/user/logoutUser',
      { withCredentials: true }
    );

    dispatch({ type: LOGOUT_USER_SUCCESS, payload: data });

    return { success: true, message: data.message };
  } catch (error) {
    dispatch({
      type: LOGOUT_USER_FAILURE,
      payload: error.response?.data?.error || 'Logout failed',
    });

    return {
      success: false,
      error: error.response?.data?.error || 'Logout failed',
    };
  }
};

// Reset logout state
export const resetLogoutState = () => ({
  type: RESET_USER_LOGOUT_STATE,
});

// Check User Authentication
export const checkAuth = () => async (dispatch) => {
  try {
    const response = await axios.get(
      'https://bookmyyogna.onrender.com/user/authenticateUser',
      { withCredentials: true }
    );

    dispatch({
      type: SET_USER_AUTHENTICATED,
      payload: {
        role: response.data.role,
        user: response.data.user,
      },
    });
  } catch (error) {
    dispatch({ type: LOGOUT_USER_SUCCESS });
  } finally {
    dispatch({ type: AUTH_USER_LOADED });
  }
};

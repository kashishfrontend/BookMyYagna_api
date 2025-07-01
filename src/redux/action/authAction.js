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
  const isPanditPage = window.location.pathname.startsWith('/pandit');

  try {
    if (isPanditPage) {
      // Try pandit authentication first
      console.log('Attempting pandit authentication');
      const panditResponse = await axios.get(
        'https://bookmyyogna.onrender.com/pandit/authenticationPandit',
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      console.log('Pandit Auth Response:', panditResponse.data);

      if (panditResponse.data.success) {
        dispatch({
          type: 'SET_AUTHENTICATED',
          payload: { role: 'pandit', data: panditResponse.data.pandit || panditResponse.data },
        });
        return;
      } else {
        console.log('Pandit authentication failed:', panditResponse.data.error || panditResponse.data.message);
      }
    }

    // Try user authentication
    console.log('Attempting user authentication');
    const userResponse = await axios.get(
      'https://bookmyyogna.onrender.com/user/authenticateUser',
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );

    console.log('User Auth Response:', userResponse.data);

    if (userResponse.data.success) {
      dispatch({
        type: 'SET_AUTHENTICATED',
        payload: { role: 'user', data: userResponse.data.data || userResponse.data },
      });
    } else {
      throw new Error(userResponse.data.error || userResponse.data.message || 'User authentication failed');
    }
  } catch (error) {
    console.error('Authentication error:', error.response?.data || error.message);
    if (error.response?.status === 401 && !isPanditPage) {
      // Try pandit authentication if user fails and not on pandit page
      try {
        console.log('Falling back to pandit authentication');
        const panditResponse = await axios.get(
          'https://bookmyyogna.onrender.com/user/authenticateUser',
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          }
        );

        console.log('Pandit Auth Response (fallback):', panditResponse.data);

        if (panditResponse.data.success) {
          dispatch({
            type: 'SET_AUTHENTICATED',
            payload: { role: 'pandit', data: panditResponse.data.pandit || panditResponse.data },
          });
          return;
        }
      } catch (panditError) {
        console.error('Pandit authentication error:', panditError.response?.data || panditError.message);
      }
    }
    dispatch({ type: 'LOGOUT_SUCCESS' });
  } finally {
    dispatch({ type: 'AUTH_LOADED' });
  }
};
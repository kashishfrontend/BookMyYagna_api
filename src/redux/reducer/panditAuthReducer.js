import {
  LOGIN_PANDIT_REQUEST,
  LOGIN_PANDIT_SUCCESS,
  LOGIN_PANDIT_FAILURE,
  RESET_PANDIT_LOGIN,
  SET_PANDIT_AUTHENTICATED,
  AUTH_PANDIT_LOADED,
  LOGOUT_PANDIT_REQUEST,
  LOGOUT_PANDIT_SUCCESS,
  LOGOUT_PANDIT_FAILURE,
  RESET_PANDIT_LOGOUT_STATE,
} from '../action/panditAuthAction';

// Initial state
const initialState = {
  loading: false,
  isPanditAuthenticated: false,
  user: null,
  error: null,
  successPandit: false,
  logoutSuccess: false,
  authPanditLoaded: false,
};

// Reducer
const panditAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    // Login Flow
    case LOGIN_PANDIT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        successPandit: false,
      };

    case LOGIN_PANDIT_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload?.affiliate || null,
        successPandit: true,
        logoutSuccess: false,
        error: null,
      };

    case LOGIN_PANDIT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        successPandit: false,
        user: null,
      };

    case RESET_PANDIT_LOGIN:
      return {
        ...state,
        successPandit: false,
        error: null,
        loading: false,
      };

    // Auth Check
    case SET_PANDIT_AUTHENTICATED:
      return {
        ...state,
        isPanditAuthenticated: true,
        authPanditLoaded: true,
      };

    case AUTH_PANDIT_LOADED:
      return {
        ...state,
        authPanditLoaded: true,
      };

    // Logout Flow
    case LOGOUT_PANDIT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        logoutSuccess: false,
      };

    case LOGOUT_PANDIT_SUCCESS:
      return {
        ...state,
        loading: false,
        isPanditAuthenticated: false,
        logoutSuccess: true,
        user: null,
        error: null,
      };

    case LOGOUT_PANDIT_FAILURE:
      return {
        ...state,
        loading: false,
        logoutSuccess: false,
        error: action.payload,
      };

    case RESET_PANDIT_LOGOUT_STATE:
      return {
        ...state,
        logoutSuccess: false,
        error: null,
        loading: false,
      };

    // Default
    default:
      return state;
  }
};

export default panditAuthReducer;

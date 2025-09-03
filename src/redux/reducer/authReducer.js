import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  RESET_USER_LOGIN,
  SET_USER_AUTHENTICATED,
  AUTH_USER_LOADED,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILURE,
  RESET_USER_LOGOUT_STATE,
} from '../action/authAction';

// Initial State
const initialState = {
  loading: false,
  isAuthenticated: false,
  user: null,
  role: null,
  error: null,
  success: false,
  logoutSuccess: false,
  authLoaded: false,
};

// Reducer
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // Login Flow
    case LOGIN_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
      };

    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload?.user || null,
        role: action.payload?.user?.role || null,
        success: true,
        logoutSuccess: false,
        error: null,
      };

    case LOGIN_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
        user: null,
        role: null,
      };

    case RESET_USER_LOGIN:
      return {
        ...state,
        success: false,
        error: null,
        loading: false,
      };

    // Auth Check
    case SET_USER_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: true,
        authLoaded: true,
        user: action.payload?.user || null,
        role: action.payload?.role || null,
      };

    case AUTH_USER_LOADED:
      return {
        ...state,
        authLoaded: true,
      };

    // Logout Flow
    case LOGOUT_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        logoutSuccess: false,
      };

    case LOGOUT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        logoutSuccess: true,
        user: null,
        role: null,
        error: null,
      };

    case LOGOUT_USER_FAILURE:
      return {
        ...state,
        loading: false,
        logoutSuccess: false,
        error: action.payload,
      };

    case RESET_USER_LOGOUT_STATE:
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

export default authReducer;

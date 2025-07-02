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
  RESET_PANDIT_LOGOUT_STATE
} from '../action/panditAuthAction';

const initialState = {
  loading: false,
  isPanditAuthenticated: false,
  user: null,
  error: null,
  successPandit: false,
  logoutSuccess: false,
  authPanditLoaded: false,
};

const panditAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_PANDIT_REQUEST:
      return { ...state, loading: true, error: null };

    case LOGIN_PANDIT_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.affiliate,
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
      };

    case RESET_PANDIT_LOGIN:
      return { ...state, successPandit: false, error: null };

    case SET_PANDIT_AUTHENTICATED:
      return {
        ...state,
        isPanditAuthenticated: true,
        authPanditLoaded: true,
      };

    case AUTH_PANDIT_LOADED:
      return { ...state, authPanditLoaded: true };

    case LOGOUT_PANDIT_REQUEST:
      return { ...state, loading: true, error: null, logoutSuccess: false };

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
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};

export default panditAuthReducer;

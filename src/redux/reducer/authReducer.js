import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, RESET_LOGIN, SET_AUTHENTICATED, AUTH_LOADED, LOGOUT_SUCCESS, LOGOUT_FAILURE, RESET_LOGOUT_STATE, LOGOUT_REQUEST } from '../action/authAction';

const initialState = {
  loading: false,
  isAuthenticated: false,
  user: null,
  error: null,
  success: false,
  logoutSuccess: false,
  authLoaded: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.affiliate,
        success: true,
        logoutSuccess: false
      };
      case SET_AUTHENTICATED:
        return {
          ...state,
          isAuthenticated: true,
          authLoaded: true
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false
      };
    case LOGOUT_REQUEST:
      return { ...state, loading: true, error: null, logoutSuccess: false };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        error:null,
        loading: false,
        logoutSuccess: true,
      };
    case LOGOUT_FAILURE:
      return { ...state, loading: false, error: action.payload, logoutSuccess: false };
      case RESET_LOGOUT_STATE:
        return {
          ...state,
          logoutSuccess: false,
          loading: false,
          error: null,
          isAuthenticated: false,
        };      
      
    case RESET_LOGIN:
      return {
        ...state,
        success: false,
        error: null
      };
    case AUTH_LOADED:
      return {
        ...state,
        authLoaded: true
      };
    default:
      return state;
  }
};

export default authReducer;

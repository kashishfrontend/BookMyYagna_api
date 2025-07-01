import { combineReducers } from 'redux';
import authReducer from './reducer/authReducer';
import panditAuthReducer from './reducer/panditAuthReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  panditauth : panditAuthReducer
});

export default rootReducer;

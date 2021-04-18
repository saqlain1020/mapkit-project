import { combineReducers } from "redux";
import authReducer from './auth/authReducer';
import pinsReducer from './pins/pinsReducer';
import {reducer as toastrReducer} from 'react-redux-toastr'

var rootReducer = combineReducers({
    auth: authReducer,
    toastr: toastrReducer,
    pins: pinsReducer,
})

export default rootReducer
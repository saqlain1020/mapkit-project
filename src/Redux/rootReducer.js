import { combineReducers } from "redux";
import authReducer from './auth/authReducer';
import {reducer as toastrReducer} from 'react-redux-toastr'

var rootReducer = combineReducers({
    auth: authReducer,
    toastr: toastrReducer,
})

export default rootReducer
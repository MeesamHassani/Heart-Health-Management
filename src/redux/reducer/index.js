import { combineReducers } from 'redux';
import authReducer from "./authReducer";
import dataBasereducer from "./dataBasereducer"

export default combineReducers({
    auth: authReducer,
    userData: dataBasereducer,
});
import { combineReducers } from "redux";
import { loginReducer, registerReducer } from './auth-reducer';
import { updateResumeReducer } from './resume-reducer';
export default combineReducers({
    authData: loginReducer,
    registeredUsers: registerReducer,
    resume: updateResumeReducer
});
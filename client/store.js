import { applyMiddleware, createStore, combineReducers } from 'redux';
import promise from "redux-promise-middleware"
// import logger from "redux-logger"
import thunk from "redux-thunk"
// import { composeWithDevTools } from 'redux-devtools-extension';
import createSocketIoMiddleware from 'redux-socket.io';
import authReducer from './reducers/authReducer';

import { autoCurrentUser } from './actions/loginAction';
import setAuthorizationToken from './utils/setAuthorizationToken';


const middleware = applyMiddleware(thunk, promise())
const allReducers = combineReducers({
	authReducer: authReducer
});
const store = createStore(allReducers, middleware)

if(localStorage.jwtToken == 'undefined'){
	localStorage.removeItem('jwtToken');
}

if(localStorage.jwtToken){
	setAuthorizationToken(localStorage.jwtToken);
	store.dispatch(autoCurrentUser(localStorage.jwtToken))
}

export default store

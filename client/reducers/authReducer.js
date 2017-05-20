import _ from 'lodash';
import axios from 'axios';
import jwtDecode from 'jwt-Decode';
import setAuthorizationToken from '../utils/setAuthorizationToken';

const initialState = {
	isAuthenticated: false,
	user: {},
	rememberMe: false,
	error: ''
}

const authReducer = (state = initialState, action) => {
	switch(action.type){
		case 'AUTO_AUTH_USER':
			setAuthorizationToken(action.payload);
			localStorage.setItem('jwtToken', action.payload)
			state = {...state, isAuthenticated: true, user: jwtDecode(action.payload), error: ''}
			break;
		case 'SET_AUTH_USER_FULFILLED':
			setAuthorizationToken(action.payload.token);
			localStorage.setItem('jwtToken', action.payload.token)
			state = {...state, isAuthenticated: true, user: jwtDecode(action.payload.token), error: ''}
			break;
		case 'SET_AUTH_USER_REJECTED':
			setAuthorizationToken(false);
			localStorage.removeItem('jwtToken');
			state = {...state, isAuthenticated: false, user: {}, error: action.payload.response.data}
			break;
		case 'LOGOUT_AUTH_USER':
			setAuthorizationToken(false);
			localStorage.removeItem('jwtToken');
			state = {...state, isAuthenticated: false, user: {}, error: ''}
			break;
		case 'UPDATE_USER_SETTING':
		case 'UPDATE_USER_SETTING_FULFILLED':
			state = {...state, user: { ...state.user, location: action.payload.result.location } , error: ''}
			break;
	}
	return state;
}

export default authReducer




import axios from 'axios';
import jwtDecode from 'jwt-Decode';

export function autoCurrentUser(token){
	return {
		type: 'AUTO_AUTH_USER', payload: token
	}
}

export function logout(){
	return {
		type: 'LOGOUT_AUTH_USER', payload: ''
	}
}

export function login(data){
	return {
		type: 'SET_AUTH_USER', payload: axios.post('/api/login', data).then(function(response){
				return response.data
		})
	}
}

export function updateUserSetting(data){
	return {
		type: 'UPDATE_USER_SETTING', payload: axios.post('/api/user-setting', data).then(function(response){
			return response.data
		})
	}
}
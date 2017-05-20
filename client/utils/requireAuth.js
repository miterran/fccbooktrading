import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router'
// import { addFlashMessages } from '../actions/flashMessages';

export default function(ComposedComponent){
	class Authenticate extends React.Component{
		// componentWillMount(){
		// 	if(!this.props.isAuthenticated){
		// 		this.props.addFlashMessages({
		// 			type: 'error',
		// 			text: 'You need to login to Access this page'
		// 		})
		// 	}
		// }
		render(){
			if(!this.props.userAuth.isAuthenticated){
				return <Redirect to='/login' />
			}
			return(
				<ComposedComponent {...this.props} />
			)
		}
	}

	// Authenticate.propTypes ={
	// 	isAuthenticated: PropTypes.bool.isRequired,
	// 	addFlashMessages: PropTypes.func.isRequired
	// }

	function mapStateToProps(state){
		return {
			userAuth: state.authReducer
		}
	}


	return connect(mapStateToProps, null)(Authenticate);
}
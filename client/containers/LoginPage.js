import React, { Component } from "react";
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router'
import axios from 'axios';
import { Form, FormGroup, Col, FormControl, Button, Checkbox, Alert } from 'react-bootstrap';
import { login, logout } from '../actions/loginAction';

class LoginPage extends Component{
	constructor(){
		super();
		this.state = {
			username: '',
			password: '',
			rememberMe: false,
			login: false
		}
	}
	handleSubmit(e){
		e.preventDefault();
		this.props.login(this.state).then(function(data){
			if(data.value.token){
				this.setState({...this.state, login: true})
			}
		}.bind(this))
	}
	handleChange(e){
		this.setState({...this.state, [e.target.name]: e.target.value})
	}
	handleCheckbox(e){
		if(this.state.rememberMe == true){
			this.setState({...this.state, rememberMe: false})
		}else{
			this.setState({...this.state, rememberMe: true})
		}
	}
	handleRemoveErrorMsg(){
		this.props.logout();
	}
	render(){
	    if(this.state.login){
	    	return <Redirect to='/home' />;
	    }

		return(
			<div>

			<h4 className='text-center'>Login</h4>
			{this.props.userAuth.error && <Alert bsStyle="danger" onClick={this.handleRemoveErrorMsg.bind(this)}>{this.props.userAuth.error}</Alert>}
			<br />
			  <Form horizontal onSubmit={this.handleSubmit.bind(this)}>

			    <FormGroup controlId="formHorizontalEmail">
			      <Col smOffset={1} sm={2}>
			        Username
			      </Col>
			      <Col sm={6}>
			        <FormControl 
			        	type="text" 
			        	placeholder="Username" 
			        	name='username' 
			        	value={this.state.username} 
			        	onChange={this.handleChange.bind(this)}
			        	/>
			      </Col>
			    </FormGroup>

			    <FormGroup controlId="formHorizontalPassword">
			      <Col smOffset={1} sm={2}>
			        Password
			      </Col>
			      <Col sm={6}>
			        <FormControl 
				        type="password" 
				        placeholder="Password" 
			        	name='password' 
			        	value={this.state.password} 
			        	onChange={this.handleChange.bind(this)}
			        />
			      </Col>
			    </FormGroup>


			    <FormGroup>
			      <Col smOffset={3} sm={10}>
			        <Checkbox 
				        checked={this.state.rememberMe} 
				        onChange={this.handleCheckbox.bind(this)} 
			        >Remember me</Checkbox>
			      </Col>
			    </FormGroup>


			    <FormGroup>
			      <Col smOffset={3} sm={10}>
			        <Button type="submit">
			          Sign in
			        </Button>
			      </Col>
			    </FormGroup>
			  </Form>

			</div>
		)
	}
}

function mapStateToProps(state){
	return {
		userAuth: state.authReducer
	}
}

export default connect(mapStateToProps, { login, logout })(LoginPage);



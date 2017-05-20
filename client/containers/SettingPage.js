import React, { Component } from "react";
// import PropTypes from 'prop-types';
import { Redirect } from 'react-router'
import { connect } from 'react-redux';
import { Form, FormGroup, Col, FormControl, Button, Checkbox, Alert } from 'react-bootstrap';
import states from '../data/states';
import axios from 'axios';
import { updateUserSetting } from '../actions/loginAction';

class SettingPage extends Component{
	constructor(){
		super();
		this.state = {
			newLocation: '',
			currentPassword: '',
			newPassword: '',
			setting: false
		}
	}
	handleChange(e){
		this.setState({...this.state, [e.target.name]: e.target.value})
	}
	handleSubmit(e){
		e.preventDefault();
		this.props.updateUserSetting(this.state).then(function(response){
			this.setState({...this.state, setting: true})
		}.bind(this)).catch(function(error){
			this.setState({...this.state, newLocation: '', currentPassword: 'password not correct', newPassword: '', setting: false})
		}.bind(this))
	}
	render(){

	    if(this.state.setting){
	      return <Redirect to='/home' />;
	    }

		const stateList = states.map(function(state, idx){
			return <option key={state.name} value={state.name}>{state.name}</option>
		})

		return(
			<div>
				<h4 className='text-center'>Setting Page</h4>
				<br />
				  <Form horizontal onSubmit={this.handleSubmit.bind(this)}>

				    <FormGroup controlId="formHorizontalPassword">
				      <Col smOffset={1} sm={2}>
				        Current Password
				      </Col>
				      <Col sm={6}>
				        <FormControl 
				        	type="text" 
				        	placeholder="Current password" 
				        	name='currentPassword' 
			        		value={this.state.currentPassword} 
			        		onChange={this.handleChange.bind(this)}/>
				      </Col>
				    </FormGroup>

				    <FormGroup controlId="formHorizontalPassword">
				      <Col smOffset={1} sm={2}>
				        New Password
				      </Col>
				      <Col sm={6}>
				        <FormControl 
					        type="text" 
					        placeholder="New Password" 
				        	name='newPassword' 
			        		value={this.state.newPassword} 
			        		onChange={this.handleChange.bind(this)}/>
				      </Col>
				    </FormGroup>

				    <FormGroup>
				      <Col smOffset={1} sm={2}>
				        Old Location: {this.props.userAuth.location}
				      </Col>
				      <Col sm={6}>
				      <FormControl 
							componentClass="select" 
							placeholder="select" 
							name='newLocation'
			        		value={this.state.newLocation} 
			        		onChange={this.handleChange.bind(this)}>
				        <option value="">Choose your new location</option>
				        {stateList}
				      </FormControl>
				      </Col>
				    </FormGroup>

				    <FormGroup>
				      <Col smOffset={3} sm={10}>
				        <Button type="submit">
				          Save
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
		userAuth: state.authReducer.user
	}
}

export default connect(mapStateToProps, { updateUserSetting })(SettingPage);


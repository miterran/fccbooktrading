import React, { Component } from "react";
import { Redirect } from 'react-router'
// import PropTypes from 'prop-types';
import axios from 'axios';
import { Form, FormGroup, Col, FormControl, Button, ControlLabel } from 'react-bootstrap';
import states from '../data/states';

class RegisterPage extends Component{
	constructor(){
		super();
		this.state = {
			username: '',
			email: '',
			password: '',
			location: '',
			accountCreate: false
		}
	}
	handleSubmit(e){
		e.preventDefault();
		axios.post('/api/register', this.state).then(function(response){
			this.setState({...this.state, accountCreate: true})
		}.bind(this)).catch(function(error){
			console.log(error)
		})
	}
	handleChange(e){
		this.setState({...this.state, [e.target.name]: e.target.value})
	}
	render(){

	    if(this.state.accountCreate){
	      return <Redirect to='/login' />;
	    }

		const stateList = states.map(function(state, idx){
			return <option key={state.name} value={state.name}>{state.name}</option>
		})

		return(
			<div>

			<h4 className='text-center'>Register</h4>
			<br />
			  <Form horizontal onSubmit={this.handleSubmit.bind(this)}>

			    <FormGroup>
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

			    <FormGroup>
			      <Col smOffset={1} sm={2}>
			        Email
			      </Col>
			      <Col sm={6}>
			        <FormControl 
				        type="email" 
				        placeholder="Email" 
			        	name='email' 
			        	value={this.state.email} 
			        	onChange={this.handleChange.bind(this)}
			        />
			      </Col>
			    </FormGroup>

			    <FormGroup>
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
			      <Col smOffset={1} sm={2}>
			        Location
			      </Col>
			      <Col sm={6}>
			      <FormControl 
						componentClass="select" 
						placeholder="select" 
						name='location' 
						value={this.state.location} 
						onChange={this.handleChange.bind(this)}
				    >
			        <option value="">Choose your state</option>
			        {stateList}
			      </FormControl>
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

export default RegisterPage


// <div>
//    <Form inline className="addStock"  onSubmit={this.submitQuote.bind(this)}>
//    	<FormControl type="text" placeholder="Stock code / 'AAPL'" value={this.state.quote} onChange={this.addStockInput.bind(this)} />&nbsp;&nbsp;<Button type='submit' disabled={this.props.flashMessage.isLoading}>Add</Button>
//    </Form>
//    {this.props.flashMessage.errors &&  <div className='alert alert-danger' style={{marginTop: 10}} onClick={this.removeFlashMessage.bind(this)}>{this.props.flashMessage.errors}</div>}
//    {this.props.flashMessage.alert && <div className='alert alert-warning' style={{marginTop: 10}} onClick={this.removeFlashMessage.bind(this)}>{this.props.flashMessage.alert}</div>}
// </div>
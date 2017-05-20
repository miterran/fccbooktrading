import React, { Component } from "react";
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap';
import { Jumbotron, Navbar, NavItem, Nav } from 'react-bootstrap';
import { logout } from '../actions/loginAction';

class App extends Component{
	logout(e){
		e.preventDefault();
		this.props.logout();
	}
	render(){
		return(
			<div className="container mainbox">
				  <Navbar inverse collapseOnSelect>
				    <Navbar.Header>
				      <Navbar.Brand>
				        <a href="#">{this.props.user.user.username ? this.props.user.user.username + '-' + this.props.user.user.location : 'Book Trading'}</a>
				      </Navbar.Brand>
				      <Navbar.Toggle />
				    </Navbar.Header>
				    <Navbar.Collapse>
				      <Nav>
				    	<LinkContainer to='/home'><NavItem eventKey={1}>Home</NavItem></LinkContainer>
				    	<LinkContainer to='/browserbooks'><NavItem eventKey={2}>Browser All Books</NavItem></LinkContainer>
				    	<LinkContainer to='/mybooks'><NavItem eventKey={3}>My Books</NavItem></LinkContainer>
				      </Nav>
				      <Nav pullRight style={{paddingRight: 20}}>
				        {!this.props.user.isAuthenticated && <LinkContainer to='/register'><NavItem eventKey={1}>Register</NavItem></LinkContainer> }
				        {!this.props.user.isAuthenticated &&  <LinkContainer to='/login'><NavItem eventKey={2}>Login</NavItem></LinkContainer> }
				        {this.props.user.isAuthenticated &&   <LinkContainer to='/history'><NavItem eventKey={3}>History</NavItem></LinkContainer> }
				        {this.props.user.isAuthenticated &&   <LinkContainer to='/setting'><NavItem eventKey={4}>Setting</NavItem></LinkContainer> }
				        {this.props.user.isAuthenticated &&  <NavItem eventKey={5} href="#" onClick={this.logout.bind(this)}>Logout</NavItem> }
				      </Nav>
				    </Navbar.Collapse>
				  </Navbar>

				<Jumbotron>
					{this.props.children}
				</Jumbotron>
			</div>
		)
	}
}

function mapStateToProps(state){
	return {
		user: state.authReducer
	}
}

export default connect(mapStateToProps, { logout }, null, {pure: false})(App);

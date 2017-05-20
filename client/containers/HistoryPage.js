import React, { Component } from "react";
// import PropTypes from 'prop-types';
import axios from 'axios'; 
import { Row, Form, FormGroup, FormControl, Col, Button, Thumbnail, Alert, ButtonToolbar } from 'react-bootstrap';

class HistoryPage extends Component{
	constructor(){
		super();
		this.state = {
			historyData: []
		}
	}
	componentWillMount(){
		this.updateHistoryList()
	}
	updateHistoryList(){
		axios.get('/api/user-history').then(function(response){
			this.setState({...this.state, historyData: response.data.result.history})
		}.bind(this))
	}
	render(){
		const historyBookList = this.state.historyData.map(function(book, idx){
			return(
			    <Col className='bookCol' lg={2} key={'userbooklist' + book.ASIN}>
			      <Thumbnail src={book.imgURL}>
			      	<small>ASIN: {book.ASIN}</small>
			      	<br />
			      	<small>Traded to: {book.requesterInfo.username}</small>
			      	<br />
			      	<small>Email: {book.requesterInfo.email}</small>
			      	<br />
			      	<small>Location: {book.requesterInfo.location}</small>
			      	<br />
			      	<small>Date: {book.time || ''}</small>
			      	<br />
			        <h6 className="text-nowrap bookTitle">{book.title}</h6>
			      </Thumbnail>
			    </Col>
			)
		}.bind(this))

		return(
			<div>
				<h4>Trade History</h4>
			    <Row>
			    	{historyBookList}
			    </Row>
			</div>
		)
	}
}

export default HistoryPage



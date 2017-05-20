import React, { Component } from "react";
// import PropTypes from 'prop-types';
import axios from 'axios';
import { Row, Form, FormGroup, FormControl, Col, Button, Thumbnail, Alert } from 'react-bootstrap';

class BrowserBooksPage extends Component{
	constructor(){
		super();
		this.state = {
			bookList: []
		}
	}
	componentWillMount(){
		this.updateBooksList()
	}
	updateBooksList(){
		axios.get('/api/book-list').then(function(response){
			this.setState({...this.state, bookList: response.data.booksArr})
		}.bind(this))
	}
	tradeRequest(book){
		axios.post('/api/tradeRequest', book).then(function(response){
			this.updateBooksList()
		}.bind(this))
	}
	render(){
		const books = this.state.bookList.map(function(book){
			return(
			    <Col className='bookCol' lg={2} key={'userbooklist' + book.ASIN}>
			      <Thumbnail src={book.imgURL}>
			      	<small>{'ASIN: ' + book.ASIN}</small>
			      	<br />
			      	<small>{'Owner: ' + book.user}</small>
			      	<br />
			      	<small>{'From: ' + book.location}</small>
			      	<br />
			      	<small>{'Requesting: ' + book.status.requesting.length}</small>
			        <h6 className="text-nowrap bookTitle">{book.title}</h6>
			        <Button bsSize='xs' bsStyle="default" onClick={() => this.tradeRequest(book)}>Trade Request</Button>
			      </Thumbnail>
			    </Col>
				)
		}.bind(this))

		return(
			<div>
			    	{this.state.bookList.length > 0 && <h4>All Books</h4>}
			    <Row>
					{books}
			    </Row>
			</div>
		)
	}
}

export default BrowserBooksPage



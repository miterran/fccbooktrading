import React, { Component } from "react";
// import PropTypes from 'prop-types';
import axios from 'axios';
import { Row, Form, FormGroup, FormControl, Col, Button, Thumbnail, Alert, ButtonToolbar } from 'react-bootstrap';

class MyBooksPage extends Component{
	constructor(){
		super();
		this.state = {
			bookname: '',
			yourRequestDisplay: false,
			userRequestDisplay: false,
			userRequest: [],
			yourRequest: [],
			searchResult: [],
			userBookList: [],
			pendingApprove: {},
			isLoading: false,
			error: ''
		}
	}
	componentWillMount(){
		axios.get('/api/user-books/list').then(function(response){
			let userRequestBookArr = []
			response.data.userBookList.map(function(book, idx){
				if(book.status.requesting.length > 0){
					userRequestBookArr.push(book)
				}
			})
			this.setState({...this.state, userBookList: response.data.userBookList, userRequest: userRequestBookArr})
		}.bind(this)).catch(function(err){
			console.log(err)
		})
		this.updateYourTradeRequestList()
	}
	updateYourTradeRequestList(){
		axios.get('/api/user-books/your-trade-request').then(function(response){
			this.setState({...this.state, yourRequest: response.data.result})
		}.bind(this)).catch(function(err){
			console.log(err)
		})
	}
	handleSearch(e){
		e.preventDefault();
		this.setState({...this.state, isLoading: true})
		axios.post('/api/user-books/search', {search: this.state.bookname}).then(function(response){
			this.setState({...this.state, searchResult: response.data, error: '', isLoading: false})
		}.bind(this)).catch(function(error){
			this.setState({...this.state, error: 'Book not found', isLoading: false})
		}.bind(this))
	}
	handleChange(e){
		this.setState({...this.state, bookname: e.target.value, error: ''})
	}
	handleAddBook(book){
		this.setState({...this.state, isLoading: true})
		let newBook = {
			ASIN: book.ASIN[0],
			imgURL: book.MediumImage[0].URL[0],
			title: book.ItemAttributes[0].Title[0]
		}
		axios.post('/api/user-books/add', newBook).then(function(response){
			this.setState({...this.state, bookname: '', searchResult: [], userBookList: response.data.booksList, isLoading: false})
		}.bind(this)).catch(function(error){
			this.setState({...this.state, bookname: '', error: 'book already in list', isLoading: false})
		}.bind(this))
	}
	handleRemoveErrorMsg(){
		this.setState({...this.state, error: ''})
	}
	handleDeleteBook(book){
		this.setState({...this.state, isLoading: true})
		axios.post('/api/user-books/delete', book).then(function(response){
			this.setState({...this.state, userBookList: response.data.booksList, isLoading: false})
		}.bind(this))
	}
	showYourRequestBooks(){
		if(this.state.yourRequestDisplay == false){
			this.setState({...this.state, yourRequestDisplay: true, userRequestDisplay: false})
		}else{
			this.setState({...this.state, yourRequestDisplay: false, userRequestDisplay: false})
		}
	}
	showUserRequestBooks(){
		if(this.state.userRequestDisplay == false){
			this.setState({...this.state, userRequestDisplay: true, yourRequestDisplay: false})
		}else{
			this.setState({...this.state, userRequestDisplay: false, yourRequestDisplay: false})
		}
	}
	removeMyRequestBook(book){
		axios.post('/api/user-books/remove-my-book-request', book).then(function(response){
			this.updateYourTradeRequestList()
		}.bind(this))
	}
	approveRequest(e){
		e.preventDefault();
		if(this.state.pendingApprove[Object.keys(this.state.pendingApprove)[0]]){
			let query = {
				ASIN: Object.keys(this.state.pendingApprove)[0],
				requester: this.state.pendingApprove[Object.keys(this.state.pendingApprove)[0]]
			}
			axios.post('/api/user-books/approve', query).then(function(response){


				let userRequestBookArr = []
				response.data.result.booksList.map(function(book, idx){
					if(book.status.requesting.length > 0){
						userRequestBookArr.push(book)
					}
				})
				this.setState({...this.state, userBookList: response.data.result.booksList, userRequest: userRequestBookArr})


			}.bind(this))
		}
	}
	handleOptionChange(e){
		this.setState({...this.state, pendingApprove: { [e.target.name]: e.target.value }})
	}
	render(){
		const searchResultList = this.state.searchResult.map(function(book, idx){
			if(idx < 6){
				return (
				    <Col className='bookCol' lg={2} key={'search' + book.ASIN[0]}>
				      <Thumbnail src={book.MediumImage[0].URL[0]}>
				      	<small>{'ASIN: ' + book.ASIN}</small>
				        <h6 className="text-nowrap bookTitle">{book.ItemAttributes[0].Title[0]}</h6>
				        <Button style={{marginLeft: 80}} bsSize='xs' bsStyle="default" onClick={() => this.handleAddBook(book)} disabled={this.state.isLoading}>Add</Button>
				      </Thumbnail>
				    </Col>
				)
			}
		}.bind(this))

		const userBookList = this.state.userBookList.map(function(book, idx){
			return (
			    <Col className='bookCol' lg={2} key={'userbooklist' + book.ASIN}>
			      <Thumbnail src={book.imgURL}>
			      	<small>{'ASIN: ' + book.ASIN}</small>
			        <h6 className="text-nowrap bookTitle">{book.title}</h6>
			        <Button style={{marginLeft: 70}} bsSize='xs' bsStyle="default" onClick={() => this.handleDeleteBook(book)}>Delete</Button>
			      </Thumbnail>
			    </Col>
			)
		}.bind(this))

		const yourRequestBook = this.state.yourRequest.map(function(book, idx){
			return(
			    <Col className='bookCol' lg={2} key={'userbooklist' + book.ASIN}>
			      <Thumbnail src={book.imgURL}>
			      	<small>{'ASIN: ' + book.ASIN}</small>
			      	<br />
			      	<small>{'Owner: ' + book.user}</small>
			      	<br />
			      	<small>{'From: ' + book.location}</small>
			      	<br />
			        <h6 className="text-nowrap bookTitle">{book.title}</h6>
			        <Button bsSize='xs' bsStyle="default" onClick={() => this.removeMyRequestBook(book)}>Don't want it</Button>
			      </Thumbnail>
			    </Col>
			)
		}.bind(this))

		const userRequestBook = this.state.userRequest.map(function(book, idx){
			return(
			    <Col className='bookCol' lg={2} key={'userbooklist' + book.ASIN}>
			      <Thumbnail src={book.imgURL}>
			      	<small>{'ASIN: ' + book.ASIN}</small>
			      	<br />
			        <h6 className="text-nowrap bookTitle">{book.title}</h6>
			        <Form onSubmit={this.approveRequest.bind(this)}>
					    <FormGroup>
					      <FormControl 
								componentClass="select" 
								placeholder="select" 
								name={book.ASIN}
								value={this.state.pendingApprove[book.ASIN] || ''}
								onChange={this.handleOptionChange.bind(this)}
								>
					        <option value="">requester</option>
					        {book.status.requesting.map(function(requester, idx){
								return <option key={requester} value={requester}>{requester}</option>
					        })}
					      </FormControl>
					    </FormGroup>

			        <Button bsSize='xs' bsStyle="default" type="submit">Approve</Button>
			        </Form>
			      </Thumbnail>
			    </Col>
			)
		}.bind(this))


		return(
			<div>
				<ButtonToolbar>
				<Button bsStyle="primary" onClick={this.showYourRequestBooks.bind(this)}>Your trade request ( {this.state.yourRequest.length} outstanding )</Button>
				<Button bsStyle="success" onClick={this.showUserRequestBooks.bind(this)}>Trade requests for you ( {this.state.userRequest.length} outstanding )</Button>
				</ButtonToolbar>
				<br />
				{this.state.yourRequestDisplay && <Row>{yourRequestBook}</Row>}
				{this.state.userRequestDisplay && <Row>{userRequestBook}</Row>}
				<Row>
				<Col sm={10}>
					<h4>MyBooks Page</h4>
				</Col>
				<Form onSubmit={this.handleSearch.bind(this)}>
					<FormGroup>
					    <Col sm={6}>
					    	<FormControl 
						    	type="text" 
						    	placeholder="Enter Book Name / ASIN / ISBN" 
						    	name='bookname' 
						    	value={this.state.bookname} 
						    	onChange={this.handleChange.bind(this)} 
					    	/>
					    </Col>
					    </FormGroup>
					    <FormGroup>
					    <Col sm={2}>
					    	<Button type="submit" disabled={this.state.isLoading}>Search</Button>
					    </Col>
				    </FormGroup>
			 	 </Form>
			  </Row>

			  <hr />
				{this.state.error && <Alert bsStyle="danger" onClick={this.handleRemoveErrorMsg.bind(this)}>{this.state.error}</Alert>}
				{this.state.searchResult.length > 0 && <div><hr className='style1' /> <h4>Search Result</h4></div>}
		    <Row>
				{searchResultList}
		    </Row>

		    	{this.state.userBookList.length > 0 && <div><hr className='style1' /> <h4>My Book List</h4></div>}
		    <Row>
				{userBookList}
		    </Row>

			</div>
		)
	}
}

export default MyBooksPage



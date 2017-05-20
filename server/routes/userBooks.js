import express from 'express';
const router = express.Router();
import moment from 'moment';

import User from '../models/user';
import JwtStrategy from '../middleware/JwtStrategy';
import passport from "passport";

import Amazon from 'amazon-product-api';
const amazonClient =  Amazon.createClient({
										  awsId: "AKIAINN77LKTBQNIU2MQ",
										  awsSecret: "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",
										  awsTag: "f01d52-20"
										});

passport.use(JwtStrategy);


router.post('/add', passport.authenticate('jwt', {session: false}), function(req, res){
	let addBook = req.user.booksList.every(function(val, idx){
		return val.ASIN !== req.body.ASIN
	})
	if(addBook){
		let newBook = {
			title: req.body.title,
			imgURL: req.body.imgURL,
			ASIN: req.body.ASIN,
			user: req.user.username,
			location: req.user.location,
			status: {
				requesting: [],
				tradedWithUser: ''
			}
		}
		User.findOneAndUpdate({username: req.user.username}, {$push: { booksList: newBook }}, {new: true}, function(err, result){
			if(err){
				res.status(404)
			}else{
				res.json({booksList: result.booksList})
			}
		})
	}else{
		res.status(404).json({error: 'book already in your list'})
	}
})

router.post('/delete', passport.authenticate('jwt', {session: false}), function(req, res){
	User.findOneAndUpdate({username: req.user.username}, {$pull: { booksList: { ASIN: req.body.ASIN } }}, {new: true}, function(err, result){
		if(err){
			res.status(404)
		}else{
			res.json({booksList: result.booksList})
		}
	})
})

router.post('/search', passport.authenticate('jwt', {session: false}), function(req, res){
	amazonClient.itemSearch({
	  searchIndex: 'Books',
	  Keywords: req.body.search,
	  responseGroup: 'ItemAttributes, Images'
	}).then(function(results){
	  res.json(results);
	}).catch(function(err){
	  res.status(404).send('book not found')
	});
})

router.get('/list', passport.authenticate('jwt', {session: false}), function(req, res){
	User.findOne({username: req.user.username}, function(err, result){
		if(err){
			res.status(404).send('no result')
		}
		res.json({userBookList: result.booksList})
	})
})


router.get('/your-trade-request', passport.authenticate('jwt', {session: false}), function(req, res){
	User.find({username: {$ne: req.user.username}}, function(err, result){
		let requestingBook = []
		result.map(function(owner, idx){
			owner.booksList.map(function(book, idx){
				book.status.requesting.map(function(me, idx){
					if(me == req.user.username){
						let thisBook = {
							title: book.title,
							imgURL: book.imgURL,
							ASIN: book.ASIN,
							user: owner.username,
							location: owner.location
						}
						requestingBook.push(thisBook)
					}
				})
			})
		})
		res.json({result: requestingBook})
	})
})

router.post('/remove-my-book-request', passport.authenticate('jwt', {session: false}), function(req, res){
	User.findOneAndUpdate({ username: req.body.user, booksList: {$elemMatch: {'ASIN': req.body.ASIN}}}, {$pull: {'booksList.$.status.requesting': req.user.username}}, {new: true}, function(err, result){
		res.json({result: result})
	})
})

router.post('/approve', passport.authenticate('jwt', {session: false}), function(req, res){
	User.findOneAndUpdate({username: req.user.username}, {$pull: {'booksList': {ASIN: req.body.ASIN}}}, function(err, result){
		result.booksList.map(function(book, idx){
			book.status.requesting.map(function(requester, idx){
				if(book.ASIN == req.body.ASIN && requester == req.body.requester){
					User.findOne({username: requester}, function(err, requesterInfo){
						let approvedBook = book
						approvedBook.time = moment().format('MMM Do YY');
						approvedBook.requesterInfo = requesterInfo
						User.findOneAndUpdate({ username: req.user.username }, {$push: {history: approvedBook}}, {new: true}, function(err, updatedb){
							res.json({result: updatedb})
						})
					})
				}
			})
		})
	})
})

export default router



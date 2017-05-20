import express from 'express';
const router = express.Router();

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

router.get('/', passport.authenticate('jwt', {session: false}), function(req, res){
	User.find({username: { $ne: req.user.username }}, 'username location booksList', function(err, result){
		let booksArr = []
		result.map(function(val, idx){
			val.booksList.map(function(book){
				let myBook = {}
				myBook.ASIN = book.ASIN
				myBook.title = book.title
				myBook.imgURL = book.imgURL
				myBook.user = val.username
				myBook.location = val.location
				myBook.status = book.status
				booksArr.push(myBook)
			})
		})
		res.json({booksArr: booksArr})
	})
})

export default router




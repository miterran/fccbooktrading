import express from 'express';
import User from '../models/user';
const router = express.Router();


router.post('/', (req, res) => {
	let newUser = new User({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password,
		location: req.body.location,
		books: []
	});

	newUser.save().then(function(){
		res.json({ accountCreated: true })
	})

})

export default router
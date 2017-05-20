import express from 'express';
import User from '../models/user';
const router = express.Router();

import jwt from 'jsonwebtoken';

router.post('/', (req, res) => {
	User.findOne({username: req.body.username}, '_id username password email location', function(err, result){
		if(result){
			if(result.password == req.body.password){
				const token = jwt.sign({
					id: result._id,
					username: result.username,
					email: result.email,
					location: result.location
				}, 'hi');
				return res.status(200).json({token})
			}else{
				console.log('hi')
				return res.status(404).send('password not correct')
			}
		}else{
			return res.status(404).send('user not found')
		}
	})
})

export default router




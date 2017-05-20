import express from 'express';
const router = express.Router();

import User from '../models/user';
import JwtStrategy from '../middleware/JwtStrategy';
import passport from "passport";

passport.use(JwtStrategy);

router.post('/', passport.authenticate('jwt', {session: false}), function(req, res){
	if(req.body.currentPassword){
		if(req.body.newLocation && req.body.newPassword){
			User.findOneAndUpdate({username: req.user.username, password: req.body.currentPassword}, { $set: { location: req.body.newLocation, password: req.body.newPassword } }, {new: true}, function(err, result){
				if(result){
					res.json({result: result})
				}else{
					res.status(404).send('password not match')
				}
			})
		}else if(req.body.newLocation && !req.body.newPassword){
			User.findOneAndUpdate({username: req.user.username, password: req.body.currentPassword}, { $set: { location: req.body.newLocation} },{new: true}, function(err, result){
				if(result){
					res.json({result: result})
				}else{
					res.status(404).send('password not match')
				}
			})
		}else if(req.body.newPassword && !req.body.newLocation){
			User.findOneAndUpdate({username: req.user.username, password: req.body.currentPassword}, { $set: { password: req.body.newPassword} }, {new: true}, function(err, result){
				if(result){
					res.json({result: result})
				}else{
					res.status(404).send('password not match')
				}
			})
		}
	}
})

export default router



import express from 'express';
const router = express.Router();

import User from '../models/user';
import JwtStrategy from '../middleware/JwtStrategy';
import passport from "passport";

passport.use(JwtStrategy);

router.get('/', passport.authenticate('jwt', {session: false}), function(req, res){
	User.findOne({username: req.user.username}, function(err, result){
		res.json({result: result})
	})
})

export default router
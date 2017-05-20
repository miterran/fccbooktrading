import express from 'express';
const router = express.Router();

import User from '../models/user';
import JwtStrategy from '../middleware/JwtStrategy';
import passport from "passport";

passport.use(JwtStrategy);

router.post('/', passport.authenticate('jwt', {session: false}), function(req, res){
	User.findOneAndUpdate({ username: req.body.user, booksList: {$elemMatch: {'ASIN': req.body.ASIN, 'status.requesting': {$ne: req.user.username}}}}  , {$push: {'booksList.$.status.requesting': req.user.username}}, {new: true},function(err, result){
		res.json({result: result})
	})

})

export default router
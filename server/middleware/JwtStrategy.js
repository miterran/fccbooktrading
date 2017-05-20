import User from '../models/user';
import passport from "passport";
import passportJWT from "passport-jwt";
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;


let jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = 'hi';


let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  User.findOne({username: jwt_payload.username}, '_id username email location booksList', function(err, user){
    if(user){
      next(null, user);
    }else{
      next(null, false)
    }
  })
});

export default strategy

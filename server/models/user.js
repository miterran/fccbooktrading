import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
	username: String,
	email: String,
	password: String,
	location: String,
	booksList: Array,
	history: Array
});


const User = mongoose.model('user', UserSchema);

export default User;

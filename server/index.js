import express from 'express';
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;
// import morgan from 'morgan';
import bodyParser from 'body-parser';
import _ from 'lodash';

import passport from "passport";
app.use(passport.initialize());

import mongoose from 'mongoose'
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://test:test@ds139791.mlab.com:39791/booktrading')

import login from './routes/login';
import register from './routes/register';
import userBooks from './routes/userBooks';
import bookList from './routes/bookList';
import userSetting from './routes/userSetting';
import tradeRequest from './routes/tradeRequest';
import userHistory from './routes/userHistory';

// app.use(morgan('dev'));

app.use('/js', express.static(__dirname + '/js'))
app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/login', login)
app.use('/api/register', register)
app.use('/api/user-books', userBooks)
app.use('/api/book-list', bookList)
app.use('/api/user-setting', userSetting)
app.use('/api/tradeRequest', tradeRequest)
app.use('/api/user-history', userHistory)

app.get('/*', function(req, res){
	res.render('../client/views/index')
})


server.listen(port, function(){
	console.log('listening to port 3000')
})



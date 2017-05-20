import React from 'react';
import ReactDOM from 'react-dom';
import './views/style.scss';

import { Router, Route } from 'react-router';
import { createBrowserHistory } from 'history';
import { Provider } from "react-redux"
import store from "./store"

import App from './layouts/App';
import HomePage from './containers/HomePage';
import RegisterPage from './containers/RegisterPage';
import LoginPage from './containers/LoginPage';
import BrowserBooksPage from './containers/BrowserBooksPage';
import MyBooksPage from './containers/MyBooksPage';
import SettingPage from './containers/SettingPage';
import HistoryPage from './containers/HistoryPage';
import requireAuth from './utils/requireAuth';


ReactDOM.render(
	<Provider store={store}>
		<Router history={createBrowserHistory()}>
			<App>
				<Route exact path='/home' component={HomePage} />
				<Route exact path='/browserbooks' component={requireAuth(BrowserBooksPage)} />
				<Route exact path='/mybooks' component={requireAuth(MyBooksPage)} />
				<Route exact path='/history' component={requireAuth(HistoryPage)} />
				<Route exact path='/register' component={RegisterPage} />
				<Route exact path='/setting' component={requireAuth(SettingPage)} />
				<Route exact path='/login' component={LoginPage} />
			</App>
		</Router>
	</Provider>,
	document.getElementById('app')
);








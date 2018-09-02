import React from 'react';
import logo from './logo.png';
import './Header.css';

export default class Header extends React.Component {
	render() {
		return (
			<div className="App-header">
					<a className="App-logo-link" href="/"><img src={logo} className="App-logo" alt="logo" />
					</a>
				<a href="/">
					<h1 className="App-title">File Manager</h1>
				</a>
			</div>
		);
	}
}

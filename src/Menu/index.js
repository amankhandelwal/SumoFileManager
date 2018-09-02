import React from 'react';
import './Menu.css';

export default class Menu extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div id="menu" className="menu-invisible">
				<p className="menu-item">Delete</p>
				<p className="menu-item">New File</p>
				<p className="menu-item">New Folder</p>
			</div>
		);
	}
}

import React from 'react';
import './WinItem.css';
import Menu from './../../Menu';
import icons from './../../compressed/icons.js';

export default class Item extends React.Component {
	constructor(props) {
		super(props);
	}
	handleLeftClick() {
		let menu = document.querySelector('#menu');
		menu.className = 'menu-invisible';
	}
	componentDidMount() {
		document.querySelector('.win-item-name').addEventListener('contextmenu', function(e) {
			e.preventDefault();
			console.log(e.target.innerHTML);
			let menu = document.querySelector('#menu');
			menu.className = 'menu-visible';
			menu.style.top = e.clientY + 'px';
			menu.style.left = e.clientX + 'px';
		});
	}

	render() {
		let cname = 'win-item-container hoverable';
		if (this.props.hoverable === false) {
			cname = 'win-item-container';
		}
		return (
			<div
				className={cname}
				onClick={() => {
					console.log('Window item clicked');
					if (this.props.helper) {
						this.props.helper.pushPwd(this.props.title);
					}
					this.props.changeSelected(this.props.content);
				}}
			>
				<div className="win-item-name">
					<img src={icons[this.props.filetype || 'folder']} alt="" className="icon-img" />
					<h3 className="win-item-title">{this.props.title}</h3>
				</div>
				<p className="win-item-subtitle">{this.props.date || ''}</p>
				<p className="win-item-subtitle">{this.props.filetype || ''}</p>
			</div>
		);
	}
}

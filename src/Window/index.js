import React from 'react';
import './Window.css';
import Item from './WinItem';
import Menu from './../Menu';

export default class Window extends React.Component {
	constructor(props) {
		super(props);
		// this.traverse = this.traverse.bind(this);
		// this.createFolder = this.createFolder.bind(this);
	}
	innerFolderStructure() {
		const content = this.props.selected;
		let innerContent = null;
		if (typeof content === 'object') {
			const innerFolders = Object.keys(content);
			if (innerFolders.length != 0) {
				innerContent = innerFolders.map((item, index) => {
					if (item === 'title') return null;
					else if (item === 'files') {
						return content.files.map((item, index) => {
							return (
								<Item
									changeSelected={() => console.log('file')}
									key={index}
									title={item.file_name}
									filetype={item.type}
								/>
							);
						});
					} else
						return (
							<Item
								changeSelected={this.props.changeSelected}
								key={index}
								title={item}
								helper={this.props.helper}
								content={content[item]}
							/>
						);
				});
			}
		}
		return innerContent;
	}
	handleLeftClick() {
		let menu = document.querySelector('#menu');
		menu.className = 'menu-invisible';
	}
	componentDidMount() {
		document.querySelector('.win-container').addEventListener('contextmenu', function(e) {
			e.preventDefault();
			// console.log(e);
			let menu = document.querySelector('#menu');
			menu.className = 'menu-visible';
			menu.style.top = e.clientY + 'px';
			menu.style.left = e.clientX + 'px';
		});
	}
	/*traverse(directory, data = this.props.helper.data) {
		// let data=this.props.data;
		if (directory.length == 0) {
			return [...data, ('new folder ' + Math.random(): {})];
		}
		let x = directory.pop(0);
		data[x] = new this.traverse(directory, data[x]);
		return data;
	}
	createFolder() {
		let dir = this.props.helper.pwd;
		let data = [...data, ('new folder ' + Math.random(): {})];
		this.props.helper.setData(data);
	}*/
	render() {
		let PWD = [...this.props.helper.pwd];
		return (
			<div className="win-container" onClick={this.handleLeftClick}>
				<h1 className="win-title">Detailed View</h1>
				<p className="win-subtitle">
					<strong>PWD: </strong>
					{PWD.join(' > ')}
				</p>
				<div className="win-items">
					<Item
						hoverable={false}
						changeSelected={() => {}}
						key={'title'}
						title={'Name'}
						date={'Date'}
						filetype={'File Type'}
					/>
					<p
						className="back-button"
						onClick={() => {
							this.props.helper.popPwd();
						}}
					>
						<i class="fa fa-arrow-left" aria-hidden="true" />
						&nbsp;&nbsp;Go Back
					</p>
					{this.innerFolderStructure()}
				</div>
				<Menu />
			</div>
		);
	}
}

import React from 'react';
import './Item.css';
import icons from './../../compressed/icons.js';

export default class Item extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			pwd: []
		};
	}

	componentWillMount() {
		let mypwd;
		if (this.props.title && this.props.pwd) {
			console.log('CWM:' + this.props.title);
			mypwd = [...this.props.pwd, this.props.title];
			this.setState({ pwd: mypwd });
		}
	}

	innerFolderStructure() {
		const content = this.props.content;
		let innerContent = null;
		let pwd = this.state.pwd;
		if (this.state.visible && typeof content === 'object' && !Array.isArray(content)) {
			const innerFolders = Object.keys(content);
			// console.log(innerFolders);
			if (innerFolders.length != 0) {
				innerContent = innerFolders.map((item, index) => {
					if (item === 'title' || item === 'files') return null;
					return (
						<Item
							changeSelected={this.props.changeSelected}
							key={'' + index + item}
							title={item}
							helper={this.props.helper}
							pwd={[...this.props.pwd, this.props.title]}
							content={content[item]}
						/>
					);
				});
			}
		}
		return innerContent;
	}

	innerFileStructure() {
		const content = this.props.content.files;
		let innerContent = null;
		if (content && this.state.visible) {
			innerContent = content.map((item, index) => (
				<div className="item-name">
					<img src={icons[item.type]} alt="" className="icon-img" />
					<p className="file-name" key={index}>{item.file_name}</p>
				</div>
			));
		}
		return innerContent;
	}

	render() {
		return (
			<div className="item-container">
				<div
					className="item-name"
					onClick={() => {
						console.log('OnClick' + this.props.title);
						this.setState({ visible: !this.state.visible });
						this.props.helper.setPwd(this.state.pwd);
						this.props.changeSelected(this.props.content);
					}}
				>
					<img src={icons['folder']} alt="" className="icon-img" />
					<h3 className="item-title">{this.props.title}</h3>
					<i className={this.state.visible ? 'fa fa-angle-right' : ' fa fa-angle-down'} aria-hidden="true" />
				</div>
				<div className="item-inner-content">{this.innerFolderStructure()}</div>
				<div className="item-inner-content">{this.innerFileStructure()}</div>
			</div>
		);
	}
}

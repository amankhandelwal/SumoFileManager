import React from 'react';
import './Explorer.css';
import Item from './Item';

export default class Explorer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: props.helper.data
		};
	}

	render() {
		let items = null;
		let data = Object.keys(this.state.data);
		if (data.length != 0)
			items = data.map((item, index) => (
				<Item
					changeSelected={this.props.changeSelected}
					key={item + index}
					className="exp-item"
					title={item}
					helper={this.props.helper}
					pwd={[]}
					content={this.state.data[item]}
				/>
			));
		return (
			<div className="exp-container">
				<h1 className="exp-title">Explorer</h1>
				<div className="exp-item-container">{items}</div>
			</div>
		);
	}
}

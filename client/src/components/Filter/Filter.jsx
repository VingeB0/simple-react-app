import React, {Component} from 'react';

import '../../styles/index.sass';

class Filter extends React.Component {
	constructor(props) {
		super(props);
	}

	renderBtnOnly() {
		if (this.props.number !== 0)
			return <button className="filter__btn" onClick={ () => this.props.btnFilter(this.props.number)}>Только</button>
	}

	render() {
		const inputs = this.props.filterInputs;
		const number = this.props.number;

		return (
			<div>
				{ this.renderBtnOnly() }
				<input id={'filter__input-' + number} className="filter__input" type="checkbox" name="all" checked={inputs[number].checked} onChange={() => {this.props.onChecked(number); this.props.onCheckedFilter(number)}}/>
				<label className="filter__label" htmlFor={'filter__input-' + number}>{inputs[number].text}</label>
			</div>
		)
	}
}

export default Filter;
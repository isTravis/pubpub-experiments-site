import React, { PropTypes } from 'react';
import Radium from 'radium';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid } from 'recharts';
import regression from 'regression';

let styles;

export const GovtFigure = React.createClass({
	propTypes: {
		data: PropTypes.object,
		offsets: PropTypes.array,
	},

	// getInitialState() {
	// 	return {
	// 		colors: [
	// 			'#c0392b',
	// 			'#f39c12',
	// 			'#16a085',
	// 			'#2980b9',
	// 			'#8e44ad',
	// 			'#34495e',
	// 		],
	// 	};
	// },

	shouldComponentUpdate(nextProps) {
		const oldOffsets = this.props.offsets.join(',');
		const newOffsets = nextProps.offsets.join(',');
		if (oldOffsets === newOffsets) { return false; }
		return true;
	},

	render() {
		const data = this.props.data || {};
		const offsets = this.props.offsets || [];
		const repubs = data.repubs || [];
		const linearData = [];
		let min = 1;
		let max = 0;
		const outputData = repubs.map((item, index)=> {
			const republicans = 1 - item / (data.dems[index] + item); // This '1 -' doesn't make any sense. Does 538 have it wrong? I should write them...
			const numParameters = offsets.reduce((previous, current)=> {
				if (current) { return previous + 1; }
				return previous;
			}, 0);
			let economy = 0;
			if (offsets[0]) { economy += data.employment[index]; }
			if (offsets[1]) { economy += data.gdp[index]; } // GDP data somehow got backwards
			if (offsets[2]) { economy += data.inflation[index]; }
			if (offsets[3]) { economy += data.stocks[index]; }
			economy /= numParameters;
			linearData.push([republicans, economy]);
			if (republicans < min) { min = republicans; }
			if (republicans > max) { max = republicans; }
			return { republicans: republicans, economy: economy };
		});
		const lineObject = regression('linear', linearData);
		const lineData = [
			{ republicans: min + 0.02, economy: lineObject.equation[0] * (min + 0.02) + lineObject.equation[1] },
			{ republicans: max - 0.02, economy: lineObject.equation[0] * (max - 0.02) + lineObject.equation[1] },
		];
		return (
			<div id={'graph-wrapper'} style={styles.graphWrapper}>
				<h6 style={{ textAlign: 'center', position: 'relative', left: '-100px' }}>Economic Performance vs Govenorships</h6>
				<div style={styles.yLabel}>Better Economy</div>
				<span style={styles.yArrow} className={'pt-icon-standard pt-icon-arrow-up'} />
				<div style={styles.xLabel}>More Republicans</div>
				<span style={styles.xArrow} className={'pt-icon-standard pt-icon-arrow-right'} />
				<ScatterChart width={560} height={500} margin={{ top: 20, left: 0, right: 20, bottom: 20 }}>
					<YAxis tickCount={0} dataKey={'economy'} domain={['auto', 'auto']} />
					<XAxis tickCount={0} dataKey={'republicans'} domain={['auto', 'auto']} />
					<CartesianGrid />
					<Scatter data={outputData} fill={'rgba(222, 57, 43, 0.25)'} />
					<Scatter data={lineData} fill={'rgba(222, 57, 43, 0.0)'} line={{ stroke: 'rgba(0, 0, 0, 0.4)', strokeWidth: 2 }} />
				</ScatterChart>
			</div>
		);
	}

});

export default Radium(GovtFigure);

styles = {
	graphWrapper: {
		position: 'relative',
	},
	xLabel: {
		fontFamily: '-apple-system, "BlinkMacSystemFont", "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Open Sans", "Helvetica Neue", sans-serif, "Icons16"',
		fontSize: '0.85em',
		position: 'absolute',
		top: 495,
		left: 395
	},
	xArrow: {
		position: 'absolute',
		top: 503,
		left: 373
	},
	yLabel: {
		fontFamily: '-apple-system, "BlinkMacSystemFont", "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Open Sans", "Helvetica Neue", sans-serif, "Icons16"',
		fontSize: '0.85em',
		position: 'absolute',
		top: 43,
		left: 10
	},
	yArrow: {
		position: 'absolute',
		top: 70,
		left: 42
	},
};

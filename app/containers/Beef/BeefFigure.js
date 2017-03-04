import React, { PropTypes } from 'react';
import Radium from 'radium';
import { BarChart, Bar, Tooltip, Legend, XAxis, YAxis, CartesianGrid } from 'recharts';

let styles;

export const BeefFigure = React.createClass({
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
		const foods = data.foods || [];
		
		const outputData = Object.keys(foods).map((key, index)=> {
			const deaths = data.deaths.reduce((previous, current, siteIndex)=> {
				if (!offsets[siteIndex]) { return previous; }
				return previous + current;
			}, 0);

			const eaters = foods[key].reduce((previous, current, siteIndex)=> {
				if (!offsets[siteIndex]) { return previous; }
				return previous + current;
			}, 0);

			const mortality = deaths / eaters === 1 ? 0 : deaths / eaters;

			return { name: key, mortality: mortality };
		});

		return (
			<div id={'graph-wrapper'} style={styles.graphWrapper}>
				<h6 style={{ textAlign: 'center', position: 'relative', left: '-100px' }}>Mortality vs Foods</h6>
				
				<BarChart width={580} height={500} data={outputData} margin={{ top: 20, left: 0, right: 20, bottom: 20 }}>
					<XAxis dataKey="name" />
					<YAxis domain={[0, 0.15]} />
					<CartesianGrid strokeDasharray="3 3" />
					<Bar dataKey="mortality" fill="#16a085" />
				</BarChart>
			</div>
		);
	}

});

export default Radium(BeefFigure);

styles = {
	graphWrapper: {
		position: 'relative',
		fontSize: '0.75em',
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

import React, { PropTypes } from 'react';
import Radium from 'radium';
import roundTo from 'round-to';
import { ResponsiveContainer, BarChart, XAxis, YAxis, CartesianGrid, Bar, Tooltip, Legend, ErrorBar } from 'recharts';
let styles;

export const AnalysisBarChart = React.createClass({
	propTypes: {
		keys: PropTypes.array,
		data: PropTypes.array,
		title: PropTypes.string,
		yaxisLabel: PropTypes.string,
		colorOffset: PropTypes.number,
		yDomain: PropTypes.array,
	},

	render() {
		const colorOffset = this.props.colorOffset || 0;
		const keys = this.props.keys || [];
		const data = this.props.data || [];
		const colors = ['#1abc9c', '#3498db', '#9b59b6', '#e67e22'];
		return (
			<div style={styles.container}>
				<div style={styles.title}>{this.props.title}</div>
				<div style={styles.yaxis}>{this.props.yaxisLabel}</div>
				<ResponsiveContainer width={'100%'} height={300}>
					<BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
						<defs>
							<linearGradient id="color0" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="#1abc9c" stopOpacity={0.8} />
								<stop offset="95%" stopColor="#1abc9c" stopOpacity={0} />
							</linearGradient>
							<linearGradient id="color1" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="#3498db" stopOpacity={0.8} />
								<stop offset="95%" stopColor="#3498db" stopOpacity={0} />
							</linearGradient>
							<linearGradient id="color2" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="#9b59b6" stopOpacity={0.8} />
								<stop offset="95%" stopColor="#9b59b6" stopOpacity={0} />
							</linearGradient>
							<linearGradient id="color3" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="#e67e22" stopOpacity={0.8} />
								<stop offset="95%" stopColor="#e67e22" stopOpacity={0} />
							</linearGradient>
						</defs>
						<XAxis dataKey="name" />
						<YAxis domain={this.props.yDomain || [0, 1]} />
						<CartesianGrid strokeDasharray="3 3" />
						<Tooltip formatter={(val)=> { return roundTo(val, 4); }} />
						<Legend 
							content={(props)=> {
								const { payload } = props;
								return (
									<div style={{ display: 'table', margin: '0 auto' }}>
										{
											payload.filter((item, index)=> { return index % 2 === 0; }).map((entry, index) => {
												return (
													<div key={`item-${index}`} style={{ display: 'table-row' }}>
														<div style={{ display: 'table-cell', padding: '0.25em 1em' }}>
															<svg className="recharts-surface" width="14" height="14" viewBox="0 0 32 32" version="1.1" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '4px' }}>
																<path stroke="none" fill={payload[index * 2].color} d="M0,4h32v24h-32z" className="recharts-legend-icon" />
															</svg>
															{payload[index * 2].value}
														</div>
														<div style={{ display: 'table-cell', padding: '0.25em 1em' }}>
															<svg className="recharts-surface" width="14" height="14" viewBox="0 0 32 32" version="1.1" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '4px' }}>
																<path stroke="none" fill={payload[index * 2 + 1].color} d="M0,4h32v24h-32z" className="recharts-legend-icon" />
															</svg>
															{payload[index * 2 + 1].value}
														</div>
													</div>
												);
											})
										}
									</div>
								);
							}} 
						/>
						{keys.map((item, index)=> {
							const colorIndex = index + colorOffset;
							return (
								<Bar key={`Bar-${index}`} type="monotone" dataKey={item} stroke={colors[colorIndex]} fillOpacity={1} fill={`url(#color${colorIndex})`}>
									<ErrorBar dataKey={`${item}Error`} width={0} strokeWidth={1} stroke="black" opacity={0.5} />
								</Bar>
							);
						})}
					</BarChart>
				</ResponsiveContainer>
			</div>
			
		);
	}
});

export default Radium(AnalysisBarChart);

styles = {
	container: {
		padding: '2em 0em',
		position: 'relative',
	},
	title: {
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: '1.2em',
	},
	yaxis: {
		position: 'absolute',
		left: 0,
		bottom: 'calc(2em + 50px)',
		transform: 'rotate(-90deg)',
		transformOrigin: 'bottom left',
		fontSize: '1.2em',
		width: '200px',
		textAlign: 'center',
		
	},
};

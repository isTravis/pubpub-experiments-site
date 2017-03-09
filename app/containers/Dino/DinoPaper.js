import React, { PropTypes } from 'react';
import Radium from 'radium';
import { Slider, Button } from '@blueprintjs/core';
import Textarea from 'react-textarea-autosize';
import DinoFigure from './DinoFigure';

let styles;
const defaultOffsets = [
	2,
	3,
	4,
	10,
	10,
	12,
];
let time = Date.now();

export const DinoPaper = React.createClass({
	propTypes: {
		onComplete: PropTypes.func,
		mode: PropTypes.number,
	},

	getInitialState() {
		return {
			reviewContent: '',
			reviewRating: undefined,
			error: undefined,
			offsets: defaultOffsets,
			offsetInteractions: defaultOffsets.map(item => 0),
			startTime: new Date().getTime(),
			data: [ 
				[
					{ age: 0, circumference: 104 },
					{ age: 1, circumference: 116 },
					{ age: 2, circumference: 132 },
					{ age: 3, circumference: 148 },
					{ age: 4, circumference: 165 },
					{ age: 5, circumference: 174 },
					{ age: 6, circumference: 178 },
					{ age: 7, circumference: 180 },
					{ age: 8, circumference: 181 },
					{ age: 9, circumference: 182 },
					{ age: 10, circumference: 184 },
				],	
				[
					{ age: 0, circumference: 118 },
					{ age: 1, circumference: 124 },
					{ age: 2, circumference: 141 },
					{ age: 3, circumference: 164 },
				],	
				[
					{ age: 0, circumference: 141 },
					{ age: 1, circumference: 152 },
					{ age: 2, circumference: 174 },
					{ age: 3, circumference: 175 },
				],
				[
					{ age: 0, circumference: 168 },
					{ age: 1, circumference: 184 },
					{ age: 2, circumference: 200 },
					{ age: 3, circumference: 216 },
					{ age: 4, circumference: 221 },
				],
				[
					{ age: 0, circumference: 184 },
					{ age: 1, circumference: 200 },
					{ age: 2, circumference: 219 },
					{ age: 3, circumference: 224 },
					{ age: 4, circumference: 230 },
					{ age: 5, circumference: 234 },
					{ age: 6, circumference: 232 },
				],
				[
					{ age: 0, circumference: 202 },
					{ age: 1, circumference: 221 },
					{ age: 2, circumference: 227 },
					{ age: 3, circumference: 232 },
					{ age: 4, circumference: 233 },
					{ age: 5, circumference: 235 },
				],
			],
			
		};
	},

	componentWillMount() {
		window.addEventListener('scroll', this.addScroll);
	},
	componentWillUnmount() {
		window.removeEventListener('scroll', this.addScroll);
	},
	
	scrollValues: [],

	addScroll: function() {
		const wait = 250;
		if ((time + wait - Date.now()) < 0) {
			this.scrollValues.push({
				t: new Date().getTime() - this.state.startTime,
				y: document.body.scrollTop
			});
			time = Date.now();
		}
	},

	submitReview: function() {
		if (!this.state.reviewContent) { return this.setState({ error: 'A review is required' }); }
		if (this.state.reviewRating === undefined) { return this.setState({ error: 'A review score is required' }); }
		
		this.setState({ error: undefined });
		return this.props.onComplete({
			reviewContent: this.state.reviewContent,
			reviewRating: this.state.reviewRating,
			offsetValues: JSON.stringify(this.state.offsets),
			offsetInteractions: JSON.stringify(this.state.offsetInteractions),
			timeOnReview: Math.round((new Date().getTime() - this.state.startTime) / 1000),
			scrollValues: JSON.stringify(this.scrollValues)
		});
	},

	sliderUpdate: function(index, value) {
		const offsets = [...this.state.offsets];
		offsets[index] = Math.floor(value * 10) / 10;
		const offsetInteractions = [...this.state.offsetInteractions];
		offsetInteractions[index] += 1;
		this.setState({ 
			offsets: offsets,
			offsetInteractions: offsetInteractions,
		});
	},

	render() {
		const tableNames = ['Femur 1', 'Femur 2', 'Femur 3', 'Femur 4', 'Femur 5', 'Femur 6'];
		const tableSites = ['CLDQ', 'CLDQ', 'CLDQ', 'DPP', 'DPP', 'DPP'];
		return (
			<div style={styles.container}>
				<h1>Paper Review</h1>
				<p style={styles.text}>Actively read the following scientific study and write a few sentences analyzing the logic and methods the authors used to reach their conclusions in the input box at the bottom.</p>
				<p style={styles.text}>There may be errors in the logic used and in the conclusions reached. We ask you to assume the role of a peer-reviewing scientist and provide critique to the authors of this work regarding their methods and conclusion.</p>

				
				<div className={'pt-card pt-elevation-2 article-body'} style={styles.paper}>
					<h2 style={styles.header}>Assessing Growth Patterns of the Jurassic Theropod Dinosaur Allosaurus</h2>
					
					<h3 style={styles.header}>Introduction</h3>
					<p style={styles.p}>Allosaurus are one of the most common dinosaurs from their time period. We present an analysis to understand its growth and bone scaling. Based on several sections of bones found in archealogical digs we present a growth curve reconstruction.</p>
					
					<h3 style={styles.header}>Methods</h3>
					<p style={styles.p}>A total of six femur bones of Allosaurus were selected for this study. These bones came from the Cleveland Lloyd Dinosaur Quarry (CLDQ) in Utah and the Dinosaur Provincial Park (DPP) in Alberta, Canada. Bone lengths and circumferences were measured. We prefer to measure circumference because 1) estimates of circumference based on diameters are underestimates when sections are irregular in shape; 2) circumference is used to predict body mass and 3) circumference is easily comparable across sections of a given bone series. </p>

					<h3 style={styles.header}>Estimation of Age and Growth Curve</h3>
					<p style={styles.p}>For each bone, we use Lines of Arrested Growth (LAGs) to estimate the size of the bone at different ages. This process is akin to counting the rings of a tree to understand how old it is. In this case, we measure the circumference of the bone at each LAG. This allows us to have multiple circumference-age measurements from a single bone.</p>
					<p style={styles.p}>Previous work has suggested that the arrested growth associated with LAGs is seasonal in dinosaurs. That is to say for example, dinosaurs grew less in the winter. Thus, each LAG can be assumed to represent one year of growth. However, depending on the age of the Allosaurus at death, LAGs from the dinosaur's youth may not be visible. To estimate the age of the bone at death (and thus the absolute age represented by each LAG), we take the series of bone-growth curves and introduce 'age offsets' such that the curves visually overlap into a single growth curve. We use an Excel spreadsheet to increase or decrease the age offset until the bone-growth curves visually align to one another.</p>
					<p style={styles.p}>These bone-growth curves and the associated offsets we have visually determined are shown in the Table and Figure below.</p>

					<table style={styles.table}>
						<thead style={styles.thead}>
							<tr>
								<td>Bone</td>
								<td>Excavation Site</td>
								<td>Measured Circumferences (one per year)</td>
								<td>Age Offset</td>
							</tr>
						</thead>
						<tbody>
							{tableNames.map((name, index)=> {
								return (
									<tr key={`tablerow-${index}`}>
										<td>{name}</td>
										<td>{tableSites[index]}</td>
										<td>{this.state.data[index].reduce((previous, current)=>{
											return [...previous, current.circumference];
										}, []).join(', ')}</td>
										<td>{defaultOffsets[index]}</td>
									</tr>
								);
							})}
						</tbody>
					</table>

					<p style={styles.p}>These measurements and estimates lead us to a novel conclusion: the Allosaurus is the first animal to exhibit two major growth spurts in its life. Contrary to modern mammal and reptile growth patterns, Allosaurus appear to have a second growth spurt later in life. In the graph below, you can see a second rapid rise in circumference of femur bones after stabilizing between the age of 10-12 years.</p>

					{this.props.mode === 1 &&
						<p style={styles.p}>You can use the sliders on the right to explore alternative Age Offset values.</p>
					}

					<div style={{ position: 'relative' }}>
						{this.props.mode === 1 &&
							<div style={styles.sliderWrapper}>
								<table style={{ width: '100%', }}>
									<tbody>
										{this.state.offsets.map((item, index)=> {
											return (
												<tr key={`slider-${index}`} style={{ paddingBottom: '0.5em' }}>
													<td style={{ paddingTop: 0, paddingBottom: 0 }}>
														<div style={{ fontSize: '0.85em', }}>Femur {index + 1} offset</div>
														<Slider min={0} max={20} stepSize={0.1} labelStepSize={5} value={item} onChange={this.sliderUpdate.bind(this, index)} />	
													</td>
													
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>
						}
						<DinoFigure data={this.state.data} offsets={this.state.offsets} />
					</div>

					<h3 style={styles.header}>Conclusions</h3>

					<p style={styles.p}>All previous studies of bone growth of large dinosaurs report slowed growth patterns after the first growth spurt. In contradiction, we conclude that Allosaurus had multiple major growth spurts throughout life. This novel conclusion provides a unique and different perspective on dinosaur growth. We theorize that this growth pattern may be part of the mechanism that led to some dinosaurs being so much larger than their modern day reptile and bird counterparts. We cannot directly reject or support the hypothesis of unlimited growth in Allosaurus in the situation where this repeated growth spurt continued to cycle throughout the duration of their lives.</p>
				</div>

				<hr />
				<p style={styles.text}>Please write your review of the work. We ask you to assume the role of a scientist and provide critical feedback to the authors.</p>
				<Textarea value={this.state.reviewContent} onChange={evt => this.setState({ reviewContent: evt.target.value })} style={styles.input} />

				<hr />
				<div style={styles.inputBlock}>
					{/* <div style={styles.label}>Review Rating (Select a number)</div> */}
					<p style={styles.text}>Please rate how much you trust theconclusions of this article.</p>

					<div className={'pt-button-group pt-fill'} style={{ paddingTop: '1em' }}>
						<Button key={'reviewRating-0'} text={0} onClick={evt => this.setState({ reviewRating: 0 })} className={this.state.reviewRating === 0 ? 'pt-active' : ''} />
						<Button key={'reviewRating-1'} text={1} onClick={evt => this.setState({ reviewRating: 1 })} className={this.state.reviewRating === 1 ? 'pt-active' : ''} />
						<Button key={'reviewRating-2'} text={2} onClick={evt => this.setState({ reviewRating: 2 })} className={this.state.reviewRating === 2 ? 'pt-active' : ''} />
						<Button key={'reviewRating-3'} text={3} onClick={evt => this.setState({ reviewRating: 3 })} className={this.state.reviewRating === 3 ? 'pt-active' : ''} />
						<Button key={'reviewRating-4'} text={4} onClick={evt => this.setState({ reviewRating: 4 })} className={this.state.reviewRating === 4 ? 'pt-active' : ''} />
						<Button key={'reviewRating-5'} text={5} onClick={evt => this.setState({ reviewRating: 5 })} className={this.state.reviewRating === 5 ? 'pt-active' : ''} />
						<Button key={'reviewRating-6'} text={6} onClick={evt => this.setState({ reviewRating: 6 })} className={this.state.reviewRating === 6 ? 'pt-active' : ''} />
						<Button key={'reviewRating-7'} text={7} onClick={evt => this.setState({ reviewRating: 7 })} className={this.state.reviewRating === 7 ? 'pt-active' : ''} />
						<Button key={'reviewRating-8'} text={8} onClick={evt => this.setState({ reviewRating: 8 })} className={this.state.reviewRating === 8 ? 'pt-active' : ''} />
						<Button key={'reviewRating-9'} text={9} onClick={evt => this.setState({ reviewRating: 9 })} className={this.state.reviewRating === 9 ? 'pt-active' : ''} />
						<Button key={'reviewRating-10'} text={10} onClick={evt => this.setState({ reviewRating: 10 })} className={this.state.reviewRating === 10 ? 'pt-active' : ''} />
					</div>

					<div style={{ verticalAlign: 'top', width: 'calc(100% / 11 * 4 - 2px', display: 'inline-block', textAlign: 'center', padding: '4em 0em 1em', marginTop: '-3em', backgroundColor: '#f3f3f4' }}>0 - 3<br />Low quality work.<br />Do not trust conclusions.</div>
					<div style={{ verticalAlign: 'top', width: 'calc(100% / 11 * 3', display: 'inline-block', textAlign: 'center', padding: '4em 0em 1em', marginTop: '-3em', backgroundColor: '#d3d3d4' }}>4 - 6<br />Acceptable quality work.<br />Hesitantly trust conclusions.</div>
					<div style={{ verticalAlign: 'top', width: 'calc(100% / 11 * 4', display: 'inline-block', textAlign: 'center', padding: '4em 0em 1em', marginTop: '-3em', backgroundColor: '#f3f3f4' }}>7 - 10<br />High quality work.<br />Completely trust conclusions.</div>
				</div>

				<button className={'pt-button pt-intent-primary'} onClick={this.submitReview}>Finish Review and go to Final step</button>
				{!!this.state.error &&
					<div className={'pt-callout pt-intent-danger'}>
						{this.state.error}
					</div>
				}
			</div>
		);
	}

});

export default Radium(DinoPaper);

styles = {
	container: {
		width: '800px',
		margin: '0 auto',
	},
	text: {
		lineHeight: '1.6',
		fontSize: '1.3em',
		margin: '1em 0em',
	},
	inputBlock: {
		display: 'block',
		margin: '2em 0em',
	},
	input: {
		width: '100%',
		minHeight: '4em',
		resize: 'none',
	},
	paper: {
		margin: '2em 0em 3em',
	},
	sliderWrapper: {
		fontFamily: '-apple-system, "BlinkMacSystemFont", "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Open Sans", "Helvetica Neue", sans-serif, "Icons16"',
		fontSize: '0.85em',
		position: 'absolute', 
		width: '178px', 
		right: -0,
		boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.75)'
	},
	table: {
		width: '100%',
		fontSize: '0.9em',
	},
	thead: {
		fontWeight: 'bold',
	},

};

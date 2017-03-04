import React, { PropTypes } from 'react';
import Radium from 'radium';
import { Checkbox, Button } from '@blueprintjs/core';
import Textarea from 'react-textarea-autosize';
import BeefFigure from './BeefFigure';

let styles;
const defaultOffsets = [
	true,
	true,
	true,
];
let time = Date.now();

export const BeefPaper = React.createClass({
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
			data: {
				deaths: [70, 35, 1],
				foods: {
					Tuna: [499, 480, 500],
					Potato: [499, 496, 500],
					Rice: [498, 500, 482],
					Beef: [497, 470, 1],
					Cheese: [488, 492, 500],
					Bread: [496, 480, 487],
					Carrot: [498, 497, 489],
					Egg: [495, 492, 497],
					Chicken: [499, 493, 492],
					Tomato: [500, 500, 499],
				}
			},
			
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

	checkboxUpdate: function(index) {
		const offsets = [...this.state.offsets];
		offsets[index] = !offsets[index];
		const offsetInteractions = [...this.state.offsetInteractions];
		offsetInteractions[index] += 1;
		this.setState({ 
			offsets: offsets,
			offsetInteractions: offsetInteractions,
		});
	},

	render() {
		const checkboxTitles = ['Missouri', 'Maine', 'India'];
		return (
			<div style={styles.container}>
				<h1>Paper Review</h1>
				<p style={styles.text}>Actively read the following scientific study and write a few sentences analyzing the logic and methods the authors used to reach their conclusions in the input box at the bottom.</p>
				<p style={styles.text}>There may be errors in the logic used and in the conclusions reached. We ask you to assume the role of a peer-reviewing scientist and provide critique to the authors of this work regarding their methods and conclusion.</p>

				
				<div className={'pt-card pt-elevation-2 article-body'} style={styles.paper}>
					<h2 style={styles.header}>Assessing the influence of diet on mortality</h2>
					
					<h3 style={styles.header}>Introduction</h3>
					<p style={styles.p}>We study the connection between specific diets and mortality rate. In hopes of understanding which foods best promote health and longevity we collect data from hundreds of people and study their health over a 3-year period. This work is a collaboration between University of Maine, University of Missouri, and the University of Delhi in New Delhi, India.</p>

					<h3 style={styles.header}>Methods</h3>
					<p style={styles.p}>In an effort to have a large number of particpants with similar diets, each collaborating university has enlisted the support of an organization that provides  a shared cafeteria for a large group of people. These locations include the Lynn Frank Senior Care house in St. Louis, Missouri, the Baxter Crab fishing company in Portland, Maine, and the Association of Student Cafeterias at the University of Delhi. Each location registered 500 people who eat most of their meals at a central cafeteria.</p>

					<p style={styles.p}>This consistency in food options across these three locations reduces the number of external variables for which we must control. </p>

					<h3 style={styles.header}>Relationship between Diet and Mortality</h3>
					<p style={styles.p}>Across the three study location, the 10 most heavily consumed foods were: tuna, potatoes, rice, beef, cheese, bread, carrots, eggs, chicken, and tomatoes. During the course of our study, 168 people were hospitalized for varying illnesses, and 63 of the 1500 participants died. In the chart below, we plot the mortality rate associated with the 6 most consumed foods across the three study sites. The mortality rate is calculated by (Number of people who ate X and died) divided by (Total number of people who ate X)</p>

					{this.props.mode === 1 &&
						<p style={styles.p}>You can use the checkboxes on the right to explore alternative analyses.</p>
					}

					<div style={{ position: 'relative' }}>
						{this.props.mode === 1 &&
							<div style={styles.sliderWrapper}>
								<table>
									<tbody>
										<tr>
											<td style={{ fontWeight: 'bold', textAlign: 'center' }}>
											Data to Use
											</td>
										</tr>
										{this.state.offsets.map((item, index)=> {
											return (
												<tr key={`slider-${index}`} style={{ }}>
													<td style={{ }}>
														<Checkbox checked={item} label={checkboxTitles[index]} onChange={this.checkboxUpdate.bind(this, index)} />
													</td>
													
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>
						}
						<BeefFigure data={this.state.data} offsets={this.state.offsets} />
					</div>

					<p style={styles.p}>The graph communicates a much higher mortality rate for those who ate beef. This data, sourced from multiple locations and across 1500 participants, leads us to the conclusion that beef is strongly connected to a higher mortality rate than other commonly eaten foods.</p>

					<h3 style={styles.header}>Conclusion</h3>
					<p style={styles.p}>We conclude that beef is highly correlated to an increase mortality rate. While this is a single study and further evidence should be gathered, this is a strong signal that beef is significantly less healthy than other primary food staples.</p>
				</div>

				<hr />
				<p style={styles.text}>Please write your review of the work. We ask you to assume the role of a scientist and provide critical feedback to the authors.</p>
				<Textarea value={this.state.reviewContent} onChange={evt => this.setState({ reviewContent: evt.target.value })} style={styles.input} />

				<hr />
				<div style={styles.inputBlock}>
					<p style={styles.text}>Please select a rating for this work.</p>

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

					<div style={{ verticalAlign: 'top', width: 'calc(100% / 11 * 4 - 2px', display: 'inline-block', textAlign: 'center', padding: '4em 0em 1em', marginTop: '-3em', backgroundColor: '#f3f3f4' }}>0-3<br />Low quality work.<br />Major fixes needed.</div>
					<div style={{ verticalAlign: 'top', width: 'calc(100% / 11 * 3', display: 'inline-block', textAlign: 'center', padding: '4em 0em 1em', marginTop: '-3em', backgroundColor: '#d3d3d4' }}>4-6<br />Acceptable quality work.<br />Minor fixes needed.</div>
					<div style={{ verticalAlign: 'top', width: 'calc(100% / 11 * 4', display: 'inline-block', textAlign: 'center', padding: '4em 0em 1em', marginTop: '-3em', backgroundColor: '#f3f3f4' }}>7-10<br />High quality work.<br />Trivial or no fixes needed.</div>
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

export default Radium(BeefPaper);

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
		width: '127px', 
		right: -0,
		top: 65,
		zIndex: 10,
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

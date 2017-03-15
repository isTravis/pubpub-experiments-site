import React from 'react';
import { Link } from 'react-router';
import Radium from 'radium';
import stats from 'stats-lite';
import { AreaChart, XAxis, YAxis, CartesianGrid, Area, Tooltip } from 'recharts';
import AnalysisBarChart from './AnalysisBarChart';
let styles;

import dinoData from '../../../data/dinoData.js';
import govtData from '../../../data/govtData.js';
import beefData from '../../../data/beefData.js';

export const Analysis = React.createClass({
	filterUsers: function({ data, foundError, foundConclusion, hadInteractive, usedInteractive, interestedInTopic, isScientist, hasReviewed, hasBeenReviewed }) {
		const resultingUsers = data.filter((item)=> {
			// Spam entries have their identifiedError field set to NULL
			if (item.identifiedError === null) { return false; }
			return true;
		})
		.filter((item)=> {
			if (foundError === undefined) { return true; }
			if (foundError === false && item.identifiedError === false) { return true; }
			if (foundError === true && item.identifiedError === true) { return true; }
			return false;
		})
		.filter((item)=> {
			if (foundConclusion === undefined) { return true; }
			if (foundConclusion === false && item.identifiedConclusion === false) { return true; }
			if (foundConclusion === true && item.identifiedConclusion === true) { return true; }
			return false;
		})
		.filter((item)=> {
			if (hadInteractive === undefined) { return true; }
			if (hadInteractive === false && item.mode === 0) { return true; }
			if (hadInteractive === true && item.mode === 1) { return true; }
			return false;
		})
		.filter((item)=> {
			const allZeros = JSON.parse(item.offsetInteractions).reduce((previous, current)=> {
				if (current !== 0) { return false; }
				return previous;
			}, true);
			if (usedInteractive === undefined) { return true; }
			if (usedInteractive === false && allZeros) { return true; }
			if (usedInteractive === true && !allZeros) { return true; }
			return false;
		})
		.filter((item)=> {
			if (interestedInTopic === undefined) { return true; }
			if (interestedInTopic === false && !item.interestedInTopic) { return true; }
			if (interestedInTopic === true && !!item.interestedInTopic) { return true; }
			return false;
		})
		.filter((item)=> {
			if (isScientist === undefined) { return true; }
			if (isScientist === false && !item.isScientist) { return true; }
			if (isScientist === true && !!item.isScientist) { return true; }
			return false;
		})
		.filter((item)=> {
			if (hasReviewed === undefined) { return true; }
			if (hasReviewed === false && item.hasReviewed === 'never') { return true; }
			if (hasReviewed === true && item.hasReviewed !== 'never') { return true; }
			return false;
		})
		.filter((item)=> {
			if (hasBeenReviewed === undefined) { return true; }
			if (hasBeenReviewed === false && item.hasBeenReviewed === 'never') { return true; }
			if (hasBeenReviewed === true && item.hasBeenReviewed !== 'never') { return true; }
			return false;
		});
		
		return resultingUsers;
	},

	analyzeCounts: function(inputData) {
		const results = {
			noninteractive: this.filterUsers({ data: inputData, hadInteractive: false }),
			foundErrorNonInteractive: this.filterUsers({ data: inputData, foundError: true, hadInteractive: false }),
			foundConclusionNonInteractive: this.filterUsers({ data: inputData, foundConclusion: true, hadInteractive: false }),
			interactive: this.filterUsers({ data: inputData, hadInteractive: true }),
			foundErrorInteractive: this.filterUsers({ data: inputData, foundError: true, hadInteractive: true }),
			foundConclusionInteractive: this.filterUsers({ data: inputData, foundConclusion: true, hadInteractive: true }),
			usedinteractive: this.filterUsers({ data: inputData, usedInteractive: true }),
			foundErrorUsedInteractive: this.filterUsers({ data: inputData, foundError: true, usedInteractive: true }),
			foundConclusionUsedInteractive: this.filterUsers({ data: inputData, foundConclusion: true, usedInteractive: true }),
			notFoundError: this.filterUsers({ data: inputData, foundError: false }),
			foundError: this.filterUsers({ data: inputData, foundError: true }),
			notFoundConclusion: this.filterUsers({ data: inputData, foundConclusion: false }),
			foundConclusion: this.filterUsers({ data: inputData, foundConclusion: true }),
		};

		console.log('Non Interactive', results.foundErrorNonInteractive.length / results.noninteractive.length, results.foundConclusionNonInteractive.length / results.noninteractive.length, ' Total: ', results.noninteractive.length);
		console.log('Interactive', results.foundErrorInteractive.length / results.interactive.length, results.foundConclusionInteractive.length / results.interactive.length, ' Total: ', results.interactive.length);
		console.log('UsedInteractive', results.foundErrorUsedInteractive.length / results.usedinteractive.length, results.foundConclusionUsedInteractive.length / results.usedinteractive.length, ' Total: ', results.usedinteractive.length);
		console.log('Percent that used if had it', results.usedinteractive.length / results.interactive.length);
		return results;
	},

	countScores: function(data) {
		const scores = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		// const scores = [0, 0, 0];
		data.forEach((item)=> {
			scores[item.reviewRating] += 1;
			// let index;
			// if (item.reviewRating < 4) { index = 0; }
			// if (item.reviewRating >= 4 && item.reviewRating <= 6) { index = 1; }
			// if (item.reviewRating > 6) { index = 2; }
			// scores[index] += 1;
		});
		console.log(scores);
		return scores;
	},

	sumArray: function(array) {
		return array.reduce((previous, current)=> {
			return previous + current;
		});
	},

	render() {
		console.log('Beef');
		console.log('---------------');
		const beefStats = this.analyzeCounts(beefData);

		console.log('Dino');
		console.log('---------------');
		const dinoStats = this.analyzeCounts(dinoData);

		console.log('Govt');
		console.log('---------------');
		const govtStats = this.analyzeCounts(govtData);
		
		// const nonInteractives = [...beefStats.noninteractive, ...dinoStats.noninteractive, ...govtStats.noninteractive];
		// const interactives = [...beefStats.interactive, ...dinoStats.interactive, ...govtStats.interactive];
		// const usedinteractives = [...beefStats.usedinteractive, ...dinoStats.usedinteractive, ...govtStats.usedinteractive];
		// const nonInteractives = [...govtStats.noninteractive];
		// const interactives = [...govtStats.interactive];
		// const usedinteractives = [...govtStats.usedinteractive];
		const nonInteractives = [...beefStats.foundConclusion, ...dinoStats.foundConclusion, ...govtStats.foundConclusion];
		const interactives = [...beefStats.notFoundConclusion, ...dinoStats.notFoundConclusion, ...govtStats.notFoundConclusion];
		const usedinteractives = [...beefStats.usedinteractive, ...dinoStats.usedinteractive, ...govtStats.usedinteractive];

		const nonInteractivesScores = this.countScores(nonInteractives);
		const interactivesScores = this.countScores(interactives);
		const usedInteractivesScores = this.countScores(usedinteractives);

		console.log(stats.stdev(nonInteractivesScores) / this.sumArray(nonInteractivesScores));
		const data = nonInteractivesScores.map((item, index)=> {
			return {
				name: index,
				non: nonInteractivesScores[index] / this.sumArray(nonInteractivesScores),
				int: interactivesScores[index] / this.sumArray(interactivesScores),
				// used: usedInteractivesScores[index] / this.sumArray(usedInteractivesScores),
			};
		});

		const renderCounts = (
			<table style={styles.countTable}>
				<tr style={styles.countTableBold}>
					<td style={styles.countTableHead} colSpan={3}>Beef</td>
					<td style={styles.countTableHead} colSpan={3}>Dino</td>
					<td style={styles.countTableHead} colSpan={3}>Govt</td>
				</tr>
				<tr style={styles.countTableBold}>
					<td>Non Inter</td><td>Had Inter</td><td>Used Inter</td>
					<td>Non Inter</td><td>Had Inter</td><td>Used Inter</td>
					<td>Non Inter</td><td>Had Inter</td><td>Used Inter</td>
				</tr>
				<tr style={{ fontSize: '1.5em' }}>
					<td>{beefStats.noninteractive.length}</td><td>{beefStats.interactive.length}</td><td>{beefStats.usedinteractive.length}</td>
					<td>{dinoStats.noninteractive.length}</td><td>{dinoStats.interactive.length}</td><td>{dinoStats.usedinteractive.length}</td>
					<td>{govtStats.noninteractive.length}</td><td>{govtStats.interactive.length}</td><td>{govtStats.usedinteractive.length}</td>
				</tr>
			</table>
		);


		return (
			<div style={styles.container}>
				<h1>Analysis</h1>

				{/* <div style={styles.numberWrapper}>
					<div style={styles.number}>{24}</div>
					<div style={styles.numberText}>Found Error</div>
				</div> */}

				<div style={styles.header}>Total Participant Counts</div>
				<div style={styles.content}>The table displays a total count of participants across the three experiments. Each experiment is split into three sections to denote how many users 1) were given a non-interactive experiment, 2) were given an interactive experiment, and 3) were given an interactive experiment and used the interactivity.</div>
				{renderCounts}

				<AnalysisBarChart keys={['non', 'int']} data={data} title={'Analysis Title'} yaxisLabel={'Percent Did it'}/>

				<AreaChart width={730} height={250} data={data} margin={{ top: 50, right: 30, left: 0, bottom: 0 }}>
					<defs>
						<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
							<stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
						</linearGradient>
						<linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
							<stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
						</linearGradient>
						<linearGradient id="colorTv" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#32ca9d" stopOpacity={0.8}/>
							<stop offset="95%" stopColor="#32ca9d" stopOpacity={0}/>
						</linearGradient>
					</defs>
					<XAxis dataKey="name" />
					<YAxis />
					<CartesianGrid strokeDasharray="3 3" />
					<Tooltip />
					<Area type="monotone" dataKey="non" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
					<Area type="monotone" dataKey="int" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
					<Area type="monotone" dataKey="used" stroke="#32ca9d" fillOpacity={1} fill="url(#colorTv)" />
				</AreaChart>
			</div>
		);
	}
});

export default Radium(Analysis);

styles = {
	container: {
		maxWidth: '800px',
		margin: '0em auto',
	},
	header: {
		fontSize: '1.5em',
		fontWeight: 'bold',
		margin: '2em 0em .25em 0em',
	},
	content: {
		fontSize: '1.1em',
		lineHeight: 1.6,
		margin: '1em 0em',
	},
	wrapper: {
		fontSize: '1.25em',
		padding: '0.5em 0em',

	},
	numberWrapper: {
		display: 'inline-block',
		width: '125px',
		height: '125px',
		border: '10px solid #668',
		borderRadius: '500px',
		textAlign: 'center',
	},
	number: {
		fontSize: '2em',
		fontWeight: 'bold',
		paddingTop: '0.75em',
	},
	numberText: {

	},
	countTable: {
		width: '100%',
		textAlign: 'center',
	},
	countTableBold: {
		fontWeight: 'bold',
	},
	countTableHead: {
		width: 'calc(100% / 3)',
	},

};

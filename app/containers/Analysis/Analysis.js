import React from 'react';
import { Link } from 'react-router';
import Radium from 'radium';
import stats from 'stats-lite';
import { AreaChart, XAxis, YAxis, CartesianGrid, Area, Tooltip } from 'recharts';
import AnalysisBarChart from './AnalysisBarChart';
import AnalysisAreaChart from './AnalysisAreaChart';
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
			all: this.filterUsers({ data: inputData }),

			mode0All: this.filterUsers({ data: inputData, hadInteractive: false }),
			mode1All: this.filterUsers({ data: inputData, hadInteractive: true }),
			interactiveAll: this.filterUsers({ data: inputData, usedInteractive: true }),
			nonInteractiveAll: this.filterUsers({ data: inputData, usedInteractive: false }),
			nonScientistAll: this.filterUsers({ data: inputData, isScientist: false }),
			scientistAll: this.filterUsers({ data: inputData, isScientist: true }),
			nonInterestedAll: this.filterUsers({ data: inputData, interestedInTopic: false }),
			interestedAll: this.filterUsers({ data: inputData, interestedInTopic: true }),

			foundErrorFalse: this.filterUsers({ data: inputData, foundError: false }),
			foundErrorTrue: this.filterUsers({ data: inputData, foundError: true }),
			mode0FoundError: this.filterUsers({ data: inputData, hadInteractive: false, foundError: true }),
			mode1FoundError: this.filterUsers({ data: inputData, hadInteractive: true, foundError: true }),
			interactiveFoundError: this.filterUsers({ data: inputData, usedInteractive: true, foundError: true }),
			nonInteractiveFoundError: this.filterUsers({ data: inputData, usedInteractive: false, foundError: true }),
			nonScientistFoundError: this.filterUsers({ data: inputData, isScientist: false, foundError: true }),
			scientistFoundError: this.filterUsers({ data: inputData, isScientist: true, foundError: true }),
			nonInterestedFoundError: this.filterUsers({ data: inputData, interestedInTopic: false, foundError: true }),
			interestedFoundError: this.filterUsers({ data: inputData, interestedInTopic: true, foundError: true }),

			foundConclusionFalse: this.filterUsers({ data: inputData, foundConclusion: false }),
			foundConclusionTrue: this.filterUsers({ data: inputData, foundConclusion: true }),
			foundConclusionFalse: this.filterUsers({ data: inputData, foundConclusion: false }),
			foundConclusionTrue: this.filterUsers({ data: inputData, foundConclusion: true }),
			mode0FoundConclusion: this.filterUsers({ data: inputData, hadInteractive: false, foundConclusion: true }),
			mode1FoundConclusion: this.filterUsers({ data: inputData, hadInteractive: true, foundConclusion: true }),
			interactiveFoundConclusion: this.filterUsers({ data: inputData, usedInteractive: true, foundConclusion: true }),
			nonInteractiveFoundConclusion: this.filterUsers({ data: inputData, usedInteractive: false, foundConclusion: true }),
			nonScientistFoundConclusion: this.filterUsers({ data: inputData, isScientist: false, foundConclusion: true }),
			scientistFoundConclusion: this.filterUsers({ data: inputData, isScientist: true, foundConclusion: true }),
			nonInterestedFoundConclusion: this.filterUsers({ data: inputData, interestedInTopic: false, foundConclusion: true }),
			interestedFoundConclusion: this.filterUsers({ data: inputData, interestedInTopic: true, foundConclusion: true }),

			noninteractive: this.filterUsers({ data: inputData, hadInteractive: false }),
			foundErrorNonInteractive: this.filterUsers({ data: inputData, foundError: true, hadInteractive: false }),
			foundConclusionNonInteractive: this.filterUsers({ data: inputData, foundConclusion: true, hadInteractive: false }),
			interactive: this.filterUsers({ data: inputData, hadInteractive: true }),
			interactiveNotUsed: this.filterUsers({ data: inputData, hadInteractive: true, usedInteractive: false }),
			foundErrorInteractive: this.filterUsers({ data: inputData, foundError: true, hadInteractive: true }),
			foundErrorInteractiveNotUse: this.filterUsers({ data: inputData, foundError: true, hadInteractive: true, usedInteractive: false }),
			foundErrorInteractiveUse: this.filterUsers({ data: inputData, foundError: true, hadInteractive: true, usedInteractive: true }),
			foundConclusionInteractive: this.filterUsers({ data: inputData, foundConclusion: true, hadInteractive: true }),
			usedinteractive: this.filterUsers({ data: inputData, usedInteractive: true }),
			foundErrorUsedInteractive: this.filterUsers({ data: inputData, foundError: true, usedInteractive: true }),
			foundConclusionUsedInteractive: this.filterUsers({ data: inputData, foundConclusion: true, usedInteractive: true }),
			notFoundError: this.filterUsers({ data: inputData, foundError: false }),
			foundError: this.filterUsers({ data: inputData, foundError: true }),
			notFoundConclusion: this.filterUsers({ data: inputData, foundConclusion: false }),
			foundConclusion: this.filterUsers({ data: inputData, foundConclusion: true }),
		};

		// console.log('Non Interactive', results.foundErrorNonInteractive.length / results.noninteractive.length, results.foundConclusionNonInteractive.length / results.noninteractive.length, ' Total: ', results.noninteractive.length);
		// console.log('Interactive', results.foundErrorInteractive.length / results.interactive.length, results.foundConclusionInteractive.length / results.interactive.length, ' Total: ', results.interactive.length);
		// console.log('UsedInteractive', results.foundErrorUsedInteractive.length / results.usedinteractive.length, results.foundConclusionUsedInteractive.length / results.usedinteractive.length, ' Total: ', results.usedinteractive.length);
		// console.log('Percent that used if had it', results.usedinteractive.length / results.interactive.length);
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
		return scores;
	},

	countScoreTimes: function(data) {
		const scores = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		// const scores = [0, 0, 0];
		data.forEach((item)=> {
			scores[item.reviewRating] += Number(item.timeOnReview);
			// let index;
			// if (item.reviewRating < 4) { index = 0; }
			// if (item.reviewRating >= 4 && item.reviewRating <= 6) { index = 1; }
			// if (item.reviewRating > 6) { index = 2; }
			// scores[index] += 1;
		});
		return scores;
	},

	sumArray: function(array) {
		return array.reduce((previous, current)=> {
			return previous + current;
		});
	},

	calcError: function(nCount) {
		return 1.96 * Math.sqrt((0.5 * (1 - 0.5)) / nCount);
	},
	render() {
		const t0 = performance.now();
		// console.log('Beef');
		// console.log('---------------');
		const beefStats = this.analyzeCounts(beefData);

		// console.log('Dino');
		// console.log('---------------');
		const dinoStats = this.analyzeCounts(dinoData);

		// console.log('Govt');
		// console.log('---------------');
		const govtStats = this.analyzeCounts(govtData);
		
		// const nonInteractives = [...beefStats.noninteractive, ...dinoStats.noninteractive, ...govtStats.noninteractive];
		// const interactives = [...beefStats.interactive, ...dinoStats.interactive, ...govtStats.interactive];
		// const usedinteractives = [...beefStats.usedinteractive, ...dinoStats.usedinteractive, ...govtStats.usedinteractive];
		// const nonInteractives = [...govtStats.noninteractive];
		// const interactives = [...govtStats.interactive];
		// const usedinteractives = [...govtStats.usedinteractive];
		// const nonInteractives = [...beefStats.foundConclusion, ...dinoStats.foundConclusion, ...govtStats.foundConclusion];
		// const interactives = [...beefStats.notFoundConclusion, ...dinoStats.notFoundConclusion, ...govtStats.notFoundConclusion];
		// const usedinteractives = [...beefStats.usedinteractive, ...dinoStats.usedinteractive, ...govtStats.usedinteractive];

		// const nonInteractivesScores = this.countScores(nonInteractives);
		// const interactivesScores = this.countScores(interactives);
		// const usedInteractivesScores = this.countScores(usedinteractives);

		// console.log(stats.stdev(nonInteractivesScores) / this.sumArray(nonInteractivesScores));
		// const data = nonInteractivesScores.map((item, index)=> {
		// 	return {
		// 		name: index,
		// 		non: nonInteractivesScores[index] / this.sumArray(nonInteractivesScores),
		// 		int: interactivesScores[index] / this.sumArray(interactivesScores),
		// 		// used: usedInteractivesScores[index] / this.sumArray(usedInteractivesScores),
		// 	};
		// });

		const renderCounts = (
			<table style={styles.countTable}>
				<tbody>
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
				</tbody>
			</table>
		);

		// const foundErrorData = [
		// 	{ 
		// 		name: 'Beef', 
		// 		'Non-Interactive': beefStats.foundErrorNonInteractive.length / beefStats.noninteractive.length,
		// 		'Had Interactive': beefStats.foundErrorInteractiveNotUse.length / beefStats.interactiveNotUsed.length,
		// 		'Used Interactive': beefStats.foundErrorInteractiveUse.length / beefStats.usedinteractive.length,
		// 	},
		// 	{ 
		// 		name: 'Dino', 
		// 		'Non-Interactive': dinoStats.foundErrorNonInteractive.length / dinoStats.noninteractive.length,
		// 		'Had Interactive': dinoStats.foundErrorInteractiveNotUse.length / dinoStats.interactiveNotUsed.length,
		// 		'Used Interactive': dinoStats.foundErrorInteractiveUse.length / dinoStats.usedinteractive.length,
		// 	},
		// 	{ 
		// 		name: 'Govt', 
		// 		'Non-Interactive': govtStats.foundErrorNonInteractive.length / govtStats.noninteractive.length,
		// 		'Had Interactive': govtStats.foundErrorInteractiveNotUse.length / govtStats.interactiveNotUsed.length,
		// 		'Used Interactive': govtStats.foundErrorInteractiveUse.length / govtStats.usedinteractive.length,
		// 	},
		// ];
		
		// Margin of Error Calculation: https://www.unc.edu/~rls/s151-2010/class23.pdf

		const foundErrorData = [
			{ 
				name: 'Beef', 
				'Presented Non-Interactive': beefStats.mode0FoundError.length / beefStats.mode0All.length,
				'Presented Non-InteractiveError': this.calcError(beefStats.mode0All.length),
				'Presented Interactive': beefStats.mode1FoundError.length / beefStats.mode1All.length,
				'Presented InteractiveError': this.calcError(beefStats.mode1All.length),
				'Did Not Use Interacivity': beefStats.nonInteractiveFoundError.length / beefStats.nonInteractiveAll.length,
				'Did Not Use InteracivityError': this.calcError(beefStats.nonInteractiveAll.length),
				'Did Use Interacivity': beefStats.interactiveFoundError.length / beefStats.interactiveAll.length,
				'Did Use InteracivityError': this.calcError(beefStats.interactiveAll.length),
			},
			{ 
				name: 'Dino', 
				'Presented Non-Interactive': dinoStats.mode0FoundError.length / dinoStats.mode0All.length,
				'Presented Non-InteractiveError': this.calcError(dinoStats.mode0All.length),
				'Presented Interactive': dinoStats.mode1FoundError.length / dinoStats.mode1All.length,
				'Presented InteractiveError': this.calcError(dinoStats.mode1All.length),
				'Did Not Use Interacivity': dinoStats.nonInteractiveFoundError.length / dinoStats.nonInteractiveAll.length,
				'Did Not Use InteracivityError': this.calcError(dinoStats.nonInteractiveAll.length),
				'Did Use Interacivity': dinoStats.interactiveFoundError.length / dinoStats.interactiveAll.length,
				'Did Use InteracivityError': this.calcError(dinoStats.interactiveAll.length),
			},
			{ 
				name: 'Govt', 
				'Presented Non-Interactive': govtStats.mode0FoundError.length / govtStats.mode0All.length,
				'Presented Non-InteractiveError': this.calcError(govtStats.mode0All.length),
				'Presented Interactive': govtStats.mode1FoundError.length / govtStats.mode1All.length,
				'Presented InteractiveError': this.calcError(govtStats.mode1All.length),
				'Did Not Use Interacivity': govtStats.nonInteractiveFoundError.length / govtStats.nonInteractiveAll.length,
				'Did Not Use InteracivityError': this.calcError(govtStats.nonInteractiveAll.length),
				'Did Use Interacivity': govtStats.interactiveFoundError.length / govtStats.interactiveAll.length,
				'Did Use InteracivityError': this.calcError(govtStats.interactiveAll.length),
			},
		];

		const renderFoundError = <AnalysisBarChart keys={['Presented Non-Interactive', 'Presented Interactive', 'Did Not Use Interacivity', 'Did Use Interacivity']} data={foundErrorData} title={'Percent of Users Finding Error'} yaxisLabel={'Percent Found Error'} />;

		const foundConclusionData = [
			{ 
				name: 'Beef', 
				'Presented Non-Interactive': beefStats.mode0FoundConclusion.length / beefStats.mode0All.length,
				'Presented Non-InteractiveError': this.calcError(beefStats.mode0All.length),
				'Presented Interactive': beefStats.mode1FoundConclusion.length / beefStats.mode1All.length,
				'Presented InteractiveError': this.calcError(beefStats.mode1All.length),
				'Did Not Use Interacivity': beefStats.nonInteractiveFoundConclusion.length / beefStats.nonInteractiveAll.length,
				'Did Not Use InteracivityError': this.calcError(beefStats.nonInteractiveAll.length),
				'Did Use Interacivity': beefStats.interactiveFoundConclusion.length / beefStats.interactiveAll.length,
				'Did Use InteracivityError': this.calcError(beefStats.interactiveAll.length),
			},
			{ 
				name: 'Dino', 
				'Presented Non-Interactive': dinoStats.mode0FoundConclusion.length / dinoStats.mode0All.length,
				'Presented Non-InteractiveError': this.calcError(dinoStats.mode0All.length),
				'Presented Interactive': dinoStats.mode1FoundConclusion.length / dinoStats.mode1All.length,
				'Presented InteractiveError': this.calcError(dinoStats.mode1All.length),
				'Did Not Use Interacivity': dinoStats.nonInteractiveFoundConclusion.length / dinoStats.nonInteractiveAll.length,
				'Did Not Use InteracivityError': this.calcError(dinoStats.nonInteractiveAll.length),
				'Did Use Interacivity': dinoStats.interactiveFoundConclusion.length / dinoStats.interactiveAll.length,
				'Did Use InteracivityError': this.calcError(dinoStats.interactiveAll.length),
			},
			{ 
				name: 'Govt', 
				'Presented Non-Interactive': govtStats.mode0FoundConclusion.length / govtStats.mode0All.length,
				'Presented Non-InteractiveError': this.calcError(govtStats.mode0All.length),
				'Presented Interactive': govtStats.mode1FoundConclusion.length / govtStats.mode1All.length,
				'Presented InteractiveError': this.calcError(govtStats.mode1All.length),
				'Did Not Use Interacivity': govtStats.nonInteractiveFoundConclusion.length / govtStats.nonInteractiveAll.length,
				'Did Not Use InteracivityError': this.calcError(govtStats.nonInteractiveAll.length),
				'Did Use Interacivity': govtStats.interactiveFoundConclusion.length / govtStats.interactiveAll.length,
				'Did Use InteracivityError': this.calcError(govtStats.interactiveAll.length),
			},
		];



		const renderFoundConclusion = <AnalysisBarChart keys={['Presented Non-Interactive', 'Presented Interactive', 'Did Not Use Interacivity', 'Did Use Interacivity']} data={foundConclusionData} title={'Percent of Users Finding Conclusion'} yaxisLabel={'Percent Found Conclusion'} />;

		const scientistFoundErrorData = [
			{ 
				name: 'Beef', 
				'Non-Scientist': beefStats.nonScientistFoundError.length / beefStats.nonScientistAll.length,
				'Non-ScientistError': this.calcError(beefStats.nonScientistAll.length),
				'Scientist': beefStats.scientistFoundError.length / beefStats.scientistAll.length,
				'ScientistError': this.calcError(beefStats.scientistAll.length),
			},
			{ 
				name: 'Dino', 
				'Non-Scientist': dinoStats.nonScientistFoundError.length / dinoStats.nonScientistAll.length,
				'Non-ScientistError': this.calcError(dinoStats.nonScientistAll.length),
				'Scientist': dinoStats.scientistFoundError.length / dinoStats.scientistAll.length,
				'ScientistError': this.calcError(dinoStats.scientistAll.length),
			},
			{ 
				name: 'Govt', 
				'Non-Scientist': govtStats.nonScientistFoundError.length / govtStats.nonScientistAll.length,
				'Non-ScientistError': this.calcError(govtStats.nonScientistAll.length),
				'Scientist': govtStats.scientistFoundError.length / govtStats.scientistAll.length,
				'ScientistError': this.calcError(govtStats.scientistAll.length),
			},
		];

		const renderScientistFoundError = <AnalysisBarChart keys={['Non-Scientist', 'Scientist']} data={scientistFoundErrorData} title={'Scientific Training and Finding Errors'} yaxisLabel={'Percent Found Error'} />;

		const scientistFoundConclusionData = [
			{ 
				name: 'Beef', 
				'Non-Scientist': beefStats.nonScientistFoundConclusion.length / beefStats.nonScientistAll.length,
				'Non-ScientistError': this.calcError(beefStats.nonScientistAll.length),
				'Scientist': beefStats.scientistFoundConclusion.length / beefStats.scientistAll.length,
				'ScientistError': this.calcError(beefStats.scientistAll.length),
			},
			{ 
				name: 'Dino', 
				'Non-Scientist': dinoStats.nonScientistFoundConclusion.length / dinoStats.nonScientistAll.length,
				'Non-ScientistError': this.calcError(dinoStats.nonScientistAll.length),
				'Scientist': dinoStats.scientistFoundConclusion.length / dinoStats.scientistAll.length,
				'ScientistError': this.calcError(dinoStats.scientistAll.length),
			},
			{ 
				name: 'Govt', 
				'Non-Scientist': govtStats.nonScientistFoundConclusion.length / govtStats.nonScientistAll.length,
				'Non-ScientistError': this.calcError(govtStats.nonScientistAll.length),
				'Scientist': govtStats.scientistFoundConclusion.length / govtStats.scientistAll.length,
				'ScientistError': this.calcError(govtStats.scientistAll.length),
			},
		];

		const renderScientistFoundConclusion = <AnalysisBarChart keys={['Non-Scientist', 'Scientist']} data={scientistFoundConclusionData} title={'Scientific Training and Finding Conclusions'} yaxisLabel={'Percent Found Conclusion'} />;

		const interestedFoundErrorData = [
			{ 
				name: 'Beef', 
				'Not Interested': beefStats.nonInterestedFoundError.length / beefStats.nonInterestedAll.length,
				'Not InterestedError': this.calcError(beefStats.nonInterestedAll.length),
				'Interested': beefStats.interestedFoundError.length / beefStats.interestedAll.length,
				'InterestedError': this.calcError(beefStats.interestedAll.length),
			},
			{ 
				name: 'Dino', 
				'Not Interested': dinoStats.nonInterestedFoundError.length / dinoStats.nonInterestedAll.length,
				'Not InterestedError': this.calcError(dinoStats.nonInterestedAll.length),
				'Interested': dinoStats.interestedFoundError.length / dinoStats.interestedAll.length,
				'InterestedError': this.calcError(dinoStats.interestedAll.length),
			},
			{ 
				name: 'Govt', 
				'Not Interested': govtStats.nonInterestedFoundError.length / govtStats.nonInterestedAll.length,
				'Not InterestedError': this.calcError(govtStats.nonInterestedAll.length),
				'Interested': govtStats.interestedFoundError.length / govtStats.interestedAll.length,
				'InterestedError': this.calcError(govtStats.interestedAll.length),
			},
		];

		const renderInterestedFoundError = <AnalysisBarChart keys={['Not Interested', 'Interested']} data={interestedFoundErrorData} title={'Interest in Topic and Finding Errors'} yaxisLabel={'Percent Found Error'} />;

		const interestedFoundConclusionData = [
			{ 
				name: 'Beef', 
				'Not Interested': beefStats.nonInterestedFoundConclusion.length / beefStats.nonInterestedAll.length,
				'Not InterestedError': this.calcError(beefStats.nonInterestedAll.length),
				'Interested': beefStats.interestedFoundConclusion.length / beefStats.interestedAll.length,
				'InterestedError': this.calcError(beefStats.interestedAll.length),
			},
			{ 
				name: 'Dino', 
				'Not Interested': dinoStats.nonInterestedFoundConclusion.length / dinoStats.nonInterestedAll.length,
				'Not InterestedError': this.calcError(dinoStats.nonInterestedAll.length),
				'Interested': dinoStats.interestedFoundConclusion.length / dinoStats.interestedAll.length,
				'InterestedError': this.calcError(dinoStats.interestedAll.length),
			},
			{ 
				name: 'Govt', 
				'Not Interested': govtStats.nonInterestedFoundConclusion.length / govtStats.nonInterestedAll.length,
				'Not InterestedError': this.calcError(govtStats.nonInterestedAll.length),
				'Interested': govtStats.interestedFoundConclusion.length / govtStats.interestedAll.length,
				'InterestedError': this.calcError(govtStats.interestedAll.length),
			},
		];

		const renderInterestedFoundConclusion = <AnalysisBarChart keys={['Not Interested', 'Interested']} data={interestedFoundConclusionData} title={'Interest in Topic and Finding Conclusions'} yaxisLabel={'Percent Found Conclusion'} />;


		const scoreCountsFoundErrorFalse = this.countScores([...beefStats.foundErrorFalse, ...dinoStats.foundErrorFalse, ...govtStats.foundErrorFalse]);
		const scoreCountsFoundErrorTrue = this.countScores([...beefStats.foundErrorTrue, ...dinoStats.foundErrorTrue, ...govtStats.foundErrorTrue]);
		
		const foundErrorScores = scoreCountsFoundErrorFalse.map((item, index)=> {
			return {
				name: index,
				'Did Not Find Error': scoreCountsFoundErrorFalse[index] / this.sumArray(scoreCountsFoundErrorFalse),
				'Found Error': scoreCountsFoundErrorTrue[index] / this.sumArray(scoreCountsFoundErrorTrue),
			};
		});
		const renderFoundErrorScores = <AnalysisAreaChart keys={['Did Not Find Error', 'Found Error']} data={foundErrorScores} title={'Score Distribution when Finding Error'} yaxisLabel={'Percentage Assigning Score'} />;


		const scoreCountsFoundConclusionFalse = this.countScores([...beefStats.foundConclusionFalse, ...dinoStats.foundConclusionFalse, ...govtStats.foundConclusionFalse]);
		const scoreCountsFoundConclusionTrue = this.countScores([...beefStats.foundConclusionTrue, ...dinoStats.foundConclusionTrue, ...govtStats.foundConclusionTrue]);
		const foundConclusionScores = scoreCountsFoundConclusionFalse.map((item, index)=> {
			return {
				name: index,
				'Did Not Find Conclusion': scoreCountsFoundConclusionFalse[index] / this.sumArray(scoreCountsFoundConclusionFalse),
				'Found Conclusion': scoreCountsFoundConclusionTrue[index] / this.sumArray(scoreCountsFoundConclusionTrue),
			};
		});
		const renderFoundConclusionScores = <AnalysisAreaChart keys={['Did Not Find Conclusion', 'Found Conclusion']} data={foundConclusionScores} title={'Score Distribution when Finding Conclusion'} yaxisLabel={'Percentage Assigning Score'} />;


		const scoreCountTimes = this.countScoreTimes([...beefStats.all, ...dinoStats.all, ...govtStats.all]);
		const scoreCounts = this.countScores([...beefStats.all, ...dinoStats.all, ...govtStats.all]);
		const scoreTimesData = scoreCounts.map((item, index)=> {
			return {
				name: index,
				'All': scoreCountTimes[index] / scoreCounts[index],
				// 'Found Error': scoreCountTimesFoundError[index] / scoreCountsFoundError[index] || 0,
				// 'Found Conclusion': scoreCountTimesFoundConclusion[index] / scoreCountsFoundConclusion[index] || 0,
			};
		});
		const renderScoreTimes = <AnalysisAreaChart keys={['All']} data={scoreTimesData} title={'Time Spent Reviewing vs Score'} yaxisLabel={'Average Time (s)'} />;

		const scoreCountTimesFoundErrorTrue = this.countScoreTimes([...beefStats.foundErrorTrue, ...dinoStats.foundErrorTrue, ...govtStats.foundErrorTrue]);
		// const scoreCountsFoundErrorTrue = this.countScores([...beefStats.foundErrorTrue, ...dinoStats.foundErrorTrue, ...govtStats.foundErrorTrue]);
		const scoreCountTimesFoundConclusionTrue = this.countScoreTimes([...beefStats.foundConclusionTrue, ...dinoStats.foundConclusionTrue, ...govtStats.foundConclusionTrue]);
		// const scoreCountsFoundConclusionTrue = this.countScores([...beefStats.foundConclusionTrue, ...dinoStats.foundConclusionTrue, ...govtStats.foundConclusionTrue]);

		const scoreCountTimesFoundErrorFalse = this.countScoreTimes([...beefStats.foundErrorFalse, ...dinoStats.foundErrorFalse, ...govtStats.foundErrorFalse]);
		// const scoreCountsFoundErrorFalse = this.countScores([...beefStats.foundErrorFalse, ...dinoStats.foundErrorFalse, ...govtStats.foundErrorFalse]);
		const scoreCountTimesFoundConclusionFalse = this.countScoreTimes([...beefStats.foundConclusionFalse, ...dinoStats.foundConclusionFalse, ...govtStats.foundConclusionFalse]);
		// const scoreCountsFoundConclusionFalse = this.countScores([...beefStats.foundConclusionFalse, ...dinoStats.foundConclusionFalse, ...govtStats.foundConclusionFalse]);

		const timesFoundErrorFalse = [...beefStats.foundErrorFalse, ...dinoStats.foundErrorFalse, ...govtStats.foundErrorFalse].map(item => item.timeOnReview);
		const timesFoundErrorTrue = [...beefStats.foundErrorTrue, ...dinoStats.foundErrorTrue, ...govtStats.foundErrorTrue].map(item => item.timeOnReview);
		const timesFoundConclusionFalse = [...beefStats.foundConclusionFalse, ...dinoStats.foundConclusionFalse, ...govtStats.foundConclusionFalse].map(item => item.timeOnReview);
		const timesFoundConclusionTrue = [...beefStats.foundConclusionTrue, ...dinoStats.foundConclusionTrue, ...govtStats.foundConclusionTrue].map(item => item.timeOnReview);
		
		const timesData = [
			{
				name: 'Found Error Average',
				'False': this.sumArray(scoreCountTimesFoundErrorFalse) / this.sumArray(scoreCountsFoundErrorFalse),
				'FalseError': this.calcError([...beefStats.foundErrorFalse, ...dinoStats.foundErrorFalse, ...govtStats.foundErrorFalse].length) * (this.sumArray(scoreCountTimesFoundErrorFalse) / this.sumArray(scoreCountsFoundErrorFalse)),
				'True': this.sumArray(scoreCountTimesFoundErrorTrue) / this.sumArray(scoreCountsFoundErrorTrue),
				'TrueError': this.calcError([...beefStats.foundErrorTrue, ...dinoStats.foundErrorTrue, ...govtStats.foundErrorTrue].length) * (this.sumArray(scoreCountTimesFoundErrorTrue) / this.sumArray(scoreCountsFoundErrorTrue)),
			},
			{
				name: 'Found Error Median',
				'False': stats.median(timesFoundErrorFalse),
				'FalseError': this.calcError([...beefStats.foundErrorFalse, ...dinoStats.foundErrorFalse, ...govtStats.foundErrorFalse].length) * (stats.median(timesFoundErrorFalse)),
				'True': stats.median(timesFoundErrorTrue),
				'TrueError': this.calcError([...beefStats.foundErrorTrue, ...dinoStats.foundErrorTrue, ...govtStats.foundErrorTrue].length) * (stats.median(timesFoundErrorTrue)),
			},
			{
				name: 'Found Conclusion Average',
				'False': this.sumArray(scoreCountTimesFoundConclusionFalse) / this.sumArray(scoreCountsFoundConclusionFalse),
				'FalseError': this.calcError([...beefStats.foundConclusionFalse, ...dinoStats.foundConclusionFalse, ...govtStats.foundConclusionFalse].length) * (this.sumArray(scoreCountTimesFoundConclusionFalse) / this.sumArray(scoreCountsFoundConclusionFalse)),
				'True': this.sumArray(scoreCountTimesFoundConclusionTrue) / this.sumArray(scoreCountsFoundConclusionTrue),
				'TrueError': this.calcError([...beefStats.foundConclusionTrue, ...dinoStats.foundConclusionTrue, ...govtStats.foundConclusionTrue].length) * (this.sumArray(scoreCountTimesFoundConclusionTrue) / this.sumArray(scoreCountsFoundConclusionTrue)),
			},
			{
				name: 'Found Conclusion Median',
				'False': stats.median(timesFoundConclusionFalse),
				'FalseError': this.calcError([...beefStats.foundConclusionFalse, ...dinoStats.foundConclusionFalse, ...govtStats.foundConclusionFalse].length) * (stats.median(timesFoundConclusionFalse)),
				'True': stats.median(timesFoundConclusionTrue),
				'TrueError': this.calcError([...beefStats.foundConclusionTrue, ...dinoStats.foundConclusionTrue, ...govtStats.foundConclusionTrue].length) * (stats.median(timesFoundConclusionTrue)),
			},
		];

		const renderResultTimes = <AnalysisBarChart keys={['False', 'True']} data={timesData} title={'Time vs Result'} yaxisLabel={'Time (s)'} />;
		
		const t1 = performance.now();
		console.log(`Calculations took ${t1 - t0}ms`);
		return (
			<div style={styles.container}>
				<h1>Analysis</h1>

				{/* <div style={styles.numberWrapper}>
					<div style={styles.number}>{24}</div>
					<div style={styles.numberText}>Found Error</div>
				</div> */}

				<div style={styles.header}>Total Participant Counts</div>
				<div style={styles.content}>
					<p>The table displays a total count of participants across the three experiments. Each experiment is split into three sections to denote how many users 1) were given a non-interactive experiment, 2) were given an interactive experiment, and 3) were given an interactive experiment and used the interactivity.</p>
					<p>All experiment users were US citizens with at least an undergraduate degree living in the US. A total of {[...beefStats.all, ...dinoStats.all, ...govtStats.all].length} users particpated.</p>
				</div>
				{renderCounts}

				<div style={styles.header}>Found Error</div>
				<div style={styles.content}>A primary focus is to understand whether an interactive experiment leads users to more frequently find the principle error. We plot the percentage of users, for each experiment that found the error given that they 1) were presented a non-interactive experiment, 2) were presented an interactive experiment, 3) did not use the interactive figure (wether presented or not), 4) did use the interactive figure.</div>
				{renderFoundError}

				<div style={styles.header}>Found Conclusion</div>
				<div style={styles.content}>A primary focus is to understand whether an interactive experiment leads users to more frequently find a correct alternative conclusion. We plot the percentage of users, for each experiment that found the error given that they 1) were presented a non-interactive experiment, 2) were presented an interactive experiment, 3) did not use the interactive figure (wether presented or not), 4) did use the interactive figure.</div>
				{renderFoundConclusion}
				

				<div style={styles.header}>Scientific Training</div>
				<div style={styles.content}>Another interpretation of interest is whether users who identify themselves as a scientist had a higher instance of detecting errors and finding alternative conclusions. The hopeful conclusion is that those who are scientifically trained are better suited to review such work.</div>
				{renderScientistFoundError}
				{renderScientistFoundConclusion}

				<div style={styles.header}>Interest in Topic</div>
				<div style={styles.content}>Another interpretation of interest is interest in the topic at hand leads to higher rates of detecting errors and finding alternative conclusions.</div>
				{renderInterestedFoundError}
				{renderInterestedFoundConclusion}

				<div style={styles.header}>Score Distribution when Finding Error or Conclusion</div>
				<div style={styles.content}>One graph of interest displays the distribution of scores assigned to an experiment based on whether a user did or did not find an error or conclusion.</div>
				{renderFoundErrorScores}
				{renderFoundConclusionScores}
				<div style={styles.content}>
					<p>A couple possible interpretations:</p>
					<ol>
						<li>Those who are more critical, and review work more harshly, more frequently detect errors and alternative conclusions.</li>
						<li>Finding an error or alternative conclusion causes a reviewer to be much harsher in rating.</li>
					</ol>
					<p>It is intesting to note that those who did not find an error or alternative conclusions have a nearly-random, even distribution across scores (except extremes of 0 and 10). Again, two conclusions:</p>
					<ol>
						<li>Those who don't know what they're doing and pretty much guess at the quality aren't critical enough to find flaws.</li>
						<li>Without a concrete error or alternative conclusion to tie their score to, reviewers don't have a good method of assigning score.</li>
					</ol>
				</div>

				<div style={styles.header}>Time Analyses</div>
				<div style={styles.content}>These graphs plot the relationship between time spent on the review and associated scores, error found percentages, conclusion found percentages, etc. One thing we want to be sure of is that the lack of found error and found conclusion events did not happen due to people simply rushing through and ignoring the work.</div>
				{renderScoreTimes}
				{renderResultTimes}
				<div style={styles.content}>
					<p>Users who found an error or a conclusion spent a bit more time (7 minutes, rather than 6) than those who did not. However, those who did not find the error or conclusion did not spend a trivial amount of time, assuaging the fear that those who didn't find the error simply skimped through.</p>
					<p>The longer time for spent by those who found an error or conclusion could have also been spent writing lenghtier reviews to report their finding.</p>
				</div>

				<div style={styles.header}>Margins of Error</div>
				<div style={styles.content}>
					<p>For the bar graphs, we calculate the margins of error with the following formula:</p>
					<img src={'https://i.imgur.com/4Hl1E3v.png'} style={{ textAlign: 'center', margin: '0 auto', display: 'inline-block' }} />
					<p>We set our confidence interval to 95% which leads to a z-score of 1.96. We assume no prior judgement of the correct value of p, and therefore set it to 0.5. n is our sample size for the given data.</p>

				</div>

				{/* <AreaChart width={730} height={250} data={data} margin={{ top: 50, right: 30, left: 0, bottom: 0 }}>
					<defs>
						<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
							<stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
						</linearGradient>
						<linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
							<stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
						</linearGradient>
						<linearGradient id="colorTv" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#32ca9d" stopOpacity={0.8} />
							<stop offset="95%" stopColor="#32ca9d" stopOpacity={0} />
						</linearGradient>
					</defs>
					<XAxis dataKey="name" />
					<YAxis />
					<CartesianGrid strokeDasharray="3 3" />
					<Tooltip />
					<Area type="monotone" dataKey="non" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
					<Area type="monotone" dataKey="int" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
					<Area type="monotone" dataKey="used" stroke="#32ca9d" fillOpacity={1} fill="url(#colorTv)" />
				</AreaChart> */}
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

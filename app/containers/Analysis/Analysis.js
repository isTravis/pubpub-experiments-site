import React from 'react';
import Radium from 'radium';
import stats from 'stats-lite';
import { jStat } from 'jStat';
import ttest from 'ttest';
import abTestConfidence from 'ab-test-confidence';
import AnalysisBarChart from './AnalysisBarChart';
import AnalysisAreaChart from './AnalysisAreaChart';
import AnalysisStackedBarChart from './AnalysisStackedBarChart';
import GraphPresentedVsNotPresented from './GraphPresentedVsNotPresented';
import GraphNotPresentedVsNotUsed from './GraphNotPresentedVsNotUsed';
import GraphUsedVsNotUsed from './GraphUsedVsNotUsed';
import GraphScientists from './GraphScientists';
import GraphInterested from './GraphInterested';
import GraphHasBeenReviewed from './GraphHasBeenReviewed';
import GraphHasReviewed from './GraphHasReviewed';

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
			interactiveAll: this.filterUsers({ data: inputData, hadInteractive: true, usedInteractive: true }),
			nonInteractiveAll: this.filterUsers({ data: inputData, hadInteractive: true, usedInteractive: false }),
			nonScientistAll: this.filterUsers({ data: inputData, isScientist: false }),
			scientistAll: this.filterUsers({ data: inputData, isScientist: true }),
			nonInterestedAll: this.filterUsers({ data: inputData, interestedInTopic: false }),
			interestedAll: this.filterUsers({ data: inputData, interestedInTopic: true }),
			hasNotReviewedAll: this.filterUsers({ data: inputData, hasReviewed: false }),
			hasReviewedAll: this.filterUsers({ data: inputData, hasReviewed: true }),
			hasNotBeenReviewedAll: this.filterUsers({ data: inputData, hasBeenReviewed: false }),
			hasBeenReviewedAll: this.filterUsers({ data: inputData, hasBeenReviewed: true }),

			foundErrorFalse: this.filterUsers({ data: inputData, foundError: false }),
			foundErrorTrue: this.filterUsers({ data: inputData, foundError: true }),
			mode0FoundError: this.filterUsers({ data: inputData, hadInteractive: false, foundError: true }),
			mode1FoundError: this.filterUsers({ data: inputData, hadInteractive: true, foundError: true }),
			interactiveFoundError: this.filterUsers({ data: inputData, hadInteractive: true, usedInteractive: true, foundError: true }),
			nonInteractiveFoundError: this.filterUsers({ data: inputData, hadInteractive: true, usedInteractive: false, foundError: true }),
			nonScientistFoundError: this.filterUsers({ data: inputData, isScientist: false, foundError: true }),
			scientistFoundError: this.filterUsers({ data: inputData, isScientist: true, foundError: true }),
			nonInterestedFoundError: this.filterUsers({ data: inputData, interestedInTopic: false, foundError: true }),
			interestedFoundError: this.filterUsers({ data: inputData, interestedInTopic: true, foundError: true }),
			hasNotReviewedFoundError: this.filterUsers({ data: inputData, hasReviewed: false, foundError: true }),
			hasReviewedFoundError: this.filterUsers({ data: inputData, hasReviewed: true, foundError: true }),
			hasNotBeenReviewedFoundError: this.filterUsers({ data: inputData, hasBeenReviewed: false, foundError: true }),
			hasBeenReviewedFoundError: this.filterUsers({ data: inputData, hasBeenReviewed: true, foundError: true }),

			foundConclusionFalse: this.filterUsers({ data: inputData, foundConclusion: false }),
			foundConclusionTrue: this.filterUsers({ data: inputData, foundConclusion: true }),
			mode0FoundConclusion: this.filterUsers({ data: inputData, hadInteractive: false, foundConclusion: true }),
			mode1FoundConclusion: this.filterUsers({ data: inputData, hadInteractive: true, foundConclusion: true }),
			interactiveFoundConclusion: this.filterUsers({ data: inputData, hadInteractive: true, usedInteractive: true, foundConclusion: true }),
			nonInteractiveFoundConclusion: this.filterUsers({ data: inputData, hadInteractive: true, usedInteractive: false, foundConclusion: true }),
			nonScientistFoundConclusion: this.filterUsers({ data: inputData, isScientist: false, foundConclusion: true }),
			scientistFoundConclusion: this.filterUsers({ data: inputData, isScientist: true, foundConclusion: true }),
			nonInterestedFoundConclusion: this.filterUsers({ data: inputData, interestedInTopic: false, foundConclusion: true }),
			interestedFoundConclusion: this.filterUsers({ data: inputData, interestedInTopic: true, foundConclusion: true }),
			hasNotReviewedFoundConclusion: this.filterUsers({ data: inputData, hasReviewed: false, foundConclusion: true }),
			hasReviewedFoundConclusion: this.filterUsers({ data: inputData, hasReviewed: true, foundConclusion: true }),
			hasNotBeenReviewedFoundConclusion: this.filterUsers({ data: inputData, hasBeenReviewed: false, foundConclusion: true }),
			hasBeenReviewedFoundConclusion: this.filterUsers({ data: inputData, hasBeenReviewed: true, foundConclusion: true }),
		};
		return results;
	},

	extractScores: function(array) {
		return array.map((item)=> {
			return item.reviewRating;
		});
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
		data.forEach((item)=> {
			scores[item.reviewRating] += Number(item.timeOnReview);
		});
		return scores;
	},

	sumArray: function(array) {
		return array.reduce((previous, current)=> {
			return previous + current;
		});
	},

	precisionAndBold: function(pVal) {
		if (pVal <= 0.05) { return <b>{pVal.toFixed(4)}</b>; }
		return pVal.toFixed(4);
	},

	calcError: function(nCount) {
		return 1.96 * Math.sqrt((0.5 * (1 - 0.5)) / nCount);
	},

	calculatePValue: function(groupATotal, groupAActive, groupBTotal, groupBActive) {
		const zScore = abTestConfidence.zScore(
			{ visitors: groupATotal, conversions: groupAActive }, 
			{ visitors: groupBTotal, conversions: groupBActive }
		);
		const pVal = jStat.ztest(zScore, 1);
		if (pVal <= 0.05) { return <b>{pVal.toFixed(4)}</b>; }
		return pVal.toFixed(4);
	},

	render() {
		const t0 = performance.now();
		const beefStats = this.analyzeCounts(beefData);
		const dinoStats = this.analyzeCounts(dinoData);
		const govtStats = this.analyzeCounts(govtData);
		
		const allData = {
			beefStats: beefStats,
			dinoStats: dinoStats,
			govtStats: govtStats,
		};

		const allFunctions = {
			sumArray: this.sumArray,
			calcError: this.calcError,
			countScores: this.countScores,
			countScoreTimes: this.countScoreTimes,
			calculatePValue: this.calculatePValue,
		};

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
						<td>{beefStats.mode0All.length}</td><td>{beefStats.mode1All.length}</td><td>{beefStats.interactiveAll.length}</td>
						<td>{dinoStats.mode0All.length}</td><td>{dinoStats.mode1All.length}</td><td>{dinoStats.interactiveAll.length}</td>
						<td>{govtStats.mode0All.length}</td><td>{govtStats.mode1All.length}</td><td>{govtStats.interactiveAll.length}</td>
					</tr>
				</tbody>
			</table>
		);

		const foundErrorData = [
			{ 
				name: 'Beef', 
				'Presented Non-Interactive': beefStats.mode0FoundError.length / beefStats.mode0All.length,
				'Presented Non-InteractiveError': this.calcError(beefStats.mode0All.length),
				'Presented Interactive': beefStats.mode1FoundError.length / beefStats.mode1All.length,
				'Presented InteractiveError': this.calcError(beefStats.mode1All.length),
				// 'Did Not Use Interacivity': beefStats.nonInteractiveFoundError.length / beefStats.nonInteractiveAll.length,
				// 'Did Not Use InteracivityError': this.calcError(beefStats.nonInteractiveAll.length),
				// 'Did Use Interacivity': beefStats.interactiveFoundError.length / beefStats.interactiveAll.length,
				// 'Did Use InteracivityError': this.calcError(beefStats.interactiveAll.length),
			},
			{ 
				name: 'Dino', 
				'Presented Non-Interactive': dinoStats.mode0FoundError.length / dinoStats.mode0All.length,
				'Presented Non-InteractiveError': this.calcError(dinoStats.mode0All.length),
				'Presented Interactive': dinoStats.mode1FoundError.length / dinoStats.mode1All.length,
				'Presented InteractiveError': this.calcError(dinoStats.mode1All.length),
				// 'Did Not Use Interacivity': dinoStats.nonInteractiveFoundError.length / dinoStats.nonInteractiveAll.length,
				// 'Did Not Use InteracivityError': this.calcError(dinoStats.nonInteractiveAll.length),
				// 'Did Use Interacivity': dinoStats.interactiveFoundError.length / dinoStats.interactiveAll.length,
				// 'Did Use InteracivityError': this.calcError(dinoStats.interactiveAll.length),
			},
			{ 
				name: 'Govt', 
				'Presented Non-Interactive': govtStats.mode0FoundError.length / govtStats.mode0All.length,
				'Presented Non-InteractiveError': this.calcError(govtStats.mode0All.length),
				'Presented Interactive': govtStats.mode1FoundError.length / govtStats.mode1All.length,
				'Presented InteractiveError': this.calcError(govtStats.mode1All.length),
				// 'Did Not Use Interacivity': govtStats.nonInteractiveFoundError.length / govtStats.nonInteractiveAll.length,
				// 'Did Not Use InteracivityError': this.calcError(govtStats.nonInteractiveAll.length),
				// 'Did Use Interacivity': govtStats.interactiveFoundError.length / govtStats.interactiveAll.length,
				// 'Did Use InteracivityError': this.calcError(govtStats.interactiveAll.length),
			},
			{ 
				name: 'All', 
				'Presented Non-Interactive': [...beefStats.mode0FoundError, ...dinoStats.mode0FoundError, ...govtStats.mode0FoundError].length / [...beefStats.mode0All, ...dinoStats.mode0All, ...govtStats.mode0All].length,
				'Presented Non-InteractiveError': this.calcError([...beefStats.mode0All, ...dinoStats.mode0All, ...govtStats.mode0All].length),
				'Presented Interactive': [...beefStats.mode1FoundError, ...dinoStats.mode1FoundError, ...govtStats.mode1FoundError].length / [...beefStats.mode1All, ...dinoStats.mode1All, ...govtStats.mode1All].length,
				'Presented InteractiveError': this.calcError([...beefStats.mode1All, ...dinoStats.mode1All, ...govtStats.mode1All].length),
				// 'Did Not Use Interacivity': [...beefStats.nonInteractiveFoundError, ...dinoStats.nonInteractiveFoundError, ...govtStats.nonInteractiveFoundError].length / [...beefStats.nonInteractiveAll, ...dinoStats.nonInteractiveAll, ...govtStats.nonInteractiveAll].length,
				// 'Did Not Use InteracivityError': this.calcError([...beefStats.nonInteractiveAll, ...dinoStats.nonInteractiveAll, ...govtStats.nonInteractiveAll].length),
				// 'Did Use Interacivity': [...beefStats.interactiveFoundError, ...dinoStats.interactiveFoundError, ...govtStats.interactiveFoundError].length / [...beefStats.interactiveAll, ...dinoStats.interactiveAll, ...govtStats.interactiveAll].length,
				// 'Did Use InteracivityError': this.calcError([...beefStats.interactiveAll, ...dinoStats.interactiveAll, ...govtStats.interactiveAll].length),
			},
		];

		// const renderFoundError = <AnalysisBarChart keys={['Presented Non-Interactive', 'Presented Interactive', 'Did Not Use Interacivity', 'Did Use Interacivity']} data={foundErrorData} title={'Percentage of Users Finding Error'} yaxisLabel={'Percent Found Error'} />;
		const renderFoundError = <AnalysisBarChart keys={['Presented Non-Interactive', 'Presented Interactive']} data={foundErrorData} title={'Percentage of Users Finding Error'} yaxisLabel={'Percent Found Error'} />;


		const foundErrorDataUsed = [
			{ 
				name: 'Beef', 
				// 'Presented Non-Interactive': beefStats.mode0FoundError.length / beefStats.mode0All.length,
				// 'Presented Non-InteractiveError': this.calcError(beefStats.mode0All.length),
				// 'Presented Interactive': beefStats.mode1FoundError.length / beefStats.mode1All.length,
				// 'Presented InteractiveError': this.calcError(beefStats.mode1All.length),
				'Did Not Use Interacivity': beefStats.nonInteractiveFoundError.length / beefStats.nonInteractiveAll.length,
				'Did Not Use InteracivityError': this.calcError(beefStats.nonInteractiveAll.length),
				'Did Use Interacivity': beefStats.interactiveFoundError.length / beefStats.interactiveAll.length,
				'Did Use InteracivityError': this.calcError(beefStats.interactiveAll.length),
			},
			{ 
				name: 'Dino', 
				// 'Presented Non-Interactive': dinoStats.mode0FoundError.length / dinoStats.mode0All.length,
				// 'Presented Non-InteractiveError': this.calcError(dinoStats.mode0All.length),
				// 'Presented Interactive': dinoStats.mode1FoundError.length / dinoStats.mode1All.length,
				// 'Presented InteractiveError': this.calcError(dinoStats.mode1All.length),
				'Did Not Use Interacivity': dinoStats.nonInteractiveFoundError.length / dinoStats.nonInteractiveAll.length,
				'Did Not Use InteracivityError': this.calcError(dinoStats.nonInteractiveAll.length),
				'Did Use Interacivity': dinoStats.interactiveFoundError.length / dinoStats.interactiveAll.length,
				'Did Use InteracivityError': this.calcError(dinoStats.interactiveAll.length),
			},
			{ 
				name: 'Govt', 
				// 'Presented Non-Interactive': govtStats.mode0FoundError.length / govtStats.mode0All.length,
				// 'Presented Non-InteractiveError': this.calcError(govtStats.mode0All.length),
				// 'Presented Interactive': govtStats.mode1FoundError.length / govtStats.mode1All.length,
				// 'Presented InteractiveError': this.calcError(govtStats.mode1All.length),
				'Did Not Use Interacivity': govtStats.nonInteractiveFoundError.length / govtStats.nonInteractiveAll.length,
				'Did Not Use InteracivityError': this.calcError(govtStats.nonInteractiveAll.length),
				'Did Use Interacivity': govtStats.interactiveFoundError.length / govtStats.interactiveAll.length,
				'Did Use InteracivityError': this.calcError(govtStats.interactiveAll.length),
			},
			{ 
				name: 'All', 
				// 'Presented Non-Interactive': [...beefStats.mode0FoundError, ...dinoStats.mode0FoundError, ...govtStats.mode0FoundError].length / [...beefStats.mode0All, ...dinoStats.mode0All, ...govtStats.mode0All].length,
				// 'Presented Non-InteractiveError': this.calcError([...beefStats.mode0All, ...dinoStats.mode0All, ...govtStats.mode0All].length),
				// 'Presented Interactive': [...beefStats.mode1FoundError, ...dinoStats.mode1FoundError, ...govtStats.mode1FoundError].length / [...beefStats.mode1All, ...dinoStats.mode1All, ...govtStats.mode1All].length,
				// 'Presented InteractiveError': this.calcError([...beefStats.mode1All, ...dinoStats.mode1All, ...govtStats.mode1All].length),
				'Did Not Use Interacivity': [...beefStats.nonInteractiveFoundError, ...dinoStats.nonInteractiveFoundError, ...govtStats.nonInteractiveFoundError].length / [...beefStats.nonInteractiveAll, ...dinoStats.nonInteractiveAll, ...govtStats.nonInteractiveAll].length,
				'Did Not Use InteracivityError': this.calcError([...beefStats.nonInteractiveAll, ...dinoStats.nonInteractiveAll, ...govtStats.nonInteractiveAll].length),
				'Did Use Interacivity': [...beefStats.interactiveFoundError, ...dinoStats.interactiveFoundError, ...govtStats.interactiveFoundError].length / [...beefStats.interactiveAll, ...dinoStats.interactiveAll, ...govtStats.interactiveAll].length,
				'Did Use InteracivityError': this.calcError([...beefStats.interactiveAll, ...dinoStats.interactiveAll, ...govtStats.interactiveAll].length),
			},
		];

		// const renderFoundErrorUsed = <AnalysisBarChart keys={['Presented Non-Interactive', 'Presented Interactive', 'Did Not Use Interacivity', 'Did Use Interacivity']} data={foundErrorData} title={'Percentage of Users Finding Error'} yaxisLabel={'Percent Found Error'} colorOffset={2} />;
		const renderFoundErrorUsed = <AnalysisBarChart keys={['Did Not Use Interacivity', 'Did Use Interacivity']} data={foundErrorDataUsed} title={'Percentage of Users Finding Error'} yaxisLabel={'Percent Found Error'} colorOffset={2} />;


		const foundConclusionData = [
			{ 
				name: 'Beef', 
				'Presented Non-Interactive': beefStats.mode0FoundConclusion.length / beefStats.mode0All.length,
				'Presented Non-InteractiveError': this.calcError(beefStats.mode0All.length),
				'Presented Interactive': beefStats.mode1FoundConclusion.length / beefStats.mode1All.length,
				'Presented InteractiveError': this.calcError(beefStats.mode1All.length),
				// 'Did Not Use Interacivity': beefStats.nonInteractiveFoundConclusion.length / beefStats.nonInteractiveAll.length,
				// 'Did Not Use InteracivityError': this.calcError(beefStats.nonInteractiveAll.length),
				// 'Did Use Interacivity': beefStats.interactiveFoundConclusion.length / beefStats.interactiveAll.length,
				// 'Did Use InteracivityError': this.calcError(beefStats.interactiveAll.length),
			},
			{ 
				name: 'Dino', 
				'Presented Non-Interactive': dinoStats.mode0FoundConclusion.length / dinoStats.mode0All.length,
				'Presented Non-InteractiveError': this.calcError(dinoStats.mode0All.length),
				'Presented Interactive': dinoStats.mode1FoundConclusion.length / dinoStats.mode1All.length,
				'Presented InteractiveError': this.calcError(dinoStats.mode1All.length),
				// 'Did Not Use Interacivity': dinoStats.nonInteractiveFoundConclusion.length / dinoStats.nonInteractiveAll.length,
				// 'Did Not Use InteracivityError': this.calcError(dinoStats.nonInteractiveAll.length),
				// 'Did Use Interacivity': dinoStats.interactiveFoundConclusion.length / dinoStats.interactiveAll.length,
				// 'Did Use InteracivityError': this.calcError(dinoStats.interactiveAll.length),
			},
			{ 
				name: 'Govt', 
				'Presented Non-Interactive': govtStats.mode0FoundConclusion.length / govtStats.mode0All.length,
				'Presented Non-InteractiveError': this.calcError(govtStats.mode0All.length),
				'Presented Interactive': govtStats.mode1FoundConclusion.length / govtStats.mode1All.length,
				'Presented InteractiveError': this.calcError(govtStats.mode1All.length),
				// 'Did Not Use Interacivity': govtStats.nonInteractiveFoundConclusion.length / govtStats.nonInteractiveAll.length,
				// 'Did Not Use InteracivityError': this.calcError(govtStats.nonInteractiveAll.length),
				// 'Did Use Interacivity': govtStats.interactiveFoundConclusion.length / govtStats.interactiveAll.length,
				// 'Did Use InteracivityError': this.calcError(govtStats.interactiveAll.length),
			},
			{ 
				name: 'All', 
				'Presented Non-Interactive': [...beefStats.mode0FoundConclusion, ...dinoStats.mode0FoundConclusion, ...govtStats.mode0FoundConclusion].length / [...beefStats.mode0All, ...dinoStats.mode0All, ...govtStats.mode0All].length,
				'Presented Non-InteractiveError': this.calcError([...beefStats.mode0All, ...dinoStats.mode0All, ...govtStats.mode0All].length),
				'Presented Interactive': [...beefStats.mode1FoundConclusion, ...dinoStats.mode1FoundConclusion, ...govtStats.mode1FoundConclusion].length / [...beefStats.mode1All, ...dinoStats.mode1All, ...govtStats.mode1All].length,
				'Presented InteractiveError': this.calcError([...beefStats.mode1All, ...dinoStats.mode1All, ...govtStats.mode1All].length),
				// 'Did Not Use Interacivity': [...beefStats.nonInteractiveFoundConclusion, ...dinoStats.nonInteractiveFoundConclusion, ...govtStats.nonInteractiveFoundConclusion].length / [...beefStats.nonInteractiveAll, ...dinoStats.nonInteractiveAll, ...govtStats.nonInteractiveAll].length,
				// 'Did Not Use InteracivityError': this.calcError([...beefStats.nonInteractiveAll, ...dinoStats.nonInteractiveAll, ...govtStats.nonInteractiveAll].length),
				// 'Did Use Interacivity': [...beefStats.interactiveFoundConclusion, ...dinoStats.interactiveFoundConclusion, ...govtStats.interactiveFoundConclusion].length / [...beefStats.interactiveAll, ...dinoStats.interactiveAll, ...govtStats.interactiveAll].length,
				// 'Did Use InteracivityError': this.calcError([...beefStats.interactiveAll, ...dinoStats.interactiveAll, ...govtStats.interactiveAll].length),
			},
		];



		// const renderFoundConclusion = <AnalysisBarChart keys={['Presented Non-Interactive', 'Presented Interactive', 'Did Not Use Interacivity', 'Did Use Interacivity']} data={foundConclusionData} title={'Percentage of Users Finding Conclusion'} yaxisLabel={'Percent Found Conclusion'} />;
		const renderFoundConclusion = <AnalysisBarChart keys={['Presented Non-Interactive', 'Presented Interactive']} data={foundConclusionData} title={'Percentage of Users Finding Conclusion'} yaxisLabel={'Percent Found Conclusion'} />;


		const foundConclusionDataUsed = [
			{ 
				name: 'Beef', 
				// 'Presented Non-Interactive': beefStats.mode0FoundConclusion.length / beefStats.mode0All.length,
				// 'Presented Non-InteractiveError': this.calcError(beefStats.mode0All.length),
				// 'Presented Interactive': beefStats.mode1FoundConclusion.length / beefStats.mode1All.length,
				// 'Presented InteractiveError': this.calcError(beefStats.mode1All.length),
				'Did Not Use Interacivity': beefStats.nonInteractiveFoundConclusion.length / beefStats.nonInteractiveAll.length,
				'Did Not Use InteracivityError': this.calcError(beefStats.nonInteractiveAll.length),
				'Did Use Interacivity': beefStats.interactiveFoundConclusion.length / beefStats.interactiveAll.length,
				'Did Use InteracivityError': this.calcError(beefStats.interactiveAll.length),
			},
			{ 
				name: 'Dino', 
				// 'Presented Non-Interactive': dinoStats.mode0FoundConclusion.length / dinoStats.mode0All.length,
				// 'Presented Non-InteractiveError': this.calcError(dinoStats.mode0All.length),
				// 'Presented Interactive': dinoStats.mode1FoundConclusion.length / dinoStats.mode1All.length,
				// 'Presented InteractiveError': this.calcError(dinoStats.mode1All.length),
				'Did Not Use Interacivity': dinoStats.nonInteractiveFoundConclusion.length / dinoStats.nonInteractiveAll.length,
				'Did Not Use InteracivityError': this.calcError(dinoStats.nonInteractiveAll.length),
				'Did Use Interacivity': dinoStats.interactiveFoundConclusion.length / dinoStats.interactiveAll.length,
				'Did Use InteracivityError': this.calcError(dinoStats.interactiveAll.length),
			},
			{ 
				name: 'Govt', 
				// 'Presented Non-Interactive': govtStats.mode0FoundConclusion.length / govtStats.mode0All.length,
				// 'Presented Non-InteractiveError': this.calcError(govtStats.mode0All.length),
				// 'Presented Interactive': govtStats.mode1FoundConclusion.length / govtStats.mode1All.length,
				// 'Presented InteractiveError': this.calcError(govtStats.mode1All.length),
				'Did Not Use Interacivity': govtStats.nonInteractiveFoundConclusion.length / govtStats.nonInteractiveAll.length,
				'Did Not Use InteracivityError': this.calcError(govtStats.nonInteractiveAll.length),
				'Did Use Interacivity': govtStats.interactiveFoundConclusion.length / govtStats.interactiveAll.length,
				'Did Use InteracivityError': this.calcError(govtStats.interactiveAll.length),
			},
			{ 
				name: 'All', 
				// 'Presented Non-Interactive': [...beefStats.mode0FoundConclusion, ...dinoStats.mode0FoundConclusion, ...govtStats.mode0FoundConclusion].length / [...beefStats.mode0All, ...dinoStats.mode0All, ...govtStats.mode0All].length,
				// 'Presented Non-InteractiveError': this.calcError([...beefStats.mode0All, ...dinoStats.mode0All, ...govtStats.mode0All].length),
				// 'Presented Interactive': [...beefStats.mode1FoundConclusion, ...dinoStats.mode1FoundConclusion, ...govtStats.mode1FoundConclusion].length / [...beefStats.mode1All, ...dinoStats.mode1All, ...govtStats.mode1All].length,
				// 'Presented InteractiveError': this.calcError([...beefStats.mode1All, ...dinoStats.mode1All, ...govtStats.mode1All].length),
				'Did Not Use Interacivity': [...beefStats.nonInteractiveFoundConclusion, ...dinoStats.nonInteractiveFoundConclusion, ...govtStats.nonInteractiveFoundConclusion].length / [...beefStats.nonInteractiveAll, ...dinoStats.nonInteractiveAll, ...govtStats.nonInteractiveAll].length,
				'Did Not Use InteracivityError': this.calcError([...beefStats.nonInteractiveAll, ...dinoStats.nonInteractiveAll, ...govtStats.nonInteractiveAll].length),
				'Did Use Interacivity': [...beefStats.interactiveFoundConclusion, ...dinoStats.interactiveFoundConclusion, ...govtStats.interactiveFoundConclusion].length / [...beefStats.interactiveAll, ...dinoStats.interactiveAll, ...govtStats.interactiveAll].length,
				'Did Use InteracivityError': this.calcError([...beefStats.interactiveAll, ...dinoStats.interactiveAll, ...govtStats.interactiveAll].length),
			},
		];

		// const renderFoundConclusionUsed = <AnalysisBarChart keys={['Presented Non-Interactive', 'Presented Interactive', 'Did Not Use Interacivity', 'Did Use Interacivity']} data={foundConclusionData} title={'Percentage of Users Finding Conclusion'} yaxisLabel={'Percent Found Conclusion'} colorOffset={2} />;
		const renderFoundConclusionUsed = <AnalysisBarChart keys={['Did Not Use Interacivity', 'Did Use Interacivity']} data={foundConclusionDataUsed} title={'Percentage of Users Finding Conclusion'} yaxisLabel={'Percent Found Conclusion'} colorOffset={2} />;


		/* Not Presented vs Not used */
		const notPresentedNotUsedfoundErrorData = [
			{ 
				name: 'Beef', 
				'Presented Non-Interactive': beefStats.mode0FoundError.length / beefStats.mode0All.length,
				'Presented Non-InteractiveError': this.calcError(beefStats.mode0All.length),
				'Did Not Use Interacivity': beefStats.nonInteractiveFoundError.length / beefStats.nonInteractiveAll.length,
				'Did Not Use InteracivityError': this.calcError(beefStats.nonInteractiveAll.length),
			},
			{ 
				name: 'Dino', 
				'Presented Non-Interactive': dinoStats.mode0FoundError.length / dinoStats.mode0All.length,
				'Presented Non-InteractiveError': this.calcError(dinoStats.mode0All.length),
				'Did Not Use Interacivity': dinoStats.nonInteractiveFoundError.length / dinoStats.nonInteractiveAll.length,
				'Did Not Use InteracivityError': this.calcError(dinoStats.nonInteractiveAll.length),
			},
			{ 
				name: 'Govt', 
				'Presented Non-Interactive': govtStats.mode0FoundError.length / govtStats.mode0All.length,
				'Presented Non-InteractiveError': this.calcError(govtStats.mode0All.length),
				'Did Not Use Interacivity': govtStats.nonInteractiveFoundError.length / govtStats.nonInteractiveAll.length,
				'Did Not Use InteracivityError': this.calcError(govtStats.nonInteractiveAll.length),
			},
			{ 
				name: 'All', 
				'Presented Non-Interactive': [...beefStats.mode0FoundError, ...dinoStats.mode0FoundError, ...govtStats.mode0FoundError].length / [...beefStats.mode0All, ...dinoStats.mode0All, ...govtStats.mode0All].length,
				'Presented Non-InteractiveError': this.calcError([...beefStats.mode0All, ...dinoStats.mode0All, ...govtStats.mode0All].length),
				'Did Not Use Interacivity': [...beefStats.nonInteractiveFoundError, ...dinoStats.nonInteractiveFoundError, ...govtStats.nonInteractiveFoundError].length / [...beefStats.nonInteractiveAll, ...dinoStats.nonInteractiveAll, ...govtStats.nonInteractiveAll].length,
				'Did Not Use InteracivityError': this.calcError([...beefStats.nonInteractiveAll, ...dinoStats.nonInteractiveAll, ...govtStats.nonInteractiveAll].length),
			},
		];

		// const renderFoundError = <AnalysisBarChart keys={['Presented Non-Interactive', 'Presented Interactive', 'Did Not Use Interacivity', 'Did Use Interacivity']} data={foundErrorData} title={'Percentage of Users Finding Error'} yaxisLabel={'Percent Found Error'} />;
		const renderNotPresentedNotUsedFoundError = <AnalysisBarChart keys={['Presented Non-Interactive', 'Did Not Use Interacivity']} data={notPresentedNotUsedfoundErrorData} title={'Percentage of Users Finding Error'} yaxisLabel={'Percent Found Error'} />;

		const notPresentedNotUsedfoundConclusionData = [
			{ 
				name: 'Beef', 
				'Presented Non-Interactive': beefStats.mode0FoundConclusion.length / beefStats.mode0All.length,
				'Presented Non-InteractiveError': this.calcError(beefStats.mode0All.length),
				'Did Not Use Interacivity': beefStats.nonInteractiveFoundConclusion.length / beefStats.nonInteractiveAll.length,
				'Did Not Use InteracivityError': this.calcError(beefStats.nonInteractiveAll.length),
			},
			{ 
				name: 'Dino', 
				'Presented Non-Interactive': dinoStats.mode0FoundConclusion.length / dinoStats.mode0All.length,
				'Presented Non-InteractiveError': this.calcError(dinoStats.mode0All.length),
				'Did Not Use Interacivity': dinoStats.nonInteractiveFoundConclusion.length / dinoStats.nonInteractiveAll.length,
				'Did Not Use InteracivityError': this.calcError(dinoStats.nonInteractiveAll.length),
			},
			{ 
				name: 'Govt', 
				'Presented Non-Interactive': govtStats.mode0FoundConclusion.length / govtStats.mode0All.length,
				'Presented Non-InteractiveError': this.calcError(govtStats.mode0All.length),
				'Did Not Use Interacivity': govtStats.nonInteractiveFoundConclusion.length / govtStats.nonInteractiveAll.length,
				'Did Not Use InteracivityError': this.calcError(govtStats.nonInteractiveAll.length),
			},
			{ 
				name: 'All', 
				'Presented Non-Interactive': [...beefStats.mode0FoundConclusion, ...dinoStats.mode0FoundConclusion, ...govtStats.mode0FoundConclusion].length / [...beefStats.mode0All, ...dinoStats.mode0All, ...govtStats.mode0All].length,
				'Presented Non-InteractiveError': this.calcError([...beefStats.mode0All, ...dinoStats.mode0All, ...govtStats.mode0All].length),
				'Did Not Use Interacivity': [...beefStats.nonInteractiveFoundConclusion, ...dinoStats.nonInteractiveFoundConclusion, ...govtStats.nonInteractiveFoundConclusion].length / [...beefStats.nonInteractiveAll, ...dinoStats.nonInteractiveAll, ...govtStats.nonInteractiveAll].length,
				'Did Not Use InteracivityError': this.calcError([...beefStats.nonInteractiveAll, ...dinoStats.nonInteractiveAll, ...govtStats.nonInteractiveAll].length),
			},
		];

		const renderNotPresentedNotUsedFoundConclusion = <AnalysisBarChart keys={['Presented Non-Interactive', 'Did Not Use Interacivity']} data={notPresentedNotUsedfoundConclusionData} title={'Percentage of Users Finding Conclusion'} yaxisLabel={'Percent Found Conclusion'} />;

		/* --------- */



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
			{ 
				name: 'All', 
				'Non-Scientist': [...beefStats.nonScientistFoundError, ...dinoStats.nonScientistFoundError, ...govtStats.nonScientistFoundError].length / [...beefStats.nonScientistAll, ...dinoStats.nonScientistAll, ...govtStats.nonScientistAll].length,
				'Non-ScientistError': this.calcError([...beefStats.nonScientistAll, ...dinoStats.nonScientistAll, ...govtStats.nonScientistAll].length),
				'Scientist': [...beefStats.scientistFoundError, ...dinoStats.scientistFoundError, ...govtStats.scientistFoundError].length / [...beefStats.scientistAll, ...dinoStats.scientistAll, ...govtStats.scientistAll].length,
				'ScientistError': this.calcError([...beefStats.scientistAll, ...dinoStats.scientistAll, ...govtStats.scientistAll].length),
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
			{ 
				name: 'All', 
				'Non-Scientist': [...beefStats.nonScientistFoundConclusion, ...dinoStats.nonScientistFoundConclusion, ...govtStats.nonScientistFoundConclusion].length / [...beefStats.nonScientistAll, ...dinoStats.nonScientistAll, ...govtStats.nonScientistAll].length,
				'Non-ScientistError': this.calcError([...beefStats.nonScientistAll, ...dinoStats.nonScientistAll, ...govtStats.nonScientistAll].length),
				'Scientist': [...beefStats.scientistFoundConclusion, ...dinoStats.scientistFoundConclusion, ...govtStats.scientistFoundConclusion].length / [...beefStats.scientistAll, ...dinoStats.scientistAll, ...govtStats.scientistAll].length,
				'ScientistError': this.calcError([...beefStats.scientistAll, ...dinoStats.scientistAll, ...govtStats.scientistAll].length),
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
			{ 
				name: 'All', 
				'Not Interested': [...beefStats.nonInterestedFoundError, ...dinoStats.nonInterestedFoundError, ...govtStats.nonInterestedFoundError].length / [...beefStats.nonInterestedAll, ...dinoStats.nonInterestedAll, ...govtStats.nonInterestedAll].length,
				'Not InterestedError': this.calcError([...beefStats.nonInterestedAll, ...dinoStats.nonInterestedAll, ...govtStats.nonInterestedAll].length),
				'Interested': [...beefStats.interestedFoundError, ...dinoStats.interestedFoundError, ...govtStats.interestedFoundError].length / [...beefStats.interestedAll, ...dinoStats.interestedAll, ...govtStats.interestedAll].length,
				'InterestedError': this.calcError([...beefStats.interestedAll, ...dinoStats.interestedAll, ...govtStats.interestedAll].length),
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
			{ 
				name: 'All', 
				'Not Interested': [...beefStats.nonInterestedFoundConclusion, ...dinoStats.nonInterestedFoundConclusion, ...govtStats.nonInterestedFoundConclusion].length / [...beefStats.nonInterestedAll, ...dinoStats.nonInterestedAll, ...govtStats.nonInterestedAll].length,
				'Not InterestedError': this.calcError([...beefStats.nonInterestedAll, ...dinoStats.nonInterestedAll, ...govtStats.nonInterestedAll].length),
				'Interested': [...beefStats.interestedFoundConclusion, ...dinoStats.interestedFoundConclusion, ...govtStats.interestedFoundConclusion].length / [...beefStats.interestedAll, ...dinoStats.interestedAll, ...govtStats.interestedAll].length,
				'InterestedError': this.calcError([...beefStats.interestedAll, ...dinoStats.interestedAll, ...govtStats.interestedAll].length),
			},

		];

		const renderInterestedFoundConclusion = <AnalysisBarChart keys={['Not Interested', 'Interested']} data={interestedFoundConclusionData} title={'Interest in Topic and Finding Conclusions'} yaxisLabel={'Percent Found Conclusion'} />;


		const hasReviewedFoundErrorData = [
			{ 
				name: 'Beef', 
				'Has Not Reviewed': beefStats.hasNotReviewedFoundError.length / beefStats.hasNotReviewedAll.length,
				'Has Not ReviewedError': this.calcError(beefStats.hasNotReviewedAll.length),
				'Has Reviewed': beefStats.hasReviewedFoundError.length / beefStats.hasReviewedAll.length,
				'Has ReviewedError': this.calcError(beefStats.hasReviewedAll.length),
			},
			{ 
				name: 'Dino', 
				'Has Not Reviewed': dinoStats.hasNotReviewedFoundError.length / dinoStats.hasNotReviewedAll.length,
				'Has Not ReviewedError': this.calcError(dinoStats.hasNotReviewedAll.length),
				'Has Reviewed': dinoStats.hasReviewedFoundError.length / dinoStats.hasReviewedAll.length,
				'Has ReviewedError': this.calcError(dinoStats.hasReviewedAll.length),
			},
			{ 
				name: 'Govt', 
				'Has Not Reviewed': govtStats.hasNotReviewedFoundError.length / govtStats.hasNotReviewedAll.length,
				'Has Not ReviewedError': this.calcError(govtStats.hasNotReviewedAll.length),
				'Has Reviewed': govtStats.hasReviewedFoundError.length / govtStats.hasReviewedAll.length,
				'Has ReviewedError': this.calcError(govtStats.hasReviewedAll.length),
			},
			{ 
				name: 'All', 
				'Has Not Reviewed': [...beefStats.hasNotReviewedFoundError, ...dinoStats.hasNotReviewedFoundError, ...govtStats.hasNotReviewedFoundError].length / [...beefStats.hasNotReviewedAll, ...dinoStats.hasNotReviewedAll, ...govtStats.hasNotReviewedAll].length,
				'Has Not ReviewedError': this.calcError([...beefStats.hasNotReviewedAll, ...dinoStats.hasNotReviewedAll, ...govtStats.hasNotReviewedAll].length),
				'Has Reviewed': [...beefStats.hasReviewedFoundError, ...dinoStats.hasReviewedFoundError, ...govtStats.hasReviewedFoundError].length / [...beefStats.hasReviewedAll, ...dinoStats.hasReviewedAll, ...govtStats.hasReviewedAll].length,
				'Has ReviewedError': this.calcError([...beefStats.hasReviewedAll, ...dinoStats.hasReviewedAll, ...govtStats.hasReviewedAll].length),
			},
		];
		const renderHasReviewedFoundError = <AnalysisBarChart keys={['Has Not Reviewed', 'Has Reviewed']} data={hasReviewedFoundErrorData} title={'Has Previously Peer Reviewed and Finding Errors'} yaxisLabel={'Percent Found Error'} />;


		const hasReviewedFoundConclusionData = [
			{ 
				name: 'Beef', 
				'Has Not Reviewed': beefStats.hasNotReviewedFoundConclusion.length / beefStats.hasNotReviewedAll.length,
				'Has Not ReviewedError': this.calcError(beefStats.hasNotReviewedAll.length),
				'Has Reviewed': beefStats.hasReviewedFoundConclusion.length / beefStats.hasReviewedAll.length,
				'Has ReviewedError': this.calcError(beefStats.hasReviewedAll.length),
			},
			{ 
				name: 'Dino', 
				'Has Not Reviewed': dinoStats.hasNotReviewedFoundConclusion.length / dinoStats.hasNotReviewedAll.length,
				'Has Not ReviewedError': this.calcError(dinoStats.hasNotReviewedAll.length),
				'Has Reviewed': dinoStats.hasReviewedFoundConclusion.length / dinoStats.hasReviewedAll.length,
				'Has ReviewedError': this.calcError(dinoStats.hasReviewedAll.length),
			},
			{ 
				name: 'Govt', 
				'Has Not Reviewed': govtStats.hasNotReviewedFoundConclusion.length / govtStats.hasNotReviewedAll.length,
				'Has Not ReviewedError': this.calcError(govtStats.hasNotReviewedAll.length),
				'Has Reviewed': govtStats.hasReviewedFoundConclusion.length / govtStats.hasReviewedAll.length,
				'Has ReviewedError': this.calcError(govtStats.hasReviewedAll.length),
			},
			{ 
				name: 'All', 
				'Has Not Reviewed': [...beefStats.hasNotReviewedFoundConclusion, ...dinoStats.hasNotReviewedFoundConclusion, ...govtStats.hasNotReviewedFoundConclusion].length / [...beefStats.hasNotReviewedAll, ...dinoStats.hasNotReviewedAll, ...govtStats.hasNotReviewedAll].length,
				'Has Not ReviewedError': this.calcError([...beefStats.hasNotReviewedAll, ...dinoStats.hasNotReviewedAll, ...govtStats.hasNotReviewedAll].length),
				'Has Reviewed': [...beefStats.hasReviewedFoundConclusion, ...dinoStats.hasReviewedFoundConclusion, ...govtStats.hasReviewedFoundConclusion].length / [...beefStats.hasReviewedAll, ...dinoStats.hasReviewedAll, ...govtStats.hasReviewedAll].length,
				'Has ReviewedError': this.calcError([...beefStats.hasReviewedAll, ...dinoStats.hasReviewedAll, ...govtStats.hasReviewedAll].length),
			},
		];
		const renderHasReviewedFoundConclusion = <AnalysisBarChart keys={['Has Not Reviewed', 'Has Reviewed']} data={hasReviewedFoundConclusionData} title={'Has Previously Peer Reviewed and Finding Conclusions'} yaxisLabel={'Percent Found Conclusion'} />;


		const hasBeenReviewedFoundErrorData = [
			{ 
				name: 'Beef', 
				'Has Not Been Reviewed': beefStats.hasNotBeenReviewedFoundError.length / beefStats.hasNotBeenReviewedAll.length,
				'Has Not Been ReviewedError': this.calcError(beefStats.hasNotBeenReviewedAll.length),
				'Has Been Reviewed': beefStats.hasBeenReviewedFoundError.length / beefStats.hasBeenReviewedAll.length,
				'Has Been ReviewedError': this.calcError(beefStats.hasBeenReviewedAll.length),
			},
			{ 
				name: 'Dino', 
				'Has Not Been Reviewed': dinoStats.hasNotBeenReviewedFoundError.length / dinoStats.hasNotBeenReviewedAll.length,
				'Has Not Been ReviewedError': this.calcError(dinoStats.hasNotBeenReviewedAll.length),
				'Has Been Reviewed': dinoStats.hasBeenReviewedFoundError.length / dinoStats.hasBeenReviewedAll.length,
				'Has Been ReviewedError': this.calcError(dinoStats.hasBeenReviewedAll.length),
			},
			{ 
				name: 'Govt', 
				'Has Not Been Reviewed': govtStats.hasNotBeenReviewedFoundError.length / govtStats.hasNotBeenReviewedAll.length,
				'Has Not Been ReviewedError': this.calcError(govtStats.hasNotBeenReviewedAll.length),
				'Has Been Reviewed': govtStats.hasBeenReviewedFoundError.length / govtStats.hasBeenReviewedAll.length,
				'Has Been ReviewedError': this.calcError(govtStats.hasBeenReviewedAll.length),
			},
			{ 
				name: 'All', 
				'Has Not Been Reviewed': [...beefStats.hasNotBeenReviewedFoundError, ...dinoStats.hasNotBeenReviewedFoundError, ...govtStats.hasNotBeenReviewedFoundError].length / [...beefStats.hasNotBeenReviewedAll, ...dinoStats.hasNotBeenReviewedAll, ...govtStats.hasNotBeenReviewedAll].length,
				'Has Not Been ReviewedError': this.calcError([...beefStats.hasNotBeenReviewedAll, ...dinoStats.hasNotBeenReviewedAll, ...govtStats.hasNotBeenReviewedAll].length),
				'Has Been Reviewed': [...beefStats.hasBeenReviewedFoundError, ...dinoStats.hasBeenReviewedFoundError, ...govtStats.hasBeenReviewedFoundError].length / [...beefStats.hasBeenReviewedAll, ...dinoStats.hasBeenReviewedAll, ...govtStats.hasBeenReviewedAll].length,
				'Has Been ReviewedError': this.calcError([...beefStats.hasBeenReviewedAll, ...dinoStats.hasBeenReviewedAll, ...govtStats.hasBeenReviewedAll].length),
			},
		];
		const renderHasBeenReviewedFoundError = <AnalysisBarChart keys={['Has Not Been Reviewed', 'Has Been Reviewed']} data={hasBeenReviewedFoundErrorData} title={'Has Previously Been Peer Reviewed and Finding Errors'} yaxisLabel={'Percent Found Error'} />;


		const hasBeenReviewedFoundConclusionData = [
			{ 
				name: 'Beef', 
				'Has Not Been Reviewed': beefStats.hasNotBeenReviewedFoundConclusion.length / beefStats.hasNotBeenReviewedAll.length,
				'Has Not Been ReviewedError': this.calcError(beefStats.hasNotBeenReviewedAll.length),
				'Has Been Reviewed': beefStats.hasBeenReviewedFoundConclusion.length / beefStats.hasBeenReviewedAll.length,
				'Has Been ReviewedError': this.calcError(beefStats.hasBeenReviewedAll.length),
			},
			{ 
				name: 'Dino', 
				'Has Not Been Reviewed': dinoStats.hasNotBeenReviewedFoundConclusion.length / dinoStats.hasNotBeenReviewedAll.length,
				'Has Not Been ReviewedError': this.calcError(dinoStats.hasNotBeenReviewedAll.length),
				'Has Been Reviewed': dinoStats.hasBeenReviewedFoundConclusion.length / dinoStats.hasBeenReviewedAll.length,
				'Has Been ReviewedError': this.calcError(dinoStats.hasBeenReviewedAll.length),
			},
			{ 
				name: 'Govt', 
				'Has Not Been Reviewed': govtStats.hasNotBeenReviewedFoundConclusion.length / govtStats.hasNotBeenReviewedAll.length,
				'Has Not Been ReviewedError': this.calcError(govtStats.hasNotBeenReviewedAll.length),
				'Has Been Reviewed': govtStats.hasBeenReviewedFoundConclusion.length / govtStats.hasBeenReviewedAll.length,
				'Has Been ReviewedError': this.calcError(govtStats.hasBeenReviewedAll.length),
			},
			{ 
				name: 'All', 
				'Has Not Been Reviewed': [...beefStats.hasNotBeenReviewedFoundConclusion, ...dinoStats.hasNotBeenReviewedFoundConclusion, ...govtStats.hasNotBeenReviewedFoundConclusion].length / [...beefStats.hasNotBeenReviewedAll, ...dinoStats.hasNotBeenReviewedAll, ...govtStats.hasNotBeenReviewedAll].length,
				'Has Not Been ReviewedError': this.calcError([...beefStats.hasNotBeenReviewedAll, ...dinoStats.hasNotBeenReviewedAll, ...govtStats.hasNotBeenReviewedAll].length),
				'Has Been Reviewed': [...beefStats.hasBeenReviewedFoundConclusion, ...dinoStats.hasBeenReviewedFoundConclusion, ...govtStats.hasBeenReviewedFoundConclusion].length / [...beefStats.hasBeenReviewedAll, ...dinoStats.hasBeenReviewedAll, ...govtStats.hasBeenReviewedAll].length,
				'Has Been ReviewedError': this.calcError([...beefStats.hasBeenReviewedAll, ...dinoStats.hasBeenReviewedAll, ...govtStats.hasBeenReviewedAll].length),
			},
		];
		const renderHasBeenReviewedFoundConclusion = <AnalysisBarChart keys={['Has Not Been Reviewed', 'Has Been Reviewed']} data={hasBeenReviewedFoundConclusionData} title={'Has Previously Been Peer Reviewed and Finding Conclusions'} yaxisLabel={'Percent Found Conclusion'} />;


		/* Found Error vs Scores */
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
		const foundErrorScoresPVal = ttest(this.extractScores([...beefStats.foundErrorFalse, ...dinoStats.foundErrorFalse, ...govtStats.foundErrorFalse]), this.extractScores([...beefStats.foundErrorTrue, ...dinoStats.foundErrorTrue, ...govtStats.foundErrorTrue])).pValue();

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
		const foundConclusionScoresPVal = ttest(this.extractScores([...beefStats.foundConclusionFalse, ...dinoStats.foundConclusionFalse, ...govtStats.foundConclusionFalse]), this.extractScores([...beefStats.foundConclusionTrue, ...dinoStats.foundConclusionTrue, ...govtStats.foundConclusionTrue])).pValue();
		/* --------- */


		/* Used Interactive vs Scores */
		/* --------- */
		const scoreCountsUsedInteractiveFalse = this.countScores([...beefStats.nonInteractiveAll, ...dinoStats.nonInteractiveAll, ...govtStats.nonInteractiveAll]);
		const scoreCountsUsedInteractiveTrue = this.countScores([...beefStats.interactiveAll, ...dinoStats.interactiveAll, ...govtStats.interactiveAll]);
		
		// console.log('median');
		// console.log(stats.median([...beefStats.nonInteractiveAll, ...dinoStats.nonInteractiveAll, ...govtStats.nonInteractiveAll].map(item=> item.reviewRating)));
		// console.log(stats.median([...beefStats.interactiveAll, ...dinoStats.interactiveAll, ...govtStats.interactiveAll].map(item=> item.reviewRating)));
		// console.log('mean');
		// console.log(stats.mean([...beefStats.nonInteractiveAll, ...dinoStats.nonInteractiveAll, ...govtStats.nonInteractiveAll].map(item=> item.reviewRating)));
		// console.log(stats.mean([...beefStats.interactiveAll, ...dinoStats.interactiveAll, ...govtStats.interactiveAll].map(item=> item.reviewRating)));
		// console.log('error')
		// console.log(this.calcError([...beefStats.nonInteractiveAll, ...dinoStats.nonInteractiveAll, ...govtStats.nonInteractiveAll].length));
		// console.log(this.calcError([...beefStats.interactiveAll, ...dinoStats.interactiveAll, ...govtStats.interactiveAll].length));
		const usedInteractiveScores = scoreCountsUsedInteractiveFalse.map((item, index)=> {
			return {
				name: index,
				'Did Not Use Interactive': scoreCountsUsedInteractiveFalse[index] / this.sumArray(scoreCountsUsedInteractiveFalse),
				'Used Interactive': scoreCountsUsedInteractiveTrue[index] / this.sumArray(scoreCountsUsedInteractiveTrue),
				// 'Difference': (scoreCountsUsedInteractiveTrue[index] / this.sumArray(scoreCountsUsedInteractiveTrue)) - (scoreCountsUsedInteractiveFalse[index] / this.sumArray(scoreCountsUsedInteractiveFalse)),
			};
		});
		const renderUsedInteractiveScores = <AnalysisAreaChart keys={['Did Not Use Interactive', 'Used Interactive']} data={usedInteractiveScores} title={'Score Distribution vs Interactivity'} yaxisLabel={'Percentage Assigning Score'} />;
		const usedInteractivityPVal = ttest(this.extractScores([...beefStats.nonInteractiveAll, ...dinoStats.nonInteractiveAll, ...govtStats.nonInteractiveAll]), this.extractScores([...beefStats.interactiveAll, ...dinoStats.interactiveAll, ...govtStats.interactiveAll])).pValue();

		/* --------- */
		/* --------- */

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


		// const scoreCountTimesFoundErrorTrue = this.countScoreTimes([...beefStats.foundErrorTrue, ...dinoStats.foundErrorTrue, ...govtStats.foundErrorTrue]);
		// const scoreCountsFoundErrorTrue = this.countScores([...beefStats.foundErrorTrue, ...dinoStats.foundErrorTrue, ...govtStats.foundErrorTrue]);
		// const scoreCountTimesFoundConclusionTrue = this.countScoreTimes([...beefStats.foundConclusionTrue, ...dinoStats.foundConclusionTrue, ...govtStats.foundConclusionTrue]);
		// const scoreCountsFoundConclusionTrue = this.countScores([...beefStats.foundConclusionTrue, ...dinoStats.foundConclusionTrue, ...govtStats.foundConclusionTrue]);

		// const scoreCountTimesFoundErrorFalse = this.countScoreTimes([...beefStats.foundErrorFalse, ...dinoStats.foundErrorFalse, ...govtStats.foundErrorFalse]);
		// const scoreCountsFoundErrorFalse = this.countScores([...beefStats.foundErrorFalse, ...dinoStats.foundErrorFalse, ...govtStats.foundErrorFalse]);
		// const scoreCountTimesFoundConclusionFalse = this.countScoreTimes([...beefStats.foundConclusionFalse, ...dinoStats.foundConclusionFalse, ...govtStats.foundConclusionFalse]);
		// const scoreCountsFoundConclusionFalse = this.countScores([...beefStats.foundConclusionFalse, ...dinoStats.foundConclusionFalse, ...govtStats.foundConclusionFalse]);

		const timesFoundErrorFalse = [...beefStats.foundErrorFalse, ...dinoStats.foundErrorFalse, ...govtStats.foundErrorFalse].filter(item => !!item.timeWriting).map(item => Number(item.timeOnReview));
		const timesFoundErrorTrue = [...beefStats.foundErrorTrue, ...dinoStats.foundErrorTrue, ...govtStats.foundErrorTrue].filter(item => !!item.timeWriting).map(item => Number(item.timeOnReview));
		const timesFoundConclusionFalse = [...beefStats.foundConclusionFalse, ...dinoStats.foundConclusionFalse, ...govtStats.foundConclusionFalse].filter(item => !!item.timeWriting).map(item => Number(item.timeOnReview));
		const timesFoundConclusionTrue = [...beefStats.foundConclusionTrue, ...dinoStats.foundConclusionTrue, ...govtStats.foundConclusionTrue].filter(item => !!item.timeWriting).map(item => Number(item.timeOnReview));
		
		const timesData = [
			{
				name: 'Error Average',
				'Did Not Find': stats.mean(timesFoundErrorFalse),
				'Did Not FindError': this.calcError([...beefStats.foundErrorFalse, ...dinoStats.foundErrorFalse, ...govtStats.foundErrorFalse].length) * (stats.mean(timesFoundErrorFalse)),
				'Did Find': stats.mean(timesFoundErrorTrue),
				'Did FindError': this.calcError([...beefStats.foundErrorTrue, ...dinoStats.foundErrorTrue, ...govtStats.foundErrorTrue].length) * (stats.mean(timesFoundErrorTrue)),
			},
			{
				name: 'Error Median',
				'Did Not Find': stats.median(timesFoundErrorFalse),
				'Did Not FindError': this.calcError([...beefStats.foundErrorFalse, ...dinoStats.foundErrorFalse, ...govtStats.foundErrorFalse].length) * (stats.median(timesFoundErrorFalse)),
				'Did Find': stats.median(timesFoundErrorTrue),
				'Did FindError': this.calcError([...beefStats.foundErrorTrue, ...dinoStats.foundErrorTrue, ...govtStats.foundErrorTrue].length) * (stats.median(timesFoundErrorTrue)),
			},
			{
				name: 'Conclusion Average',
				'Did Not Find': stats.mean(timesFoundConclusionFalse),
				'Did Not FindError': this.calcError([...beefStats.foundConclusionFalse, ...dinoStats.foundConclusionFalse, ...govtStats.foundConclusionFalse].length) * (stats.mean(timesFoundConclusionFalse)),
				'Did Find': stats.mean(timesFoundConclusionTrue),
				'Did FindError': this.calcError([...beefStats.foundConclusionTrue, ...dinoStats.foundConclusionTrue, ...govtStats.foundConclusionTrue].length) * (stats.mean(timesFoundConclusionTrue)),
			},
			{
				name: 'Conclusion Median',
				'Did Not Find': stats.median(timesFoundConclusionFalse),
				'Did Not FindError': this.calcError([...beefStats.foundConclusionFalse, ...dinoStats.foundConclusionFalse, ...govtStats.foundConclusionFalse].length) * (stats.median(timesFoundConclusionFalse)),
				'Did Find': stats.median(timesFoundConclusionTrue),
				'Did FindError': this.calcError([...beefStats.foundConclusionTrue, ...dinoStats.foundConclusionTrue, ...govtStats.foundConclusionTrue].length) * (stats.median(timesFoundConclusionTrue)),
			},
		];

		const renderResultTimes = <AnalysisBarChart keys={['Did Not Find', 'Did Find']} data={timesData} title={'Time vs Result'} yaxisLabel={'Time (s)'} yDomain={[0, 600]}/>;
		const resultTimesErrorPVal = ttest(timesFoundErrorFalse, timesFoundErrorTrue).pValue();
		const resultTimesConclusionPVal = ttest(timesFoundConclusionFalse, timesFoundConclusionTrue).pValue();

		const timesWritingFoundErrorFalse = [...beefStats.foundErrorFalse, ...dinoStats.foundErrorFalse, ...govtStats.foundErrorFalse].filter(item => !!item.timeWriting).map(item => Number(item.timeWriting));
		const timesWritingFoundErrorTrue = [...beefStats.foundErrorTrue, ...dinoStats.foundErrorTrue, ...govtStats.foundErrorTrue].filter(item => !!item.timeWriting).map(item => Number(item.timeWriting));
		const timesWritingFoundConclusionFalse = [...beefStats.foundConclusionFalse, ...dinoStats.foundConclusionFalse, ...govtStats.foundConclusionFalse].filter(item => !!item.timeWriting).map(item => Number(item.timeWriting));
		const timesWritingFoundConclusionTrue = [...beefStats.foundConclusionTrue, ...dinoStats.foundConclusionTrue, ...govtStats.foundConclusionTrue].filter(item => !!item.timeWriting).map(item => Number(item.timeWriting));
		
		const timesWritingData = [
			{
				name: 'Found Writing Average',
				'Did Not Find Writing': stats.mean(timesWritingFoundErrorFalse),
				'Did Not Find WritingError': this.calcError([...beefStats.foundErrorFalse, ...dinoStats.foundErrorFalse, ...govtStats.foundErrorFalse].length) * (stats.mean(timesWritingFoundErrorFalse)),
				'Found Writing': stats.mean(timesWritingFoundErrorTrue),
				'Found WritingError': this.calcError([...beefStats.foundErrorTrue, ...dinoStats.foundErrorTrue, ...govtStats.foundErrorTrue].length) * (stats.mean(timesWritingFoundErrorTrue)),
			},
			{
				name: 'Found Writing Median',
				'Did Not Find Writing': stats.median(timesWritingFoundErrorFalse),
				'Did Not Find WritingError': this.calcError([...beefStats.foundErrorFalse, ...dinoStats.foundErrorFalse, ...govtStats.foundErrorFalse].length) * (stats.median(timesWritingFoundErrorFalse)),
				'Found Writing': stats.median(timesWritingFoundErrorTrue),
				'Found WritingError': this.calcError([...beefStats.foundErrorTrue, ...dinoStats.foundErrorTrue, ...govtStats.foundErrorTrue].length) * (stats.median(timesWritingFoundErrorTrue)),
			},
			{
				name: 'Found Conclusion Average',
				'Did Not Find Writing': stats.mean(timesWritingFoundConclusionFalse),
				'Did Not Find WritingError': this.calcError([...beefStats.foundConclusionFalse, ...dinoStats.foundConclusionFalse, ...govtStats.foundConclusionFalse].length) * (stats.mean(timesWritingFoundConclusionFalse)),
				'Found Writing': stats.mean(timesWritingFoundConclusionTrue),
				'Found WritingError': this.calcError([...beefStats.foundConclusionTrue, ...dinoStats.foundConclusionTrue, ...govtStats.foundConclusionTrue].length) * (stats.mean(timesWritingFoundConclusionTrue)),
			},
			{
				name: 'Found Conclusion Median',
				'Did Not Find Writing': stats.median(timesWritingFoundConclusionFalse),
				'Did Not Find WritingError': this.calcError([...beefStats.foundConclusionFalse, ...dinoStats.foundConclusionFalse, ...govtStats.foundConclusionFalse].length) * (stats.median(timesWritingFoundConclusionFalse)),
				'Found Writing': stats.median(timesWritingFoundConclusionTrue),
				'Found WritingError': this.calcError([...beefStats.foundConclusionTrue, ...dinoStats.foundConclusionTrue, ...govtStats.foundConclusionTrue].length) * (stats.median(timesWritingFoundConclusionTrue)),
			},
		];

		const renderResultTimesWriting = <AnalysisBarChart keys={['Did Not Find Writing', 'Found Writing']} data={timesWritingData} title={'Time Writing vs Result'} yaxisLabel={'Time (s)'} yDomain={[0, 600]} />;

		const timesSubtractedFoundErrorFalse = timesFoundErrorFalse.map((item, index) => item - timesWritingFoundErrorFalse[index]);
		const timesSubtractedFoundErrorTrue = timesFoundErrorTrue.map((item, index) => item - timesWritingFoundErrorTrue[index]);
		const timesSubtractedFoundConclusionFalse = timesFoundConclusionFalse.map((item, index) => item - timesWritingFoundConclusionFalse[index]);
		const timesSubtractedFoundConclusionTrue = timesFoundConclusionTrue.map((item, index) => item - timesWritingFoundConclusionTrue[index]);

		const timesSubtractedData = [
			{
				name: 'Found Error Average',
				'Did Not Find Reading': stats.mean(timesSubtractedFoundErrorFalse),
				'Did Not Find ReadingError': this.calcError([...beefStats.foundErrorFalse, ...dinoStats.foundErrorFalse, ...govtStats.foundErrorFalse].length) * (stats.mean(timesSubtractedFoundErrorFalse)),
				'Did Not Find Writing': stats.mean(timesWritingFoundErrorFalse),
				'Did Not Find WritingError': this.calcError([...beefStats.foundErrorFalse, ...dinoStats.foundErrorFalse, ...govtStats.foundErrorFalse].length) * (stats.mean(timesWritingFoundErrorFalse)),
				'Found Reading': stats.mean(timesSubtractedFoundErrorTrue),
				'Found ReadingError': this.calcError([...beefStats.foundErrorTrue, ...dinoStats.foundErrorTrue, ...govtStats.foundErrorTrue].length) * (stats.mean(timesSubtractedFoundErrorTrue)),
				'Found Writing': stats.mean(timesWritingFoundErrorTrue),
				'Found WritingError': this.calcError([...beefStats.foundErrorTrue, ...dinoStats.foundErrorTrue, ...govtStats.foundErrorTrue].length) * (stats.mean(timesWritingFoundErrorTrue)),
			},
			{
				name: 'Found Error Median',
				'Did Not Find Reading': stats.median(timesSubtractedFoundErrorFalse),
				'Did Not Find ReadingError': this.calcError([...beefStats.foundErrorFalse, ...dinoStats.foundErrorFalse, ...govtStats.foundErrorFalse].length) * (stats.median(timesSubtractedFoundErrorFalse)),
				'Did Not Find Writing': stats.median(timesWritingFoundErrorFalse),
				'Did Not Find WritingError': this.calcError([...beefStats.foundErrorFalse, ...dinoStats.foundErrorFalse, ...govtStats.foundErrorFalse].length) * (stats.median(timesWritingFoundErrorFalse)),
				'Found Reading': stats.median(timesSubtractedFoundErrorTrue),
				'Found ReadingError': this.calcError([...beefStats.foundErrorTrue, ...dinoStats.foundErrorTrue, ...govtStats.foundErrorTrue].length) * (stats.median(timesSubtractedFoundErrorTrue)),
				'Found Writing': stats.median(timesWritingFoundErrorTrue),
				'Found WritingError': this.calcError([...beefStats.foundErrorTrue, ...dinoStats.foundErrorTrue, ...govtStats.foundErrorTrue].length) * (stats.median(timesWritingFoundErrorTrue)),
			},
			{
				name: 'Found Conclusion Average',
				'Did Not Find Reading': stats.mean(timesSubtractedFoundConclusionFalse),
				'Did Not Find ReadingError': this.calcError([...beefStats.foundConclusionFalse, ...dinoStats.foundConclusionFalse, ...govtStats.foundConclusionFalse].length) * (stats.mean(timesSubtractedFoundConclusionFalse)),
				'Did Not Find Writing': stats.mean(timesWritingFoundConclusionFalse),
				'Did Not Find WritingError': this.calcError([...beefStats.foundConclusionFalse, ...dinoStats.foundConclusionFalse, ...govtStats.foundConclusionFalse].length) * (stats.mean(timesWritingFoundConclusionFalse)),
				'Found Reading': stats.mean(timesSubtractedFoundConclusionTrue),
				'Found ReadingError': this.calcError([...beefStats.foundConclusionTrue, ...dinoStats.foundConclusionTrue, ...govtStats.foundConclusionTrue].length) * (stats.mean(timesSubtractedFoundConclusionTrue)),
				'Found Writing': stats.mean(timesWritingFoundConclusionTrue),
				'Found WritingError': this.calcError([...beefStats.foundConclusionTrue, ...dinoStats.foundConclusionTrue, ...govtStats.foundConclusionTrue].length) * (stats.mean(timesWritingFoundConclusionTrue)),
			},
			{
				name: 'Found Conclusion Median',
				'Did Not Find Reading': stats.median(timesSubtractedFoundConclusionFalse),
				'Did Not Find ReadingError': this.calcError([...beefStats.foundConclusionFalse, ...dinoStats.foundConclusionFalse, ...govtStats.foundConclusionFalse].length) * (stats.median(timesSubtractedFoundConclusionFalse)),
				'Did Not Find Writing': stats.median(timesWritingFoundConclusionFalse),
				'Did Not Find WritingError': this.calcError([...beefStats.foundConclusionFalse, ...dinoStats.foundConclusionFalse, ...govtStats.foundConclusionFalse].length) * (stats.median(timesWritingFoundConclusionFalse)),
				'Found Reading': stats.median(timesSubtractedFoundConclusionTrue),
				'Found ReadingError': this.calcError([...beefStats.foundConclusionTrue, ...dinoStats.foundConclusionTrue, ...govtStats.foundConclusionTrue].length) * (stats.median(timesSubtractedFoundConclusionTrue)),
				'Found Writing': stats.median(timesWritingFoundConclusionTrue),
				'Found WritingError': this.calcError([...beefStats.foundConclusionTrue, ...dinoStats.foundConclusionTrue, ...govtStats.foundConclusionTrue].length) * (stats.median(timesWritingFoundConclusionTrue)),
			},
		];

		const renderResultTimesStacked = <AnalysisStackedBarChart keys={['Did Not Find Writing', 'Did Not Find Reading', 'Found Writing', 'Found Reading']} data={timesSubtractedData} title={'Time Writing vs Result'} yaxisLabel={'Time (s)'} yDomain={[0, 600]} />;
		const renderResultTimesUntacked = <AnalysisBarChart keys={['Did Not Find Reading', 'Found Reading', 'Did Not Find Writing', 'Found Writing']} data={timesSubtractedData} title={'Time Reading and Writing vs Result'} yaxisLabel={'Time (s)'} yDomain={[0, 600]} />;
		
		// console.log('Min max for error');
		// console.log(Math.min.apply(Math, timesSubtractedFoundErrorFalse), Math.max.apply(Math, timesSubtractedFoundErrorFalse));
		// console.log(Math.min.apply(Math, timesSubtractedFoundErrorTrue), Math.max.apply(Math, timesSubtractedFoundErrorTrue));
		// console.log('Min max for conclusion true');
		// console.log(Math.min.apply(Math, timesSubtractedFoundConclusionFalse), Math.max.apply(Math, timesSubtractedFoundConclusionFalse));
		// console.log(Math.min.apply(Math, timesSubtractedFoundConclusionTrue), Math.max.apply(Math, timesSubtractedFoundConclusionTrue));

		// console.log('Min max for writing error');
		// console.log(Math.min.apply(Math, timesWritingFoundErrorFalse), Math.max.apply(Math, timesWritingFoundErrorFalse));
		// console.log(Math.min.apply(Math, timesWritingFoundErrorTrue), Math.max.apply(Math, timesWritingFoundErrorTrue));
		// console.log('Min max for writing conclusion true');
		// console.log(Math.min.apply(Math, timesWritingFoundConclusionFalse), Math.max.apply(Math, timesWritingFoundConclusionFalse));
		// console.log(Math.min.apply(Math, timesWritingFoundConclusionTrue), Math.max.apply(Math, timesWritingFoundConclusionTrue));
		
		const readingErrorPVal = ttest(timesSubtractedFoundErrorFalse, timesSubtractedFoundErrorTrue).pValue();
		const readingConclusionPVal = ttest(timesSubtractedFoundConclusionFalse, timesSubtractedFoundConclusionTrue).pValue();
		const writingErrorPVal = ttest(timesWritingFoundErrorFalse, timesWritingFoundErrorTrue).pValue();
		const writingConclusionPVal = ttest(timesWritingFoundConclusionFalse, timesWritingFoundConclusionTrue).pValue();

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
					<p>All experiment users were based in the US with at least an undergraduate degree. A total of {[...beefStats.all, ...dinoStats.all, ...govtStats.all].length} users particpated.</p>
				</div>
				{renderCounts}

				<div style={styles.header}>Found Error</div>
				<div style={styles.content}>A primary focus is to understand whether an interactive experiment leads users to more frequently find the principle error. We plot the percentage of users, for each experiment that found the error given that they 1) were presented a non-interactive experiment, 2) were presented an interactive experiment, 3) did not use the interactive figure (wether presented or not), 4) did use the interactive figure.</div>
				{renderFoundError}

				{renderFoundErrorUsed}

				<div style={styles.header}>Found Conclusion</div>
				<div style={styles.content}>A primary focus is to understand whether an interactive experiment leads users to more frequently find a correct alternative conclusion. We plot the percentage of users, for each experiment that found the error given that they 1) were presented a non-interactive experiment, 2) were presented an interactive experiment, 3) did not use the interactive figure (wether presented or not), 4) did use the interactive figure.</div>
				{renderFoundConclusion}
				{renderFoundConclusionUsed}
				

				<div style={styles.header}>Not Presented vs Not Used</div>
				<div style={styles.content}>Want to determine if simply being presented the interactive element - though not using it has any impact</div>
				{renderNotPresentedNotUsedFoundError}
				{renderNotPresentedNotUsedFoundConclusion}

				<div style={styles.header}>Scientific Training</div>
				<div style={styles.content}>Another interpretation of interest is whether users who identify themselves as a scientist had a higher instance of detecting errors and finding alternative conclusions. The hopeful conclusion is that those who are scientifically trained are better suited to review such work.</div>
				{renderScientistFoundError}
				{renderScientistFoundConclusion}

				<div style={styles.header}>Interest in Topic</div>
				<div style={styles.content}>Another interpretation of interest is interest in the topic at hand leads to higher rates of detecting errors and finding alternative conclusions.</div>
				{renderInterestedFoundError}
				{renderInterestedFoundConclusion}


				<div style={styles.header}>Has Previously Peer Reviewed</div>
				<div style={styles.content}>Plotting the rates of finding errors and conclusions for users who have previously peer reviewed.</div>
				{renderHasReviewedFoundError}
				{renderHasReviewedFoundConclusion}

				<div style={styles.header}>Has Previously Been Peer Reviewed</div>
				<div style={styles.content}>Plotting the rates of finding errors and conclusions for users who have previously been subject to peer review.</div>
				{renderHasBeenReviewedFoundError}
				{renderHasBeenReviewedFoundConclusion}

				<div style={styles.header}>Score Distribution when Finding Error or Conclusion</div>
				<div style={styles.content}>One graph of interest displays the distribution of scores assigned to an experiment based on whether a user did or did not find an error or conclusion.</div>
				{renderFoundErrorScores}
				<table className={'table'}>
					<tr>
						<td>p-value</td>
						<td>{this.precisionAndBold(foundErrorScoresPVal)}</td>
					</tr>
				</table>
				{/*<div>pValue: {foundErrorScoresPVal.toFixed(4)}</div>*/}
				{renderFoundConclusionScores}
				<table className={'table'}>
					<tr>
						<td>p-value</td>
						<td>{this.precisionAndBold(foundConclusionScoresPVal)}</td>
					</tr>
				</table>
				{/*<div>pValue: {foundConclusionScoresPVal.toFixed(4)}</div>*/}

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

				{renderUsedInteractiveScores}
				<table className={'table'}>
					<tr className={'table-header'}>
						<td>Did Not Use - Mean</td>
						<td>Did Use - Mean</td>
						<td>p-value</td>
					</tr>
					<tr>
						<td className={'no-color'}>4.20 ± 0.047</td>
						<td>3.97 ± 0.050</td>
						<td>{this.precisionAndBold(usedInteractivityPVal)}</td>
					</tr>
				</table>
				{/*<div>pValue: {usedInteractivityPVal.toFixed(4)}</div>*/}

				<div style={styles.header}>Time Analyses</div>
				<div style={styles.content}>These graphs plot the relationship between time spent on the review and associated scores, error found percentages, conclusion found percentages, etc. One thing we want to be sure of is that the lack of found error and found conclusion events did not happen due to people simply rushing through and ignoring the work.</div>
				{renderScoreTimes}
				{renderResultTimes}
				<table className={'table'}>
					<tr className={'table-header'}>
						<td className={'blank'} />
						<td>Detecting Error</td>
						<td>Detecting Conclusion</td>
					</tr>
					<tr>
						<td>p-value</td>
						<td>{this.precisionAndBold(resultTimesErrorPVal)}</td>
						<td>{this.precisionAndBold(resultTimesConclusionPVal)}</td>
					</tr>
				</table>
				{/*<div>resultTimesErrorPVal: {resultTimesErrorPVal.toFixed(4)}</div>
				<div>resultTimesConclusionPVal: {resultTimesConclusionPVal.toFixed(4)}</div>*/}
				<div style={styles.content}>
					<p>Users who found an error or a conclusion spent a bit more time (7 minutes, rather than 6) than those who did not. However, those who did not find the error or conclusion did not spend a trivial amount of time, assuaging the fear that those who didn't find the error simply skimped through.</p>
					<p>The longer time for spent by those who found an error or conclusion could have also been spent writing lenghtier reviews to report their finding.</p>
				</div>

				{renderResultTimesWriting}

				{renderResultTimesStacked}
				{renderResultTimesUntacked}
				<table className={'table'}>
					<tr className={'table-header'}>
						<td className={'blank'} />
						<td>Reading Error</td>
						<td>Reading Conclusion</td>
						<td>Writing Error</td>
						<td>Writing Conclusion</td>
					</tr>
					<tr>
						<td>p-value</td>
						<td>{this.precisionAndBold(readingErrorPVal)}</td>
						<td>{this.precisionAndBold(readingConclusionPVal)}</td>
						<td>{this.precisionAndBold(writingErrorPVal)}</td>
						<td>{this.precisionAndBold(writingConclusionPVal)}</td>
					</tr>
				</table>
				{/*<div>readingErrorPVal: {readingErrorPVal.toFixed(4)}</div>
				<div>readingConclusionPVal: {readingConclusionPVal.toFixed(4)}</div>
				<div>writingErrorPVal: {writingErrorPVal.toFixed(4)}</div>
				<div>writingConclusionPVal: {writingConclusionPVal.toFixed(4)}</div>*/}

				<div style={styles.header}>Margins of Error</div>
				<div style={styles.content}>
					<p>For the bar graphs, we calculate the margins of error with the following formula:</p>
					<img src={'https://i.imgur.com/4Hl1E3v.png'} style={{ textAlign: 'center', margin: '0 auto', display: 'inline-block' }} />
					<p>We set our confidence interval to 95% which leads to a z-score of 1.96. We assume no prior judgement of the correct value of p, and therefore set it to 0.5. n is our sample size for the given data.</p>

				</div>

				<GraphPresentedVsNotPresented allData={allData} allFunctions={allFunctions} />
				<GraphNotPresentedVsNotUsed allData={allData} allFunctions={allFunctions} />
				<GraphUsedVsNotUsed allData={allData} allFunctions={allFunctions} />
				<GraphScientists allData={allData} allFunctions={allFunctions} />
				<GraphInterested allData={allData} allFunctions={allFunctions} />
				<GraphHasBeenReviewed allData={allData} allFunctions={allFunctions} />
				<GraphHasReviewed allData={allData} allFunctions={allFunctions} />

				<table className={'table spacing'}>
					<tr className={'table-header'}>
						<td className={'blank double-blank'} />
						<td colSpan={15}>Number of Featured Pubs</td>
					</tr>
					<tr className={'table-header'}>
						<td className={'blank'} />
						<td>0</td>
						<td>1</td>
						<td>2</td>
						<td>3</td>
						<td>4</td>
						<td>5</td>
						<td>6</td>
						<td>7</td>
						<td>8</td>
						<td>12</td>
						<td>17</td>
						<td>18</td>
						<td>19</td>
						<td>37</td>
						<td>79</td>
					</tr>
					<tr>
						<td>Number of Journals</td>
						<td>93</td>
						<td>20</td>
						<td>7</td>
						<td>3</td>
						<td>6</td>
						<td>1</td>
						<td>2</td>
						<td>1</td>
						<td>2</td>
						<td>1</td>
						<td>1</td>
						<td>1</td>
						<td>1</td>
						<td>1</td>
						<td>1</td>
					</tr>
				</table>

				<table className={'table spacing'}>
					<tr className={'table-header'}>
						<td className={'blank double-blank'} />
						<td colSpan={12}>Number of Submitted Pubs</td>
					</tr>
					<tr className={'table-header'}>
						{/*<td className={'left'}>Number of Submitted Pubs</td>*/}
						<td className={'blank'} />
						<td>0</td>
						<td>1</td>
						<td>2</td>
						<td>3</td>
						<td>4</td>
						<td>5</td>
						<td>6</td>
						<td>7</td>
						<td>12</td>
						<td>16</td>
						<td>38</td>
						<td>51</td>
					</tr>
					<tr>
						<td>Number of Journals</td>
						<td>87</td>
						<td>27</td>
						<td>11</td>
						<td>2</td>
						<td>2</td>
						<td>4</td>
						<td>3</td>
						<td>1</td>
						<td>1</td>
						<td>1</td>
						<td>1</td>
						<td>1</td>
					</tr>
				</table>

				<table className={'table spacing'}>
					<tr className={'table-header'}>
						<td className={'blank double-blank'} />
						<td colSpan={7}>Number of Admins</td>
					</tr>
					<tr className={'table-header'}>
						<td className={'blank'} />
						<td>1</td>
						<td>2</td>
						<td>3</td>
						<td>4</td>
						<td>5</td>
						<td>6</td>
						<td>7</td>
					</tr>
					<tr>
						<td>Number of Journals</td>
						<td>107</td>
						<td>16</td>
						<td>10</td>
						<td>4</td>
						<td>1</td>
						<td>2</td>
						<td>1</td>
					</tr>
				</table>

				<table className={'table spacing'}>
					<tr className={'table-header'}>
						<td className={'blank double-blank'} />
						<td colSpan={9}>Number of Days Active</td>
					</tr>
					<tr className={'table-header'}>
						<td className={'blank'} />
						<td>0</td>
						<td>1</td>
						<td>6</td>
						<td>9</td>
						<td>16</td>
						<td>30-60</td>
						<td>61-120</td>
						<td>121-240</td>
						<td>241-480</td>
					</tr>
					<tr>
						<td>Number of Journals</td>
						<td>93</td>
						<td>30</td>
						<td>2</td>
						<td>1</td>
						<td>1</td>
						<td>4</td>
						<td>3</td>
						<td>6</td>
						<td>1</td>
					</tr>
				</table>

				<table className={'table spacing'}>
					<tr className={'table-header'}>
						<td className={'blank double-blank'} />
						<td colSpan={14}>Number of Published Versions</td>
					</tr>
					<tr className={'table-header'}>
						<td className={'blank'} />
						<td>0</td>
						<td>1</td>
						<td>2</td>
						<td>3</td>
						<td>4</td>
						<td>5</td>
						<td>6</td>
						<td>7</td>
						<td>8</td>
						<td>9</td>
						<td>10-20</td>
						<td>21-40</td>
						<td>41-80</td>
						<td>81-160</td>
					</tr>
					<tr>
						<td>Number of Pubs</td>
						<td>696</td>
						<td>607</td>
						<td>147</td>
						<td>82</td>
						<td>66</td>
						<td>43</td>
						<td>25</td>
						<td>21</td>
						<td>10</td>
						<td>13</td>
						<td>37</td>
						<td>12</td>
						<td>4</td>
						<td>2</td>
					</tr>
				</table>

				<table className={'table spacing'}>
					<tr className={'table-header'}>
						<td className={'blank double-blank'} />
						<td colSpan={14}>Number of Discussions</td>
					</tr>
					<tr className={'table-header'}>
						<td className={'blank'} />
						<td>0</td>
						<td>1</td>
						<td>2</td>
						<td>3</td>
						<td>4</td>
						<td>5</td>
						<td>6</td>
						<td>7</td>
						<td>8</td>
						<td>9</td>
						<td>10-20</td>
						<td>21-40</td>
						<td>41-80</td>
						<td>446</td>
					</tr>
					<tr>
						<td>Number of Pubs</td>
						<td>1421</td>
						<td>82</td>
						<td>36</td>
						<td>49</td>
						<td>26</td>
						<td>34</td>
						<td>16</td>
						<td>13</td>
						<td>11</td>
						<td>12</td>
						<td>44</td>
						<td>13</td>
						<td>7</td>
						<td>1</td>
					</tr>
				</table>

				<table className={'table spacing'}>
					<tr className={'table-header'}>
						<td className={'blank double-blank'} />
						<td colSpan={12}>Number of Contributors</td>
					</tr>
					<tr className={'table-header'}>
						<td className={'blank'} />
						<td>1</td>
						<td>2</td>
						<td>3</td>
						<td>4</td>
						<td>5</td>
						<td>6</td>
						<td>7</td>
						<td>10</td>
						<td>12</td>
						<td>16</td>
						<td>20</td>
						<td>24</td>
					</tr>
					<tr>
						<td>Number of Pubs</td>
						<td>1580</td>
						<td>94</td>
						<td>28</td>
						<td>30</td>
						<td>18</td>
						<td>7</td>
						<td>3</td>
						<td>1</td>
						<td>1</td>
						<td>1</td>
						<td>1</td>
						<td>1</td>
					</tr>
				</table>

				<table className={'table spacing'}>
					<tr className={'table-header'}>
						<td className={'blank double-blank'} />
						<td colSpan={5}>Number of Submits</td>
					</tr>
					<tr className={'table-header'}>
						<td className={'blank'} />
						<td>0</td>
						<td>1</td>
						<td>2</td>
						<td>3</td>
						<td>4</td>
					</tr>
					<tr>
						<td>Number of Pubs</td>
						<td>1556</td>
						<td>196</td>
						<td>11</td>
						<td>1</td>
						<td>1</td>
					</tr>
				</table>

				<table className={'table spacing'}>
					<tr className={'table-header'}>
						<td className={'blank double-blank'} />
						<td colSpan={7}>Number of Features</td>
					</tr>
					<tr className={'table-header'}>
						<td className={'blank'} />
						<td>0</td>
						<td>1</td>
						<td>2</td>
						<td>3</td>
						<td>4</td>
						<td>7</td>
					</tr>
					<tr>
						<td>Number of Pubs</td>
						<td>1506</td>
						<td>238</td>
						<td>18</td>
						<td>1</td>
						<td>1</td>
						<td>1</td>
					</tr>
				</table>
				
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

import React, { PropTypes } from 'react';
import AnalysisBarChart from './AnalysisBarChart';

export const GraphHasReviewed = React.createClass({
	propTypes: {
		allData: PropTypes.object,
		allFunctions: PropTypes.object,
	},

	render() {
		const data = this.props.allData || {};
		const beefStats = data.beefStats;
		const dinoStats = data.dinoStats;
		const govtStats = data.govtStats;
		const utils = this.props.allFunctions || {};
		
		const graphData = [
			{ 
				name: 'Beef', 
				'Has Not Reviewed - Found Error': beefStats.hasNotReviewedFoundError.length / beefStats.hasNotReviewedAll.length,
				'Has Not Reviewed - Found ErrorError': utils.calcError(beefStats.hasNotReviewedAll.length),
				'Has Reviewed - Found Error': beefStats.hasReviewedFoundError.length / beefStats.hasReviewedAll.length,
				'Has Reviewed - Found ErrorError': utils.calcError(beefStats.hasReviewedAll.length),
				'Has Not Reviewed - Found Conclusion': beefStats.hasNotReviewedFoundConclusion.length / beefStats.hasNotReviewedAll.length,
				'Has Not Reviewed - Found ConclusionError': utils.calcError(beefStats.hasNotReviewedAll.length),
				'Has Reviewed - Found Conclusion': beefStats.hasReviewedFoundConclusion.length / beefStats.hasReviewedAll.length,
				'Has Reviewed - Found ConclusionError': utils.calcError(beefStats.hasReviewedAll.length),
			},
			{ 
				name: 'Dino', 
				'Has Not Reviewed - Found Error': dinoStats.hasNotReviewedFoundError.length / dinoStats.hasNotReviewedAll.length,
				'Has Not Reviewed - Found ErrorError': utils.calcError(dinoStats.hasNotReviewedAll.length),
				'Has Reviewed - Found Error': dinoStats.hasReviewedFoundError.length / dinoStats.hasReviewedAll.length,
				'Has Reviewed - Found ErrorError': utils.calcError(dinoStats.hasReviewedAll.length),
				'Has Not Reviewed - Found Conclusion': dinoStats.hasNotReviewedFoundConclusion.length / dinoStats.hasNotReviewedAll.length,
				'Has Not Reviewed - Found ConclusionError': utils.calcError(dinoStats.hasNotReviewedAll.length),
				'Has Reviewed - Found Conclusion': dinoStats.hasReviewedFoundConclusion.length / dinoStats.hasReviewedAll.length,
				'Has Reviewed - Found ConclusionError': utils.calcError(dinoStats.hasReviewedAll.length),
			},
			{ 
				name: 'Govt', 
				'Has Not Reviewed - Found Error': govtStats.hasNotReviewedFoundError.length / govtStats.hasNotReviewedAll.length,
				'Has Not Reviewed - Found ErrorError': utils.calcError(govtStats.hasNotReviewedAll.length),
				'Has Reviewed - Found Error': govtStats.hasReviewedFoundError.length / govtStats.hasReviewedAll.length,
				'Has Reviewed - Found ErrorError': utils.calcError(govtStats.hasReviewedAll.length),
				'Has Not Reviewed - Found Conclusion': govtStats.hasNotReviewedFoundConclusion.length / govtStats.hasNotReviewedAll.length,
				'Has Not Reviewed - Found ConclusionError': utils.calcError(govtStats.hasNotReviewedAll.length),
				'Has Reviewed - Found Conclusion': govtStats.hasReviewedFoundConclusion.length / govtStats.hasReviewedAll.length,
				'Has Reviewed - Found ConclusionError': utils.calcError(govtStats.hasReviewedAll.length),
			},
			{ 
				name: 'All', 
				'Has Not Reviewed - Found Error': [...beefStats.hasNotReviewedFoundError, ...dinoStats.hasNotReviewedFoundError, ...govtStats.hasNotReviewedFoundError].length / [...beefStats.hasNotReviewedAll, ...dinoStats.hasNotReviewedAll, ...govtStats.hasNotReviewedAll].length,
				'Has Not Reviewed - Found ErrorError': utils.calcError([...beefStats.hasNotReviewedAll, ...dinoStats.hasNotReviewedAll, ...govtStats.hasNotReviewedAll].length),
				'Has Reviewed - Found Error': [...beefStats.hasReviewedFoundError, ...dinoStats.hasReviewedFoundError, ...govtStats.hasReviewedFoundError].length / [...beefStats.hasReviewedAll, ...dinoStats.hasReviewedAll, ...govtStats.hasReviewedAll].length,
				'Has Reviewed - Found ErrorError': utils.calcError([...beefStats.hasReviewedAll, ...dinoStats.hasReviewedAll, ...govtStats.hasReviewedAll].length),
				'Has Not Reviewed - Found Conclusion': [...beefStats.hasNotReviewedFoundConclusion, ...dinoStats.hasNotReviewedFoundConclusion, ...govtStats.hasNotReviewedFoundConclusion].length / [...beefStats.hasNotReviewedAll, ...dinoStats.hasNotReviewedAll, ...govtStats.hasNotReviewedAll].length,
				'Has Not Reviewed - Found ConclusionError': utils.calcError([...beefStats.hasNotReviewedAll, ...dinoStats.hasNotReviewedAll, ...govtStats.hasNotReviewedAll].length),
				'Has Reviewed - Found Conclusion': [...beefStats.hasReviewedFoundConclusion, ...dinoStats.hasReviewedFoundConclusion, ...govtStats.hasReviewedFoundConclusion].length / [...beefStats.hasReviewedAll, ...dinoStats.hasReviewedAll, ...govtStats.hasReviewedAll].length,
				'Has Reviewed - Found ConclusionError': utils.calcError([...beefStats.hasReviewedAll, ...dinoStats.hasReviewedAll, ...govtStats.hasReviewedAll].length),
			},
		];

		return (
			<div>
				<AnalysisBarChart keys={['Has Not Reviewed - Found Error', 'Has Reviewed - Found Error', 'Has Not Reviewed - Found Conclusion', 'Has Reviewed - Found Conclusion']} data={graphData} title={'Performance vs Has Peer Reviewed'} yaxisLabel={'Percent Users'} />
				<table className={'table'}>
					<tr className={'table-header'}>
						<td />
						<td>Has Not Reviewed <br />All</td>
						<td>Has Not Reviewed <br />Found Error</td>
						<td>Has Not Reviewed <br />Found Conclusion</td>
						<td>Has Reviewed <br />All</td>
						<td>Has Reviewed <br />Found Error</td>
						<td>Has Reviewed <br />Found Conclusion</td>
						<td>Found Error <br />p-value</td>
						<td>Found Conclusion <br />p-value</td>
					</tr>
					<tr>
						<td>Beef</td>
						<td>{beefStats.hasNotReviewedAll.length}</td>
						<td>{beefStats.hasNotReviewedFoundError.length}</td>
						<td>{beefStats.hasNotReviewedFoundConclusion.length}</td>
						<td>{beefStats.hasReviewedAll.length}</td>
						<td>{beefStats.hasReviewedFoundError.length}</td>
						<td>{beefStats.hasReviewedFoundConclusion.length}</td>
						<td>{utils.calculatePValue(
							beefStats.hasNotReviewedAll.length, 
							beefStats.hasNotReviewedFoundError.length, 
							beefStats.hasReviewedAll.length, 
							beefStats.hasReviewedFoundError.length)}
						</td>
						<td>{utils.calculatePValue(
							beefStats.hasNotReviewedAll.length, 
							beefStats.hasNotReviewedFoundConclusion.length, 
							beefStats.hasReviewedAll.length, 
							beefStats.hasReviewedFoundConclusion.length)}
						</td>
					</tr>
					<tr>
						<td>Dino</td>
						<td>{dinoStats.hasNotReviewedAll.length}</td>
						<td>{dinoStats.hasNotReviewedFoundError.length}</td>
						<td>{dinoStats.hasNotReviewedFoundConclusion.length}</td>
						<td>{dinoStats.hasReviewedAll.length}</td>
						<td>{dinoStats.hasReviewedFoundError.length}</td>
						<td>{dinoStats.hasReviewedFoundConclusion.length}</td>
						<td>{utils.calculatePValue(
							dinoStats.hasNotReviewedAll.length, 
							dinoStats.hasNotReviewedFoundError.length, 
							dinoStats.hasReviewedAll.length, 
							dinoStats.hasReviewedFoundError.length)}
						</td>
						<td>{utils.calculatePValue(
							dinoStats.hasNotReviewedAll.length, 
							dinoStats.hasNotReviewedFoundConclusion.length, 
							dinoStats.hasReviewedAll.length, 
							dinoStats.hasReviewedFoundConclusion.length)}
						</td>
					</tr>
					<tr>
						<td>Govt</td>
						<td>{govtStats.hasNotReviewedAll.length}</td>
						<td>{govtStats.hasNotReviewedFoundError.length}</td>
						<td>{govtStats.hasNotReviewedFoundConclusion.length}</td>
						<td>{govtStats.hasReviewedAll.length}</td>
						<td>{govtStats.hasReviewedFoundError.length}</td>
						<td>{govtStats.hasReviewedFoundConclusion.length}</td>
						<td>{utils.calculatePValue(
							govtStats.hasNotReviewedAll.length, 
							govtStats.hasNotReviewedFoundError.length, 
							govtStats.hasReviewedAll.length, 
							govtStats.hasReviewedFoundError.length)}
						</td>
						<td>{utils.calculatePValue(
							govtStats.hasNotReviewedAll.length, 
							govtStats.hasNotReviewedFoundConclusion.length, 
							govtStats.hasReviewedAll.length, 
							govtStats.hasReviewedFoundConclusion.length)}
						</td>
					</tr>
					<tr>
						<td>All</td>
						<td>{[...beefStats.hasNotReviewedAll, ...dinoStats.hasNotReviewedAll, ...govtStats.hasNotReviewedAll].length}</td>
						<td>{[...beefStats.hasNotReviewedFoundError, ...dinoStats.hasNotReviewedFoundError, ...govtStats.hasNotReviewedFoundError].length}</td>
						<td>{[...beefStats.hasNotReviewedFoundConclusion, ...dinoStats.hasNotReviewedFoundConclusion, ...govtStats.hasNotReviewedFoundConclusion].length}</td>
						<td>{[...beefStats.hasReviewedAll, ...dinoStats.hasReviewedAll, ...govtStats.hasReviewedAll].length}</td>
						<td>{[...beefStats.hasReviewedFoundError, ...dinoStats.hasReviewedFoundError, ...govtStats.hasReviewedFoundError].length}</td>
						<td>{[...beefStats.hasReviewedFoundConclusion, ...dinoStats.hasReviewedFoundConclusion, ...govtStats.hasReviewedFoundConclusion].length}</td>
						<td>{utils.calculatePValue(
							[...beefStats.hasNotReviewedAll, ...dinoStats.hasNotReviewedAll, ...govtStats.hasNotReviewedAll].length,
							[...beefStats.hasNotReviewedFoundError, ...dinoStats.hasNotReviewedFoundError, ...govtStats.hasNotReviewedFoundError].length, 
							[...beefStats.hasReviewedAll, ...dinoStats.hasReviewedAll, ...govtStats.hasReviewedAll].length,
							[...beefStats.hasReviewedFoundError, ...dinoStats.hasReviewedFoundError, ...govtStats.hasReviewedFoundError].length)}
						</td>
						<td>{utils.calculatePValue(
							[...beefStats.hasNotReviewedAll, ...dinoStats.hasNotReviewedAll, ...govtStats.hasNotReviewedAll].length,
							[...beefStats.hasNotReviewedFoundConclusion, ...dinoStats.hasNotReviewedFoundConclusion, ...govtStats.hasNotReviewedFoundConclusion].length,
							[...beefStats.hasReviewedAll, ...dinoStats.hasReviewedAll, ...govtStats.hasReviewedAll].length,
							[...beefStats.hasReviewedFoundConclusion, ...dinoStats.hasReviewedFoundConclusion, ...govtStats.hasReviewedFoundConclusion].length)}
						</td>
					</tr>
				</table>
			</div>
		);
	}
});

export default GraphHasReviewed;

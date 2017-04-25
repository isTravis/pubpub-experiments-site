import React, { PropTypes } from 'react';
import AnalysisBarChart from './AnalysisBarChart';

export const GraphHasBeenReviewed = React.createClass({
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
				'Has Not Been Reviewed - Found Error': beefStats.hasNotBeenReviewedFoundError.length / beefStats.hasNotBeenReviewedAll.length,
				'Has Not Been Reviewed - Found ErrorError': utils.calcError(beefStats.hasNotBeenReviewedAll.length),
				'Has Been Reviewed - Found Error': beefStats.hasBeenReviewedFoundError.length / beefStats.hasBeenReviewedAll.length,
				'Has Been Reviewed - Found ErrorError': utils.calcError(beefStats.hasBeenReviewedAll.length),
				'Has Not Been Reviewed - Found Conclusion': beefStats.hasNotBeenReviewedFoundConclusion.length / beefStats.hasNotBeenReviewedAll.length,
				'Has Not Been Reviewed - Found ConclusionError': utils.calcError(beefStats.hasNotBeenReviewedAll.length),
				'Has Been Reviewed - Found Conclusion': beefStats.hasBeenReviewedFoundConclusion.length / beefStats.hasBeenReviewedAll.length,
				'Has Been Reviewed - Found ConclusionError': utils.calcError(beefStats.hasBeenReviewedAll.length),
			},
			{ 
				name: 'Dino', 
				'Has Not Been Reviewed - Found Error': dinoStats.hasNotBeenReviewedFoundError.length / dinoStats.hasNotBeenReviewedAll.length,
				'Has Not Been Reviewed - Found ErrorError': utils.calcError(dinoStats.hasNotBeenReviewedAll.length),
				'Has Been Reviewed - Found Error': dinoStats.hasBeenReviewedFoundError.length / dinoStats.hasBeenReviewedAll.length,
				'Has Been Reviewed - Found ErrorError': utils.calcError(dinoStats.hasBeenReviewedAll.length),
				'Has Not Been Reviewed - Found Conclusion': dinoStats.hasNotBeenReviewedFoundConclusion.length / dinoStats.hasNotBeenReviewedAll.length,
				'Has Not Been Reviewed - Found ConclusionError': utils.calcError(dinoStats.hasNotBeenReviewedAll.length),
				'Has Been Reviewed - Found Conclusion': dinoStats.hasBeenReviewedFoundConclusion.length / dinoStats.hasBeenReviewedAll.length,
				'Has Been Reviewed - Found ConclusionError': utils.calcError(dinoStats.hasBeenReviewedAll.length),
			},
			{ 
				name: 'Govt', 
				'Has Not Been Reviewed - Found Error': govtStats.hasNotBeenReviewedFoundError.length / govtStats.hasNotBeenReviewedAll.length,
				'Has Not Been Reviewed - Found ErrorError': utils.calcError(govtStats.hasNotBeenReviewedAll.length),
				'Has Been Reviewed - Found Error': govtStats.hasBeenReviewedFoundError.length / govtStats.hasBeenReviewedAll.length,
				'Has Been Reviewed - Found ErrorError': utils.calcError(govtStats.hasBeenReviewedAll.length),
				'Has Not Been Reviewed - Found Conclusion': govtStats.hasNotBeenReviewedFoundConclusion.length / govtStats.hasNotBeenReviewedAll.length,
				'Has Not Been Reviewed - Found ConclusionError': utils.calcError(govtStats.hasNotBeenReviewedAll.length),
				'Has Been Reviewed - Found Conclusion': govtStats.hasBeenReviewedFoundConclusion.length / govtStats.hasBeenReviewedAll.length,
				'Has Been Reviewed - Found ConclusionError': utils.calcError(govtStats.hasBeenReviewedAll.length),
			},
			{ 
				name: 'All', 
				'Has Not Been Reviewed - Found Error': [...beefStats.hasNotBeenReviewedFoundError, ...dinoStats.hasNotBeenReviewedFoundError, ...govtStats.hasNotBeenReviewedFoundError].length / [...beefStats.hasNotBeenReviewedAll, ...dinoStats.hasNotBeenReviewedAll, ...govtStats.hasNotBeenReviewedAll].length,
				'Has Not Been Reviewed - Found ErrorError': utils.calcError([...beefStats.hasNotBeenReviewedAll, ...dinoStats.hasNotBeenReviewedAll, ...govtStats.hasNotBeenReviewedAll].length),
				'Has Been Reviewed - Found Error': [...beefStats.hasBeenReviewedFoundError, ...dinoStats.hasBeenReviewedFoundError, ...govtStats.hasBeenReviewedFoundError].length / [...beefStats.hasBeenReviewedAll, ...dinoStats.hasBeenReviewedAll, ...govtStats.hasBeenReviewedAll].length,
				'Has Been Reviewed - Found ErrorError': utils.calcError([...beefStats.hasBeenReviewedAll, ...dinoStats.hasBeenReviewedAll, ...govtStats.hasBeenReviewedAll].length),
				'Has Not Been Reviewed - Found Conclusion': [...beefStats.hasNotBeenReviewedFoundConclusion, ...dinoStats.hasNotBeenReviewedFoundConclusion, ...govtStats.hasNotBeenReviewedFoundConclusion].length / [...beefStats.hasNotBeenReviewedAll, ...dinoStats.hasNotBeenReviewedAll, ...govtStats.hasNotBeenReviewedAll].length,
				'Has Not Been Reviewed - Found ConclusionError': utils.calcError([...beefStats.hasNotBeenReviewedAll, ...dinoStats.hasNotBeenReviewedAll, ...govtStats.hasNotBeenReviewedAll].length),
				'Has Been Reviewed - Found Conclusion': [...beefStats.hasBeenReviewedFoundConclusion, ...dinoStats.hasBeenReviewedFoundConclusion, ...govtStats.hasBeenReviewedFoundConclusion].length / [...beefStats.hasBeenReviewedAll, ...dinoStats.hasBeenReviewedAll, ...govtStats.hasBeenReviewedAll].length,
				'Has Been Reviewed - Found ConclusionError': utils.calcError([...beefStats.hasBeenReviewedAll, ...dinoStats.hasBeenReviewedAll, ...govtStats.hasBeenReviewedAll].length),
			},
		];

		return (
			<div>
				<AnalysisBarChart keys={['Has Not Been Reviewed - Found Error', 'Has Been Reviewed - Found Error', 'Has Not Been Reviewed - Found Conclusion', 'Has Been Reviewed - Found Conclusion']} data={graphData} title={'Performance vs Has Been Peer Reviewed'} yaxisLabel={'Percent Users'} />
				<table className={'table'}>
					<tr className={'table-header'}>
						<td />
						<td>Has Not Been Reviewed <br />All</td>
						<td>Has Not Been Reviewed <br />Found Error</td>
						<td>Has Not Been Reviewed <br />Found Conclusion</td>
						<td>Has Been Reviewed <br />All</td>
						<td>Has Been Reviewed <br />Found Error</td>
						<td>Has Been Reviewed <br />Found Conclusion</td>
						<td>Found Error <br />p-value</td>
						<td>Found Conclusion <br />p-value</td>
					</tr>
					<tr>
						<td>Beef</td>
						<td>{beefStats.hasNotBeenReviewedAll.length}</td>
						<td>{beefStats.hasNotBeenReviewedFoundError.length}</td>
						<td>{beefStats.hasNotBeenReviewedFoundConclusion.length}</td>
						<td>{beefStats.hasBeenReviewedAll.length}</td>
						<td>{beefStats.hasBeenReviewedFoundError.length}</td>
						<td>{beefStats.hasBeenReviewedFoundConclusion.length}</td>
						<td>{utils.calculatePValue(
							beefStats.hasNotBeenReviewedAll.length, 
							beefStats.hasNotBeenReviewedFoundError.length, 
							beefStats.hasBeenReviewedAll.length, 
							beefStats.hasBeenReviewedFoundError.length)}
						</td>
						<td>{utils.calculatePValue(
							beefStats.hasNotBeenReviewedAll.length, 
							beefStats.hasNotBeenReviewedFoundConclusion.length, 
							beefStats.hasBeenReviewedAll.length, 
							beefStats.hasBeenReviewedFoundConclusion.length)}
						</td>
					</tr>
					<tr>
						<td>Dino</td>
						<td>{dinoStats.hasNotBeenReviewedAll.length}</td>
						<td>{dinoStats.hasNotBeenReviewedFoundError.length}</td>
						<td>{dinoStats.hasNotBeenReviewedFoundConclusion.length}</td>
						<td>{dinoStats.hasBeenReviewedAll.length}</td>
						<td>{dinoStats.hasBeenReviewedFoundError.length}</td>
						<td>{dinoStats.hasBeenReviewedFoundConclusion.length}</td>
						<td>{utils.calculatePValue(
							dinoStats.hasNotBeenReviewedAll.length, 
							dinoStats.hasNotBeenReviewedFoundError.length, 
							dinoStats.hasBeenReviewedAll.length, 
							dinoStats.hasBeenReviewedFoundError.length)}
						</td>
						<td>{utils.calculatePValue(
							dinoStats.hasNotBeenReviewedAll.length, 
							dinoStats.hasNotBeenReviewedFoundConclusion.length, 
							dinoStats.hasBeenReviewedAll.length, 
							dinoStats.hasBeenReviewedFoundConclusion.length)}
						</td>
					</tr>
					<tr>
						<td>Govt</td>
						<td>{govtStats.hasNotBeenReviewedAll.length}</td>
						<td>{govtStats.hasNotBeenReviewedFoundError.length}</td>
						<td>{govtStats.hasNotBeenReviewedFoundConclusion.length}</td>
						<td>{govtStats.hasBeenReviewedAll.length}</td>
						<td>{govtStats.hasBeenReviewedFoundError.length}</td>
						<td>{govtStats.hasBeenReviewedFoundConclusion.length}</td>
						<td>{utils.calculatePValue(
							govtStats.hasNotBeenReviewedAll.length, 
							govtStats.hasNotBeenReviewedFoundError.length, 
							govtStats.hasBeenReviewedAll.length, 
							govtStats.hasBeenReviewedFoundError.length)}
						</td>
						<td>{utils.calculatePValue(
							govtStats.hasNotBeenReviewedAll.length, 
							govtStats.hasNotBeenReviewedFoundConclusion.length, 
							govtStats.hasBeenReviewedAll.length, 
							govtStats.hasBeenReviewedFoundConclusion.length)}
						</td>
					</tr>
					<tr>
						<td>All</td>
						<td>{[...beefStats.hasNotBeenReviewedAll, ...dinoStats.hasNotBeenReviewedAll, ...govtStats.hasNotBeenReviewedAll].length}</td>
						<td>{[...beefStats.hasNotBeenReviewedFoundError, ...dinoStats.hasNotBeenReviewedFoundError, ...govtStats.hasNotBeenReviewedFoundError].length}</td>
						<td>{[...beefStats.hasNotBeenReviewedFoundConclusion, ...dinoStats.hasNotBeenReviewedFoundConclusion, ...govtStats.hasNotBeenReviewedFoundConclusion].length}</td>
						<td>{[...beefStats.hasBeenReviewedAll, ...dinoStats.hasBeenReviewedAll, ...govtStats.hasBeenReviewedAll].length}</td>
						<td>{[...beefStats.hasBeenReviewedFoundError, ...dinoStats.hasBeenReviewedFoundError, ...govtStats.hasBeenReviewedFoundError].length}</td>
						<td>{[...beefStats.hasBeenReviewedFoundConclusion, ...dinoStats.hasBeenReviewedFoundConclusion, ...govtStats.hasBeenReviewedFoundConclusion].length}</td>
						<td>{utils.calculatePValue(
							[...beefStats.hasNotBeenReviewedAll, ...dinoStats.hasNotBeenReviewedAll, ...govtStats.hasNotBeenReviewedAll].length,
							[...beefStats.hasNotBeenReviewedFoundError, ...dinoStats.hasNotBeenReviewedFoundError, ...govtStats.hasNotBeenReviewedFoundError].length, 
							[...beefStats.hasBeenReviewedAll, ...dinoStats.hasBeenReviewedAll, ...govtStats.hasBeenReviewedAll].length,
							[...beefStats.hasBeenReviewedFoundError, ...dinoStats.hasBeenReviewedFoundError, ...govtStats.hasBeenReviewedFoundError].length)}
						</td>
						<td>{utils.calculatePValue(
							[...beefStats.hasNotBeenReviewedAll, ...dinoStats.hasNotBeenReviewedAll, ...govtStats.hasNotBeenReviewedAll].length,
							[...beefStats.hasNotBeenReviewedFoundConclusion, ...dinoStats.hasNotBeenReviewedFoundConclusion, ...govtStats.hasNotBeenReviewedFoundConclusion].length,
							[...beefStats.hasBeenReviewedAll, ...dinoStats.hasBeenReviewedAll, ...govtStats.hasBeenReviewedAll].length,
							[...beefStats.hasBeenReviewedFoundConclusion, ...dinoStats.hasBeenReviewedFoundConclusion, ...govtStats.hasBeenReviewedFoundConclusion].length)}
						</td>
					</tr>
				</table>
			</div>
		);
	}
});

export default GraphHasBeenReviewed;

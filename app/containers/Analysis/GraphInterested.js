import React, { PropTypes } from 'react';
import AnalysisBarChart from './AnalysisBarChart';

export const GraphInterested = React.createClass({
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
				'Non-Interested - Found Error': beefStats.nonInterestedFoundError.length / beefStats.nonInterestedAll.length,
				'Non-Interested - Found ErrorError': utils.calcError(beefStats.nonInterestedAll.length),
				'Interested - Found Error': beefStats.interestedFoundError.length / beefStats.interestedAll.length,
				'Interested - Found ErrorError': utils.calcError(beefStats.interestedAll.length),
				'Non-Interested - Found Conclusion': beefStats.nonInterestedFoundConclusion.length / beefStats.nonInterestedAll.length,
				'Non-Interested - Found ConclusionError': utils.calcError(beefStats.nonInterestedAll.length),
				'Interested - Found Conclusion': beefStats.interestedFoundConclusion.length / beefStats.interestedAll.length,
				'Interested - Found ConclusionError': utils.calcError(beefStats.interestedAll.length),
			},
			{ 
				name: 'Dino', 
				'Non-Interested - Found Error': dinoStats.nonInterestedFoundError.length / dinoStats.nonInterestedAll.length,
				'Non-Interested - Found ErrorError': utils.calcError(dinoStats.nonInterestedAll.length),
				'Interested - Found Error': dinoStats.interestedFoundError.length / dinoStats.interestedAll.length,
				'Interested - Found ErrorError': utils.calcError(dinoStats.interestedAll.length),
				'Non-Interested - Found Conclusion': dinoStats.nonInterestedFoundConclusion.length / dinoStats.nonInterestedAll.length,
				'Non-Interested - Found ConclusionError': utils.calcError(dinoStats.nonInterestedAll.length),
				'Interested - Found Conclusion': dinoStats.interestedFoundConclusion.length / dinoStats.interestedAll.length,
				'Interested - Found ConclusionError': utils.calcError(dinoStats.interestedAll.length),
			},
			{ 
				name: 'Govt', 
				'Non-Interested - Found Error': govtStats.nonInterestedFoundError.length / govtStats.nonInterestedAll.length,
				'Non-Interested - Found ErrorError': utils.calcError(govtStats.nonInterestedAll.length),
				'Interested - Found Error': govtStats.interestedFoundError.length / govtStats.interestedAll.length,
				'Interested - Found ErrorError': utils.calcError(govtStats.interestedAll.length),
				'Non-Interested - Found Conclusion': govtStats.nonInterestedFoundConclusion.length / govtStats.nonInterestedAll.length,
				'Non-Interested - Found ConclusionError': utils.calcError(govtStats.nonInterestedAll.length),
				'Interested - Found Conclusion': govtStats.interestedFoundConclusion.length / govtStats.interestedAll.length,
				'Interested - Found ConclusionError': utils.calcError(govtStats.interestedAll.length),
			},
			{ 
				name: 'All', 
				'Non-Interested - Found Error': [...beefStats.nonInterestedFoundError, ...dinoStats.nonInterestedFoundError, ...govtStats.nonInterestedFoundError].length / [...beefStats.nonInterestedAll, ...dinoStats.nonInterestedAll, ...govtStats.nonInterestedAll].length,
				'Non-Interested - Found ErrorError': utils.calcError([...beefStats.nonInterestedAll, ...dinoStats.nonInterestedAll, ...govtStats.nonInterestedAll].length),
				'Interested - Found Error': [...beefStats.interestedFoundError, ...dinoStats.interestedFoundError, ...govtStats.interestedFoundError].length / [...beefStats.interestedAll, ...dinoStats.interestedAll, ...govtStats.interestedAll].length,
				'Interested - Found ErrorError': utils.calcError([...beefStats.interestedAll, ...dinoStats.interestedAll, ...govtStats.interestedAll].length),
				'Non-Interested - Found Conclusion': [...beefStats.nonInterestedFoundConclusion, ...dinoStats.nonInterestedFoundConclusion, ...govtStats.nonInterestedFoundConclusion].length / [...beefStats.nonInterestedAll, ...dinoStats.nonInterestedAll, ...govtStats.nonInterestedAll].length,
				'Non-Interested - Found ConclusionError': utils.calcError([...beefStats.nonInterestedAll, ...dinoStats.nonInterestedAll, ...govtStats.nonInterestedAll].length),
				'Interested - Found Conclusion': [...beefStats.interestedFoundConclusion, ...dinoStats.interestedFoundConclusion, ...govtStats.interestedFoundConclusion].length / [...beefStats.interestedAll, ...dinoStats.interestedAll, ...govtStats.interestedAll].length,
				'Interested - Found ConclusionError': utils.calcError([...beefStats.interestedAll, ...dinoStats.interestedAll, ...govtStats.interestedAll].length),
			},
		];
		
		return (
			<div>
				<AnalysisBarChart keys={['Non-Interested - Found Error', 'Interested - Found Error', 'Non-Interested - Found Conclusion', 'Interested - Found Conclusion']} data={graphData} title={'Performance vs Interest in Topic'} yaxisLabel={'Percent Users'} />
				<table className={'table'}>
					<tr className={'table-header'}>
						<td />
						<td>Non-Interested <br /><i>All</i></td>
						<td>Non-Interested <br /><i>Found Error</i></td>
						<td>Non-Interested <br /><i>Found Conclusion</i></td>
						<td>Interested <br /><i>All</i></td>
						<td>Interested <br /><i>Found Error</i></td>
						<td>Interested <br /><i>Found Conclusion</i></td>
						<td>Found Error <br /><i>p-value</i></td>
						<td>Found Conclusion <br /><i>p-value</i></td>
					</tr>
					<tr>
						<td>Beef</td>
						<td>{beefStats.nonInterestedAll.length}</td>
						<td>{beefStats.nonInterestedFoundError.length}</td>
						<td>{beefStats.nonInterestedFoundConclusion.length}</td>
						<td>{beefStats.interestedAll.length}</td>
						<td>{beefStats.interestedFoundError.length}</td>
						<td>{beefStats.interestedFoundConclusion.length}</td>
						<td>{utils.calculatePValue(
							beefStats.nonInterestedAll.length, 
							beefStats.nonInterestedFoundError.length, 
							beefStats.interestedAll.length, 
							beefStats.interestedFoundError.length)}
						</td>
						<td>{utils.calculatePValue(
							beefStats.nonInterestedAll.length, 
							beefStats.nonInterestedFoundConclusion.length, 
							beefStats.interestedAll.length, 
							beefStats.interestedFoundConclusion.length)}
						</td>
					</tr>
					<tr>
						<td>Dino</td>
						<td>{dinoStats.nonInterestedAll.length}</td>
						<td>{dinoStats.nonInterestedFoundError.length}</td>
						<td>{dinoStats.nonInterestedFoundConclusion.length}</td>
						<td>{dinoStats.interestedAll.length}</td>
						<td>{dinoStats.interestedFoundError.length}</td>
						<td>{dinoStats.interestedFoundConclusion.length}</td>
						<td>{utils.calculatePValue(
							dinoStats.nonInterestedAll.length, 
							dinoStats.nonInterestedFoundError.length, 
							dinoStats.interestedAll.length, 
							dinoStats.interestedFoundError.length)}
						</td>
						<td>{utils.calculatePValue(
							dinoStats.nonInterestedAll.length, 
							dinoStats.nonInterestedFoundConclusion.length, 
							dinoStats.interestedAll.length, 
							dinoStats.interestedFoundConclusion.length)}
						</td>
					</tr>
					<tr>
						<td>Govt</td>
						<td>{govtStats.nonInterestedAll.length}</td>
						<td>{govtStats.nonInterestedFoundError.length}</td>
						<td>{govtStats.nonInterestedFoundConclusion.length}</td>
						<td>{govtStats.interestedAll.length}</td>
						<td>{govtStats.interestedFoundError.length}</td>
						<td>{govtStats.interestedFoundConclusion.length}</td>
						<td>{utils.calculatePValue(
							govtStats.nonInterestedAll.length, 
							govtStats.nonInterestedFoundError.length, 
							govtStats.interestedAll.length, 
							govtStats.interestedFoundError.length)}
						</td>
						<td>{utils.calculatePValue(
							govtStats.nonInterestedAll.length, 
							govtStats.nonInterestedFoundConclusion.length, 
							govtStats.interestedAll.length, 
							govtStats.interestedFoundConclusion.length)}
						</td>
					</tr>
					<tr>
						<td>All</td>
						<td>{[...beefStats.nonInterestedAll, ...dinoStats.nonInterestedAll, ...govtStats.nonInterestedAll].length}</td>
						<td>{[...beefStats.nonInterestedFoundError, ...dinoStats.nonInterestedFoundError, ...govtStats.nonInterestedFoundError].length}</td>
						<td>{[...beefStats.nonInterestedFoundConclusion, ...dinoStats.nonInterestedFoundConclusion, ...govtStats.nonInterestedFoundConclusion].length}</td>
						<td>{[...beefStats.interestedAll, ...dinoStats.interestedAll, ...govtStats.interestedAll].length}</td>
						<td>{[...beefStats.interestedFoundError, ...dinoStats.interestedFoundError, ...govtStats.interestedFoundError].length}</td>
						<td>{[...beefStats.interestedFoundConclusion, ...dinoStats.interestedFoundConclusion, ...govtStats.interestedFoundConclusion].length}</td>
						<td>{utils.calculatePValue(
							[...beefStats.nonInterestedAll, ...dinoStats.nonInterestedAll, ...govtStats.nonInterestedAll].length,
							[...beefStats.nonInterestedFoundError, ...dinoStats.nonInterestedFoundError, ...govtStats.nonInterestedFoundError].length, 
							[...beefStats.interestedAll, ...dinoStats.interestedAll, ...govtStats.interestedAll].length,
							[...beefStats.interestedFoundError, ...dinoStats.interestedFoundError, ...govtStats.interestedFoundError].length)}
						</td>
						<td>{utils.calculatePValue(
							[...beefStats.nonInterestedAll, ...dinoStats.nonInterestedAll, ...govtStats.nonInterestedAll].length,
							[...beefStats.nonInterestedFoundConclusion, ...dinoStats.nonInterestedFoundConclusion, ...govtStats.nonInterestedFoundConclusion].length,
							[...beefStats.interestedAll, ...dinoStats.interestedAll, ...govtStats.interestedAll].length,
							[...beefStats.interestedFoundConclusion, ...dinoStats.interestedFoundConclusion, ...govtStats.interestedFoundConclusion].length)}
						</td>
					</tr>
				</table>
			</div>
		);
	}
});

export default GraphInterested;

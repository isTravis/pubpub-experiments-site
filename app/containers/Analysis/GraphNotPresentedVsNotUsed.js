import React, { PropTypes } from 'react';
import AnalysisBarChart from './AnalysisBarChart';

export const GraphNotPresentedVsNotUsed = React.createClass({
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
				'Not Presented - Found Error': beefStats.mode0FoundError.length / beefStats.mode0All.length,
				'Not Presented - Found ErrorError': utils.calcError(beefStats.mode0All.length),
				'Not Used - Found Error': beefStats.nonInteractiveFoundError.length / beefStats.nonInteractiveAll.length,
				'Not Used - Found ErrorError': utils.calcError(beefStats.nonInteractiveAll.length),
				'Not Presented - Found Conclusion': beefStats.mode0FoundConclusion.length / beefStats.mode0All.length,
				'Not Presented - Found ConclusionError': utils.calcError(beefStats.mode0All.length),
				'Not Used - Found Conclusion': beefStats.nonInteractiveFoundConclusion.length / beefStats.nonInteractiveAll.length,
				'Not Used - Found ConclusionError': utils.calcError(beefStats.nonInteractiveAll.length),
			},
			{ 
				name: 'Dino', 
				'Not Presented - Found Error': dinoStats.mode0FoundError.length / dinoStats.mode0All.length,
				'Not Presented - Found ErrorError': utils.calcError(dinoStats.mode0All.length),
				'Not Used - Found Error': dinoStats.nonInteractiveFoundError.length / dinoStats.nonInteractiveAll.length,
				'Not Used - Found ErrorError': utils.calcError(dinoStats.nonInteractiveAll.length),
				'Not Presented - Found Conclusion': dinoStats.mode0FoundConclusion.length / dinoStats.mode0All.length,
				'Not Presented - Found ConclusionError': utils.calcError(dinoStats.mode0All.length),
				'Not Used - Found Conclusion': dinoStats.nonInteractiveFoundConclusion.length / dinoStats.nonInteractiveAll.length,
				'Not Used - Found ConclusionError': utils.calcError(dinoStats.nonInteractiveAll.length),
			},
			{ 
				name: 'Govt', 
				'Not Presented - Found Error': govtStats.mode0FoundError.length / govtStats.mode0All.length,
				'Not Presented - Found ErrorError': utils.calcError(govtStats.mode0All.length),
				'Not Used - Found Error': govtStats.nonInteractiveFoundError.length / govtStats.nonInteractiveAll.length,
				'Not Used - Found ErrorError': utils.calcError(govtStats.nonInteractiveAll.length),
				'Not Presented - Found Conclusion': govtStats.mode0FoundConclusion.length / govtStats.mode0All.length,
				'Not Presented - Found ConclusionError': utils.calcError(govtStats.mode0All.length),
				'Not Used - Found Conclusion': govtStats.nonInteractiveFoundConclusion.length / govtStats.nonInteractiveAll.length,
				'Not Used - Found ConclusionError': utils.calcError(govtStats.nonInteractiveAll.length),
			},
			{ 
				name: 'All', 
				'Not Presented - Found Error': [...govtStats.mode0FoundError, ...dinoStats.mode0FoundError, ...beefStats.mode0FoundError].length / [...govtStats.mode0All, ...dinoStats.mode0All, ...beefStats.mode0All].length,
				'Not Presented - Found ErrorError': utils.calcError([...govtStats.mode0All, ...dinoStats.mode0All, ...beefStats.mode0All].length),
				'Not Used - Found Error': [...govtStats.nonInteractiveFoundError, ...dinoStats.nonInteractiveFoundError, ...beefStats.nonInteractiveFoundError].length / [...govtStats.nonInteractiveAll, ...dinoStats.nonInteractiveAll, ...beefStats.nonInteractiveAll].length,
				'Not Used - Found ErrorError': utils.calcError([...govtStats.nonInteractiveAll, ...dinoStats.nonInteractiveAll, ...beefStats.nonInteractiveAll].length),
				'Not Presented - Found Conclusion': [...govtStats.mode0FoundConclusion, ...dinoStats.mode0FoundConclusion, ...beefStats.mode0FoundConclusion].length / [...govtStats.mode0All, ...dinoStats.mode0All, ...beefStats.mode0All].length,
				'Not Presented - Found ConclusionError': utils.calcError([...govtStats.mode0All, ...dinoStats.mode0All, ...beefStats.mode0All].length),
				'Not Used - Found Conclusion': [...govtStats.nonInteractiveFoundConclusion, ...dinoStats.nonInteractiveFoundConclusion, ...beefStats.nonInteractiveFoundConclusion].length / [...govtStats.nonInteractiveAll, ...dinoStats.nonInteractiveAll, ...beefStats.nonInteractiveAll].length,
				'Not Used - Found ConclusionError': utils.calcError([...govtStats.nonInteractiveAll, ...dinoStats.nonInteractiveAll, ...beefStats.nonInteractiveAll].length),
			},
		];

		return (
			<div>
				<AnalysisBarChart keys={['Not Presented - Found Error', 'Not Used - Found Error', 'Not Presented - Found Conclusion', 'Not Used - Found Conclusion']} data={graphData} title={'Performance vs Non-Interactivity Type'} yaxisLabel={'Percent Users'} />
				<table className={'table'}>
					<tr className={'table-header'}>
						<td />
						<td>Not Presented <br />All</td>
						<td>Not Presented <br />Found Error</td>
						<td>Not Presented <br />Found Conclusion</td>
						<td>Not Used <br />All</td>
						<td>Not Used <br />Found Error</td>
						<td>Not Used <br />Found Conclusion</td>
						<td>Found Error <br />p-value</td>
						<td>Found Conclusion <br />p-value</td>
					</tr>
					<tr>
						<td>Beef</td>
						<td>{beefStats.mode0All.length}</td>
						<td>{beefStats.mode0FoundError.length}</td>
						<td>{beefStats.mode0FoundConclusion.length}</td>
						<td>{beefStats.nonInteractiveAll.length}</td>
						<td>{beefStats.nonInteractiveFoundError.length}</td>
						<td>{beefStats.nonInteractiveFoundConclusion.length}</td>
						<td>{utils.calculatePValue(
							beefStats.mode0All.length, 
							beefStats.mode0FoundError.length, 
							beefStats.nonInteractiveAll.length, 
							beefStats.nonInteractiveFoundError.length)}
						</td>
						<td>{utils.calculatePValue(
							beefStats.mode0All.length, 
							beefStats.mode0FoundConclusion.length, 
							beefStats.nonInteractiveAll.length, 
							beefStats.nonInteractiveFoundConclusion.length)}
						</td>
					</tr>
					<tr>
						<td>Dino</td>
						<td>{dinoStats.mode0All.length}</td>
						<td>{dinoStats.mode0FoundError.length}</td>
						<td>{dinoStats.mode0FoundConclusion.length}</td>
						<td>{dinoStats.nonInteractiveAll.length}</td>
						<td>{dinoStats.nonInteractiveFoundError.length}</td>
						<td>{dinoStats.nonInteractiveFoundConclusion.length}</td>
						<td>{utils.calculatePValue(
							dinoStats.mode0All.length, 
							dinoStats.mode0FoundError.length, 
							dinoStats.nonInteractiveAll.length, 
							dinoStats.nonInteractiveFoundError.length)}
						</td>
						<td>{utils.calculatePValue(
							dinoStats.mode0All.length, 
							dinoStats.mode0FoundConclusion.length, 
							dinoStats.nonInteractiveAll.length, 
							dinoStats.nonInteractiveFoundConclusion.length)}
						</td>
					</tr>
					<tr>
						<td>Govt</td>
						<td>{govtStats.mode0All.length}</td>
						<td>{govtStats.mode0FoundError.length}</td>
						<td>{govtStats.mode0FoundConclusion.length}</td>
						<td>{govtStats.nonInteractiveAll.length}</td>
						<td>{govtStats.nonInteractiveFoundError.length}</td>
						<td>{govtStats.nonInteractiveFoundConclusion.length}</td>
						<td>{utils.calculatePValue(
							govtStats.mode0All.length, 
							govtStats.mode0FoundError.length, 
							govtStats.nonInteractiveAll.length, 
							govtStats.nonInteractiveFoundError.length)}
						</td>
						<td>{utils.calculatePValue(
							govtStats.mode0All.length, 
							govtStats.mode0FoundConclusion.length, 
							govtStats.nonInteractiveAll.length, 
							govtStats.nonInteractiveFoundConclusion.length)}
						</td>
					</tr>
					<tr>
						<td>All</td>
						<td>{[...beefStats.mode0All, ...dinoStats.mode0All, ...govtStats.mode0All].length}</td>
						<td>{[...beefStats.mode0FoundError, ...dinoStats.mode0FoundError, ...govtStats.mode0FoundError].length}</td>
						<td>{[...beefStats.mode0FoundConclusion, ...dinoStats.mode0FoundConclusion, ...govtStats.mode0FoundConclusion].length}</td>
						<td>{[...beefStats.nonInteractiveAll, ...dinoStats.nonInteractiveAll, ...govtStats.nonInteractiveAll].length}</td>
						<td>{[...beefStats.nonInteractiveFoundError, ...dinoStats.nonInteractiveFoundError, ...govtStats.nonInteractiveFoundError].length}</td>
						<td>{[...beefStats.nonInteractiveFoundConclusion, ...dinoStats.nonInteractiveFoundConclusion, ...govtStats.nonInteractiveFoundConclusion].length}</td>
						<td>{utils.calculatePValue(
							[...beefStats.mode0All, ...dinoStats.mode0All, ...govtStats.mode0All].length,
							[...beefStats.mode0FoundError, ...dinoStats.mode0FoundError, ...govtStats.mode0FoundError].length, 
							[...beefStats.nonInteractiveAll, ...dinoStats.nonInteractiveAll, ...govtStats.nonInteractiveAll].length,
							[...beefStats.nonInteractiveFoundError, ...dinoStats.nonInteractiveFoundError, ...govtStats.nonInteractiveFoundError].length)}
						</td>
						<td>{utils.calculatePValue(
							[...beefStats.mode0All, ...dinoStats.mode0All, ...govtStats.mode0All].length,
							[...beefStats.mode0FoundConclusion, ...dinoStats.mode0FoundConclusion, ...govtStats.mode0FoundConclusion].length,
							[...beefStats.nonInteractiveAll, ...dinoStats.nonInteractiveAll, ...govtStats.nonInteractiveAll].length,
							[...beefStats.nonInteractiveFoundConclusion, ...dinoStats.nonInteractiveFoundConclusion, ...govtStats.nonInteractiveFoundConclusion].length)}
						</td>
					</tr>
				</table>
			</div>
		);
	}
});

export default GraphNotPresentedVsNotUsed;

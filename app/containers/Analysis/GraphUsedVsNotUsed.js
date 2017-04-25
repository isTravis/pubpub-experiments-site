import React, { PropTypes } from 'react';
import AnalysisBarChart from './AnalysisBarChart';
import chiTest from 'chi-squared-test';

export const GraphPresentedVsNotPresented = React.createClass({
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
				'Skipped Interactive - Found Error': beefStats.nonInteractiveFoundError.length / beefStats.nonInteractiveAll.length,
				'Skipped Interactive - Found ErrorError': utils.calcError(beefStats.nonInteractiveAll.length),
				'Used Interactive - Found Error': beefStats.interactiveFoundError.length / beefStats.interactiveAll.length,
				'Used Interactive - Found ErrorError': utils.calcError(beefStats.interactiveAll.length),
				'Skipped Interactive - Found Conclusion': beefStats.nonInteractiveFoundConclusion.length / beefStats.nonInteractiveAll.length,
				'Skipped Interactive - Found ConclusionError': utils.calcError(beefStats.nonInteractiveAll.length),
				'Used Interactive - Found Conclusion': beefStats.interactiveFoundConclusion.length / beefStats.interactiveAll.length,
				'Used Interactive - Found ConclusionError': utils.calcError(beefStats.interactiveAll.length),
			},
			{ 
				name: 'Dino', 
				'Skipped Interactive - Found Error': dinoStats.nonInteractiveFoundError.length / dinoStats.nonInteractiveAll.length,
				'Skipped Interactive - Found ErrorError': utils.calcError(dinoStats.nonInteractiveAll.length),
				'Used Interactive - Found Error': dinoStats.interactiveFoundError.length / dinoStats.interactiveAll.length,
				'Used Interactive - Found ErrorError': utils.calcError(dinoStats.interactiveAll.length),
				'Skipped Interactive - Found Conclusion': dinoStats.nonInteractiveFoundConclusion.length / dinoStats.nonInteractiveAll.length,
				'Skipped Interactive - Found ConclusionError': utils.calcError(dinoStats.nonInteractiveAll.length),
				'Used Interactive - Found Conclusion': dinoStats.interactiveFoundConclusion.length / dinoStats.interactiveAll.length,
				'Used Interactive - Found ConclusionError': utils.calcError(dinoStats.interactiveAll.length),
			},
			{ 
				name: 'Govt', 
				'Skipped Interactive - Found Error': govtStats.nonInteractiveFoundError.length / govtStats.nonInteractiveAll.length,
				'Skipped Interactive - Found ErrorError': utils.calcError(govtStats.nonInteractiveAll.length),
				'Used Interactive - Found Error': govtStats.interactiveFoundError.length / govtStats.interactiveAll.length,
				'Used Interactive - Found ErrorError': utils.calcError(govtStats.interactiveAll.length),
				'Skipped Interactive - Found Conclusion': govtStats.nonInteractiveFoundConclusion.length / govtStats.nonInteractiveAll.length,
				'Skipped Interactive - Found ConclusionError': utils.calcError(govtStats.nonInteractiveAll.length),
				'Used Interactive - Found Conclusion': govtStats.interactiveFoundConclusion.length / govtStats.interactiveAll.length,
				'Used Interactive - Found ConclusionError': utils.calcError(govtStats.interactiveAll.length),
			},
			{ 
				name: 'All', 
				'Skipped Interactive - Found Error': [...beefStats.nonInteractiveFoundError, ...dinoStats.nonInteractiveFoundError, ...govtStats.nonInteractiveFoundError].length / [...beefStats.nonInteractiveAll, ...dinoStats.nonInteractiveAll, ...govtStats.nonInteractiveAll].length,
				'Skipped Interactive - Found ErrorError': utils.calcError([...beefStats.nonInteractiveAll, ...dinoStats.nonInteractiveAll, ...govtStats.nonInteractiveAll].length),
				'Used Interactive - Found Error': [...beefStats.interactiveFoundError, ...dinoStats.interactiveFoundError, ...govtStats.interactiveFoundError].length / [...beefStats.interactiveAll, ...dinoStats.interactiveAll, ...govtStats.interactiveAll].length,
				'Used Interactive - Found ErrorError': utils.calcError([...beefStats.interactiveAll, ...dinoStats.interactiveAll, ...govtStats.interactiveAll].length),
				'Skipped Interactive - Found Conclusion': [...beefStats.nonInteractiveFoundConclusion, ...dinoStats.nonInteractiveFoundConclusion, ...govtStats.nonInteractiveFoundConclusion].length / [...beefStats.nonInteractiveAll, ...dinoStats.nonInteractiveAll, ...govtStats.nonInteractiveAll].length,
				'Skipped Interactive - Found ConclusionError': utils.calcError([...beefStats.nonInteractiveAll, ...dinoStats.nonInteractiveAll, ...govtStats.nonInteractiveAll].length),
				'Used Interactive - Found Conclusion': [...beefStats.interactiveFoundConclusion, ...dinoStats.interactiveFoundConclusion, ...govtStats.interactiveFoundConclusion].length / [...beefStats.interactiveAll, ...dinoStats.interactiveAll, ...govtStats.interactiveAll].length,
				'Used Interactive - Found ConclusionError': utils.calcError([...beefStats.interactiveAll, ...dinoStats.interactiveAll, ...govtStats.interactiveAll].length),
			},
		];
		
		return (
			<div>
				<AnalysisBarChart keys={['Skipped Interactive - Found Error', 'Used Interactive - Found Error', 'Skipped Interactive - Found Conclusion', 'Used Interactive - Found Conclusion']} data={graphData} title={'Performance vs Use of Interactive Figure'} yaxisLabel={'Percent Users'} />
				<table className={'table'}>
					<tr className={'table-header'}>
						<td />
						<td>Skipped Interactive <br /><i>All</i></td>
						<td>Skipped Interactive <br /><i>Found Error</i></td>
						<td>Skipped Interactive <br /><i>Found Conclusion</i></td>
						<td>Used Interactive <br /><i>All</i></td>
						<td>Used Interactive <br /><i>Found Error</i></td>
						<td>Used Interactive <br /><i>Found Conclusion</i></td>
						<td>Found Error <br /><i>p-value</i></td>
						<td>Found Conclusion <br /><i>p-value</i></td>
					</tr>
					<tr>
						<td>Beef</td>
						<td>{beefStats.nonInteractiveAll.length}</td>
						<td>{beefStats.nonInteractiveFoundError.length}</td>
						<td>{beefStats.nonInteractiveFoundConclusion.length}</td>
						<td>{beefStats.interactiveAll.length}</td>
						<td>{beefStats.interactiveFoundError.length}</td>
						<td>{beefStats.interactiveFoundConclusion.length}</td>
						<td>{utils.calculatePValue(
							beefStats.nonInteractiveAll.length, 
							beefStats.nonInteractiveFoundError.length, 
							beefStats.interactiveAll.length, 
							beefStats.interactiveFoundError.length)}
						</td>
						<td>{utils.calculatePValue(
							beefStats.nonInteractiveAll.length, 
							beefStats.nonInteractiveFoundConclusion.length, 
							beefStats.interactiveAll.length, 
							beefStats.interactiveFoundConclusion.length)}
						</td>
					</tr>
					<tr>
						<td>Dino</td>
						<td>{dinoStats.nonInteractiveAll.length}</td>
						<td>{dinoStats.nonInteractiveFoundError.length}</td>
						<td>{dinoStats.nonInteractiveFoundConclusion.length}</td>
						<td>{dinoStats.interactiveAll.length}</td>
						<td>{dinoStats.interactiveFoundError.length}</td>
						<td>{dinoStats.interactiveFoundConclusion.length}</td>
						<td>{utils.calculatePValue(
							dinoStats.nonInteractiveAll.length, 
							dinoStats.nonInteractiveFoundError.length, 
							dinoStats.interactiveAll.length, 
							dinoStats.interactiveFoundError.length)}
						</td>
						<td>{utils.calculatePValue(
							dinoStats.nonInteractiveAll.length, 
							dinoStats.nonInteractiveFoundConclusion.length, 
							dinoStats.interactiveAll.length, 
							dinoStats.interactiveFoundConclusion.length)}
						</td>
					</tr>
					<tr>
						<td>Govt</td>
						<td>{govtStats.nonInteractiveAll.length}</td>
						<td>{govtStats.nonInteractiveFoundError.length}</td>
						<td>{govtStats.nonInteractiveFoundConclusion.length}</td>
						<td>{govtStats.interactiveAll.length}</td>
						<td>{govtStats.interactiveFoundError.length}</td>
						<td>{govtStats.interactiveFoundConclusion.length}</td>
						<td>{utils.calculatePValue(
							govtStats.nonInteractiveAll.length, 
							govtStats.nonInteractiveFoundError.length, 
							govtStats.interactiveAll.length, 
							govtStats.interactiveFoundError.length)}
						</td>
						<td>{utils.calculatePValue(
							govtStats.nonInteractiveAll.length, 
							govtStats.nonInteractiveFoundConclusion.length, 
							govtStats.interactiveAll.length, 
							govtStats.interactiveFoundConclusion.length)}
						</td>
					</tr>
					<tr>
						<td>All</td>
						<td>{[...beefStats.nonInteractiveAll, ...dinoStats.nonInteractiveAll, ...govtStats.nonInteractiveAll].length}</td>
						<td>{[...beefStats.nonInteractiveFoundError, ...dinoStats.nonInteractiveFoundError, ...govtStats.nonInteractiveFoundError].length}</td>
						<td>{[...beefStats.nonInteractiveFoundConclusion, ...dinoStats.nonInteractiveFoundConclusion, ...govtStats.nonInteractiveFoundConclusion].length}</td>
						<td>{[...beefStats.interactiveAll, ...dinoStats.interactiveAll, ...govtStats.interactiveAll].length}</td>
						<td>{[...beefStats.interactiveFoundError, ...dinoStats.interactiveFoundError, ...govtStats.interactiveFoundError].length}</td>
						<td>{[...beefStats.interactiveFoundConclusion, ...dinoStats.interactiveFoundConclusion, ...govtStats.interactiveFoundConclusion].length}</td>
						<td>{utils.calculatePValue(
							[...beefStats.nonInteractiveAll, ...dinoStats.nonInteractiveAll, ...govtStats.nonInteractiveAll].length,
							[...beefStats.nonInteractiveFoundError, ...dinoStats.nonInteractiveFoundError, ...govtStats.nonInteractiveFoundError].length, 
							[...beefStats.interactiveAll, ...dinoStats.interactiveAll, ...govtStats.interactiveAll].length,
							[...beefStats.interactiveFoundError, ...dinoStats.interactiveFoundError, ...govtStats.interactiveFoundError].length)}
						</td>
						<td>{utils.calculatePValue(
							[...beefStats.nonInteractiveAll, ...dinoStats.nonInteractiveAll, ...govtStats.nonInteractiveAll].length,
							[...beefStats.nonInteractiveFoundConclusion, ...dinoStats.nonInteractiveFoundConclusion, ...govtStats.nonInteractiveFoundConclusion].length,
							[...beefStats.interactiveAll, ...dinoStats.interactiveAll, ...govtStats.interactiveAll].length,
							[...beefStats.interactiveFoundConclusion, ...dinoStats.interactiveFoundConclusion, ...govtStats.interactiveFoundConclusion].length)}
						</td>
					</tr>
				</table>
			</div>
		);
		
	}
});

export default GraphPresentedVsNotPresented;

import React, { PropTypes } from 'react';
import AnalysisBarChart from './AnalysisBarChart';

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
				'Non-Interactive - Found Error': beefStats.mode0FoundError.length / beefStats.mode0All.length,
				'Non-Interactive - Found ErrorError': utils.calcError(beefStats.mode0All.length),
				'Interactive - Found Error': beefStats.mode1FoundError.length / beefStats.mode1All.length,
				'Interactive - Found ErrorError': utils.calcError(beefStats.mode1All.length),
				'Non-Interactive - Found Conclusion': beefStats.mode0FoundConclusion.length / beefStats.mode0All.length,
				'Non-Interactive - Found ConclusionError': utils.calcError(beefStats.mode0All.length),
				'Interactive - Found Conclusion': beefStats.mode1FoundConclusion.length / beefStats.mode1All.length,
				'Interactive - Found ConclusionError': utils.calcError(beefStats.mode1All.length),
			},
			{ 
				name: 'Dino', 
				'Non-Interactive - Found Error': dinoStats.mode0FoundError.length / dinoStats.mode0All.length,
				'Non-Interactive - Found ErrorError': utils.calcError(dinoStats.mode0All.length),
				'Interactive - Found Error': dinoStats.mode1FoundError.length / dinoStats.mode1All.length,
				'Interactive - Found ErrorError': utils.calcError(dinoStats.mode1All.length),
				'Non-Interactive - Found Conclusion': dinoStats.mode0FoundConclusion.length / dinoStats.mode0All.length,
				'Non-Interactive - Found ConclusionError': utils.calcError(dinoStats.mode0All.length),
				'Interactive - Found Conclusion': dinoStats.mode1FoundConclusion.length / dinoStats.mode1All.length,
				'Interactive - Found ConclusionError': utils.calcError(dinoStats.mode1All.length),
			},
			{ 
				name: 'Govt', 
				'Non-Interactive - Found Error': govtStats.mode0FoundError.length / govtStats.mode0All.length,
				'Non-Interactive - Found ErrorError': utils.calcError(govtStats.mode0All.length),
				'Interactive - Found Error': govtStats.mode1FoundError.length / govtStats.mode1All.length,
				'Interactive - Found ErrorError': utils.calcError(govtStats.mode1All.length),
				'Non-Interactive - Found Conclusion': govtStats.mode0FoundConclusion.length / govtStats.mode0All.length,
				'Non-Interactive - Found ConclusionError': utils.calcError(govtStats.mode0All.length),
				'Interactive - Found Conclusion': govtStats.mode1FoundConclusion.length / govtStats.mode1All.length,
				'Interactive - Found ConclusionError': utils.calcError(govtStats.mode1All.length),
			},
			{ 
				name: 'All', 
				'Non-Interactive - Found Error': [...beefStats.mode0FoundError, ...dinoStats.mode0FoundError, ...govtStats.mode0FoundError].length / [...beefStats.mode0All, ...dinoStats.mode0All, ...govtStats.mode0All].length,
				'Non-Interactive - Found ErrorError': utils.calcError([...beefStats.mode0All, ...dinoStats.mode0All, ...govtStats.mode0All].length),
				'Interactive - Found Error': [...beefStats.mode1FoundError, ...dinoStats.mode1FoundError, ...govtStats.mode1FoundError].length / [...beefStats.mode1All, ...dinoStats.mode1All, ...govtStats.mode1All].length,
				'Interactive - Found ErrorError': utils.calcError([...beefStats.mode1All, ...dinoStats.mode1All, ...govtStats.mode1All].length),
				'Non-Interactive - Found Conclusion': [...beefStats.mode0FoundConclusion, ...dinoStats.mode0FoundConclusion, ...govtStats.mode0FoundConclusion].length / [...beefStats.mode0All, ...dinoStats.mode0All, ...govtStats.mode0All].length,
				'Non-Interactive - Found ConclusionError': utils.calcError([...beefStats.mode0All, ...dinoStats.mode0All, ...govtStats.mode0All].length),
				'Interactive - Found Conclusion': [...beefStats.mode1FoundConclusion, ...dinoStats.mode1FoundConclusion, ...govtStats.mode1FoundConclusion].length / [...beefStats.mode1All, ...dinoStats.mode1All, ...govtStats.mode1All].length,
				'Interactive - Found ConclusionError': utils.calcError([...beefStats.mode1All, ...dinoStats.mode1All, ...govtStats.mode1All].length),
			},
		];

		return (
			<div>
				<AnalysisBarChart keys={['Non-Interactive - Found Error', 'Interactive - Found Error', 'Non-Interactive - Found Conclusion', 'Interactive - Found Conclusion']} data={graphData} title={'Performance vs Article Type'} yaxisLabel={'Percent Users'} />
				<table className={'table'}>
					<tr className={'table-header'}>
						<td />
						<td>Non Interactive <br />All</td>
						<td>Non Interactive <br />Found Error</td>
						<td>Non Interactive <br />Found Conclusion</td>
						<td>Interactive <br />All</td>
						<td>Interactive <br />Found Error</td>
						<td>Interactive <br />Found Conclusion</td>
						<td>Found Error <br />p-value</td>
						<td>Found Conclusion <br />p-value</td>
					</tr>
					<tr>
						<td>Beef</td>
						<td>{beefStats.mode0All.length}</td>
						<td>{beefStats.mode0FoundError.length}</td>
						<td>{beefStats.mode0FoundConclusion.length}</td>
						<td>{beefStats.mode1All.length}</td>
						<td>{beefStats.mode1FoundError.length}</td>
						<td>{beefStats.mode1FoundConclusion.length}</td>
						<td>{utils.calculatePValue(
							beefStats.mode0All.length, 
							beefStats.mode0FoundError.length, 
							beefStats.mode1All.length, 
							beefStats.mode1FoundError.length)}
						</td>
						<td>{utils.calculatePValue(
							beefStats.mode0All.length, 
							beefStats.mode0FoundConclusion.length, 
							beefStats.mode1All.length, 
							beefStats.mode1FoundConclusion.length)}
						</td>
					</tr>
					<tr>
						<td>Dino</td>
						<td>{dinoStats.mode0All.length}</td>
						<td>{dinoStats.mode0FoundError.length}</td>
						<td>{dinoStats.mode0FoundConclusion.length}</td>
						<td>{dinoStats.mode1All.length}</td>
						<td>{dinoStats.mode1FoundError.length}</td>
						<td>{dinoStats.mode1FoundConclusion.length}</td>
						<td>{utils.calculatePValue(
							dinoStats.mode0All.length, 
							dinoStats.mode0FoundError.length, 
							dinoStats.mode1All.length, 
							dinoStats.mode1FoundError.length)}
						</td>
						<td>{utils.calculatePValue(
							dinoStats.mode0All.length, 
							dinoStats.mode0FoundConclusion.length, 
							dinoStats.mode1All.length, 
							dinoStats.mode1FoundConclusion.length)}
						</td>
					</tr>
					<tr>
						<td>Govt</td>
						<td>{govtStats.mode0All.length}</td>
						<td>{govtStats.mode0FoundError.length}</td>
						<td>{govtStats.mode0FoundConclusion.length}</td>
						<td>{govtStats.mode1All.length}</td>
						<td>{govtStats.mode1FoundError.length}</td>
						<td>{govtStats.mode1FoundConclusion.length}</td>
						<td>{utils.calculatePValue(
							govtStats.mode0All.length, 
							govtStats.mode0FoundError.length, 
							govtStats.mode1All.length, 
							govtStats.mode1FoundError.length)}
						</td>
						<td>{utils.calculatePValue(
							govtStats.mode0All.length, 
							govtStats.mode0FoundConclusion.length, 
							govtStats.mode1All.length, 
							govtStats.mode1FoundConclusion.length)}
						</td>
					</tr>
					<tr>
						<td>All</td>
						<td>{[...beefStats.mode0All, ...dinoStats.mode0All, ...govtStats.mode0All].length}</td>
						<td>{[...beefStats.mode0FoundError, ...dinoStats.mode0FoundError, ...govtStats.mode0FoundError].length}</td>
						<td>{[...beefStats.mode0FoundConclusion, ...dinoStats.mode0FoundConclusion, ...govtStats.mode0FoundConclusion].length}</td>
						<td>{[...beefStats.mode1All, ...dinoStats.mode1All, ...govtStats.mode1All].length}</td>
						<td>{[...beefStats.mode1FoundError, ...dinoStats.mode1FoundError, ...govtStats.mode1FoundError].length}</td>
						<td>{[...beefStats.mode1FoundConclusion, ...dinoStats.mode1FoundConclusion, ...govtStats.mode1FoundConclusion].length}</td>
						<td>{utils.calculatePValue(
							[...beefStats.mode0All, ...dinoStats.mode0All, ...govtStats.mode0All].length,
							[...beefStats.mode0FoundError, ...dinoStats.mode0FoundError, ...govtStats.mode0FoundError].length, 
							[...beefStats.mode1All, ...dinoStats.mode1All, ...govtStats.mode1All].length,
							[...beefStats.mode1FoundError, ...dinoStats.mode1FoundError, ...govtStats.mode1FoundError].length)}
						</td>
						<td>{utils.calculatePValue(
							[...beefStats.mode0All, ...dinoStats.mode0All, ...govtStats.mode0All].length,
							[...beefStats.mode0FoundConclusion, ...dinoStats.mode0FoundConclusion, ...govtStats.mode0FoundConclusion].length,
							[...beefStats.mode1All, ...dinoStats.mode1All, ...govtStats.mode1All].length,
							[...beefStats.mode1FoundConclusion, ...dinoStats.mode1FoundConclusion, ...govtStats.mode1FoundConclusion].length)}
						</td>
					</tr>
				</table>
			</div>
		);
	}
});

export default GraphPresentedVsNotPresented;

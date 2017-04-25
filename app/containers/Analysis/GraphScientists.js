import React, { PropTypes } from 'react';
import AnalysisBarChart from './AnalysisBarChart';


export const GraphScientists = React.createClass({
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
				'Non-Scientist - Found Error': beefStats.nonScientistFoundError.length / beefStats.nonScientistAll.length,
				'Non-Scientist - Found ErrorError': utils.calcError(beefStats.nonScientistAll.length),
				'Scientist - Found Error': beefStats.scientistFoundError.length / beefStats.scientistAll.length,
				'Scientist - Found ErrorError': utils.calcError(beefStats.scientistAll.length),
				'Non-Scientist - Found Conclusion': beefStats.nonScientistFoundConclusion.length / beefStats.nonScientistAll.length,
				'Non-Scientist - Found ConclusionError': utils.calcError(beefStats.nonScientistAll.length),
				'Scientist - Found Conclusion': beefStats.scientistFoundConclusion.length / beefStats.scientistAll.length,
				'Scientist - Found ConclusionError': utils.calcError(beefStats.scientistAll.length),
			},
			{ 
				name: 'Dino', 
				'Non-Scientist - Found Error': dinoStats.nonScientistFoundError.length / dinoStats.nonScientistAll.length,
				'Non-Scientist - Found ErrorError': utils.calcError(dinoStats.nonScientistAll.length),
				'Scientist - Found Error': dinoStats.scientistFoundError.length / dinoStats.scientistAll.length,
				'Scientist - Found ErrorError': utils.calcError(dinoStats.scientistAll.length),
				'Non-Scientist - Found Conclusion': dinoStats.nonScientistFoundConclusion.length / dinoStats.nonScientistAll.length,
				'Non-Scientist - Found ConclusionError': utils.calcError(dinoStats.nonScientistAll.length),
				'Scientist - Found Conclusion': dinoStats.scientistFoundConclusion.length / dinoStats.scientistAll.length,
				'Scientist - Found ConclusionError': utils.calcError(dinoStats.scientistAll.length),
			},
			{ 
				name: 'Govt', 
				'Non-Scientist - Found Error': govtStats.nonScientistFoundError.length / govtStats.nonScientistAll.length,
				'Non-Scientist - Found ErrorError': utils.calcError(govtStats.nonScientistAll.length),
				'Scientist - Found Error': govtStats.scientistFoundError.length / govtStats.scientistAll.length,
				'Scientist - Found ErrorError': utils.calcError(govtStats.scientistAll.length),
				'Non-Scientist - Found Conclusion': govtStats.nonScientistFoundConclusion.length / govtStats.nonScientistAll.length,
				'Non-Scientist - Found ConclusionError': utils.calcError(govtStats.nonScientistAll.length),
				'Scientist - Found Conclusion': govtStats.scientistFoundConclusion.length / govtStats.scientistAll.length,
				'Scientist - Found ConclusionError': utils.calcError(govtStats.scientistAll.length),
			},
			{ 
				name: 'All', 
				'Non-Scientist - Found Error': [...beefStats.nonScientistFoundError, ...dinoStats.nonScientistFoundError, ...govtStats.nonScientistFoundError].length / [...beefStats.nonScientistAll, ...dinoStats.nonScientistAll, ...govtStats.nonScientistAll].length,
				'Non-Scientist - Found ErrorError': utils.calcError([...beefStats.nonScientistAll, ...dinoStats.nonScientistAll, ...govtStats.nonScientistAll].length),
				'Scientist - Found Error': [...beefStats.scientistFoundError, ...dinoStats.scientistFoundError, ...govtStats.scientistFoundError].length / [...beefStats.scientistAll, ...dinoStats.scientistAll, ...govtStats.scientistAll].length,
				'Scientist - Found ErrorError': utils.calcError([...beefStats.scientistAll, ...dinoStats.scientistAll, ...govtStats.scientistAll].length),
				'Non-Scientist - Found Conclusion': [...beefStats.nonScientistFoundConclusion, ...dinoStats.nonScientistFoundConclusion, ...govtStats.nonScientistFoundConclusion].length / [...beefStats.nonScientistAll, ...dinoStats.nonScientistAll, ...govtStats.nonScientistAll].length,
				'Non-Scientist - Found ConclusionError': utils.calcError([...beefStats.nonScientistAll, ...dinoStats.nonScientistAll, ...govtStats.nonScientistAll].length),
				'Scientist - Found Conclusion': [...beefStats.scientistFoundConclusion, ...dinoStats.scientistFoundConclusion, ...govtStats.scientistFoundConclusion].length / [...beefStats.scientistAll, ...dinoStats.scientistAll, ...govtStats.scientistAll].length,
				'Scientist - Found ConclusionError': utils.calcError([...beefStats.scientistAll, ...dinoStats.scientistAll, ...govtStats.scientistAll].length),
			},
		];
		
		return (
			<div>
				<AnalysisBarChart keys={['Non-Scientist - Found Error', 'Scientist - Found Error', 'Non-Scientist - Found Conclusion', 'Scientist - Found Conclusion']} data={graphData} title={'Performance vs Scientific Training'} yaxisLabel={'Percent Users'} />		
				<table className={'table'}>
					<tr className={'table-header'}>
						<td />
						<td>Non-Scientist <br /><i>All</i></td>
						<td>Non-Scientist <br /><i>Found Error</i></td>
						<td>Non-Scientist <br /><i>Found Conclusion</i></td>
						<td>Scientist <br /><i>All</i></td>
						<td>Scientist <br /><i>Found Error</i></td>
						<td>Scientist <br /><i>Found Conclusion</i></td>
						<td>Found Error <br /><i>p-value</i></td>
						<td>Found Conclusion <br /><i>p-value</i></td>
					</tr>
					<tr>
						<td>Beef</td>
						<td>{beefStats.nonScientistAll.length}</td>
						<td>{beefStats.nonScientistFoundError.length}</td>
						<td>{beefStats.nonScientistFoundConclusion.length}</td>
						<td>{beefStats.scientistAll.length}</td>
						<td>{beefStats.scientistFoundError.length}</td>
						<td>{beefStats.scientistFoundConclusion.length}</td>
						<td>{utils.calculatePValue(
							beefStats.nonScientistAll.length, 
							beefStats.nonScientistFoundError.length, 
							beefStats.scientistAll.length, 
							beefStats.scientistFoundError.length)}
						</td>
						<td>{utils.calculatePValue(
							beefStats.nonScientistAll.length, 
							beefStats.nonScientistFoundConclusion.length, 
							beefStats.scientistAll.length, 
							beefStats.scientistFoundConclusion.length)}
						</td>
					</tr>
					<tr>
						<td>Dino</td>
						<td>{dinoStats.nonScientistAll.length}</td>
						<td>{dinoStats.nonScientistFoundError.length}</td>
						<td>{dinoStats.nonScientistFoundConclusion.length}</td>
						<td>{dinoStats.scientistAll.length}</td>
						<td>{dinoStats.scientistFoundError.length}</td>
						<td>{dinoStats.scientistFoundConclusion.length}</td>
						<td>{utils.calculatePValue(
							dinoStats.nonScientistAll.length, 
							dinoStats.nonScientistFoundError.length, 
							dinoStats.scientistAll.length, 
							dinoStats.scientistFoundError.length)}
						</td>
						<td>{utils.calculatePValue(
							dinoStats.nonScientistAll.length, 
							dinoStats.nonScientistFoundConclusion.length, 
							dinoStats.scientistAll.length, 
							dinoStats.scientistFoundConclusion.length)}
						</td>
					</tr>
					<tr>
						<td>Govt</td>
						<td>{govtStats.nonScientistAll.length}</td>
						<td>{govtStats.nonScientistFoundError.length}</td>
						<td>{govtStats.nonScientistFoundConclusion.length}</td>
						<td>{govtStats.scientistAll.length}</td>
						<td>{govtStats.scientistFoundError.length}</td>
						<td>{govtStats.scientistFoundConclusion.length}</td>
						<td>{utils.calculatePValue(
							govtStats.nonScientistAll.length, 
							govtStats.nonScientistFoundError.length, 
							govtStats.scientistAll.length, 
							govtStats.scientistFoundError.length)}
						</td>
						<td>{utils.calculatePValue(
							govtStats.nonScientistAll.length, 
							govtStats.nonScientistFoundConclusion.length, 
							govtStats.scientistAll.length, 
							govtStats.scientistFoundConclusion.length)}
						</td>
					</tr>
					<tr>
						<td>All</td>
						<td>{[...beefStats.nonScientistAll, ...dinoStats.nonScientistAll, ...govtStats.nonScientistAll].length}</td>
						<td>{[...beefStats.nonScientistFoundError, ...dinoStats.nonScientistFoundError, ...govtStats.nonScientistFoundError].length}</td>
						<td>{[...beefStats.nonScientistFoundConclusion, ...dinoStats.nonScientistFoundConclusion, ...govtStats.nonScientistFoundConclusion].length}</td>
						<td>{[...beefStats.scientistAll, ...dinoStats.scientistAll, ...govtStats.scientistAll].length}</td>
						<td>{[...beefStats.scientistFoundError, ...dinoStats.scientistFoundError, ...govtStats.scientistFoundError].length}</td>
						<td>{[...beefStats.scientistFoundConclusion, ...dinoStats.scientistFoundConclusion, ...govtStats.scientistFoundConclusion].length}</td>
						<td>{utils.calculatePValue(
							[...beefStats.nonScientistAll, ...dinoStats.nonScientistAll, ...govtStats.nonScientistAll].length,
							[...beefStats.nonScientistFoundError, ...dinoStats.nonScientistFoundError, ...govtStats.nonScientistFoundError].length, 
							[...beefStats.scientistAll, ...dinoStats.scientistAll, ...govtStats.scientistAll].length,
							[...beefStats.scientistFoundError, ...dinoStats.scientistFoundError, ...govtStats.scientistFoundError].length)}
						</td>
						<td>{utils.calculatePValue(
							[...beefStats.nonScientistAll, ...dinoStats.nonScientistAll, ...govtStats.nonScientistAll].length,
							[...beefStats.nonScientistFoundConclusion, ...dinoStats.nonScientistFoundConclusion, ...govtStats.nonScientistFoundConclusion].length,
							[...beefStats.scientistAll, ...dinoStats.scientistAll, ...govtStats.scientistAll].length,
							[...beefStats.scientistFoundConclusion, ...dinoStats.scientistFoundConclusion, ...govtStats.scientistFoundConclusion].length)}
						</td>
					</tr>
				</table>
			</div>
		);
		
	}
});

export default GraphScientists;

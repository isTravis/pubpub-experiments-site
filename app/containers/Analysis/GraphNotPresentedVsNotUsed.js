import React, { PropTypes } from 'react';
import AnalysisBarChart from './AnalysisBarChart';
import DataTable from './DataTable';

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
				<DataTable
					groupATitle={'Not Presented'}
					groupBTitle={'Not Used'}
					utils={utils}
					groupABeefTotal={beefStats.mode0All.length}
					groupABeefError={beefStats.mode0FoundError.length}
					groupABeefConclusion={beefStats.mode0FoundConclusion.length}
					groupBBeefTotal={beefStats.nonInteractiveAll.length}
					groupBBeefError={beefStats.nonInteractiveFoundError.length}
					groupBBeefConclusion={beefStats.nonInteractiveFoundConclusion.length}

					groupADinoTotal={dinoStats.mode0All.length}
					groupADinoError={dinoStats.mode0FoundError.length}
					groupADinoConclusion={dinoStats.mode0FoundConclusion.length}
					groupBDinoTotal={dinoStats.nonInteractiveAll.length}
					groupBDinoError={dinoStats.nonInteractiveFoundError.length}
					groupBDinoConclusion={dinoStats.nonInteractiveFoundConclusion.length}

					groupAGovtTotal={govtStats.mode0All.length}
					groupAGovtError={govtStats.mode0FoundError.length}
					groupAGovtConclusion={govtStats.mode0FoundConclusion.length}
					groupBGovtTotal={govtStats.nonInteractiveAll.length}
					groupBGovtError={govtStats.nonInteractiveFoundError.length}
					groupBGovtConclusion={govtStats.nonInteractiveFoundConclusion.length} />
			</div>
		);
	}
});

export default GraphNotPresentedVsNotUsed;

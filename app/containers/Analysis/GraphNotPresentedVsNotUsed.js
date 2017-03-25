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
				'Not Presented - Found Error': govtStats.mode0FoundConclusion.length / govtStats.mode0All.length,
				'Not Presented - Found ErrorError': utils.calcError(govtStats.mode0All.length),
				'Not Used - Found Error': govtStats.nonInteractiveFoundConclusion.length / govtStats.nonInteractiveAll.length,
				'Not Used - Found ErrorError': utils.calcError(govtStats.nonInteractiveAll.length),
				'Not Presented - Found Conclusion': [...beefStats.mode0FoundConclusion, ...dinoStats.mode0FoundConclusion, ...govtStats.mode0FoundConclusion].length / [...beefStats.mode0All, ...dinoStats.mode0All, ...govtStats.mode0All].length,
				'Not Presented - Found ConclusionError': utils.calcError([...beefStats.mode0All, ...dinoStats.mode0All, ...govtStats.mode0All].length),
				'Not Used - Found Conclusion': [...beefStats.nonInteractiveFoundConclusion, ...dinoStats.nonInteractiveFoundConclusion, ...govtStats.nonInteractiveFoundConclusion].length / [...beefStats.nonInteractiveAll, ...dinoStats.nonInteractiveAll, ...govtStats.nonInteractiveAll].length,
				'Not Used - Found ConclusionError': utils.calcError([...beefStats.nonInteractiveAll, ...dinoStats.nonInteractiveAll, ...govtStats.nonInteractiveAll].length),
			},
			{ 
				name: 'All', 
				'Not Presented - Found Error': govtStats.mode0FoundConclusion.length / govtStats.mode0All.length,
				'Not Presented - Found ErrorError': utils.calcError(govtStats.mode0All.length),
				'Not Used - Found Error': govtStats.nonInteractiveFoundConclusion.length / govtStats.nonInteractiveAll.length,
				'Not Used - Found ErrorError': utils.calcError(govtStats.nonInteractiveAll.length),
				'Not Presented - Found Conclusion': [...beefStats.mode0FoundConclusion, ...dinoStats.mode0FoundConclusion, ...govtStats.mode0FoundConclusion].length / [...beefStats.mode0All, ...dinoStats.mode0All, ...govtStats.mode0All].length,
				'Not Presented - Found ConclusionError': utils.calcError([...beefStats.mode0All, ...dinoStats.mode0All, ...govtStats.mode0All].length),
				'Not Used - Found Conclusion': [...beefStats.nonInteractiveFoundConclusion, ...dinoStats.nonInteractiveFoundConclusion, ...govtStats.nonInteractiveFoundConclusion].length / [...beefStats.nonInteractiveAll, ...dinoStats.nonInteractiveAll, ...govtStats.nonInteractiveAll].length,
				'Not Used - Found ConclusionError': utils.calcError([...beefStats.nonInteractiveAll, ...dinoStats.nonInteractiveAll, ...govtStats.nonInteractiveAll].length),
			},
		];

		return <AnalysisBarChart keys={['Not Presented - Found Error', 'Not Used - Found Error', 'Not Presented - Found Conclusion', 'Not Used - Found Conclusion']} data={graphData} title={'Performance vs Non-Interactivity Type'} yaxisLabel={'Percent Users'} />;
		
	}
});

export default GraphNotPresentedVsNotUsed;

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

		return <AnalysisBarChart keys={['Skipped Interactive - Found Error', 'Used Interactive - Found Error', 'Skipped Interactive - Found Conclusion', 'Used Interactive - Found Conclusion']} data={graphData} title={'Performance vs Use of Interactive Figure'} yaxisLabel={'Percent Users'} />;
		
	}
});

export default GraphPresentedVsNotPresented;

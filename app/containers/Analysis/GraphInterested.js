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

		return <AnalysisBarChart keys={['Non-Interested - Found Error', 'Interested - Found Error', 'Non-Interested - Found Conclusion', 'Interested - Found Conclusion']} data={graphData} title={'Performance vs Interest in Topic'} yaxisLabel={'Percent Users'} />;
		
	}
});

export default GraphInterested;

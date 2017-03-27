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

		return <AnalysisBarChart keys={['Has Not Been Reviewed - Found Error', 'Has Been Reviewed - Found Error', 'Has Not Been Reviewed - Found Conclusion', 'Has Been Reviewed - Found Conclusion']} data={graphData} title={'Performance vs Has Been Peer Reviewed'} yaxisLabel={'Percent Users'} />;
		
	}
});

export default GraphHasBeenReviewed;

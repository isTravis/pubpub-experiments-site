import React, { PropTypes } from 'react';
import AnalysisBarChart from './AnalysisBarChart';
import DataTable from './DataTable';

export const GraphHasReviewed = React.createClass({
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
				'Has Not Reviewed - Found Error': beefStats.hasNotReviewedFoundError.length / beefStats.hasNotReviewedAll.length,
				'Has Not Reviewed - Found ErrorError': utils.calcError(beefStats.hasNotReviewedAll.length),
				'Has Reviewed - Found Error': beefStats.hasReviewedFoundError.length / beefStats.hasReviewedAll.length,
				'Has Reviewed - Found ErrorError': utils.calcError(beefStats.hasReviewedAll.length),
				'Has Not Reviewed - Found Conclusion': beefStats.hasNotReviewedFoundConclusion.length / beefStats.hasNotReviewedAll.length,
				'Has Not Reviewed - Found ConclusionError': utils.calcError(beefStats.hasNotReviewedAll.length),
				'Has Reviewed - Found Conclusion': beefStats.hasReviewedFoundConclusion.length / beefStats.hasReviewedAll.length,
				'Has Reviewed - Found ConclusionError': utils.calcError(beefStats.hasReviewedAll.length),
			},
			{ 
				name: 'Dino', 
				'Has Not Reviewed - Found Error': dinoStats.hasNotReviewedFoundError.length / dinoStats.hasNotReviewedAll.length,
				'Has Not Reviewed - Found ErrorError': utils.calcError(dinoStats.hasNotReviewedAll.length),
				'Has Reviewed - Found Error': dinoStats.hasReviewedFoundError.length / dinoStats.hasReviewedAll.length,
				'Has Reviewed - Found ErrorError': utils.calcError(dinoStats.hasReviewedAll.length),
				'Has Not Reviewed - Found Conclusion': dinoStats.hasNotReviewedFoundConclusion.length / dinoStats.hasNotReviewedAll.length,
				'Has Not Reviewed - Found ConclusionError': utils.calcError(dinoStats.hasNotReviewedAll.length),
				'Has Reviewed - Found Conclusion': dinoStats.hasReviewedFoundConclusion.length / dinoStats.hasReviewedAll.length,
				'Has Reviewed - Found ConclusionError': utils.calcError(dinoStats.hasReviewedAll.length),
			},
			{ 
				name: 'Govt', 
				'Has Not Reviewed - Found Error': govtStats.hasNotReviewedFoundError.length / govtStats.hasNotReviewedAll.length,
				'Has Not Reviewed - Found ErrorError': utils.calcError(govtStats.hasNotReviewedAll.length),
				'Has Reviewed - Found Error': govtStats.hasReviewedFoundError.length / govtStats.hasReviewedAll.length,
				'Has Reviewed - Found ErrorError': utils.calcError(govtStats.hasReviewedAll.length),
				'Has Not Reviewed - Found Conclusion': govtStats.hasNotReviewedFoundConclusion.length / govtStats.hasNotReviewedAll.length,
				'Has Not Reviewed - Found ConclusionError': utils.calcError(govtStats.hasNotReviewedAll.length),
				'Has Reviewed - Found Conclusion': govtStats.hasReviewedFoundConclusion.length / govtStats.hasReviewedAll.length,
				'Has Reviewed - Found ConclusionError': utils.calcError(govtStats.hasReviewedAll.length),
			},
			{ 
				name: 'All', 
				'Has Not Reviewed - Found Error': [...beefStats.hasNotReviewedFoundError, ...dinoStats.hasNotReviewedFoundError, ...govtStats.hasNotReviewedFoundError].length / [...beefStats.hasNotReviewedAll, ...dinoStats.hasNotReviewedAll, ...govtStats.hasNotReviewedAll].length,
				'Has Not Reviewed - Found ErrorError': utils.calcError([...beefStats.hasNotReviewedAll, ...dinoStats.hasNotReviewedAll, ...govtStats.hasNotReviewedAll].length),
				'Has Reviewed - Found Error': [...beefStats.hasReviewedFoundError, ...dinoStats.hasReviewedFoundError, ...govtStats.hasReviewedFoundError].length / [...beefStats.hasReviewedAll, ...dinoStats.hasReviewedAll, ...govtStats.hasReviewedAll].length,
				'Has Reviewed - Found ErrorError': utils.calcError([...beefStats.hasReviewedAll, ...dinoStats.hasReviewedAll, ...govtStats.hasReviewedAll].length),
				'Has Not Reviewed - Found Conclusion': [...beefStats.hasNotReviewedFoundConclusion, ...dinoStats.hasNotReviewedFoundConclusion, ...govtStats.hasNotReviewedFoundConclusion].length / [...beefStats.hasNotReviewedAll, ...dinoStats.hasNotReviewedAll, ...govtStats.hasNotReviewedAll].length,
				'Has Not Reviewed - Found ConclusionError': utils.calcError([...beefStats.hasNotReviewedAll, ...dinoStats.hasNotReviewedAll, ...govtStats.hasNotReviewedAll].length),
				'Has Reviewed - Found Conclusion': [...beefStats.hasReviewedFoundConclusion, ...dinoStats.hasReviewedFoundConclusion, ...govtStats.hasReviewedFoundConclusion].length / [...beefStats.hasReviewedAll, ...dinoStats.hasReviewedAll, ...govtStats.hasReviewedAll].length,
				'Has Reviewed - Found ConclusionError': utils.calcError([...beefStats.hasReviewedAll, ...dinoStats.hasReviewedAll, ...govtStats.hasReviewedAll].length),
			},
		];

		return (
			<div>
				<AnalysisBarChart keys={['Has Not Reviewed - Found Error', 'Has Reviewed - Found Error', 'Has Not Reviewed - Found Conclusion', 'Has Reviewed - Found Conclusion']} data={graphData} title={'Performance vs Has Peer Reviewed'} yaxisLabel={'Percent Users'} />
				<DataTable
					groupATitle={'Has Not Reviewed'}
					groupBTitle={'Has Reviewed'}
					utils={utils}
					groupABeefTotal={beefStats.hasNotReviewedAll.length}
					groupABeefError={beefStats.hasNotReviewedFoundError.length}
					groupABeefConclusion={beefStats.hasNotReviewedFoundConclusion.length}
					groupBBeefTotal={beefStats.hasReviewedAll.length}
					groupBBeefError={beefStats.hasReviewedFoundError.length}
					groupBBeefConclusion={beefStats.hasReviewedFoundConclusion.length}

					groupADinoTotal={dinoStats.hasNotReviewedAll.length}
					groupADinoError={dinoStats.hasNotReviewedFoundError.length}
					groupADinoConclusion={dinoStats.hasNotReviewedFoundConclusion.length}
					groupBDinoTotal={dinoStats.hasReviewedAll.length}
					groupBDinoError={dinoStats.hasReviewedFoundError.length}
					groupBDinoConclusion={dinoStats.hasReviewedFoundConclusion.length}

					groupAGovtTotal={govtStats.hasNotReviewedAll.length}
					groupAGovtError={govtStats.hasNotReviewedFoundError.length}
					groupAGovtConclusion={govtStats.hasNotReviewedFoundConclusion.length}
					groupBGovtTotal={govtStats.hasReviewedAll.length}
					groupBGovtError={govtStats.hasReviewedFoundError.length}
					groupBGovtConclusion={govtStats.hasReviewedFoundConclusion.length} />
			</div>
		);
	}
});

export default GraphHasReviewed;

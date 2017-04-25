import React, { PropTypes } from 'react';
import AnalysisBarChart from './AnalysisBarChart';
import DataTable from './DataTable';

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
				<DataTable
					groupATitle={'Non-Scientist'}
					groupBTitle={'Scientist'}
					utils={utils}
					groupABeefTotal={beefStats.nonScientistAll.length}
					groupABeefError={beefStats.nonScientistFoundError.length}
					groupABeefConclusion={beefStats.nonScientistFoundConclusion.length}
					groupBBeefTotal={beefStats.scientistAll.length}
					groupBBeefError={beefStats.scientistFoundError.length}
					groupBBeefConclusion={beefStats.scientistFoundConclusion.length}

					groupADinoTotal={dinoStats.nonScientistAll.length}
					groupADinoError={dinoStats.nonScientistFoundError.length}
					groupADinoConclusion={dinoStats.nonScientistFoundConclusion.length}
					groupBDinoTotal={dinoStats.scientistAll.length}
					groupBDinoError={dinoStats.scientistFoundError.length}
					groupBDinoConclusion={dinoStats.scientistFoundConclusion.length}

					groupAGovtTotal={govtStats.nonScientistAll.length}
					groupAGovtError={govtStats.nonScientistFoundError.length}
					groupAGovtConclusion={govtStats.nonScientistFoundConclusion.length}
					groupBGovtTotal={govtStats.scientistAll.length}
					groupBGovtError={govtStats.scientistFoundError.length}
					groupBGovtConclusion={govtStats.scientistFoundConclusion.length} />
			</div>
		);
		
	}
});

export default GraphScientists;

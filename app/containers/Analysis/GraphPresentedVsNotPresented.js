import React, { PropTypes } from 'react';
import AnalysisBarChart from './AnalysisBarChart';
import DataTable from './DataTable';

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
				<DataTable
					groupATitle={'Non-Interactive'}
					groupBTitle={'Interactive'}
					utils={utils}
					groupABeefTotal={beefStats.mode0All.length}
					groupABeefError={beefStats.mode0FoundError.length}
					groupABeefConclusion={beefStats.mode0FoundConclusion.length}
					groupBBeefTotal={beefStats.mode1All.length}
					groupBBeefError={beefStats.mode1FoundError.length}
					groupBBeefConclusion={beefStats.mode1FoundConclusion.length}

					groupADinoTotal={dinoStats.mode0All.length}
					groupADinoError={dinoStats.mode0FoundError.length}
					groupADinoConclusion={dinoStats.mode0FoundConclusion.length}
					groupBDinoTotal={dinoStats.mode1All.length}
					groupBDinoError={dinoStats.mode1FoundError.length}
					groupBDinoConclusion={dinoStats.mode1FoundConclusion.length}

					groupAGovtTotal={govtStats.mode0All.length}
					groupAGovtError={govtStats.mode0FoundError.length}
					groupAGovtConclusion={govtStats.mode0FoundConclusion.length}
					groupBGovtTotal={govtStats.mode1All.length}
					groupBGovtError={govtStats.mode1FoundError.length}
					groupBGovtConclusion={govtStats.mode1FoundConclusion.length} />
			</div>
		);
	}
});

export default GraphPresentedVsNotPresented;

import React, { PropTypes } from 'react';

export const DataTable = React.createClass({
	propTypes: {
		groupATitle: PropTypes.string,
		groupBTitle: PropTypes.string,
		utils: PropTypes.object,
		groupABeefTotal: PropTypes.number,
		groupABeefError: PropTypes.number,
		groupABeefConclusion: PropTypes.number,
		groupBBeefTotal: PropTypes.number,
		groupBBeefError: PropTypes.number,
		groupBBeefConclusion: PropTypes.number,
		groupADinoTotal: PropTypes.number,
		groupADinoError: PropTypes.number,
		groupADinoConclusion: PropTypes.number,
		groupBDinoTotal: PropTypes.number,
		groupBDinoError: PropTypes.number,
		groupBDinoConclusion: PropTypes.number,
		groupAGovtTotal: PropTypes.number,
		groupAGovtError: PropTypes.number,
		groupAGovtConclusion: PropTypes.number,
		groupBGovtTotal: PropTypes.number,
		groupBGovtError: PropTypes.number,
		groupBGovtConclusion: PropTypes.number,
	},

	render() {
		const utils = this.props.utils;
		return (
			<table className={'table'}>
				<tr className={'table-header'}>
					<td />
					<td>{this.props.groupATitle} <br /><i>Total</i></td>
					<td>{this.props.groupATitle} <br /><i>Success</i></td>
					<td>{this.props.groupBTitle} <br /><i>Total</i></td>
					<td>{this.props.groupBTitle} <br /><i>Success</i></td>
					<td>p-value</td>
				</tr>
				<tr>
					<td>Beef - Found Error</td>
					<td rowSpan={2}>{this.props.groupABeefTotal}</td>
					<td>{this.props.groupABeefError}</td>
					<td rowSpan={2}>{this.props.groupBBeefTotal}</td>
					<td>{this.props.groupBBeefError}</td>
					<td>{utils.calculatePValue(
						this.props.groupABeefTotal,
						this.props.groupABeefError,
						this.props.groupBBeefTotal,
						this.props.groupBBeefError)}
					</td>
				</tr>
				<tr>
					<td>Beef - Found Conclusion</td>
					{/*<td rowSpan={2}>{this.props.groupABeefTotal}</td>*/}
					<td>{this.props.groupABeefConclusion}</td>
					{/*<td rowSpan={2}>{this.props.groupBBeefTotal}</td>*/}
					<td>{this.props.groupBBeefConclusion}</td>
					<td>{utils.calculatePValue(
						this.props.groupABeefTotal,
						this.props.groupABeefConclusion,
						this.props.groupBBeefTotal,
						this.props.groupBBeefConclusion)}
					</td>
				</tr>
				

				<tr>
					<td>Dino - Found Error</td>
					<td rowSpan={2}>{this.props.groupADinoTotal}</td>
					<td>{this.props.groupADinoError}</td>
					<td rowSpan={2}>{this.props.groupBDinoTotal}</td>
					<td>{this.props.groupBDinoError}</td>
					<td>{utils.calculatePValue(
						this.props.groupADinoTotal,
						this.props.groupADinoError,
						this.props.groupBDinoTotal,
						this.props.groupBDinoError)}
					</td>
				</tr>
				<tr>
					<td>Dino - Found Conclusion</td>
					{/*<td rowSpan={2}>{this.props.groupADinoTotal}</td>*/}
					<td>{this.props.groupADinoConclusion}</td>
					{/*<td rowSpan={2}>{this.props.groupBDinoTotal}</td>*/}
					<td>{this.props.groupBDinoConclusion}</td>
					<td>{utils.calculatePValue(
						this.props.groupADinoTotal,
						this.props.groupADinoConclusion,
						this.props.groupBDinoTotal,
						this.props.groupBDinoConclusion)}
					</td>
				</tr>

				<tr>
					<td>Govt - Found Error</td>
					<td rowSpan={2}>{this.props.groupAGovtTotal}</td>
					<td>{this.props.groupAGovtError}</td>
					<td rowSpan={2}>{this.props.groupBGovtTotal}</td>
					<td>{this.props.groupBGovtError}</td>
					<td>{utils.calculatePValue(
						this.props.groupAGovtTotal,
						this.props.groupAGovtError,
						this.props.groupBGovtTotal,
						this.props.groupBGovtError)}
					</td>
				</tr>
				<tr>
					<td>Govt - Found Conclusion</td>
					{/*<td rowSpan={2}>{this.props.groupAGovtTotal}</td>*/}
					<td>{this.props.groupAGovtConclusion}</td>
					{/*<td rowSpan={2}>{this.props.groupBGovtTotal}</td>*/}
					<td>{this.props.groupBGovtConclusion}</td>
					<td>{utils.calculatePValue(
						this.props.groupAGovtTotal,
						this.props.groupAGovtConclusion,
						this.props.groupBGovtTotal,
						this.props.groupBGovtConclusion)}
					</td>
				</tr>

				<tr>
					<td>All - Found Error</td>
					<td rowSpan={2}>{this.props.groupABeefTotal + this.props.groupADinoTotal + this.props.groupAGovtTotal}</td>
					<td>{this.props.groupABeefError + this.props.groupADinoError + this.props.groupAGovtError}</td>
					<td rowSpan={2}>{this.props.groupBBeefTotal + this.props.groupBDinoTotal + this.props.groupBGovtTotal}</td>
					<td>{this.props.groupBBeefError + this.props.groupBDinoError + this.props.groupBGovtError}</td>
					<td>{utils.calculatePValue(
						this.props.groupABeefTotal + this.props.groupADinoTotal + this.props.groupAGovtTotal,
						this.props.groupABeefError + this.props.groupADinoError + this.props.groupAGovtError,
						this.props.groupBBeefTotal + this.props.groupBDinoTotal + this.props.groupBGovtTotal,
						this.props.groupBBeefError + this.props.groupBDinoError + this.props.groupBGovtError)}
					</td>
				</tr>
				<tr>
					<td>All - Found Conclusion</td>
					{/*<td rowSpan={2}>{this.props.groupABeefTotal + this.props.groupADinoTotal + this.props.groupAGovtTotal}</td>*/}
					<td>{this.props.groupABeefConclusion + this.props.groupADinoConclusion + this.props.groupAGovtConclusion}</td>
					{/*<td rowSpan={2}>{this.props.groupBBeefTotal + this.props.groupBDinoTotal + this.props.groupBGovtTotal}</td>*/}
					<td>{this.props.groupBBeefConclusion + this.props.groupBDinoConclusion + this.props.groupBGovtConclusion}</td>
					<td>{utils.calculatePValue(
						this.props.groupABeefTotal + this.props.groupADinoTotal + this.props.groupAGovtTotal,
						this.props.groupABeefConclusion + this.props.groupADinoConclusion + this.props.groupAGovtConclusion,
						this.props.groupBBeefTotal + this.props.groupBDinoTotal + this.props.groupBGovtTotal,
						this.props.groupBBeefConclusion + this.props.groupBDinoConclusion + this.props.groupBGovtConclusion)}
					</td>
				</tr>
			</table>
		);
	}
});

export default DataTable;

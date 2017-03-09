import React, { PropTypes } from 'react';
import Radium from 'radium';
import { Button } from '@blueprintjs/core';

let styles;

export const Terms = React.createClass({
	propTypes: {
		query: PropTypes.object,
		onComplete: PropTypes.func,
		assignmentId: PropTypes.string,
	},

	render() {

		return (
			<div style={styles.container}>
				<h1>Overview</h1>
				
				<p style={styles.text}>We ask you to evaluate a short scientific study. The article should take about 5 minutes to read and has one figure.</p>
				{this.props.query.turkSubmitTo &&
					<div className={'pt-callout'}><b>You must live in the US and hold an undergraduate degree to have this HIT accepted.</b></div>
				}
				<p style={styles.text}>There may be errors in the logic used and conclusions reached. We ask you to assume the role of a peer-reviewing scientist. You will be asked to provide critique, calling into question the logic and methods the authors used to reach their conclusions.</p>
				<p style={styles.text}>After submitting your review, we present a short survey.</p>
				<p style={styles.text}>The submitted review and survey data will be used as experimental data for the study. Your answers are completely anonymous.</p>
				<p style={styles.text}>Clicking the button below acknowledges that you have read these instructions and accept the terms of this task (review and survey). Please click below to begin!</p>

				<Button 
					className={'pt-button pt-intent-primary'} 
					onClick={this.props.onComplete} 
					disabled={this.props.assignmentId === 'ASSIGNMENT_ID_NOT_AVAILABLE'}
					text={this.props.assignmentId === 'ASSIGNMENT_ID_NOT_AVAILABLE' ? 'Please accept HIT on Amazon first' : 'Accept Terms and Begin'} />
			</div>
		);
	}

});

export default Radium(Terms);

styles = {
	container: {
		maxWidth: '800px',
		margin: '0 auto',
	},
	text: {
		lineHeight: '1.6',
		fontSize: '1.2em',
		margin: '1em 0em',
	}

};

import React, { PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button, NonIdealState, Spinner } from '@blueprintjs/core';
import { getResults, putResult } from './actions';

let styles;

export const Results = React.createClass({
	propTypes: {
		resultsData: PropTypes.object,
		params: PropTypes.object,
		dispatch: PropTypes.func,
	},

	getInitialState() {
		return {
			index: 0,
			focus: 0,
			identifiedError: null,
			identifiedConclusion: null,
		};
	},
	
	componentWillMount() {
		const params = this.props.params || {};
		if (params.mode) {
			this.props.dispatch(getResults(params.mode));	
		}
		
	},
	componentDidMount() {
		window.addEventListener("keypress", this.keyPress);
	},

	componentWillUnmount() {
		window.removeEventListener("keypress", this.keyPress);
	},

	componentWillReceiveProps(nextProps) {
		const lastParams = this.props.params || {};
		const nextParams = nextProps.params || {};
		if (!lastParams.mode && nextParams.mode) {
			this.props.dispatch(getResults(nextParams.mode));	
		}
		const lastPutLoading = this.props.resultsData.putLoading;
		const nextPutLoading = nextProps.resultsData.putLoading;
		const nextPutError = nextProps.resultsData.putError;
		if (lastPutLoading && !nextPutLoading && !nextPutError) {
			this.setState({
				index: this.state.index + 1,
				focus: 0,
				identifiedError: null,
				identifiedConclusion: null,
			});
		}
	},

	putResult: function() {
		const params = this.props.params || {};
		// this.props.dispatch(getResults(params.mode, this.state.identifiedError, this.state.identifiedConclusion));
		this.setState({
			index: this.state.index + 1,
			focus: 0,
			identifiedError: null,
			identifiedConclusion: null,
		})
	},
	
	incrementIndex: function() {
		this.props.dispatch(putResult(this.props.params.mode, this.props.resultsData.results[this.state.index].id, this.state.identifiedError, this.state.identifiedConclusion));
	},

	setIdentifiedError: function() {
		if (this.state.identifiedError === null) {
			this.setState({ identifiedError: false })
		}
		if (this.state.identifiedError === false) {
			this.setState({ identifiedError: true })
		}
		if (this.state.identifiedError === true) {
			this.setState({ identifiedError: null })
		}
	},

	setIdentifiedConclusion: function() {
		if (this.state.identifiedConclusion === null) {
			this.setState({ identifiedConclusion: false })
		}
		if (this.state.identifiedConclusion === false) {
			this.setState({ identifiedConclusion: true })
		}
		if (this.state.identifiedConclusion === true) {
			this.setState({ identifiedConclusion: null })
		}
	},

	keyPress: function(evt) {
		if (this.state.focus === 0 && evt.key === 'f') {
			return this.setState({
				identifiedError: false,
				focus: 1,
			});
		}
		if (this.state.focus === 0 && evt.key === 't') {
			return this.setState({
				identifiedError: true,
				focus: 1,
			});
		}
		if (this.state.focus === 1 && evt.key === 'f') {
			return this.setState({
				identifiedConclusion: false,
				focus: 0,
			});
		}
		if (this.state.focus === 1 && evt.key === 't') {
			return this.setState({
				identifiedConclusion: true,
				focus: 0,
			});
		}
		if (evt.key === 'Enter') {
			return this.incrementIndex();
		}
		
	},

	render() {
		const results = this.props.resultsData.results || [];
		const params = this.props.params || {};
		if (this.props.resultsData.loading) {
			return (
				<div style={[styles.container, styles.complete]}>
					<Spinner />
				</div>
			);
		}
		if (!params.mode) {
			return (
				<div style={styles.container}>
					<h2>Results</h2>
					<div style={styles.wrapper}>
						<Link to={'results/dino'}>Dino</Link>
					</div>
					<div style={styles.wrapper}>
						<Link to={'results/beef'}>Beef</Link>
					</div>
					<div style={styles.wrapper}>
						<Link to={'results/govt'}>Government</Link>
					</div>
				</div>
			);
		}

		if (results.length && results.length === this.state.index) {
			return (
				<div style={[styles.container, styles.complete]}>
					<NonIdealState 
						title={'All Rows Set'}
						visual={'endorsed'} 
					/>
				</div>
			);
		}

		if (results.length) {
			return (
				<div style={styles.container}>
					<div style={styles.title}>Review</div>
					<div style={styles.content}>{results[this.state.index].reviewContent}</div>

					<div style={styles.title}>Feedback</div>
					<div style={styles.content}>{results[this.state.index].feedback}</div>

					<div>
						<span style={styles.title}>Time: </span>
						<span style={styles.content}>{results[this.state.index].timeOnReview}s</span>
					</div>
					
					<div style={styles.inputTable}>
						<div style={styles.inputWrapper}>
							<div onClick={this.setIdentifiedError} style={[styles.input, this.state.identifiedError === false && styles.inputFalse, this.state.identifiedError === true && styles.inputTrue]}>Found Error</div>
						</div>
						<div style={styles.inputWrapper}>
							<div onClick={this.setIdentifiedConclusion} style={[styles.input, this.state.identifiedConclusion === false && styles.inputFalse, this.state.identifiedConclusion === true && styles.inputTrue]}>Found Conclusion</div>
						</div>
						<div style={styles.tableRow}>
							<div style={styles.arrowWrapper}>
								{this.state.focus === 0 &&
									<span className={'pt-icon pt-standard pt-icon-chevron-up'} />
								}
							</div>
							<div style={styles.arrowWrapper}>
								{this.state.focus === 1 &&
									<span className={'pt-icon pt-standard pt-icon-chevron-up'} />
								}
							</div>
						</div>
					</div>

					<Button className={'pt-button pt-fill'} onClick={this.incrementIndex} loading={this.props.resultsData.putLoading}>Next</Button>
				</div>
			);
		}

		return null;
		
	}
});

function mapStateToProps(state) {
	return {
		resultsData: state.results.toJS(),
	};
}

export default connect(mapStateToProps)(Radium(Results));

styles = {
	container: {
		maxWidth: '800px',
		margin: '0em auto',
	},
	complete: {
		margin: '3em auto',
		textAlign: 'center',
	},
	wrapper: {
		fontSize: '1.25em',
		padding: '0.5em 0em',
	},
	inputTable: {
		display: 'table',
		width: '100%',
		margin: '2em 0em',
	},
	inputWrapper: {
		display: 'table-cell',
		padding: '1em',
		textAlign: 'center',
		width: '50%',
	},
	arrowWrapper: {
		display: 'table-cell',
		textAlign: 'center',
		width: '50%',
	},
	tableRow: {
		display: 'table-row',
	},
	input: {
		cursor: 'pointer',
		padding: '2em 0em',
		backgroundColor: '#ddd',
		userSelect: 'none',
	},
	inputFalse: {
		backgroundColor: '#f1c3c3',
	},
	inputTrue: {
		backgroundColor: '#b0deaa',
	},
	title: {
		fontSize: '1.2em',
		fontWeight: 'bold',
	},
	content: {
		fontSize: '1.2em',
		paddingBottom: '2em',
	},

};

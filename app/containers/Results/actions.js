/*--------*/
// Define Action types
//
// All action types are defined as constants. Do not manually pass action
// types as strings in action creators
/*--------*/
export const GET_RESULTS_LOAD = 'results/GET_RESULTS_LOAD';
export const GET_RESULTS_SUCCESS = 'results/GET_RESULTS_SUCCESS';
export const GET_RESULTS_FAIL = 'results/GET_RESULTS_FAIL';

export const PUT_RESULT_LOAD = 'results/PUT_RESULT_LOAD';
export const PUT_RESULT_SUCCESS = 'results/PUT_RESULT_SUCCESS';
export const PUT_RESULT_FAIL = 'results/PUT_RESULT_FAIL';

/*--------*/
// Define Action creators
//
// All calls to dispatch() call one of these functions. Do not manually create
// action objects (e.g. {type:example, payload:data} ) within dispatch()
// function calls
/*--------*/
export function getResults(mode) {
	return (dispatch) => {
		dispatch({ type: GET_RESULTS_LOAD });

		return clientFetch(`/api/results?data=${mode}`, {
			method: 'GET'
		})
		.then((result) => {
			dispatch({ type: GET_RESULTS_SUCCESS, result });
		})
		.catch((error) => {
			console.log(error);
			Raven.captureException(JSON.stringify(error));
			dispatch({ type: GET_RESULTS_FAIL, error });
		});
	};
}

export function putResult(data, rowId, identifiedError, identifiedConclusion) {
	return (dispatch) => {
		dispatch({ type: PUT_RESULT_LOAD });

		return clientFetch('/api/results', {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				data: data,
				rowId: rowId,
				identifiedError: identifiedError,
				identifiedConclusion: identifiedConclusion
			})
		})
		.then((result) => {
			dispatch({ type: PUT_RESULT_SUCCESS, result });
		})
		.catch((error) => {
			Raven.captureException(JSON.stringify(error));
			dispatch({ type: PUT_RESULT_FAIL, error });
		});
	};
}

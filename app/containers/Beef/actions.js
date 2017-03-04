/*--------*/
// Define Action types
//
// All action types are defined as constants. Do not manually pass action
// types as strings in action creators
/*--------*/
export const POST_EXPERIMENT_LOAD = 'beef/POST_EXPERIMENT_LOAD';
export const POST_EXPERIMENT_SUCCESS = 'beef/POST_EXPERIMENT_SUCCESS';
export const POST_EXPERIMENT_FAIL = 'beef/POST_EXPERIMENT_FAIL';

export const GET_UNIQUE_WORKER_LOAD = 'beef/GET_UNIQUE_WORKER_LOAD';
export const GET_UNIQUE_WORKER_SUCCESS = 'beef/GET_UNIQUE_WORKER_SUCCESS';
export const GET_UNIQUE_WORKER_FAIL = 'beef/GET_UNIQUE_WORKER_FAIL';

/*--------*/
// Define Action creators
//
// All calls to dispatch() call one of these functions. Do not manually create
// action objects (e.g. {type:example, payload:data} ) within dispatch()
// function calls
/*--------*/
export function submitExperiment(experimentData) {
	return (dispatch) => {
		dispatch({ type: POST_EXPERIMENT_LOAD });

		return clientFetch('/api/beef', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				...experimentData
			})
		})
		.then((result) => {
			dispatch({ type: POST_EXPERIMENT_SUCCESS, result });
		})
		.catch((error) => {
			console.log(error);
			Raven.captureException(JSON.stringify(error));
			dispatch({ type: POST_EXPERIMENT_FAIL, error });
		});
	};
}

export function checkUniqueWorker(workerId) {
	return (dispatch) => {
		dispatch({ type: GET_UNIQUE_WORKER_LOAD });

		return clientFetch(`/api/beef?workerId=${workerId}`, {
			method: 'GET'
		})
		.then((result) => {
			dispatch({ type: GET_UNIQUE_WORKER_SUCCESS, result });
		})
		.catch((error) => {
			Raven.captureException(JSON.stringify(error));
			dispatch({ type: GET_UNIQUE_WORKER_FAIL, error });
		});
	};
}

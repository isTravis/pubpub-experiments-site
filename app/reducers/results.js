import Immutable from 'immutable';
import { ensureImmutable } from './index';

/* ---------- */
// Load Actions
/* ---------- */
import {
	GET_RESULTS_LOAD,
	GET_RESULTS_SUCCESS,
	GET_RESULTS_FAIL,

	PUT_RESULT_LOAD,
	PUT_RESULT_SUCCESS,
	PUT_RESULT_FAIL,
} from 'containers/Results/actions';

/* ------------------- */
// Define Default State
/* ------------------- */
const defaultState = Immutable.Map({
	loading: false,
	error: undefined,
	results: [],
	putLoading: false,
	putError: undefined,
});

/* ----------------------------------------- */
// Bind actions to specific reducing functions
/* ----------------------------------------- */
export default function reducer(state = defaultState, action) {
	switch (action.type) {
	
	case GET_RESULTS_LOAD:
		return state.merge({
			loading: true,
			error: undefined,
		});	
	case GET_RESULTS_SUCCESS:
		return state.merge({
			loading: false,
			error: undefined,
			results: action.result,
		});	
	case GET_RESULTS_FAIL:
		return state.merge({
			loading: false,
			error: action.error,
		});	

	case PUT_RESULT_LOAD:
		return state.merge({
			putLoading: true,
			putError: undefined,
		});	
	case PUT_RESULT_SUCCESS:
		return state.merge({
			putLoading: false,
			putError: undefined,
		});	
	case PUT_RESULT_FAIL:
		return state.merge({
			putLoading: false,
			putError: action.error,
		});	

	default:
		return ensureImmutable(state);
	}

}

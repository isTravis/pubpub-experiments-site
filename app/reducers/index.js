import Immutable from 'immutable';
import { combineReducers } from 'redux';
import beef from './beef';
import dino from './dino';
import govt from './govt';
import results from './results';

export function ensureImmutable(state) {
	// For some reason the @@INIT action is receiving a state variable that is a regular object.
	// If that's the case, cast it to Immutable and keep chugging.
	// If the @@INIT weirdness can be solved, we can remove this function.
	let output;
	if (!Immutable.Iterable.isIterable(state)) {
		output = Immutable.fromJS(state);
	} else {
		output = state;
	}
	return output;
}

export default combineReducers({
	beef,
	dino,
	govt,
	results,
});

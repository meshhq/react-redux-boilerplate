import { Reducer, AnyAction } from 'redux';

export interface UserState { }

const defaultState: UserState = {}

function user(state = defaultState, action: AnyAction): UserState {
	switch (action.type) {
		default:
			return state
	}
}

export default user

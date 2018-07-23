import { Reducer, AnyAction } from 'redux'

export interface IUserState { }

const defaultState: IUserState = {}

function user(state = defaultState, action: AnyAction): IUserState {
	switch (action.type) {
		default:
			return state
	}
}

export default user

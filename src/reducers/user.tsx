export interface UserState { }

const defaultState: UserState = {}

function user(state = defaultState, action: any) {
	switch (action.type) {
		default:
			return state
	}
}

export default user

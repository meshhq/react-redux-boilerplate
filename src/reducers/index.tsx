import { combineReducers } from 'redux'

import user, { IUserState } from './user'

export interface IRootReducerState {
	user: IUserState,
}

const app = combineReducers({
	user,
})

export default app

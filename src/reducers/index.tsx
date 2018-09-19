import { combineReducers } from 'redux'

import user, { IUserState } from './user'
import organization, { IOrganizationState } from './organization'

export interface IRootReducerState {
	user: IUserState,
	organization: IOrganizationState,
}

const app = combineReducers({
	user,
	organization,
})

export default app

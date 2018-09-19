import { AnyAction } from 'redux'
import {
	ILoginUserAction,
	IRegisteredUserAction,
	AUTHENTICATED_USER,
	CLEAR_USER,
	LOGIN_USER_COMPLETE,
	REGISTERED_USER,
} from '../actions/organization'

export interface IOrganizationState {
	name: string,
	id?: number, // ask if should be optional
}

const defaultState: IOrganizationState = {
	name: '',
}

function organization(state = defaultState, action: AnyAction): IOrganizationState {
	let typedAction
	switch (action.type) {
		case CREATE_ORGANIZATION:
			return Object.assign({}, state, {
				isLoggedIn: true,
			})
		case UPDATE_ORGANIZATION:
			return Object.assign({}, state, defaultState)
		case DELETE_ORGANIZATION:
			typedAction = action as ILoginUserAction
			return Object.assign({}, state, {
				isLoggedIn: true,
				user: typedAction.user,
			})
		case REGISTERED_USER:
			typedAction = action as IRegisteredUserAction
			return Object.assign({}, state, {
				isLoggedIn: true,
				user: typedAction.user,
			})
		default:
			return state
	}
}

export default organization

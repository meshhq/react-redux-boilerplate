import { AnyAction } from 'redux'
import {
	ILoginUserAction,
	IRegisteredUserAction,
	AUTHENTICATED_USER,
	CLEAR_USER,
	LOGIN_USER_COMPLETE,
	REGISTERED_USER,
} from '../actions/user'

export interface IUserState {
	isLoggedIn: boolean,
	user: any,
}

const defaultState: IUserState = {
	isLoggedIn: false,
	user: null,
}

function user(state = defaultState, action: AnyAction): IUserState {
	let typedAction
	switch (action.type) {
		case AUTHENTICATED_USER:
			return Object.assign({}, state, {
				isLoggedIn: true,
			})
		case CLEAR_USER:
			return Object.assign({}, state, defaultState)
		case LOGIN_USER_COMPLETE:
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

export default user

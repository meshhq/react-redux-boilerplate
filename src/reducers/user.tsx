import { AnyAction } from 'redux'
import {
	ILoginUserAction,
	IRegisteredUserAction,
	AUTHENTICATED_USER,
	CLEAR_USER,
	LOGIN_USER_COMPLETE,
	REGISTERED_USER,
} from '../actions/user'

export interface IUser {
	id?: number
	firstName: string
	lastName: string
	email: string
	isLoggedIn: boolean
}

export interface IUserState {
	user: IUser
	users: IUser[]

}

const defaultState: IUserState = {
	user: null,
	users: [],
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

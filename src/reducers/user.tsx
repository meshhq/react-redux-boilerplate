import { AnyAction } from 'redux'
import * as userAction from '../actions/user'

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
		case userAction.FETCHED_USERS:
		const fetchTypedAction = action as userAction.IFetchedUsersAction
		return {
				...state,
				users: fetchTypedAction.users
			}
		case userAction.AUTHENTICATED_USER:
			return Object.assign({}, state, {
				isLoggedIn: true,
			})
		case userAction.CLEAR_USER:
			return Object.assign({}, state, defaultState)
		case userAction.LOGIN_USER_COMPLETE:
			typedAction = action as userAction.ILoginUserAction
			return Object.assign({}, state, {
				isLoggedIn: true,
				user: typedAction.user,
			})
		case userAction.REGISTERED_USER:
			typedAction = action as userAction.IRegisteredUserAction
			return Object.assign({}, state, {
				isLoggedIn: true,
				user: typedAction.user,
			})
		default:
			return state
	}
}

export default user

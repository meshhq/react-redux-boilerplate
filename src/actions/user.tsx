import { ActionCreatorsMapObject, ActionCreator, Dispatch, Action } from 'redux'
import * as URI from 'urijs'

// API Helpers
import { POST } from '../helpers/api'

export const REGISTERING_USER = 'REGISTERING_USER'
export const REGISTERED_USER = 'REGISTERED_USER'

export const AUTHENTICATING_USER = 'AUTHENTICATING_USER'
export const AUTHENTICATED_USER = 'AUTHENTICATED_USER'

// -----------------------------------------------------------------------------
// User Registration
// -----------------------------------------------------------------------------

/**
 * Registers a new user via a call to the `/register` API.
 * @param email The email supplied in the registration form.
 * @param password The password supplied in the registration form.
 */
const registerUser = (email: string, password: string) => (dispatch: Dispatch<IRegisteredUserAction>) => {
	const userPayload = { email, password }
	return POST('/register', userPayload).then((response: Response) => {
		dispatch(registeredUser(response))
	}).catch((err) => Promise.reject(err))
}

/**
 * Builds a `RegisteredUserAction` upon successful registration.
 * @param response The response from the register API call.
 * @return The `RegisteredUserAction` instance.
 */
const registeredUser = (response: Response): IRegisteredUserAction => {
	const action: IRegisteredUserAction = {
		receivedAt: Date.now(),
		type: REGISTERED_USER,
		users: response,
	}
	return action
}

/**
 * RegisteredUserAction is dispatched after a user has been registered.
 */
interface IRegisteredUserAction extends Action {
	type: string,
	users: any,
	receivedAt: number
}

// -----------------------------------------------------------------------------
// User Login
// -----------------------------------------------------------------------------

/**
 * Logs in an existing user via a call to the `/login` API.
 * @param email The email supplied in the login form.
 * @param password The password supplied in the login form.
 */
const authenticateUser = (email: string, password: string) => (dispatch: Dispatch<IAuthenticatedUserAction>) => {
	const userPayload = { email, password }
	return POST('/login', userPayload).then((response: Response) => {
		dispatch(authenticatedUser(response))
	}).catch((err) => Promise.reject(err))
}

/**
 * Builds an `AuthenticatedUserAction` upon successful login.
 * @param response The response from the login API call.
 * @return The `RegisteredUserAction` instance.
 */
const authenticatedUser = (response: Response): IAuthenticatedUserAction => {
	const action: IAuthenticatedUserAction = {
		receivedAt: Date.now(),
		type: AUTHENTICATED_USER,
		users: response,
	}
	return action
}

/**
 * AuthenticatedUserAction is dispatched after a user has been authenticated.
 */
interface IAuthenticatedUserAction extends Action {
	type: string,
	users: any,
	receivedAt: number
}

/**
 * Defines the interface for our UserAction object.
 */
export interface UserDispatch extends ActionCreatorsMapObject {
	registerUser(email: string, password: string): (dispatch: Dispatch<IRegisteredUserAction>) => Promise<void>
	registeredUser(response: Response): IRegisteredUserAction
	authenticateUser(email: string, password: string): (dispatch: Dispatch<IAuthenticatedUserAction>) => Promise<void>
	authenticatedUser(response: Response): IAuthenticatedUserAction
}

export const UserActions: UserDispatch = {
	authenticateUser,
	authenticatedUser,
	registerUser,
	registeredUser,
}

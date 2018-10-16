import { ActionCreatorsMapObject, Dispatch, Action } from 'redux'
import { IUser } from '../reducers/user'

// API Helpers
import * as api from '../helpers/api'

// Types
export const FETCHED_USERS = 'FETCH_USERS'

export const CREATE_USER   = 'CREATE_USER'
export const CREATED_USER  = 'CREATED_USER'

export const UPDATE_USER   = 'UPDATE_USER'
export const UPDATED_USER  = 'UPDATED_USER'

export const DELETE_USER   = 'DELETE_USER'
export const DELETED_USER  = 'DELETED_USER'

export const REGISTERING_USER = 'REGISTERING_USER'
export const REGISTERED_USER = 'REGISTERED_USER'

export const AUTHENTICATING_USER = 'AUTHENTICATING_USER'
export const AUTHENTICATED_USER = 'AUTHENTICATED_USER'

export const LOGIN_USER = 'LOGIN_USER'
export const LOGIN_USER_COMPLETE = 'LOGIN_USER_COMPLETE'

export const CLEAR_USER = 'CLEAR_USER'

// -----------------------------------------------------------------------------
// GET Users
// -----------------------------------------------------------------------------

/**
 * Gets all users via a call to the `/users` API.
 */
const fetchUsers = () => (dispatch: Dispatch<IFetchedUsersAction>) => {
	return api.GET('/users', {})
	.then((users: IUser[]) => {dispatch(fetchedUsers(users))})
	.catch((err: Error) => {
		// tslint:disable-next-line:no-console
		console.log('Error during fetching users.', err)
	})
}

/**
 * Builds an `IFetchedUSersAction ` upon successful fetch.
 * @param users The response from the users API call.
 * @return The `FetchedUsersAction` instance.
 */
const fetchedUsers = (users: IUser[]): IFetchedUsersAction => {
	const action: IFetchedUsersAction = {
		type: FETCHED_USERS,
		users: users,
	}
	return action
}

/**
 * IFetchedUsersAction is dispatched after users are fethed.
 */
export interface IFetchedUsersAction extends Action {
	type: string,
	users: IUser[],
}

// -----------------------------------------------------------------------------
// Create user
// -----------------------------------------------------------------------------

/**
 * Creates a new user via a call to the `/users` API.
 * @param id Auto-assigned id number.
 * @param firstName The name supplied in the user form.
 * @param lastName The name supplied in the user form.
 * @param email The email provided in the user form
 */
const createUser = ( firstName: string, lastName: string, email: string ) => (dispatch: Dispatch<ICreatedUserAction>) => {
	const userPayload = { firstName, lastName, email }
	return api.POST('/users', userPayload)
		.then((user: IUser) => {dispatch(createdUser(user))})
		.catch((err: Error) => {
			console.log('Error during creating an user.', err) // tslint:disable-line:no-console
		})
}

/**
 * Builds a `CreatedUserAction` upon successful creation.
 * @param user The response from the users API call.
 * @return The `CreatedUserAction` instance.
 */
const createdUser = (user: IUser): ICreatedUserAction => {
	const action: ICreatedUserAction = {
		receivedAt: Date.now(),
		type: CREATED_USER,
		user: user,
	}
	return action
}

/**
 * ICreatedUserAction is dispatched after user has been created.
 */
export interface ICreatedUserAction extends Action {
	type: string,
	user: IUser,
	receivedAt: number
}

// -----------------------------------------------------------------------------
// Update user
// -----------------------------------------------------------------------------

/**
 * Updates user via a call to the `/users` API.
 * @param firstName Name supplied in user form.
 * @param lastName Last name supplied in user form.
 * @param email Email supplied in user form.
 */
const updateUser = ( userID: number, firstName: string, lastName: string, email: string ) => (dispatch: Dispatch<IUpdatedUserAction>) => {
	const userPayload = { firstName, lastName, email }
	return api.PUT(`/users/${userID}`, userPayload)
	.then((user: IUser) => { dispatch(updatedUser(user))})
	.catch((err: Error) => {
		console.log('Error during user update.', err) // tslint:disable-line:no-console
	})
}

/**
 * Builds an `UpdatedUserAction` upon successful creation.
 * @param user The response from the users API call.
 * @return The `UpdatedUserAction` instance.
 */
const updatedUser = (user: IUser): IUpdatedUserAction => {
	const action: IUpdatedUserAction = {
		receivedAt: Date.now(),
		type: UPDATED_USER,
		user: user,
	}
	return action
}

/**
 * IUpdatedUserAction is dispatched after user has been updated.
 */
export interface IUpdatedUserAction extends Action {
	user: IUser,
	receivedAt: number
	type: string,
}

// -----------------------------------------------------------------------------
// Delete user
// -----------------------------------------------------------------------------

/**
 * Deletes user via a call to the `/user` API.
 * @param user The user to be deleted.
 * @param userID The id of the user to be deleted.
 */
const deleteUser = ( userID: number ) => (dispatch: Dispatch<IDeletedUserAction>) => {
	return api.DELETE(`/users/${userID}`, {})
	.then(() => {dispatch(deletedUser(userID))})
	.catch((err: Error) => {
		console.log('Error during user delete.', err) // tslint:disable-line:no-console
	})
}

const deletedUser = ( userID: number ): IDeletedUserAction => {
	const action: IDeletedUserAction = {
		receivedAt: Date.now(),
		type: DELETED_USER,
		userID: userID,
	}
	return action
}

/**
 * IDeletedUserAction is dispatched after user has been deleted.
 */
export interface IDeletedUserAction extends Action {
	userID: number,
	receivedAt: number
	type: string,
}

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
	return api.POST('/register', userPayload).then((response: Response) => {
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
		user: response,
	}
	return action
}

/**
 * RegisteredUserAction is dispatched after a user has been registered.
 */
export interface IRegisteredUserAction extends Action {
	type: string,
	user: any,
	receivedAt: number
}

// -----------------------------------------------------------------------------
// Authenticate User
// -----------------------------------------------------------------------------

/**
 * Called when the user has been successfully authenticated
 */
const authenticateUser = () => (dispatch: Dispatch<Action>) => {
		dispatch(authenticatedUser())
}

const authenticatedUser = (): Action => {
	const action: Action = {
		type: AUTHENTICATED_USER,
	}
	return action
}

// -----------------------------------------------------------------------------
// User Login
// -----------------------------------------------------------------------------

/**
 * Logs in an existing user via a call to the `/login` API.
 * @param email The email supplied in the login form.
 * @param password The password supplied in the login form.
 */
const loginUser = (email: string, password: string) => (dispatch: Dispatch<ILoginUserAction>) => {
	const userPayload = { email, password }
	return api.POST('/login', userPayload).then((response: Response) => {
		dispatch(loginUserComplete(response))
	}).catch((err) => Promise.reject(err))
}

/**
 * Builds an `AuthenticatedUserAction` upon successful login.
 * @param response The response from the login API call.
 * @return The `RegisteredUserAction` instance.
 */
const loginUserComplete = (response: Response): ILoginUserAction => {
	const action: ILoginUserAction = {
		receivedAt: Date.now(),
		type: LOGIN_USER_COMPLETE,
		user: response,
	}
	return action
}

/**
 * ILoginUserAction is dispatched after a user has been logged in.
 */
export interface ILoginUserAction extends Action {
	type: string,
	user: any,
	receivedAt: number
}

// -----------------------------------------------------------------------------
// Clear User
// -----------------------------------------------------------------------------

const clearUser = () => (dispatch: Dispatch<Action>) => {
	dispatch(clearedUser())
}

const clearedUser = (): Action => {
	const action = {
		type: CLEAR_USER,
	}
	return action
}

/**
 * Defines the interface for our UserAction object.
 */
export interface UserDispatch extends ActionCreatorsMapObject {
	fetchUsers(): (dispatch: Dispatch<IFetchedUsersAction>) => Promise<void>
	fetchedUsers(users: IUser[]): IFetchedUsersAction
	authenticateUser(): (dispatch: Dispatch<Action>) => void
	authenticatedUser(): Action
	clearUser(): (dispatch: Dispatch<Action>) => void
	clearedUser(): Action
	loginUser(email: string, password: string): (dispatch: Dispatch<ILoginUserAction>) => Promise<void>
	loginUserComplete(response: Response): ILoginUserAction
	registerUser(email: string, password: string): (dispatch: Dispatch<IRegisteredUserAction>) => Promise<void>
	registeredUser(response: Response): IRegisteredUserAction
	createUser(firstName: string, lastName: string, email: string): (dispatch: Dispatch<ICreatedUserAction>) => Promise<void>
	createdUser(user: IUser): ICreatedUserAction
	deleteUser(userID: number): (dispatch: Dispatch<IDeletedUserAction>) => Promise<void>
	deletedUser(userID: number): IDeletedUserAction
	updateUser( userID: number, firstName: string, lastName: string, email: string ): (dispatch: Dispatch<IUpdatedUserAction>) => Promise<void>
	updatedUser(user: IUser): IUpdatedUserAction
}

export const UserActions: UserDispatch = {
	authenticateUser,
	authenticatedUser,
	clearUser,
	clearedUser,
	createUser,
	createdUser,
	deleteUser,
	deletedUser,
	fetchUsers,
	fetchedUsers,
	loginUser,
	loginUserComplete,
	registerUser,
	registeredUser,
	updateUser,
	updatedUser,
}

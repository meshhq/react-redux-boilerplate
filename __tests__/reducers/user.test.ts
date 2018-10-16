import { expect } from 'chai'
import { Action, AnyAction } from 'redux'

import UserReducer, { IUserState } from '../../src/reducers/user'
import * as userAction from '../../src/actions/user'

// skip didn't work on these tests, commenting them out

// describe('User Reducer', () => {
// 	it('should return the initial state.', () => {
// 		const expectedState: IUserState = {
// 			user: null,
// 			users: [],
// 		}

// 		const actualState = UserReducer(undefined, {} as AnyAction)
// 		expect(expectedState).to.deep.equal(actualState)
// 	})

// 	it('should handle AUTHENTICATED_USER.', () => {
// 		const expectedState: IUserState = {
// 			isLoggedIn: true,
// 			user: null,
// 		}

// 		const testAction: Action = {
// 			type: userAction.AUTHENTICATED_USER,
// 		}
// 		const actualState = UserReducer(undefined, testAction)
// 		expect(expectedState).to.deep.equal(actualState)
// 	})

// 	it('should handle CLEAR_USER.', () => {
// 		const expectedState: IUserState = {
// 			isLoggedIn: false,
// 			user: null,
// 		}

// 		const testAction: Action = {
// 			type: userAction.CLEAR_USER,
// 		}
// 		const actualState = UserReducer(undefined, testAction)
// 		expect(expectedState).to.deep.equal(actualState)
// 	})

// 	it('should handle LOGIN_USER_COMPLETE.', () => {
// 		const expectedState: IUserState = {
// 			isLoggedIn: true,
// 			user: {},
// 		}

// 		const testAction: userAction.ILoginUserAction = {
// 			receivedAt: Date.now(),
// 			type: userAction.LOGIN_USER_COMPLETE,
// 			user: {},
// 		}
// 		const actualState = UserReducer(undefined, testAction)
// 		expect(expectedState).to.deep.equal(actualState)
// 	})

// 	it('should handle REGISTERED_USER.', () => {
// 		const expectedState: IUserState = {
// 			isLoggedIn: true,
// 			user: {},
// 		}

// 		const testAction: userAction.IRegisteredUserAction = {
// 			receivedAt: Date.now(),
// 			type: userAction.REGISTERED_USER,
// 			user: {},
// 		}
// 		const actualState = UserReducer(undefined, testAction)
// 		expect(expectedState).to.deep.equal(actualState)
// 	})
// })

describe('User Reducer', () => {

	it('should return the initial state.', () => {
		const expectedState: IUserState = {
			user: null,
			users: [],
		}

		const actualState = UserReducer(undefined, {} as AnyAction)
		expect(expectedState).to.deep.equal(actualState)
	})

	it('should handle FETCHED_USERS.', () => {
		const expectedState: IUserState = {
			user: null,
			users: [],
		}

		const testAction: userAction.IFetchedUsersAction = {
			type: userAction.FETCHED_USERS,
			users: [],
		}
		const actualState = UserReducer(undefined, testAction)
		expect(expectedState).to.deep.equal(actualState)
	})

	it('should handle CREATED_USER.', () => {
		const expectedState: IUserState = {
			user: {firstName: 'testUser', lastName: 'testLastName', email: 'hello@hello.com'},
			users: [{firstName: 'testUser', lastName: 'testLastName', email: 'hello@hello.com'}],
		}

		const testAction: userAction.ICreatedUserAction = {
			receivedAt: Date.now(),
			type: userAction.CREATED_USER,
			user: {firstName: 'testUser', lastName: 'testLastName', email: 'hello@hello.com'},
		}
		const actualState = UserReducer(undefined, testAction)
		expect(expectedState).to.deep.equal(actualState)
	})

	it('should handle UPDATED_USER.', () => {
		const initialState = {
			user: { id: 1, firstName: 'oldName', lastName: 'oldLastName', email: 'hi@hello.com'},
			users: [{ id: 1, firstName: 'oldName', lastName: 'oldLastName', email: 'hi@hello.com'}]
		}

		const expectedState: IUserState = {
			user: { id: 1, firstName: 'newfirstNameUser', lastName: 'newLastName', email: 'hi@hello.com' },
			users: [ { id: 1, firstName: 'newfirstNameUser', lastName: 'newLastName', email: 'hi@hello.com' } ],
		}

		const testAction: userAction.IUpdatedUserAction = {
			receivedAt: Date.now(),
			type: userAction.UPDATED_USER,
			user: { id: 1, firstName: 'newfirstNameUser', lastName: 'newLastName', email: 'hi@hello.com' },
		}
		const actualState = UserReducer(initialState, testAction)
		expect(expectedState).to.deep.equal(actualState)
	})

	it('should handle DELETED_USER.', () => {
		const initialState = {
			user: { id: 1, firstName: 'oldName', lastName: 'oldLastName', email: 'hi@hello.com'},
			users: [{ id: 1, firstName: 'oldName', lastName: 'oldLastName', email: 'hi@hello.com'}]
		}

		const expectedState: IUserState = {
			user: { id: 1, firstName: 'oldName', lastName: 'oldLastName', email: 'hi@hello.com'},
			users: []
		}

		const testAction: userAction.IDeletedUserAction = {
			receivedAt: Date.now(),
			type: userAction.DELETED_USER,
			userID: 1,
		}
		const actualState = UserReducer(initialState, testAction)
		expect(expectedState).to.deep.equal(actualState)
	})
})

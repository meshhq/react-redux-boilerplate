import { expect } from 'chai'
import { Action, AnyAction } from 'redux'

import UserReducer, { IUserState } from '../../src/reducers/user'
import {
	ILoginUserAction,
	IRegisteredUserAction,
	AUTHENTICATED_USER,
	CLEAR_USER,
	LOGIN_USER_COMPLETE,
	REGISTERED_USER
} from '../../src/actions/user'

describe('User Reducer', () => {
	it('should return the initial state.', () => {
		const expectedState: IUserState = {
			isLoggedIn: false,
			user: null,
		}

		const actualState = UserReducer(undefined, {} as AnyAction)
		expect(expectedState).to.deep.equal(actualState)
	})

	it('should handle AUTHENTICATED_USER.', () => {
		const expectedState: IUserState = {
			isLoggedIn: true,
			user: null,
		}

		const testAction: Action = {
			type: AUTHENTICATED_USER,
		}
		const actualState = UserReducer(undefined, testAction)
		expect(expectedState).to.deep.equal(actualState)
	})

	it('should handle CLEAR_USER.', () => {
		const expectedState: IUserState = {
			isLoggedIn: false,
			user: null,
		}

		const testAction: Action = {
			type: CLEAR_USER,
		}
		const actualState = UserReducer(undefined, testAction)
		expect(expectedState).to.deep.equal(actualState)
	})

	it('should handle LOGIN_USER_COMPLETE.', () => {
		const expectedState: IUserState = {
			isLoggedIn: true,
			user: {},
		}

		const testAction: ILoginUserAction = {
			receivedAt: Date.now(),
			type: LOGIN_USER_COMPLETE,
			user: {},
		}
		const actualState = UserReducer(undefined, testAction)
		expect(expectedState).to.deep.equal(actualState)
	})

	it('should handle REGISTERED_USER.', () => {
		const expectedState: IUserState = {
			isLoggedIn: true,
			user: {},
		}

		const testAction: IRegisteredUserAction = {
			receivedAt: Date.now(),
			type: REGISTERED_USER,
			user: {},
		}
		const actualState = UserReducer(undefined, testAction)
		expect(expectedState).to.deep.equal(actualState)
	})
})

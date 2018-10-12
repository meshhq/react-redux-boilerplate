import { expect } from 'chai'
import configureMockStore, { MockStoreEnhanced, MockStoreCreator } from 'redux-mock-store'
import thunk, { ThunkDispatch } from 'redux-thunk'
import { Action, Middleware, AnyAction } from 'redux'

import * as userActions from '../../src/actions/user'

// ----------------------
// Mocks
// ----------------------

// Mock Date.now() to always return the same value
const testDate = 123456789
Date.now = jest.fn(() => testDate)

// Mock the API functions
jest.mock('../../src/helpers/api')
import * as mockedAPI from '../../src/helpers/api'

// Set up the Mocked Redux Store
const middlewares: Middleware[] = [ thunk ]
type DispatchExts = ThunkDispatch<any, undefined, AnyAction>
const mockStore: MockStoreCreator<any, DispatchExts> = configureMockStore(middlewares)

describe('User Actions', () => {
	describe('Action Creators', () => {
		describe('authenticatedUser()', () => {
			it('should create an action to indicate that the user was authenticated.', () => {
				const testAction = userActions.UserActions.authenticatedUser()
				const expectedAction: Action = {
					type: userActions.AUTHENTICATED_USER,
				}
				expect(testAction).to.deep.equal(expectedAction)
			})
		})

		describe('fetchedUsers()', () => {
			it('should create an action to fetch users', () => {
				const testUsers = []
				const testAction = userActions.UserActions.fetchedUsers(testUsers)
				const expectedAction: userActions.IFetchedUsersAction = {
					type: userActions.FETCHED_USERS,
					users: testUsers,
				}
				expect(testAction).to.deep.equal(expectedAction)
			})
		})

		describe('clearedUser()', () => {
			it('should create an action to indicate that the user was cleared.', () => {
				const testAction = userActions.UserActions.clearedUser()
				const expectedAction: Action = {
					type: userActions.CLEAR_USER,
				}
				expect(testAction).to.deep.equal(expectedAction)
			})
		})

		describe('loginUserComplete()', () => {
			it('should create an action to indicate that the user was logged in.', () => {
				const testResponse = {} as Response
				const testAction = userActions.UserActions.loginUserComplete(testResponse)
				const expectedAction: userActions.ILoginUserAction = {
					receivedAt: testDate,
					type: userActions.LOGIN_USER_COMPLETE,
					user: testResponse
				}
				expect(testAction).to.deep.equal(expectedAction)
			})
		})

		describe('registeredUser()', () => {
			it('should create an action to indicate that the user was registered.', () => {
				const testResponse = {} as Response
				const testAction = userActions.UserActions.registeredUser(testResponse)
				const expectedAction: userActions.IRegisteredUserAction = {
					receivedAt: testDate,
					type: userActions.REGISTERED_USER,
					user: testResponse,
				}
				expect(testAction).to.deep.equal(expectedAction)
			})
		})
	})

	describe('Async Action Creators', () => {
		describe('fetchUsers()', () => {
			it('should fetch users in the Redux store.', async () => {
							// Mock the API Response
							const testResponse = [{id: 1, firstName: 'first name', lastName: 'last name'}]
							// @ts-ignore this function will be available when Jest mocks the file
							mockedAPI.__setMockResponses(testResponse)
						 const expectedActions = [{
						type: userActions.FETCHED_USERS,
						users: testResponse,
				}]
							const store = mockStore({ organizations: [] })
							await store.dispatch(userActions.UserActions.fetchUsers())
							expect(store.getActions()).to.have.lengthOf(1)
							expect(store.getActions()).to.deep.equal(expectedActions)
			})
		})

		describe('authenticateUser()', () => {
			it('should authenticate the user in the Redux store.', () => {
				const expectedActions = [{
					type: userActions.AUTHENTICATED_USER,
				}]
				const store = mockStore({ user: {} })
				store.dispatch<any>(userActions.UserActions.authenticateUser())
				expect(store.getActions()).to.have.lengthOf(1)
				expect(store.getActions()).to.deep.equal(expectedActions)
			})
		})

		describe('clearUser()', () => {
			it('should clear the user in the Redux store.', () => {
				const expectedActions = [{
					type: userActions.CLEAR_USER,
				}]
				const store: MockStoreEnhanced<any, DispatchExts> = mockStore({ user: {} })
				store.dispatch(userActions.UserActions.clearUser())
				expect(store.getActions()).to.have.lengthOf(1)
				expect(store.getActions()).to.deep.equal(expectedActions)
			})
		})

		describe('loginUser()', () => {
			it('should login the user in the Redux store.', async () => {
				// Mock the API Response
				const testResponse = {
					name: 'test_user',
				}
				// @ts-ignore this function will be available when Jest mocks the file
				mockedAPI.__setMockResponses(testResponse)

				const expectedActions = [{
					receivedAt: testDate,
					type: userActions.LOGIN_USER_COMPLETE,
					user: testResponse,
				}]

				const store: MockStoreEnhanced<any, DispatchExts> = mockStore({ user: {} })
				await store.dispatch(userActions.UserActions.loginUser('test_email@test.com', 'password'))
				expect(store.getActions()).to.have.lengthOf(1)
				expect(store.getActions()).to.deep.equal(expectedActions)
			})
		})

		describe('registerUser()', async () => {
			// Mock the API Response
			const testResponse = {
				name: 'test_user'
			}
			// @ts-ignore this function will be available when Jest mocks the file
			mockedAPI.__setMockResponses(testResponse)

			const expectedActions = [{
				receivedAt: testDate,
				type: userActions.REGISTERED_USER,
				user: testResponse,
			}]

			const store: MockStoreEnhanced<any, DispatchExts> = mockStore({ user: {} })
			await store.dispatch(userActions.UserActions.registerUser('test_email@test.com', 'password'))
			expect(store.getActions()).to.have.lengthOf(1)
			expect(store.getActions()).to.deep.equal(expectedActions)
		})
	})
})

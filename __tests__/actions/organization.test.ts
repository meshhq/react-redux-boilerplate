import { expect } from 'chai'
import configureMockStore, { MockStoreEnhanced, MockStoreCreator } from 'redux-mock-store'
import thunk, { ThunkDispatch } from 'redux-thunk'
import { Action, Middleware, AnyAction } from 'redux'

import * as orgActions from '../../src/actions/organization'
// ----------------------
// Mocks
// ----------------------

// Mock Date.now() to always return the same value
const testDate = 123456789
Date.now = jest.fn(() => testDate)

// Mock the API functions
jest.mock('../../src/helpers/api')
import * as mockedAPI from '../../src/helpers/api'
import organization from '../../src/reducers/organization'

// Set up the Mocked Redux Store
const middlewares: Middleware[] = [ thunk ]
type DispatchExts = ThunkDispatch<any, undefined, AnyAction>
const mockStore: MockStoreCreator<any, DispatchExts> = configureMockStore(middlewares)

describe('Organization Actions', () => {
	describe('Action Creators', () => {
		describe('fetchedOrganizations()', () => {
			it('should create an action to fetch organizations', () => {
				const testOrganizations: any = []
				const testAction = orgActions.OrganizationActions.fetchedOrganizations(testOrganizations)
				const expectedAction: orgActions.IFetchedOrganizationsAction = {
					organizations: testOrganizations,
					receivedAt: testDate,
					type: orgActions.FETCHED_ORGANIZATIONS,
				}
				expect(testAction).to.deep.equal(expectedAction)
			})
		})

		describe('createdOrganization()', () => {
			it('should create an action to indicate organization has been created.', () => {
				const org = { name: 'testName' }
				const testAction = orgActions.OrganizationActions.createdOrganization(org)
				const expectedAction: orgActions.ICreatedOrganizationAction = {
					organization: org,
					receivedAt: testDate,
					type: orgActions.CREATED_ORGANIZATION,
				}
				expect(testAction).to.deep.equal(expectedAction)
			})
		})

		describe('updatedOrganization()', () => {
			it('should create an action to indicate that organization has been updated', () => {
				const testResponse = { name: 'changedName' }
				const testAction = orgActions.OrganizationActions.updatedOrganization(testResponse)
				const expectedAction: orgActions.IUpdatedOrganizationAction = {
					organization: testResponse,
					receivedAt: testDate,
					type: orgActions.UPDATED_ORGANIZATION
				}
				expect(testAction).to.deep.equal(expectedAction)
			})
		})

		describe('deletedOrganization ()', () => {
			it('should create an action to indicate that the Organization was deleted.', () => {
				const testResponse = 1
				const testAction = orgActions.OrganizationActions.deletedOrganization(1)
				const expectedAction: orgActions.IDeletedOrganizationAction = {
					orgID: testResponse,
					receivedAt: testDate,
					type: orgActions.DELETED_ORGANIZATION,
				}
				expect(testAction).to.deep.equal(expectedAction)
			})
		})
	})

	describe('Async Action Creators', () => {
		describe('fetchOrganizations()', () => {
			it('should fetch organizations in the Redux store.', async () => {
							// Mock the API Response
							const testResponse = [{id: 1, name: 'name'}]
							// @ts-ignore this function will be available when Jest mocks the file
							mockedAPI.__setMockResponses(testResponse)
						 const expectedActions = [{
						 organizations: testResponse,
						 receivedAt: testDate,
						 type: orgActions.FETCHED_ORGANIZATIONS,
				}]
							const store = mockStore({ organizations: [] })
							await store.dispatch(orgActions.OrganizationActions.fetchOrganizations())
							expect(store.getActions()).to.have.lengthOf(1)
							expect(store.getActions()).to.deep.equal(expectedActions)
			})
		})

		describe('createOrganization()', () => {
			it('should create the organization in the Redux store.', async () => {
								// Mock the API Response
								const testResponse = {
									name: 'test_organization',
								}
								// @ts-ignore this function will be available when Jest mocks the file
								mockedAPI.__setMockResponses(testResponse)
								const expectedActions = [{
									organization: testResponse,
									receivedAt: testDate,
									type: orgActions.CREATED_ORGANIZATION,
								}]
								const store: MockStoreEnhanced<any, DispatchExts> = mockStore({ organization: {} })
								await store.dispatch(orgActions.OrganizationActions.createOrganization('test'))
								expect(store.getActions()).to.have.lengthOf(1)
								expect(store.getActions()).to.deep.equal(expectedActions)
			})
		})

		describe('updateOrganization()', () => {
			it('should update the organization in the Redux store.', async () => {
				// Mock the API Response
				const testResponse = {
					name: 'test_organization',
				}
				// @ts-ignore this function will be available when Jest mocks the file
				mockedAPI.__setMockResponses(testResponse)

				const expectedActions = [{
					organization: testResponse,
					receivedAt: testDate,
					type: orgActions.UPDATED_ORGANIZATION,
				}]

				const store: MockStoreEnhanced<any, DispatchExts> = mockStore({ Organization: {} })
				await store.dispatch(orgActions.OrganizationActions.updateOrganization(1, 'name'))
				expect(store.getActions()).to.have.lengthOf(1)
				expect(store.getActions()).to.deep.equal(expectedActions)
			})
		})

		describe('deleteOrganization()', () => {
			it('should update organization store to exclude deleted organization', async () => {
			// Mock the API Response
			const testResponse = 1
			// @ts-ignore this function will be available when Jest mocks the file
			mockedAPI.__setMockResponses(testResponse)

			const expectedActions = [{
				orgID: testResponse,
				receivedAt: testDate,
				type: orgActions.DELETED_ORGANIZATION,
			}]

			const store: MockStoreEnhanced<any, DispatchExts> = mockStore({ orgID: 1 })
			await store.dispatch(orgActions.OrganizationActions.deleteOrganization(testResponse))
			expect(store.getActions()).to.deep.equal(expectedActions)
		})
				})
		})
})

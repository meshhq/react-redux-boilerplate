import { expect } from 'chai'
import configureMockStore, { MockStoreEnhanced, MockStoreCreator } from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk'
import { Action, Middleware, AnyAction } from 'redux'

import {
		OrganizationActions,
	IDeletedOrganizationAction,
	IUpdatedOrganizationAction,
	FETCHED_ORGANIZATIONS,
	CREATED_ORGANIZATION,
	DELETED_ORGANIZATION,
	UPDATED_ORGANIZATION,
} from '../../src/actions/organization'

// ----------------------
// Mocks
// ----------------------

// Mock Date.now() to always return the same value
const testDate = 123456789
Date.now = jest.fn(() => testDate)

// Mock the API functions
jest.mock('../../src/helpers/api')
import * as mockedAPI from '../../src/helpers/api'
import organization from '../../src/reducers/organization';

// Set up the Mocked Redux Store
const middlewares: Middleware[] = [ thunk ]
type DispatchExts = ThunkDispatch<any, undefined, AnyAction>
const mockStore: MockStoreCreator<any, DispatchExts> = configureMockStore(middlewares)

describe('Organization Actions', () => {
	describe('Action Creators', () => {
		describe('fetchedOrganizations()', () => {
			it('should create an action to fetch organizations', () => {
				const testAction = OrganizationActions.fetchedOrganizations(organization)
				const expectedAction: Action = {
					type: FETCHED_ORGANIZATIONS,
				}
				expect(testAction).to.deep.equal(expectedAction)
			})
		})

		describe('createdOrganization()', () => {
			it('should create an action to indicate organization has been created.', () => {
				const testAction = OrganizationActions.createdOrganization()
				const expectedAction: Action = {
					type: CREATED_ORGANIZATION,
				}
				expect(testAction).to.deep.equal(expectedAction)
			})
		})

		describe('updatedOrganization()', () => {
			it('should create an action to indicate that orhganization has been updated', () => {
				const testResponse = {} as Response
				const testAction = OrganizationActions.updatedOrganization(testResponse)
				const expectedAction: IUpdatedOrganizationAction = {
					organization: testResponse,
                    receivedAt: testDate,
					type: UPDATED_ORGANIZATION
				}
				expect(testAction).to.deep.equal(expectedAction)
			})
		})

		describe('deletedOrganization ()', () => {
			it('should create an action to indicate that the Organization was deleted.', () => {
				const testResponse = {} as Response
				const testAction = OrganizationActions.deletedOrganization(testResponse)
				const expectedAction: IDeletedOrganizationAction = {
					organization: testResponse,
					receivedAt: testDate,
					type: DELETED_ORGANIZATION,
				}
				expect(testAction).to.deep.equal(expectedAction)
			})
		})
	})

	describe('Async Action Creators', () => {
		describe('fetchOrganizations()', () => {
			it('should fetch organizations in the Redux store.', () => {
				const expectedActions = [{
					type: FETCHED_ORGANIZATIONS,
				}]
				const store = mockStore({ Organization: {} })
				store.dispatch<any>(OrganizationActions.fetchOrganizations())
				expect(store.getActions()).to.have.lengthOf(1)
				expect(store.getActions()).to.deep.equal(expectedActions)
			})
		})

		describe('createOrganization()', () => {
			it('should create the organization in the Redux store.', () => {
				const expectedActions = [{
					type: CREATED_ORGANIZATION,
				}]
				const store: MockStoreEnhanced<any, DispatchExts> = mockStore({ organization: {} })
				store.dispatch(OrganizationActions.createdOrganization(organization))
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
					type: UPDATED_ORGANIZATION,
				}]

				const store: MockStoreEnhanced<any, DispatchExts> = mockStore({ Organization: {} })
				await store.dispatch(OrganizationActions.updateOrganization('name'))
				expect(store.getActions()).to.have.lengthOf(1)
				expect(store.getActions()).to.deep.equal(expectedActions)
			})
		})

		describe('deleteOrganization()', () => {
            it('should update organization store to exclude deleted organization', async () => {
			// Mock the API Response 
			const testResponse = {
				name: 'test_Organization'
			}
			// @ts-ignore this function will be available when Jest mocks the file
			mockedAPI.__setMockResponses(testResponse)

			const expectedActions = [{
				organization: testResponse,
				receivedAt: testDate,
				type: DELETED_ORGANIZATION,
			}]

			const store: MockStoreEnhanced<any, DispatchExts> = mockStore({ organization: {} })
			await store.dispatch(OrganizationActions.deleteOrganization(organization))
			expect(store.getActions()).to.have.lengthOf(1)
			expect(store.getActions()).to.deep.equal(expectedActions)
		})
	})
})

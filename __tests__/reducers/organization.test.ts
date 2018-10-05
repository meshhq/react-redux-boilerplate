import { expect } from 'chai'
import {  AnyAction } from 'redux'

import OrganizationReducer, { IOrganizationState, IOrganization } from '../../src/reducers/organization'
import * as orgAction from '../../src/actions/organization'

describe('Organization Reducer', () => {

	it('should return the initial state.', () => {
		const expectedState: IOrganizationState = {
			organization: null,
			organizations: [],
		}

		const actualState = OrganizationReducer(undefined, {} as AnyAction)
		expect(expectedState).to.deep.equal(actualState)
	})

	it('should handle FETCHED_ORGANIZATIONS.', () => {
		const expectedState: IOrganizationState = {
			organization: null,
			organizations: [],
		}

		const testAction: orgAction.IFetchedOrganizationsAction = {
			organizations: [],
			receivedAt: Date.now(),
			type: orgAction.FETCHED_ORGANIZATIONS,
		}
		const actualState = OrganizationReducer(undefined, testAction)
		expect(expectedState).to.deep.equal(actualState)
	})

	it('should handle CREATED_ORGANIZATIONS.', () => {
		const expectedState: IOrganizationState = {
			organization: {name: 'testOrg'},
			organizations: [{name: 'testOrg'}],
		}

		const testAction: orgAction.ICreatedOrganizationAction = {
			organization: {name: 'testOrg'},
			receivedAt: Date.now(),
			type: orgAction.CREATED_ORGANIZATION,
		}
		const actualState = OrganizationReducer(undefined, testAction)
		expect(expectedState).to.deep.equal(actualState)
	})

	it('should handle UPDATED_ORGANIZATION.', () => {
		const initialState = {
			organization: { id: 1, name: 'oldName'},
			organizations: [{ id: 1, name: 'oldName'}]
		}

		const expectedState: IOrganizationState = {
			organization: { id: 1, name: 'newnameOrg' },
			organizations: [ { id: 1, name: 'newnameOrg' } ],
		}

		const testAction: orgAction.IUpdatedOrganizationAction = {
			organization: {id : 1 , name: 'newnameOrg'},
			receivedAt: Date.now(),
			type: orgAction.UPDATED_ORGANIZATION,
		}
		const actualState = OrganizationReducer(initialState, testAction)
		expect(expectedState).to.deep.equal(actualState)
	})

	it('should handle DELETED_ORGANIZATION.', () => {
		const initialState = {
			organization: { id: 1, name: 'oldName'},
			organizations: [{ id: 1, name: 'oldName'}]
		}

		const expectedState: IOrganizationState = {
			organization: { id: 1, name: 'oldName' },
			organizations: []
		}

		const testAction: orgAction.IDeletedOrganizationAction = {
			orgID: 1,
			receivedAt: Date.now(),
			type: orgAction.DELETED_ORGANIZATION,
		}
		const actualState = OrganizationReducer(initialState, testAction)
		expect(expectedState).to.deep.equal(actualState)
	})
})

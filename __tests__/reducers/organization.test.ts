import { expect } from 'chai'
import { Action, AnyAction } from 'redux'

import OrganizationReducer, { IOrganizationState } from '../../src/reducers/organization'
import * as orgAction from '../../src/actions/organization'

import { IOrganization} from '../../src/reducers/organization'

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
			organization: {} as IOrganization,
			organizations: [],
		}

		const testAction: orgAction.ICreatedOrganizationAction = {
			organization: {} as IOrganization,
			receivedAt: Date.now(),
			type: orgAction.CREATED_ORGANIZATION,
		}
		const actualState = OrganizationReducer(undefined, testAction)
		expect(expectedState).to.deep.equal(actualState)
	})

	it('should handle UPDATED_ORGANIZATION.', () => {
		const expectedState: IOrganizationState = {
			organization: {} as IOrganization,
			organizations: [],
		}

		const testAction: orgAction.IUpdatedOrganizationAction = {
			organization: {} as IOrganization,
			receivedAt: Date.now(),
			type: orgAction.UPDATED_ORGANIZATION,
		}
		const actualState = OrganizationReducer(undefined, testAction)
		expect(expectedState).to.deep.equal(actualState)
	})

	it('should handle DELETED_ORGANIZATION.', () => {
		const expectedState: IOrganizationState = {
			organization: null,
			organizations: [],
		}

		const testAction: orgAction.IDeletedOrganizationAction = {
			organization: null,
			receivedAt: Date.now(),
			type: orgAction.DELETED_ORGANIZATION,
		}
		const actualState = OrganizationReducer(undefined, testAction)
		expect(expectedState).to.deep.equal(actualState)
	})
})

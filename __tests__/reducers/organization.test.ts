import { expect } from 'chai'
import { Action, AnyAction } from 'redux'

import OrganizationReducer, { IOrganizationState } from '../../src/reducers/organization'
import {
		IDeletedOrganizationAction,
		FETCHED_ORGANIZATIONS,
		CREATED_ORGANIZATION,
		UPDATED_ORGANIZATION,
		DELETED_ORGANIZATION,
		IUpdatedOrganizationAction,
} from '../../src/actions/organization'

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

		const testAction: Action = {
			type: FETCHED_ORGANIZATIONS,
		}
		const actualState = OrganizationReducer(undefined, testAction)
		expect(expectedState).to.deep.equal(actualState)
	})

	it('should handle CREATED_ORGANIZATIONS.', () => {
		const expectedState: IOrganizationState = {
			organization: null,
			organizations: [],
		}

		const testAction: Action = {
			type: CREATED_ORGANIZATION
		}
		const actualState = OrganizationReducer(undefined, testAction)
		expect(expectedState).to.deep.equal(actualState)
	})

	it('should handle UPDATED_ORGANIZATION.', () => {
		const expectedState: IOrganizationState = {
			organization: null,
			organizations: [],
		}

		const testAction: IUpdatedOrganizationAction = {
			organization: { name: 'testName' },
			receivedAt: Date.now(),
			type: UPDATED_ORGANIZATION,
		}
		const actualState = OrganizationReducer(undefined, testAction)
		expect(expectedState).to.deep.equal(actualState)
	})

	it('should handle DELETED_ORGANIZATION.', () => {
		const expectedState: IOrganizationState = {
			organization: null,
			organizations: [],
		}

		const testAction: IDeletedOrganizationAction = {
			organization: null,
			receivedAt: Date.now(),
			type: DELETED_ORGANIZATION,
		}
		const actualState = OrganizationReducer(undefined, testAction)
		expect(expectedState).to.deep.equal(actualState)
	})
})

import { AnyAction } from 'redux'
import * as orgAction from '../actions/organization'

export interface IOrganization {
	id?: number
	name: string
}

export interface IOrganizationState {
	organization: IOrganization
	organizations: IOrganization[]
}

const defaultState: IOrganizationState = {
	organization: null,
	organizations: []
}

function organization(state = defaultState, action: AnyAction): IOrganizationState {
	switch (action.type) {
		case orgAction.FETCHED_ORGANIZATIONS:
		const fetchTypedAction = action as orgAction.IFetchedOrganizationsAction
		return {
				...state,
				organizations: fetchTypedAction.organizations
			}
		case orgAction.CREATED_ORGANIZATION:
			const createTypedAction = action as orgAction.ICreatedOrganizationAction
			const orgs = state.organizations
			orgs.unshift(createTypedAction.organization)
			return {
				...state,
				organization: createTypedAction.organization,
				organizations: orgs
			}
		case orgAction.UPDATED_ORGANIZATION:
			const updateTypedAction = action as orgAction.IUpdatedOrganizationAction
			return{
				...state,
				organization: updateTypedAction.organization,
				organizations: state.organizations.map((org) => {
					return (org.id === updateTypedAction.organization.id) ? updateTypedAction.organization : org
				})
			}
		case orgAction.DELETED_ORGANIZATION:
			const deleteTypedAction = action as orgAction.IDeletedOrganizationAction
			const filteredOrgs = state.organizations.filter((org) =>  {
				return org.id !== deleteTypedAction.orgID
			})
			return {
				...state,
				organizations: filteredOrgs
			}
		default:
			return state
	}
}

export default organization

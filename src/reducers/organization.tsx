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
	let typedAction: any
	switch (action.type) {
		case orgAction.FETCHED_ORGANIZATIONS:
			return {
				...state,
				organizations: action.organizations
			}
		case orgAction.CREATED_ORGANIZATION:
			typedAction = action as orgAction.ICreatedOrganizationAction
			const orgs = state.organizations
			orgs.unshift(typedAction.organization)
			return {
				...state,
				organization: typedAction.organization,
				organizations: orgs
			}
		case orgAction.UPDATED_ORGANIZATION:
			typedAction = action as orgAction.IUpdatedOrganizationAction
			return{
				...state,
				organizations: state.organizations.map((org) => {
					return (org.id === typedAction.organization.id) ? typedAction.organization : org
				})
			}
		case orgAction.DELETED_ORGANIZATION:
			typedAction = action as orgAction.IDeletedOrganizationAction
			const filteredOrganizations = state.organizations.filter((org) =>  {
				return org.id !== typedAction.organization.id
			})
			return {
				...state,
				organizations: filteredOrganizations
			}
		default:
			return state
	}
}

export default organization

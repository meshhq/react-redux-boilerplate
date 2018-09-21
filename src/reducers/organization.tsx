import { AnyAction } from 'redux'
import {
	ICreatedOrganizationAction,
	IDeletedOrganizationAction,
	IUpdatedOrganizationAction,
	FETCHED_ORGANIZATIONS,
	CREATED_ORGANIZATION,
	DELETED_ORGANIZATION,
	UPDATED_ORGANIZATION,
} from '../actions/organization'

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
		case FETCHED_ORGANIZATIONS:
			return {
				...state,
				organizations: action.organizations
			}
		case CREATED_ORGANIZATION:
			typedAction = action as ICreatedOrganizationAction
			return {
				...state,
				organization: typedAction.organization
			}
		case UPDATED_ORGANIZATION:
			typedAction = action as IUpdatedOrganizationAction
			return{
				...state,
				organization: typedAction.organization
			}
		case DELETED_ORGANIZATION:
			typedAction = action as IDeletedOrganizationAction
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

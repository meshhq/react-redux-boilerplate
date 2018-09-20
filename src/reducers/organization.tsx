import { AnyAction } from 'redux'
import {
	ICreatedOrganizationAction,
	FETCHED_ORGANIZATIONS,
	CREATED_ORGANIZATION,
	DELETED_ORGANIZATION,
	IDeletedOrganizationAction,
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
	let typedAction
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
				organization: action.organization
			}
		case DELETED_ORGANIZATION:
			typedAction = action as IDeletedOrganizationAction
			return {
				...state,
				organizations: action.organizations
			}
		default:
			return state
	}
}

export default organization

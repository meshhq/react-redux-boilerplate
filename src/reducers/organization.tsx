import { AnyAction } from 'redux'
import {
	FETCHED_ORGANIZATIONS,
	CREATED_ORGANIZATION,
	DELETE_ORGANIZATION,
	UPDATE_ORGANIZATION
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
			return Object.assign({}, state, {
				organization: typedAction.organization
			})
		case UPDATE_ORGANIZATION:
			return Object.assign({}, state, defaultState)
		case DELETE_ORGANIZATION:
			return {}
		default:
			return state
	}
}

export default organization

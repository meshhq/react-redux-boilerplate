import { ActionCreatorsMapObject, Dispatch, Action } from 'redux'
import { IOrganization } from '../reducers/organization'

// API Helpers
import * as api from '../helpers/api'

// Types
export const FETCHED_ORGANIZATIONS = 'FETCH_ORGANIZATIONS'
export const CREATE_ORGANIZATION   = 'CREATE_ORGANIZATION'
export const CREATED_ORGANIZATION  = 'CREATED_ORGANIZATION'
export const UPDATE_ORGANIZATION   = 'UPDATE_ORGANIZATION'
export const UPDATED_ORGANIZATION  = 'UPDATED_ORGANIZATION'
export const DELETE_ORGANIZATION   = 'DELETE_ORGANIZATION'
export const DELETED_ORGANIZATION  = 'DELETED_ORGANIZATION'

// -----------------------------------------------------------------------------
// GET Organizations
// -----------------------------------------------------------------------------

/**
 * Gets all organizations via a call to the `/organizations` API.
 */
const fetchOrganizations = () => (dispatch: Dispatch<Action>) => {
	return api.GET('/organizations', {}).then((organizations: IOrganization[]) => {
		dispatch(fetchedOrganizations(organizations))
	}).catch((err: Error) => Promise.reject(err))
}
/**
 * Builds an `IFetchedOrganizationsAction ` upon successful fetch.
 * @param organizations The response from the organizations API call.
 * @return The `FetchedOrganizationsAction` instance.
 */
const fetchedOrganizations = (organizations: IOrganization[]): IFetchedOrganizationsAction => {
	const action: IFetchedOrganizationsAction = {
		organizations: organizations,
		receivedAt: Date.now(),
		type: FETCHED_ORGANIZATIONS,
	}
	return action
}

/**
 * IFetchedOrganizationsAction is dispatched after organizations are fethed.
 */
export interface IFetchedOrganizationsAction extends Action {
	type: string,
	organizations: IOrganization[],
	receivedAt: number
}

// -----------------------------------------------------------------------------
// Create organization
// -----------------------------------------------------------------------------

/**
 * Creates a new organization via a call to the `/organizations` API.
 * @param id Auto-assigned id number.
 * @param name The name supplied in the organization form.
 */
const createOrganization = ( id: number, name: string ) => (dispatch: Dispatch<ICreatedOrganizationAction>) => {
	const organizationPayload = { id, name }
	// assuming we have edit buttonType
	return api.POST('/organizations', organizationPayload).then((organization: IOrganization) => {
		dispatch(createdOrganization(organization))
	}).catch((err: Error) => Promise.reject(err))
}
/**
 * Builds a `CreatedOrganizationAction` upon successful creation.
 * @param organization The response from the organizations API call.
 * @return The `CreatedOrganizationAction` instance.
 */
const createdOrganization = (organization: IOrganization): ICreatedOrganizationAction => {
	const action: ICreatedOrganizationAction = {
		organization: organization,
		receivedAt: Date.now(),
		type: CREATED_ORGANIZATION,
	}
	return action
}

/**
 * ICreatedOrganizationAction is dispatched after organization has been created.
 */
export interface ICreatedOrganizationAction extends Action {
	type: string,
	organization: IOrganization,
	receivedAt: number
}

// -----------------------------------------------------------------------------
// Update organization
// -----------------------------------------------------------------------------

/**
 * Updates organization via a call to the `/organizations` API.
 * @param name  Name supplied in organization form.
 */
const updateOrganization = ( name: string ) => (dispatch: Dispatch<IUpdatedOrganizationAction>) => {
	const organizationPayload = { name }
	return api.PUT('/organizations', organizationPayload).then((organization: IOrganization) => {
		dispatch(updatedOrganization(organization))
	}).catch((err: Error) => Promise.reject(err))
}
/**
 * Builds an `UpdatedOrganizationAction` upon successful creation.
 * @param organization The response from the organizations API call.
 * @return The `UpdatedOrganizationAction` instance.
 */
const updatedOrganization = (organization: IOrganization): IUpdatedOrganizationAction => {
	const action: ICreatedOrganizationAction = {
		organization: organization,
		receivedAt: Date.now(),
		type: UPDATED_ORGANIZATION,
	}
	return action
}

/**
 * IUpdatedOrganizationAction is dispatched after organization has been updated.
 */
export interface IUpdatedOrganizationAction extends Action {
	organization: IOrganization,
	receivedAt: number
	type: string,
}

// -----------------------------------------------------------------------------
// Delete organization
// -----------------------------------------------------------------------------

/**
 * Deletes organization via a call to the `/organization` API.
 * @param organization The organization to be deleted.
 * @param organization.id The id of the organization to be deleted.
 */
const deleteOrganization = ( organization: IOrganization ) => (dispatch: Dispatch<IDeletedOrganizationAction>) => {
	return api.DELETE('/organization/', organization.id).then((org: IOrganization) => {
		dispatch(deletedOrganization(org))
	}).catch((err: Error) => Promise.reject(err))
}

const deletedOrganization = ( organization: IOrganization ): IDeletedOrganizationAction => {
	const action: IDeletedOrganizationAction = {
		organization: organization,
		receivedAt: Date.now(),
		type: DELETED_ORGANIZATION,
	}
	return action
}

/**
 * IDeletedOrganizationAction is dispatched after organization has been deleted.
 */
export interface IDeletedOrganizationAction extends Action {
	organization: IOrganization,
	receivedAt: number
	type: string,
}

/**
 * Defines the interface for our OrganizationAction object.
 */
export interface OrganizationDispatch extends ActionCreatorsMapObject {
	createOrganization( id: number, name: string ): (dispatch: Dispatch<ICreatedOrganizationAction>) => Promise<void>
	createdOrganization(organization: IOrganization): ICreatedOrganizationAction
	deleteOrganization(organization: IOrganization): (dispatch: Dispatch<IDeletedOrganizationAction>) => Promise<void>
	deletedOrganization(organization: IOrganization): IDeletedOrganizationAction
	updateOrganization( name: string ): (dispatch: Dispatch<IUpdatedOrganizationAction>) => Promise<void>
	updatedOrganization(organization: IOrganization): IUpdatedOrganizationAction
}

export const OrganizationActions: OrganizationDispatch = {
		createOrganization,
		createdOrganization,
		deleteOrganization,
		deletedOrganization,
		updateOrganization,
		updatedOrganization,
}

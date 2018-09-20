import { ActionCreatorsMapObject, Dispatch, Action } from 'redux'
import { IOrganization } from '../reducers/organization'

// API Helpers
import { POST } from '../helpers/api'
import { PUT } from '../helpers/api'
import { GET } from '../helpers/api'
import { DELETE } from '../helpers/api'

export const FETCHED_ORGANIZATIONS = 'FETCH_ORGANIZATIONS'
export const CREATE_ORGANIZATION = 'CREATE_ORGANIZATION'
export const CREATED_ORGANIZATION = 'CREATED_ORGANIZATION'

export const DELETE_ORGANIZATION = 'DELETE_ORGANIZATION'
export const DELETED_ORGANIZATION = 'DELETE_ORGANIZATION'

// -----------------------------------------------------------------------------
// Get all Organizations
// -----------------------------------------------------------------------------
/**
 * Gets all organizations via a call to the `/organizations` API.
 */
const fetchOrganizations = () => (dispatch: Dispatch<Action>) => {
	return GET('/organizations', {}).then((organizations: IOrganization[]) => {
		dispatch(fetchedOrganizations(organizations))
	}).catch((err) => Promise.reject(err))
}
/**
 * Builds a `IFetchedOrganizationsAction ` upon successful fetch.
 * @param organizations The response from the organizations API call.
 * @return The `FetchedOrganizationsAction` instance.
 */
const fetchedOrganizations = (organizations: IOrganization[]): Action => {
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
// Create or update organization depending on button type
// -----------------------------------------------------------------------------
/**
 * Creates a new organization via a call to the `/organizations` API.
 * @param name The name supplied in the organization form.
 * @param id Auto-assigned id number.
 */
const createOrganization = ( id: number, name: string ) => (dispatch: Dispatch<ICreatedOrganizationAction>) => { 
	// since this handles edit and create, could be named better.
	const organizationPayload = { id, name }
	const func = this.state.buttonType === 'edit' ? PUT : POST
	// assuming we have edit buttonType
	return func('/organizations', organizationPayload).then((organization: IOrganization) => {
		dispatch(createdOrganization(organization))
	}).catch((err) => Promise.reject(err))
}
/**
 * Builds a `CreatedOrganizationAction` upon successful creation.
 * @param organization The response from the register API call.
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
// Delete organization
// -----------------------------------------------------------------------------
const deleteOrganization( organization: IOrganization ) => (dispatch: Dispatch<Action>) => {
	return DELETE('/organization/', organization.id).then((organizations: IOrganization[]) => {
		dispatch(deletedOrganization(organizations))
	}).catch((err) => Promise.reject(err))
}

const deletedOrganization = (organizations: IOrganization[]): Action => {
	const action: IDeletedOrganizationAction = { 
		// I'm confused. I want this to serve as "successful delete object" that updates organizations state reflectting deletion of organization
		organizations: organizations,
		receivedAt: Date.now(),
		type: DELETED_ORGANIZATION,
	}
	return action
}
/**
 * IDeletedOrganizationAction is dispatched after organization has been created.
 */
export interface IDeletedOrganizationAction extends Action {
	type: string,
	organizations: IOrganization[],
	receivedAt: number
}
/**
 * Defines the interface for our OrganizationAction object.
 */
export interface OrganizationDispatch extends ActionCreatorsMapObject {
	createOrganization(id: number, name: string ): (dispatch: Dispatch<ICreatedOrganizationAction>) => Promise<void>
	createdOrganization(organization: IOrganization): ICreatedOrganizationAction
	deleteOrganization(organizations: IOrganization[]): IDeletedOrganizationAction
}

export const OrganizationActions: OrganizationDispatch = {
		createOrganization,
		createdOrganization,
		deleteOrganization,
		deletedOrganization
}

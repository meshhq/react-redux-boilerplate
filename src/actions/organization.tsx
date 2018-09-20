import { ActionCreatorsMapObject, Dispatch, Action } from 'redux'
import { IOrganization } from '../reducers/organization'

// API Helpers
import { POST } from '../helpers/api'
import { PUT } from '../helpers/api'
import { GET } from '../helpers/api'
import { DELETE } from '../helpers/api'
import organization from '../reducers/organization';

export const FETCHED_ORGANIZATIONS = 'FETCH_ORGANIZATIONS'
export const CREATE_ORGANIZATION = 'CREATE_ORGANIZATION'
export const CREATED_ORGANIZATION = 'CREATED_ORGANIZATION'

export const UPDATE_ORGANIZATION = 'UPDATE_ORGANIZATION'
export const UPDATED_ORGANIZATION = 'UPDATED_ORGANIZATION'

export const DELETE_ORGANIZATION = 'DELETE_ORGANIZATION'

// -----------------------------------------------------------------------------
// Get all Organizations
// -----------------------------------------------------------------------------

export interface IFetchedOrganizationsAction extends Action {
	type: string,
	organizations: IOrganization[],
	receivedAt: number
}

const fetchOrganizations = () => (dispatch: Dispatch<Action>) => {
	return GET('/organizations', {}).then((organizations: IOrganization[]) => {
		dispatch(fetchedOrganizations(organizations))
	}).catch((err) => Promise.reject(err))
}

const fetchedOrganizations = (organizations: IOrganization[]): Action => {
	const action: IFetchedOrganizationsAction = {
		organizations: organizations,
		receivedAt: Date.now(),
		type: FETCHED_ORGANIZATIONS,
	}
	return action
}

/*
GET /organizations
GET /organizations/{organization_id}
POST /organizations
{
    name: 'org name'
}
PUT /organizations/{organization_id}
{
    name: 'org name'
}
DELETE /organizations/{organization_id}
*/

// -----------------------------------------------------------------------------
// Create Organization
// -----------------------------------------------------------------------------

/**
 * Creates a new organization via a call to the `/register` API.
 * @param name The name supplied in the organization form.
 * @param id Auto-assigned id number.
 */
const createOrganization = (name: string, id: number) => (dispatch: Dispatch<ICreatedOrganizationAction>) => {
	const organizationPayload = { id, name }
	return POST('/organizations', organizationPayload).then((response: Response) => {
		dispatch(createdOrganization(response))
	}).catch((err) => Promise.reject(err))
}

/**
 * Builds a `CreatedOrganizationAction` upon successful creation.
 * @param response The response from the register API call.
 * @return The `CreatedOrganizationAction` instance.
 */
const createdOrganization = (response: Response): ICreatedOrganizationAction => {
	const action: ICreatedOrganizationAction = {
			organization: response,
			type: CREATED_ORGANIZATION,
	}
	return action
}

/**
 * ICreatedOrganizationAction is dispatched after organization has been created.
 */
export interface ICreatedOrganizationAction extends Action {
	type: string,
	organization: any,
}

// -----------------------------------------------------------------------------
// Updated Organization
// -----------------------------------------------------------------------------

/**
 * Called when the user has been successfully authenticated
 */
const authenticateUser = () => (dispatch: Dispatch<Action>) => {
		dispatch(authenticatedUser())
}

const authenticatedUser = (): Action => {
	const action: Action = {
		type: AUTHENTICATED_USER,
	}
	return action
}

// -----------------------------------------------------------------------------
// User Login
// -----------------------------------------------------------------------------

/**
 * Logs in an existing user via a call to the `/login` API.
 * @param email The email supplied in the login form.
 * @param password The password supplied in the login form.
 */
const loginUser = (email: string, password: string) => (dispatch: Dispatch<ILoginUserAction>) => {
	const userPayload = { email, password }
	return POST('/login', userPayload).then((response: Response) => {
		dispatch(loginUserComplete(response))
	}).catch((err) => Promise.reject(err))
}
/**
 * Defines the interface for our OrganizationAction object.
 */
export interface OrganizationDispatch extends ActionCreatorsMapObject {
	createOrganization(name: string, id: number): (dispatch: Dispatch<ICreatedOrganizationAction>) => Promise<void>
	createdOrganization(response: Response): ICreatedOrganizationAction
}

export const OrganizationActions: OrganizationDispatch = {
		createOrganization,
		createdOrganization,
}

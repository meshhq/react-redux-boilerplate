import * as URI from 'urijs'
import * as CreateHttpError from 'http-errors'

const HOST = 'http://localhost:8080'

/**
 * INTERFACE METHODS
 */

/**
 * PUTS a resource for the provided path and params.
 * @param path The path for the resource.
 * @param path An optional set of parameters to include in the request.
 */
export function GET(path: string, params: any) {
	const url = URLWithPath(path, params)
	const options = baseRequest('GET', url)
	return performFetch(url, options)
}

/**
 * GETS a resource for the provided path and params.
 * @param path The path for the resource.
 * @param path An optional set of parameters to include in the request.
 */
export function PUT(path: string, params: any) {
	const url = URLWithPath(path, '')
	const options = baseRequest('PUT', url, params)
	return performFetch(url, options)
}

/**
 * POSTS a resource for the provided path and params.
 * @param path The path for the resource.
 * @param path An optional set of parameters to include in the request.
 */
export function POST(path: string, body: any) {
	const url = URLWithPath(path, '')
	const options = baseRequest('POST', url, body)
	return performFetch(url, options)
}

/**
 * DELETES a resource for the provided path and params.
 * @param path The path for the resource.
 * @param path An optional set of parameters to include in the request.
 */
export function DELETE(path: string, params: any) {
	const url = URLWithPath(path, params)
	const options = baseRequest('DELETE', url)
	return performFetch(url, options)
}

/**
 * Performs the Fetch for the given request
 * @param  {[type]} request Base Request
 * @return {[type]}         Result Promise
 */
function performFetch(url: string, options: RequestInit) {
	// tslint:disable-next-line:no-console
	console.log('URL', url)
	// tslint:disable-next-line:no-console
	console.log('Options', options)
	return fetch(url, options)
	// .then((rawResponse: any) => rawResponse.json())
	.then((rawResponse: any) => {
		// tslint:disable-next-line:no-console
		console.log('RAW RESPONSE : ', rawResponse)
		return rawResponse.json()
	}).then((response: any) => {
		// tslint:disable-next-line:no-console
		console.log('Parsed Response:', response)
		if (response.status === 204) {
			return null
		} else {
			return Promise.resolve(response)
		}
	}).catch((error) => {
		// tslint:disable-next-line:no-console
		console.log(error)
		const errorToThrow = error as CreateHttpError.HttpError
		throw errorToThrow
	})
}

/**
 * Creates the base request object for the operation
 * @param  {String} method HTTP Method
 * @param  {String} URL    URL For Req
 * @param  {Object} Body   Body for the request
 * @return {Request}       Formatted Request
 */
function baseRequest(method: string, url: string, body?: any): RequestInit {
	const headersForRequest = defaultHeaders()
	const init = {
		body: JSON.stringify(body),
		cors: true,
		headers: headersForRequest,
		method: method,
	}
	return init
}

/**
 * defaultHeaders supplies the default headers for an api request
 * @return {Headers} Default Headers
 */
function defaultHeaders() {
	const header = new Headers()
	header.set('Accept', 'application/json')
	header.set('Content-Type', 'application/json')
	header.set('X-Web-Source', 'meshboilerplate')
	return header
}

/**
 * URI For the requested path
 * @param  {String} path Path for the API
 * @return {String}        URI for the path
 */
function URLWithPath(path: string, queryParams: any) {
	const uri = new URI(HOST)
	uri.pathname(path)

	// Append Query Params
	for (const key in queryParams) {
		if (queryParams.hasOwnProperty(key)) {
			uri.setSearch(key, queryParams[key])
		}
	}
	return uri.toString()
}

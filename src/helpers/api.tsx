import * as URI from "urijs"
import * as CreateHttpError from "http-errors"

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
  const options = baseRequest("GET", url)
  return performFetch(url, options)
}

/**
 * GETS a resource for the provided path and params.
 * @param path The path for the resource.
 * @param path An optional set of parameters to include in the request.
 */
export function PUT(path: string, params: any) {
    const url = URLWithPath(path, "")
    const options = baseRequest("PUT", url, params)
    return performFetch(url, options)
  }

/**
 * POSTS a resource for the provided path and params.
 * @param path The path for the resource.
 * @param path An optional set of parameters to include in the request.
 */
export function POST(path: string, params: any) {
  const url = URLWithPath(path, "")
  const options = baseRequest("POST", url, params)
  return performFetch(url, options)
}

/**
 * DELETES a resource for the provided path and params.
 * @param path The path for the resource.
 * @param path An optional set of parameters to include in the request.
 */
export function DELETE(path: string, params: any) {
  const url = URLWithPath(path, params)
  const options = baseRequest("DELETE", url)
  return performFetch(url, options)
}

/**
 * Performs the Fetch for the given request
 * @param  {[type]} request Base Request
 * @return {[type]}         Result Proimise
 */
function performFetch(url: string, options: RequestInit) {
  return fetch(url, options).then((response: Response) => {
    if (response.status === 204) {
      return null
    } else {
      return Promise.resolve(response)
    }
  }).catch((error) => {
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
  return {method, body: JSON.stringify(body)}
}

/**
 * URI For the requested path
 * @param  {String} path Path for the API
 * @return {String}        URI for the path
 */
function URLWithPath(path: string, queryParams: any) {
  const uri = new URI("")
  uri.pathname(path)

  // Append Query Params
  for (const key in queryParams) {
    if (queryParams.hasOwnProperty(key)) {
      uri.setSearch(key, queryParams[key])
    }
  }
  return uri.toString()
}

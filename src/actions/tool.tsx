import { ActionCreatorsMapObject, ActionCreator, Dispatch, Action } from "redux"
import * as URI from "urijs"

// API Helpers
import { GET } from "../helpers/api"

export const SEARCHING_TOOLS = "SEARCHING_TOOLS"
export const SEARCHED_TOOLS = "SEARCHED_TOOLS"

export const SELECTING_TOOL = "SELECTING_TOOL"
export const SELECTED_TOOL = "SELECTED_TOOL"

// -----------------------------------------------------------------------------
// Tool Search
// -----------------------------------------------------------------------------

/**
 * Searchs for tools via a call to the `/tools` API.
 * @param searchTerm The search term supplied in the search bar.
 */
const searchTools = (searchTerm: string) => (dispatch: Dispatch<any>) => {
    const searchQuery = {"searchTerm": searchTerm}
    return GET("/tools", searchQuery).then((response: Response) => {
        dispatch(this.searchedTools(response))
    }).catch((err) => Promise.reject(err))
}

/**
 * Builds a `SearchedToolsAction` upon successful search.
 * @param response The response from the tools API call.
 * @return The `SearchedToolsAction` instance.
 */
const searchedTools = (response: any): SearchedToolsAction => {
    const action: SearchedToolsAction = {
        receivedAt: Date.now(),
        type: SEARCHED_TOOLS,
        tools: response,
    }
    return action
}

/**
 * RegisteredUserAction is dispatched after a user has been registered.
 */
interface SearchedToolsAction extends Action {
    type: string,
    tools: any,
    receivedAt: number
}

// -----------------------------------------------------------------------------
// User Login
// -----------------------------------------------------------------------------

/**
 * Selects a tool via a call to the GET tool API.
 * @param toolID The id for the tool being selected.
 */
const selectTool = (toolID: string) => (dispatch: Dispatch<any>) => {
    const toolPayload = {"toolID": toolID}
    return GET("/tools", toolPayload).then((response: Response) => {
        dispatch(this.selectedTool(response))
    }).catch((err) => Promise.reject(err))
}

/**
 * Builds an `SelectedToolAction` upon successful tool selection.
 * @param response The response from the tool API call.
 * @return The `SelectedToolAction` instance.
 */
const selectedTool = (response: any): SelectedToolAction => {
    const action: SelectedToolAction = {
        receivedAt: Date.now(),
        type: SELECTED_TOOL,
        tool: response,
    }
    return action
}

/**
 * AuthenticatedUserAction is dispatched after a user has been authenticated.
 */
interface SelectedToolAction extends Action {
    type: string,
    tool: any,
    receivedAt: number
}

/**
 * Defines the interface for our UserAction object.
 */
export interface ToolDispatch extends ActionCreatorsMapObject {
    searchTools (email: string, password: string): any
    searchedTools (response: any): SearchedToolsAction
    selectTool (email: string, password: string): any
    selectedTool (response: any): SelectedToolAction
}
  
export const ToolActions: ToolDispatch = {
    searchTools,
    searchedTools,
    selectTool,
    selectedTool,
}
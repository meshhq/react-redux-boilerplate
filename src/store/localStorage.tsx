const LAST_UPDATE_KEY = 'LAST_UPDATE_KEY'
const STATE_KEY = 'STATE_KEY'
// Expire the session cache after 2 hrs
const SESSION_EXPIRATION = 1000 * 60 * 2

/**
 * Loads the state from local storage.
 */
export function loadState() {
    try {
        // Retreive the cached state from localStorage
        const serializedState = localStorage.getItem(STATE_KEY)
        const lastUpdate = localStorage.getItem(LAST_UPDATE_KEY)
        if (serializedState === null) {
            return undefined
        }
        
        /**
         * We are storing the session data for the logged in user 
         * in local storage at the key 'session'. We want this to data
         * to expire after two hours. This checks to see if our time 
         * constraint has been met, if so, delete the data stored at key 'session'.
         */
        const resolvedState = JSON.parse(serializedState)
        if (Date.now() > Number(lastUpdate) + Number(SESSION_EXPIRATION)) {
            delete resolvedState.session
        }

        // Return the cached state
        return resolvedState
    } catch (err) {
        // If we have an error, let the reducers initialize the state
        return undefined
    }
}

/**
 * We are saving reducer state inside of local storage.
 * @param state
 */
export function saveState(state: any) {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem(STATE_KEY, serializedState)
        localStorage.setItem(LAST_UPDATE_KEY, Date.now().toString())
    } catch (err) {
        console.error('ERROR SAVING STATE: ', err)
    }
}

/**
 * Clears the state stored in local storage.
 */
export function clearState() {
    try {
        localStorage.removeItem(STATE_KEY)
        localStorage.removeItem(LAST_UPDATE_KEY)
    } catch (err) {
        console.error('ERROR CLEARING STATE: ', err)
    }
}
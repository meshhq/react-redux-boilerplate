import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import { throttle } from 'underscore'
import { saveState as saveToLocalStorage } from './localStorage'

/**
 * @method      configureStore
 * @description Returns the created store for the application
 * @param       {Object}       initialState
 * @return      {Object}
 */
export default function configureStore(initialState: any) {
    // Adding thunk
    let middleware = applyMiddleware(thunk)

    // Creating our store
    const store = createStore(rootReducer, initialState, middleware)

    // Add Subscribers to store
    addSubscribersToStore(store)

    return store
}

/**
 * @method      addSubscribersToStore
 * @description Takes a store and adds subscribers to the store
 * @param       {object}            store
 */
function addSubscribersToStore(store: any) {
    // Only save updates to the session and report
    // and limit saves to once per second
    store.subscribe(throttle(() => {
        // Persist State to Local Storage
        saveToLocalStorage({
            user: store.getState().user,
            session: store.getState().session,
        })
    }, 1000))
}
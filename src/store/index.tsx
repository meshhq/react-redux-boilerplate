import { createStore, applyMiddleware, Store, compose } from 'redux'
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
	const middleware = applyMiddleware(thunk)
	let composeEnhancers = compose

	if (typeof window !== 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
		composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
	}

	// Creating our store
	const store = createStore(
		rootReducer,
		initialState,
		composeEnhancers(middleware)
	)

	// Add Subscribers to store
	addSubscribersToStore(store)

	return store
}

/**
 * @method      addSubscribersToStore
 * @description Takes a store and adds subscribers to the store
 * @param       {object}            store
 */
function addSubscribersToStore(store: Store<any>) {
	// Only save updates to the session and report
	// and limit saves to once per second
	store.subscribe(throttle(() => {
		// Persist State to Local Storage
		saveToLocalStorage({
			session: store.getState().session,
			user: store.getState().user,
		})
	}, 1000))
}

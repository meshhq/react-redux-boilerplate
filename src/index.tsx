import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { App } from './containers/App'

import './assets/base_assets.scss'

import configureStore from './store'
import { loadState } from './store/localStorage'

const persistedState = loadState()
const appStore = configureStore(persistedState)

const render = () => {
	ReactDOM.render(
		<Provider store={appStore}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>,
		document.getElementById('app')
	)
}
render()
// Webpack Hot Module Replacement API
if (module.hot) {
	module.hot.accept('./containers/App', render)
}

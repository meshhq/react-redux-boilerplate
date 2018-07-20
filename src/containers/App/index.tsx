import * as React from 'react'
import { connect } from 'react-redux'
import { Grid } from 'react-bootstrap'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'

import { LoginComponent } from '../../components/Login'

/**
 * AppComponent is the root component for our application.
 */
class AppComponent extends React.Component<any, any> {

	constructor(props: any) {
		super(props)
	}

	/**
	 * Renders a Grid component responsible for displaying UI based on the current application path.
	 */
	public render() {
		return (
			<div className='application-root'>
				<Grid className='application-container'>
					<Switch>
						<Route path={'/'} component={LoginComponent} />
						<Route path={'/login'} component={LoginComponent} />
						<Route path={'/register'} component={LoginComponent} />
					</Switch>
				</Grid>
			</div>
		)
	}
}

const mapStateToProps = (state: any, ownProps: any) => {
	return {}
}

export const App: React.ComponentClass<any> = withRouter(connect(mapStateToProps)(AppComponent))

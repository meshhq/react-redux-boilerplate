import * as React from 'react'
import { connect } from 'react-redux'
import { Grid } from 'react-bootstrap'
import { Switch, Route, withRouter } from 'react-router-dom'

// Components
import { LoginComponent } from '../../components/Login'
import { OrganizationComponent } from '../../components/Organization'
import { UserComponent } from '../../components/User/index'

// State
import { IRootReducerState } from '../../reducers'
import { IUserState } from '../../reducers/user'
import { IOrganizationState } from '../../reducers/organization'

interface IConnectedProps {
	userState: IUserState,
	organizationState: IOrganizationState,
}

type Props = IConnectedProps

/**
 * AppComponent is the root component for our application.
 */
class AppComponent extends React.Component<Props> {

	constructor(props: Props) {
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
						<Route path={'/'} component={UserComponent} exact={true} />
						<Route path={'/login'} component={LoginComponent} />
						<Route path={'/register'} component={LoginComponent} />
						<Route path={'/users'} component={UserComponent} />
						<Route path={'/organizations'} component={OrganizationComponent} />
					</Switch>
				</Grid>
			</div>
		)
	}
}

const mapStateToProps = (state: IRootReducerState) => {
	return {
		organizationState: state.organization,
		userState: state.user,
	}
}

export const App: React.ComponentClass<any> = withRouter(connect(mapStateToProps)(AppComponent))

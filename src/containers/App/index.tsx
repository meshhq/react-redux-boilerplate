import * as React from 'react'
import { connect } from 'react-redux'
import { Grid } from 'react-bootstrap'
import { Switch, Route, withRouter } from 'react-router-dom'

// Components
import { LoginComponent } from '../../components/Login'
import { OrganizationComponent } from '../../components/Organization'

// State
import { IRootReducerState } from '../../reducers'
import { IUserState } from '../../reducers/user'
import { OrganizationActions } from '../../actions/organization';

interface IConnectedProps {
	userState: IUserState
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
						<Route path={'/'} component={OrganizationComponent} />
						<Route path={'/login'} component={LoginComponent} />
						<Route path={'/register'} component={LoginComponent} />
					</Switch>
				</Grid>
			</div>
		)
	}
}

const mapStateToProps = (state: IRootReducerState) => {
	return {
		userState: state.user,
	}
}

export const App: React.ComponentClass<any> = withRouter(connect(mapStateToProps)(AppComponent))

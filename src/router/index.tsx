import * as React from 'react'
import { Route, Redirect, withRouter, RouteProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

// Actions
import { UserActions, UserDispatch } from '../actions/user'
import { OrganizationActions, OrganizationDispatch } from '../actions/organization'

// State
import { IRootReducerState } from '../reducers'
import { IUserState } from '../reducers/user'
import { IOrganizationState } from '../reducers/organization'

interface IConnectedState {
	userState: IUserState,
	organizationState: IOrganizationState,
}

interface IConnectedActions {
	userActions: UserDispatch,
	organizationActions: OrganizationDispatch,
}

interface IRouterProps {
	component: any
}

type CustomRouteProps = IRouterProps & IConnectedState & IConnectedActions

// The PrivateRoute is a route which checks that the current user
// is logged in. If they are not logged in, they will be redirected
// to the /login route
const PrivateRouteComponent = ({ component, ...rest }: CustomRouteProps) => {
	const routeComponent = (props: RouteProps) => (
		rest.userState.user.isLoggedIn
		? React.createElement(component, props)
		: <Redirect to={{pathname: '/login'}} />
	)
	return <Route {...rest} render={routeComponent} />
}

// The LoginRedirectRoute is a special route which contains the logic
// which will denote that the current user is logged in
const LoginRedirectRouteComponent = ({ component, ...rest }: CustomRouteProps) => {
	const routeComponent = (props: RouteProps) => {
		// Set that the user is logged in
		rest.userActions.authenticateUser()

		// Set the session token in the session storage
		const queryString = new URLSearchParams(props.location.search)
		const sessionToken = queryString.get('session')
		sessionStorage.setItem('sessionToken', sessionToken)

		// Redirect to the base path
		return (
			<Redirect to={{pathname: '/accounts'}} />
		)
	}
	return <Route {...rest} render={routeComponent} />
}

// The LogoutRedirectRoute is a special route which contains the logic
// which will log the user out
const LogoutRedirectRouteComponent = ({ component, ...rest }: CustomRouteProps) => {
	const routeComponent = (props: RouteProps) => {
		// Set that the user is logged out
		rest.userActions.clearUser()

		// Delete the session token from session storage
		sessionStorage.removeItem('sessionToken')

		// Redirect to the login path
		return (
			<Redirect to={{pathname: '/login'}} />
		)
	}
	return <Route {...rest} render={routeComponent} />
}

const mapStateToProps = (state: IRootReducerState) => {
	return {
		organizationState: state.organization,
		userState: state.user,
	}
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		organizationActions: bindActionCreators(OrganizationActions, dispatch),
		userActions: bindActionCreators(UserActions, dispatch),
	}
}

export const PrivateRoute: any = withRouter(connect(mapStateToProps)(PrivateRouteComponent) as any)
export const LoginRedirectRoute: any = withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginRedirectRouteComponent) as any)
export const LogoutRedirectRoute: any = withRouter(connect(mapStateToProps, mapDispatchToProps)(LogoutRedirectRouteComponent) as any)

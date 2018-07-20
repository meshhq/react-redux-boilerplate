import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect, Dispatch } from 'react-redux'
import {
	Col,
	Row,
	Button,
	Table,
	Modal,
	Glyphicon,
	Form,
	FormGroup,
	ControlLabel,
	FormControl,
	InputGroup
} from 'react-bootstrap'

// State
import { IUserState } from '../../reducers/user'
import EmailForm from './EmailForm'
import PasswordForm from './PasswordForm'

// Actions
import { UserActions, UserDispatch } from '../../actions/user'

// State added to props after connect.
interface IConnectedState {
	userState: IUserState
}

// Actions added to props after connect.
interface IConnectedActions {
	userActions: UserDispatch
}

interface IComponentState {
	confirmation: string
	email: string
	password: string
}

type Props = IConnectedActions & IConnectedState
type State = IComponentState

class LoginViewComponent extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props)
		this.state = {
			confirmation: '',
			email: '',
			password: '',
		}
	}

	public render() {
		return (
			<Row className='login-container-row'>
				<Col className='login-container-col' xs={10} xsOffset={1} smOffset={4} sm={4}>

					<Row className='login-header-row'>
						<Col className='login-header-col'>
							<h1>Mesh Boilerplate</h1>
						</Col>
					</Row>

					<Row className='login-content-row'>
						<Col className='login-content-col'>
							{this.loginFormContent()}
						</Col>
					</Row>
				</Col>
			</Row>
		)
	}

	// ---------------------------------
	// Login Form
	// ---------------------------------

	private handleFormChange = (event: React.FormEvent<FormControl> & React.ChangeEvent<HTMLInputElement>) => {
		const target = event.currentTarget
		this.setState({
			[target.name]: target.value,
		} as Pick<IComponentState, 'confirmation' | 'email' | 'password'>)
	}

	private submitLogin = async (event?: React.FormEvent<FormControl>) => {
		const email = this.state.email
		const password = this.state.password
		const confirmation = this.state.confirmation
		if (password !== confirmation) {
			alert('Your passwords must match.')
			return
		}

		if (!email || email === '' || !password || password === '') {
			alert('You must provide both a username and password')
			return
		}

		try {
			await this.props.userActions.registerUser(email, password)
		} catch (e) {
			alert(`Error registering user: ${e}`)
		}
	}

	private loginFormContent = () => {
		return (
			<Form horizontal>
				<EmailForm
					name='email'
					value={this.state.email}
					placeholder='Email'
					onChange={this.handleFormChange}
				/>
				<PasswordForm
					name='password'
					value={this.state.password}
					placeholder='Password'
					onChange={this.handleFormChange}
				/>
				<PasswordForm
					name='confirmation'
					value={this.state.confirmation}
					placeholder='Confirm'
					onChange={this.handleFormChange}
				/>
				<FormGroup controlId='button' className='button-group'>
					<Col>
						<Button
							bsStyle='primary'
							className='login-button'
							onClick={this.submitLogin}>
							{'Sign In'}
						</Button>
					</Col>
				</FormGroup>
			</Form>
		)
	}
}

const mapStateToProps = (state: IConnectedState) => {
	return {
		userState: state.userState,
	}
}

const mapDispatchToProps = (dispatch: Dispatch<UserDispatch>) => {
	return {
		userActions: bindActionCreators(UserActions, dispatch),
	}
}

export const LoginComponent = connect(mapStateToProps, mapDispatchToProps)(LoginViewComponent)

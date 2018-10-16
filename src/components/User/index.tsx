import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect, Dispatch } from 'react-redux'

import {
	Button,
	Grid,
	Row,
	Col,
	Navbar,
	Nav,
	NavItem,
} from 'react-bootstrap'

// Components
import TableComponent from '../Shared/Table'

// State
import { IRootReducerState } from '../../reducers'
import { IUser, IUserState } from '../../reducers/user'

// Actions
import { UserActions, UserDispatch } from '../../actions/user'
import { Modal } from '../Shared/Modal'
import { UserForm } from '../Shared/Form/userForm'
import NoResource from '../Shared/NoResource'

// State added to props after connect.
interface IUserViewComponentState {
	showModal: boolean
	onModalSave: () => void
	modalContent: JSX.Element | string
	currentUserId: number
}

// Actions added to props after connect.
interface IUserViewComponentConnectProps {
	userState: IUserState
	userActions: UserDispatch
}

class UserViewComponent extends React.Component<IUserViewComponentConnectProps, IUserViewComponentState> {

	public firstNameValue: string
	public lastNameValue: string
	public emailValue: string

	constructor(props: IUserViewComponentConnectProps) {
		super(props)
		this.state = {
			currentUserId: null,
			modalContent: undefined,
			onModalSave: () => {}, // tslint:disable-line:no-empty
			showModal: false
		}
	}

	public componentWillMount() {
		this.props.userActions.fetchUsers()
	}

	public isValidEmail(email: string) {
		const EMAIL_REGEX = /[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/
		return EMAIL_REGEX.test(email.toLowerCase())
	}

	// ---------------------------------------
	// Event Handlers
	// ---------------------------------------

	public handleFirstNameChange = (e: React.FormEvent<HTMLInputElement>): void => {
		this.firstNameValue = e.currentTarget.value.trim()
	}

	public handleLastNameChange = (e: React.FormEvent<HTMLInputElement>): void => {
		this.lastNameValue = e.currentTarget.value.trim()
	}

	public handleEmailChange = (e: React.FormEvent<HTMLInputElement>): void => {
		this.emailValue = e.currentTarget.value.trim()
	}

	public handleNewClick = (): void => {
		this.setState({
			modalContent: this.showForm(),
			onModalSave: this.createNewUser,
			showModal: true
		})
	}

	public handleEditClick = (user: IUser): void => {
		this.setState({
			currentUserId: user.id,
			modalContent: this.showForm(),
			onModalSave: this.editUser,
			showModal: true
		})
	}

	public handleDeleteClick = (user: IUser): void => {
		this.setState({
			modalContent: this.showDeleteWarning(),
			onModalSave: () => this.deleteUser(user.id),
			showModal: true
		})
	}

	public closeModal = () => {
		this.setState({ showModal: false })
	}

	// ---------------------------------------
	// Actions
	// ---------------------------------------

	public createNewUser = () => {
		this.props.userActions.createUser(this.firstNameValue, this.lastNameValue, this.emailValue)
		this.closeModal()
	}

	public editUser = () => {
		this.props.userActions.updateUser(this.state.currentUserId, this.firstNameValue, this.lastNameValue, this.emailValue)
		this.closeModal()
	}

	public deleteUser = (userID: number) => {
		this.props.userActions.deleteUser(userID)
		this.closeModal()
	}

	// ---------------------------------------
	// Component Builders
	// ---------------------------------------

	public buildUserTable = () => {
		const tableHeaders = [
			{
				title: 'ID',
			},
			{
				title: 'First Name',
			},
			{
				title: 'Last Name',
			},
			{
				title: 'Email',
			},
			{
				title: 'Actions',
			},
		]

		return (
			<TableComponent
				tableHeaders={tableHeaders}
				buildTableRows={this.buildUserRows}
			/>
		)
	}

	public buildUserRows = () => {
		if (!this.props.userState) { return null }
		return this.props.userState.users.map((user: IUser) => {
			return(
			<tr key={user.id}>
			<td><div>{user.id}</div></td>
			<td><div>{user.firstName}</div></td>
			<td><div>{user.lastName}</div></td>
			<td><div>{user.email}</div></td>
			<td>
				<div>
				<Button className='btn-secondary' type='submit' onClick={() => this.handleEditClick(user)}>Edit</Button>
				<Button className='btn-secondary' type='submit' onClick={() => this.handleDeleteClick(user)}>Delete</Button>
				</div>
			</td>
			</tr>
			)
		})
	}

	/**
	 * UI Components
	 */

	public showForm = () => {
		return (
			<UserForm
				handleFirstNameChange={this.handleFirstNameChange}
				handleLastNameChange={this.handleLastNameChange}
				handleEmailChange={this.handleEmailChange}
			/>
		)
	}

	public renderModal = () => {
		return (
			<Modal
				showModal={this.state.showModal}
				handleSave={this.state.onModalSave}
				handleCancel={this.closeModal}
				renderContent={this.state.modalContent}
			/>
		)
	}

	public showDeleteWarning = () => {
		return(
			<div className='delete-warning'>
				{`Are you sure you want to delete this user ?`}
			</div>
		)
	}

	public showNavbar = () => {
		return (
			<Navbar className='navbar-container'>
				<Navbar.Brand className='navbar-brand'>
					Mesh Boilerplate
				</Navbar.Brand>
				<Nav className='nav-links'>
					<NavItem eventKey={1} href='/users'>
						Users
					</NavItem>
					<NavItem eventKey={2} href='/organizations'>
						Organizations
					</NavItem>
					<NavItem eventKey={2} href='#'>
					{/* add links as needed */}
					</NavItem>
				</Nav>
			</Navbar>
		)
	}

	public renderNoResourceComponent = () => {
		return(
			<div>
				 <NoResource />
			</div>
		)
	}

	/**
	 * Render
	 */
	public render() {
		return (
			<div className = 'users-container'>
				{this.showNavbar()}
				<div className='table-buttons'>
					<Button className='btn-new' type='submit' onClick={this.handleNewClick}>New</Button>
				</div>
				<div className = 'users-table-container' >
					<Grid>
						<Row className='users-row-container'>
							<Col lg={12}>
								{this.props.userState.users.length === 0 ? this.renderNoResourceComponent() : this.buildUserTable()}
							</Col>
						</Row>
					</Grid>
				</div>
				{this.renderModal()}
			</div>
		)
	}
}

const mapStateToProps = (state: IRootReducerState) => {
	return {
		userState: state.user,
	}
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		userActions: bindActionCreators(UserActions, dispatch)
	}
}

export const UserComponent = connect(mapStateToProps, mapDispatchToProps)(UserViewComponent)

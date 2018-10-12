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
import { Form } from '../Shared/Form'
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

	public fakeUserData: any  = [
		{id: 1, firstName: 'Domingo', lastName: 'Ryan', email: 'Letitia.Nitzsche@gmail.com'},
		{id: 2, firstName: 'Liliana', lastName: 'Kautzer', email: 'Melyna56@gmail.com'},
		{id: 3, firstName: 'Zena', lastName: 'Gaylord', email: 'Kirk.Kuhlman39@gmail.com'},
		{id: 4, firstName: 'Darby', lastName: 'Stamm', email: 'Madonna.Stracke22@hotmail.com'},
		{id: 5, firstName: 'Eddie', lastName: 'Little', email: 'Alek.Koelpin@gmail.com'},
		{id: 6, firstName: 'Taryn', lastName: 'Goldner', email: 'Oswald.Friesen71@hotmail.com'},
		{id: 7, firstName: 'David', lastName: 'Ernser', email: 'Cordelia.Fritsch94@gmail.com'},
		{id: 8, firstName: 'Gabriel', lastName: 'Considine', email: 'Coralie99@yahoo.com'},
		{id: 9, firstName: 'Damien', lastName: 'Zemlak', email: 'Vida_Lesch@hotmail.com'},
		{id: 10, firstName: 'Gus', lastName: 'Kling', email: 'Lucio.OHara@hotmail.com'},
	]

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

	public handleInputChange = (e: React.FormEvent<HTMLInputElement>): void => {
		this.firstNameValue = e.currentTarget.value.trim()
		this.lastNameValue = e.currentTarget.value.trim()
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
			<Form
				handleInputChange={this.handleInputChange}
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
					Brand Placeholder
				</Navbar.Brand>
				<Nav className='nav-links'>
					<NavItem eventKey={1} href='#'>
						Link
					</NavItem>
					<NavItem eventKey={2} href='#'>
						Link
					</NavItem>
					<NavItem eventKey={2} href='#'>
						Link
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
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
import { IOrganizationState, IOrganization } from '../../reducers/organization'

// Actions
import { OrganizationActions, OrganizationDispatch } from '../../actions/organization'
import { Modal } from '../Shared/Modal'
import { OrgForm } from '../Shared/Form/orgForm'
import NoResource from '../Shared/NoResource'

// State added to props after connect.
interface IOrganizationViewComponentState {
	showModal: boolean
	onModalSave: () => void
	modalContent: JSX.Element | string
	currentOrgId: number
	currentName: string
}

// Actions added to props after connect.
interface IOrganizationViewComponentConnectProps {
	organizationState: IOrganizationState
	organizationActions: OrganizationDispatch
}

class OrganizationViewComponent extends React.Component<IOrganizationViewComponentConnectProps, IOrganizationViewComponentState> {

	public nameValue: string
	public nameInput: any = React.createRef()

	constructor(props: IOrganizationViewComponentConnectProps) {
		super(props)
		this.state = {
			currentName: null,
			currentOrgId: null,
			modalContent: undefined,
			onModalSave: () => {}, // tslint:disable-line:no-empty
			showModal: false
		}
	}

	public componentWillMount() {
		this.props.organizationActions.fetchOrganizations()
	}

	// ---------------------------------------
	// Event Handlers
	// ---------------------------------------

	public handleInputChange = (e: React.FormEvent<HTMLInputElement>): void => {
		this.nameValue = e.currentTarget.value.trim()
	}

	public handleNewClick = (): void => {
		this.setState({
			modalContent: this.showForm(),
			onModalSave: this.createNewOrg,
			showModal: true
		})
	}

	public handleEditClick = (organization: IOrganization): void => {
		this.setState({
			currentName: organization.name,
			currentOrgId: organization.id,
			modalContent: this.showForm(),
			onModalSave: this.editOrg,
			showModal: true
		})
	}

	public handleDeleteClick = (organization: IOrganization): void => {
		this.setState({
			modalContent: this.showDeleteWarning(),
			onModalSave: () => this.deleteOrg(organization.id),
			showModal: true
		})
	}

	public closeModal = () => {
		this.setState({ showModal: false })
	}

	// ---------------------------------------
	// Actions
	// ---------------------------------------

	public createNewOrg = () => {
		this.props.organizationActions.createOrganization(this.nameValue)
		this.closeModal()
	}

	public editOrg = () => {
		this.props.organizationActions.updateOrganization(this.state.currentOrgId, this.nameValue)
		this.closeModal()
	}

	public deleteOrg = (orgID: number) => {
		this.props.organizationActions.deleteOrganization(orgID)
		this.closeModal()
	}

	// ---------------------------------------
	// Component Builders
	// ---------------------------------------

	public buildOrganizationTable = () => {
		const tableHeaders = [
			{
				title: 'ID',
			},
			{
				title: 'Name',
			},
			{
				title: 'Created',
			},
			{
				title: 'Updated',
			},
			{
				title: 'Actions',
			},
		]

		return (
			<TableComponent
				tableHeaders={tableHeaders}
				buildTableRows={this.buildOrganizationRows}
			/>
		)
	}

	public buildOrganizationRows = () => {
		if (!this.props.organizationState) { return null }
		return this.props.organizationState.organizations.map((org: IOrganization) => {
			return(
			<tr key={org.id}>
			<td><div>{org.id}</div></td>
			<td><div>{org.name}</div></td>
			<td><div>{org.created}</div></td>
			<td><div>{org.updated}</div></td>
			<td>
				<div>
				<Button className='btn-secondary' type='submit' onClick={() => this.handleEditClick(org)}>Edit</Button>
				<Button className='btn-secondary' type='submit' onClick={() => this.handleDeleteClick(org)}>Delete</Button>
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
			<OrgForm
				nameInput={this.state.currentOrgId}
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
				{`Are you sure you want to delete this organization ?`}
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
						{/* addtl link  */}
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
			<div className = 'organizations-container'>
				{this.showNavbar()}
				<div className='table-buttons'>
					<Button className='btn-new' type='submit' onClick={this.handleNewClick}>New</Button>
				</div>
				<div className = 'organizations-table-container' >
					<Grid>
						<Row className='organizations-row-container'>
							<Col lg={12}>
								{this.props.organizationState.organizations.length === 0 ? this.renderNoResourceComponent() : this.buildOrganizationTable()}
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
		organizationState: state.organization,
	}
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		organizationActions: bindActionCreators(OrganizationActions, dispatch)
	}
}

export const OrganizationComponent = connect(mapStateToProps, mapDispatchToProps)(OrganizationViewComponent)

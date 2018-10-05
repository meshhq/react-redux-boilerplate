import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect, Dispatch } from 'react-redux'

import {
	Button,
	Grid,
	Row,
	Col,
} from 'react-bootstrap'

// Components
import TableComponent from '../Shared/Table'

// State
import { IRootReducerState } from '../../reducers'
import { IOrganizationState} from '../../reducers/organization'

// Actions
import { OrganizationActions, OrganizationDispatch } from '../../actions/organization'
import { Modal } from '../Shared/Modal'
import { Form } from '../Shared/Form'

// State added to props after connect.
interface IConnectedState {
	organizationState: IOrganizationState,
	showModal: boolean
	currentId: number
}

// Actions added to props after connect.
interface IConnectedActions {
	organizationActions: OrganizationDispatch,
}

type Props = IConnectedActions & IConnectedState

class OrganizationViewComponent extends React.Component<Props, IConnectedState> {

	public nameValue: string

	constructor(props: Props) {
		super(props)
		this.state = {
			currentId: null,
			organizationState: null,
			showModal: false,
		}
	}

	public componentWillMount() {
		this.props.organizationActions.fetchOrganizations()
	}

	// ---------------------------------------
	// Event Handlers
	// ---------------------------------------

	public handleInputChange = (e: React.FormEvent<HTMLInputElement>): void => {
		this.nameValue = e.currentTarget.value
	}

	public setCurrentOrgID = (id: number) => {
		this.setState({
			currentId: id,
			showModal: true,
		})
	}

	public closeModal = () => {
		this.setState({ showModal: false })
	}

	public openModal = () => {
		this.setState({ showModal: true })
	}

	// ---------------------------------------
	// Actions
	// ---------------------------------------

	public createNewOrg = () => {
		this.props.organizationActions.createOrganization(this.nameValue)
		this.closeModal()
	}

	public editOrg = () => {
		this.props.organizationActions.updateOrganization(this.state.currentId, this.nameValue)
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
		return this.props.organizationState.organizations.map((org: any) => {
			const boundEditHandler = this.setCurrentOrgID.bind(this, org.id)
			return(
			<tr key={org.id}>
			{/* ID Cell */}
			<td><div>{org.id}</div></td>
			{/* Name Cell */}
			<td><div>{org.name}</div></td>
			{/* Created At Cell */}
			<td><div>{org.created}</div></td>
			{/* Updates At Cell */}
			<td><div>{org.updated}</div></td>
			{/* Actions Cell */}
			<td>
				<div>
				<Button bsStyle='primary' type='submit' onClick={boundEditHandler}>EDIT</Button>
				<Button bsStyle='danger' type='submit' onClick={() => this.deleteOrg(org.id)}>DELETE</Button>
				</div>
			</td>
			</tr>
			)
		})
	}

	/**
	 * UI Components
	 */

	public launchModal = () => {
		 if (!this.state.showModal) {
			return
		 }
		 return (
			<Modal
				handleSave={this.state.currentId ? this.editOrg : this.createNewOrg}
				handleCancel={this.closeModal}
				renderContent={this.showForm}
			/>
		 )
	 }

	public showForm = () => {
		return (
			<Form
				handleInputChange={this.handleInputChange}
			/>
		)
	}

	// public launchNewOrgModal = () => {
	// 	this.setState({
	// 		showModal: true
	// 	})
	// }

	/**
	 * Render
	 */
	public render() {
		return (
			< div className = '' >
			<Grid>
				<Row className=''>
					<Col lg={12}>
					<Button className='float-right' bsStyle='primary' type='submit' onClick={this.openModal}>NEW</Button>
					{this.launchModal()}
					{this.buildOrganizationTable()}
					</Col>
				</Row>
			</Grid>
			</div >
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

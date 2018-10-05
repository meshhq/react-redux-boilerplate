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

	public updateCurrentOrgID = (id: number) => {
		this.setState({
			currentId: id,
			showModal: true,
		})
	}

	public closeModal = () => {
		this.setState({ showModal: false })
	}

	// ---------------------------------------
	// Actions
	// ---------------------------------------

	public createNewOrg = (e: React.MouseEvent<Button>) => {
		e.preventDefault()
		this.props.organizationActions.createOrganization(this.nameValue)
		this.closeModal()
	}

	public editOrg = () => {
		this.props.organizationActions.updateOrganization(this.state.currentId, this.nameValue)
		this.closeModal()
	}

	public deleteOrg = () => {
		this.props.organizationActions.deleteOrganization(this.state.currentId)
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
		// TODO: handle pagination
		return this.props.organizationState.organizations.map((org: any) => {
			const boundEditHandler = this.updateCurrentOrgID.bind(this, org.id)
			const boundDeleteHandler = this.updateCurrentOrgID.bind(this, org.id)
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
				<Button bsStyle='danger' type='submit' onClick={boundDeleteHandler}>DELETE</Button>
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
				handleSave={this.editOrg}
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

	/**
	 * Render
	 */
	public render() {
		return (
			<div className=''>
			<Grid>
				<Row className=''>
					<Col lg={12}>
						{this.launchModal()}
					</Col>
				</Row>
				<Row className=''>
					<Col lg={12}>
						{this.buildOrganizationTable()}
					</Col>
				</Row>
			</Grid>
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

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
import { IOrganizationState, IOrganization } from '../../reducers/organization'

// Actions
import { OrganizationActions, OrganizationDispatch } from '../../actions/organization'
import Modal from '../Shared/Modal'

// State added to props after connect.
interface IConnectedState {
	organizationState: IOrganizationState,
}

// Actions added to props after connect.
interface IConnectedActions {
	organizationActions: OrganizationDispatch,
}

type Props = IConnectedActions & IConnectedState

class OrganizationViewComponent extends React.Component<Props> {
	constructor(props: Props) {
		super(props)
	}

	public componentWillMount() {
		this.props.organizationActions.fetchOrganizations()
	}

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
				{<span><Button bsStyle='primary'>EDIT</Button></span>}
				{<span><Button bsStyle='danger'>DELETE</Button></span>}
				</div>
			</td>
			</tr>
			)
		})
	}

	public render() {
		return (
			<div className=''>
			<Grid>
				<Row className=''>
					<Col lg={12}>
					<Modal/>
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

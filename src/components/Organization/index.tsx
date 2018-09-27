import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect, Dispatch } from 'react-redux'
import {
	Col,
	Row,
	Button,
	Form,
	FormGroup,
	FormControl,
		Table,
} from 'react-bootstrap'

// Components
import TableComponent from '../Shared/Table/TableComponent'
// import EmailForm from './EmailForm'
// import PasswordForm from './PasswordForm
// '
// // State
// import { IRootReducerState } from '../../reducers'
// import { IUserState } from '../../reducers/user'

// // Actions
// import { UserActions, UserDispatch } from '../../actions/user'
import { OrganizationActions } from '../../actions/organization'
import organization from '../../reducers/organization'

// // State added to props after connect.
// interface IConnectedState {
// 	userState: IUserState,
// }

// // Actions added to props after connect.
// interface IConnectedActions {
// 	userActions: UserDispatch,
// }

// interface IComponentState {
// 	confirmation: string
// 	email: string
// 	password: string
// }

type Props = any
type State = any

class OrganizationViewComponent extends React.Component<any, State> {
	constructor(props: any) {
		super(props)
		this.state = {
			organizations: [
				{name: 'name 1', orgID: 65, created: 1537996542, updated: 1537996542},
				{name: 'name 2', orgID: 53, created: 1537996482, updated: 1537996482},
				{name: 'name 3', orgID: 19, created: 1537996422, updated: 1537996422},
				{name: 'name 4', orgID: 19, created: 1537996362, updated: 1537996362},
				{name: 'name 5', orgID: 9, created: 1537996302, updated: 1537996302},
				{name: 'name 6', orgID: 90, created: 1537996242, updated: 1537996242},
				{name: 'name 7', orgID: 60, created: 1537996182, updated: 1537996182},
				{name: 'name 8', orgID: 6, created: 1537996122, updated: 1537996122},
				{name: 'name 9', orgID: 22, created: 1537996062, updated: 1537996062},
				{name: 'name 10', orgID: 21, created: 1537996002, updated: 1537996002},
				{name: 'name 11', orgID: 29, created: 1537995942, updated: 1537995942},
				{name: 'name 12', orgID: 2, created: 1537995882, updated: 1537995882},
				{name: 'name 13', orgID: 81, created: 1537995822, updated: 1537995822},
				{name: 'name 14', orgID: 21, created: 1537995762, updated: 1537995762},
				{name: 'name 15', orgID: 95, created: 1537995702, updated: 1537995702},
			],
		}
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
		if (!this.state.organizations) { return null }
		// handle pagination
		return this.state.organizations.map((org: any) => {
			return(
			<tr key={org.orgID}>
						{/* ID Cell */}
						<td><div>{org.orgID}</div></td>
			{/* Name Cell */}
			<td><div>{org.name}</div></td>
			{/* Created At Cell */}
			<td><div>{org.created}</div></td>
			{/* Updates At Cell */}
			<td><div>{org.updated}</div></td>
			{/* Actions Cell */}
			<td><div>{<span><Button>EDIT</Button></span>}{<span><Button>DELETE</Button></span>}</div></td>
			</tr>
				)
		})
	}

	public render() {
		return (
			<div className='table-component-container'>
			{this.buildOrganizationTable()}
			</div>
		)
	}
}

const mapStateToProps = (state: any) => {
	return {
		userState: state.user,
	}
}

const mapDispatchToProps = (dispatch: any) => {
	return {}
}

export const OrganizationComponent = connect(mapStateToProps, mapDispatchToProps)(OrganizationViewComponent)

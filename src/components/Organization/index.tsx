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

// // Components
// import EmailForm from './EmailForm'
// import PasswordForm from './PasswordForm
// '
// // State
// import { IRootReducerState } from '../../reducers'
// import { IUserState } from '../../reducers/user'

// // Actions
// import { UserActions, UserDispatch } from '../../actions/user'
import { OrganizationActions } from '../../actions/organization';

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

class OrganizationViewComponent extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props)
		this.state = {}
	}

	public render() {
		return (
			<div className='organization-container'>
						<Table striped bordered condensed hover>
  <thead>
    <tr>
      <th>#</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Username</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <td>3</td>
      <td colSpan={2}>Larry the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</Table>
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

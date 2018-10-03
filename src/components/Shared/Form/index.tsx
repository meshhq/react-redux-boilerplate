import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect, Dispatch } from 'react-redux'
import {
	Button
} from 'react-bootstrap'

import { IRootReducerState } from '../../../reducers'
import { IOrganizationState, IOrganization } from '../../../reducers/organization'
import { OrganizationActions, OrganizationDispatch } from '../../../actions/organization'

interface IConnectedState {
	organizationState: IOrganizationState,
}

interface IConnectedActions {
	organizationActions: OrganizationDispatch,
}

interface FormProps {
	dismissModal: () => void
	orgID?: number
}

type Props = IConnectedActions & IConnectedState & FormProps

// ---------------------------------
//  Form for New and Edit
// ---------------------------------

class FormComponent extends React.Component<Props, any> {
	constructor(props: Props) {
		super(props)
		this.state = {
			inputValue: '',
			name: ''
		}
	}

	public componentWillMount() {
		// tslint:disable-next-line:no-console
		console.log('component will mount', this.props)
	}
	// Grabs text from input field and updates name state
	public handleOnChange = (e: React.FormEvent<HTMLInputElement>): void => {
		this.setState({ name: e.currentTarget.value })
	}

	// Creates new org on button click, dismisses modal and updates list showing recently added on top
	public createNewOrg = (e: React.MouseEvent<Button>) => {
		e.preventDefault()
		this.props.organizationActions.createOrganization(this.state.name)
		this.setState({name: ''})
		this.props.dismissModal()
	}

	public editOrg = () => {
		// tslint:disable-next-line:no-console
		console.log('props', this.props)
		this.props.organizationActions.updateOrganization(this.props.orgID, this.state.name)
		this.setState({name: ''})
		this.props.dismissModal()
	}

	public render() {
		// tslint:disable-next-line:no-console
		console.log('form state', this.state)
		return (
			<div>
				<div>
					<label>
						Name:
					</label>
					<input
						type='text'
						value={this.state.name}
						placeholder='Enter name'
						onChange={this.handleOnChange}
					/>
				</div>
				<Button
					onClick={this.editOrg}
					bsStyle='success'
					type='submit'
				>
				Save
				</Button>
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

export const Form = connect(mapStateToProps, mapDispatchToProps)(FormComponent)

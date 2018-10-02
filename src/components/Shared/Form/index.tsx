import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect, Dispatch } from 'react-redux'
import {
	Button
} from 'react-bootstrap'

import { IRootReducerState } from '../../../reducers'
import { IOrganizationState } from '../../../reducers/organization'
import { OrganizationActions, OrganizationDispatch } from '../../../actions/organization'

interface IConnectedState {
	organizationState: IOrganizationState,
}

interface IConnectedActions {
	organizationActions: OrganizationDispatch,
}

interface FormProps {
	dismissModal: () => void
}

type Props = IConnectedActions & IConnectedState & FormProps

class FormComponent extends React.Component<Props, any> {
	constructor(props: Props) {
		super(props)
		this.state = this.initialState()
	}

	public initialState = () => {
		return { name: '' }
	}

	public handleOnChange = (e: React.FormEvent<HTMLInputElement>): void => {
		this.setState({ name: e.currentTarget.value })
	}

	public createNewOrg = (e: React.MouseEvent<Button>) => {
		e.preventDefault()
		this.props.organizationActions.createOrganization(this.state.name)
		this.setState(this.initialState())
		this.props.dismissModal()
	}

	public render() {
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
					onClick={this.createNewOrg}
					bsStyle='success'
					type='submit'
				>
				Create
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

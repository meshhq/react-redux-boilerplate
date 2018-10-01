import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect, Dispatch } from 'react-redux'
import {
	Button,
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
	saveHandler: () => void
}
type Props = IConnectedActions & IConnectedState & FormProps

class FormComponent extends React.Component<Props, any> {
	constructor(props: Props) {
		super(props)
		this.handleOnChange = this.handleOnChange.bind(this)
		this.createNewOrg = this.createNewOrg.bind(this)
		this.state = { name: '' }
	}

	public initialState() {
		return { name: '' }
	}

	public handleOnChange(event: any): void {
		this.setState({ name: event.target.value })
	}

	public createNewOrg(e: any) {
		e.preventDefault()
		this.props.organizationActions.createOrganization(this.state.name)
		this.setState(this.initialState())
		this.props.saveHandler()
	}

	public render() {
		return (
			<div>
				<div>
					<form>
						<input
							type='text'
							value={this.state.name}
							placeholder='Enter name'
							onChange={this.handleOnChange}
						/>
					</form>
				</div>
				<Button
					onClick={this.createNewOrg}
					bsStyle='success'
					type='submit'>
					Create
					</Button>
				<div>
					Name state is : {this.state.name} !
					</div>
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

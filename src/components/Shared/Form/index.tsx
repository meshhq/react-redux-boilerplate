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

type Props = IConnectedActions & IConnectedState

class FormComponent extends React.Component<Props, any> {
		constructor(props: Props ) {
			super(props)
			this.handleChange = this.handleChange.bind(this)
			this.handleOnChange = this.handleOnChange.bind(this)
			this.onSubmit = this.onSubmit.bind(this)
			this.state = { name: '' }
		}

	public handleOnChange(event: any): void {
		this.setState({ name: event.target.value })
	}

	public handleChange(e: any) {
		this.setState({ name: e.target.value })
	}

	public onSubmit(e: any) {
		e.preventDefault()
		this.props.organizationActions.createOrganization(name)
	}

	public render() {
		return (
				<div>
					<div>
						<form onSubmit={this.onSubmit}>
						<input
							onChange={ (e) => this.handleOnChange(e) }
						/>
						</form>
					</div>
					<Button bsStyle='success' type='submit'>Create</Button>
					<div>
						Hello { this.state.name }!
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

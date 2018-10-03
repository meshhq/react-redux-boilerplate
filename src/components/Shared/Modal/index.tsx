import * as React from 'react'
import * as ReactModal from 'react-modal'
import { bindActionCreators } from 'redux'
import { connect, Dispatch } from 'react-redux'
import {
	Button,
} from 'react-bootstrap'

// Components
import { Form } from '../Form'

import { IRootReducerState } from '../../../reducers'
import { IOrganizationState } from '../../../reducers/organization'
import { OrganizationActions, OrganizationDispatch } from '../../../actions/organization'

// Hides application from screenreaders and other assistive technologies while the modal is open.
ReactModal.setAppElement('#app')

interface IConnectedState {
	organizationState: IOrganizationState,
}

interface IConnectedActions {
	organizationActions: OrganizationDispatch,
}

interface ModalProps {
	renderForm: () => JSX.Element
	renderWarning?: () => JSX.Element
}

type Props = IConnectedActions & IConnectedState & ModalProps

// ---------------------------------
//  Modal for New organization
// ---------------------------------

class ModalViewComponent extends React.Component<Props, any> {
	constructor(props: Props) {
		super(props)
	}

	public render() {
		return (
			<div>
				<ReactModal
				isOpen={true}
				>
				{this.props.renderForm()}
				{/* {this.props.renderWarning()} */}
				</ReactModal>
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

export const Modal = connect(mapStateToProps, mapDispatchToProps)(ModalViewComponent)

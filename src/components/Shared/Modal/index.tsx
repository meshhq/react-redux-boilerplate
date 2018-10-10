import * as React from 'react'
import * as ReactModal from 'react-modal'
import { bindActionCreators } from 'redux'
import { connect, Dispatch } from 'react-redux'
import {
	Button,
} from 'react-bootstrap'

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
	showModal: boolean
	renderContent: JSX.Element | string
	renderWarning?: JSX.Element
	handleSave: () => void
	handleCancel: () => void
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
			<div id = 'modal-container'>
				<ReactModal
				className='modal-container'
				overlayClassName='modal-overlay'
				isOpen={this.props.showModal}
				>
				{this.props.renderContent}
				<div className='button-container'>
				<Button
					className='btn btn-secondary'
					onClick={this.props.handleCancel}
					type='submit'
				>
				Cancel
				</Button>
				<Button
					className='btn btn-success'
					onClick={this.props.handleSave}
					type='submit'
				>
				Submit
				</Button>
				</div>
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

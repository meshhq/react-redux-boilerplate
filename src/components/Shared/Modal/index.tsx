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
import { OrganizationActions } from '../../../actions/organization'

// Hides application from screenreaders and other assistive technologies while the modal is open.
ReactModal.setAppElement('#app')

class ModalViewComponent extends React.Component<any, any> {
	constructor() {
		super()
		this.state = {
			showModal: false
		}
	}

	public hideModal = () => {
		this.setState({ showModal: false })
	}

	public handleOpenModal = () => {
		this.setState({ showModal: true })
	}

	public handleCloseModal = () => {
		this.setState({ showModal: false })
	}

	public modalState = () => {
		const stateRef = this.state
		return stateRef.showModal
	}

	public render() {
		return (
			<div>
				<Button
					className='float-right'
					bsStyle='primary'
					onClick={this.handleOpenModal}>
					New
				</Button>
				<ReactModal isOpen={this.modalState()}>
					<Form dismissModal={this.hideModal}/>
					<Button
						className='float-right'
						bsStyle='primary'
						onClick={this.handleCloseModal}>
						Close
					</Button>
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

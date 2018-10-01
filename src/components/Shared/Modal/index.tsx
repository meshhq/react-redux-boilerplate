import * as React from 'react'
import * as ReactModal from 'react-modal'
import { bindActionCreators } from 'redux'
import { connect, Dispatch } from 'react-redux'
import {
	Button,
} from 'react-bootstrap'
import { Form } from '../Form'

import { IRootReducerState } from '../../../reducers'
import { IOrganizationState } from '../../../reducers/organization'
import { OrganizationActions, OrganizationDispatch } from '../../../actions/organization'

interface IConnectedState {
	organizationState: IOrganizationState,
}

interface IConnectedActions {
	organizationActions: OrganizationDispatch,
}

ReactModal.setAppElement('#app')

class ModalViewComponent extends React.Component<any, any> {
	constructor() {
		super()
		this.state = {
			showModal: false
		}
	}

	public handleSave = () => {
		this.setState({ showModal: false })
	}

	public handleOpenModal = () => {
		this.setState({ showModal: true })
	}

	public handleCloseModal = () => {
		this.setState({ showModal: false })
	}

	public modalState() {
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
					<Form saveHandler={this.handleSave}/>
					<Button
						className='float-right'
						bsStyle='primary'
						onClick={this.handleCloseModal}>
						Close Modal
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

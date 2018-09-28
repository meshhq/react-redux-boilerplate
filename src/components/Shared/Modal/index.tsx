import * as React from 'react'
import * as ReactModal from 'react-modal'
import {
	Button,
} from 'react-bootstrap'
import { Form } from '../Form'

ReactModal.setAppElement('#app')

export default class Modal extends React.Component<any, any> {
	constructor () {
		super()
		this.state = {
			showModal: false
		}
		this.handleOpenModal = this.handleOpenModal.bind(this)
		this.handleCloseModal = this.handleCloseModal.bind(this)
	}

	public handleOpenModal () {
		this.setState({ showModal: true })
	}

	public handleCloseModal () {
		this.setState({ showModal: false })
	}

	public modalState () {
		const stateRef = this.state
	 return stateRef.showModal
	}

	public render() {
		return (
			<div>
				<Button className='float-right' bsStyle='primary' onClick={this.handleOpenModal}>New</Button>
				<ReactModal
					isOpen={this.modalState()}
				>
				<Form/>
				<Button className='float-right' bsStyle='primary' onClick={this.handleCloseModal}>Close Modal</Button>
				</ReactModal>
			</div>
		)
	}
}

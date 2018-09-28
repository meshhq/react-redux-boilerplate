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
	Modal,
} from 'react-bootstrap'
import { Props } from 'react'

// State
import { IRootReducerState } from '../../../reducers'
import { IOrganizationState } from '../../../reducers/organization'

// Actions
import { OrganizationActions, OrganizationDispatch } from '../../../actions/organization'

class ModalViewComponent extends React.Component<any, any> {
		constructor(props: any) {
			super(props)

			this.handleHide = this.handleHide.bind(this)
			this.state = {
				show: false
			}
		}

		public handleHide() {
			this.setState({ show: false })
		}
		public render() {
			return (
				<div className='modal-container' style={{ height: 200 }}>
					<Button
						bsStyle='primary'
						bsSize='large'
						onClick={() => this.setState({ show: true })}
					>
						Launch contained modal
					</Button>

					<Modal
						show={this.state.show}
						onHide={this.handleHide}
						container={this}
						aria-labelledby='contained-modal-title'
					>
						<Modal.Header closeButton>
							<Modal.Title id='contained-modal-title'>
								Contained Modal
							</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							Elit est explicabo ipsum eaque dolorem blanditiis doloribus sed id
							ipsam, beatae, rem fuga id earum? Inventore et facilis obcaecati.
						</Modal.Body>
						<Modal.Footer>
							<Button onClick={this.handleHide}>Close</Button>
						</Modal.Footer>
					</Modal>
				</div>
			)
		}
	}

const mapStateToProps = (state: IRootReducerState) => {
	return {
		userState: state.user,
	}
}

const mapDispatchToProps = (dispatch: Dispatch<OrganizationDispatch>) => {
	return {
		organizationActions: bindActionCreators(OrganizationActions, dispatch),
	}
}

export const ModalComponent = connect(mapStateToProps, mapDispatchToProps)(ModalViewComponent)

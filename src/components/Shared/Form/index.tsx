import * as React from 'react'
import {
		ControlLabel,
		FormGroup,
		FormControl,
} from 'react-bootstrap'

class FormComponent extends React.Component<any, any> {
		constructor() {
			super()
			this.handleChange = this.handleChange.bind(this)
			this.state = {
				value: ''
			}
		}

		public getValidationState() {
			const length = this.state.value.length
			if (length > 1) { return 'success' }
			else if (length > 0) { return 'error' }
			return null
		}

		public handleChange(e: any) {
			this.setState({ value: e.target.value })
		}

		public render() {
			return (
				<form>
					<FormGroup
						controlId='formBasicText'
						validationState={this.getValidationState()}
					>
						<ControlLabel>Working example with validation</ControlLabel>
						<FormControl
							type='text'
							value={this.state.value}
							placeholder='Enter text'
							onChange={this.handleChange}
						/>
						<FormControl.Feedback />
					</FormGroup>
				</form>
			)
		}
	}

export const Form = FormComponent

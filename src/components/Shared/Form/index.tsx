import * as React from 'react'
import {
		ControlLabel,
		FormGroup,
		FormControl,
} from 'react-bootstrap'

class FormComponent extends React.Component<any, any> {
		constructor(props: any ) {
			super(props)
			this.handleChange = this.handleChange.bind(this)
			this.handleOnChange = this.handleOnChange.bind(this)
			this.state = { name: this.props.defaultName }
		}

		public handleOnChange(event: any): void {
			this.setState({ name: event.target.value })
		}

		public handleChange(e: any) {
			this.setState({ value: e.target.value })
		}

		public render() {
			return (
				<div>
					<div>
						<input
							onChange={ (e) => this.handleOnChange(e) }
						/>
					</div>
					<div>
						Hello { this.state.name }!
					</div>
				</div>
			)
		}
	}

export const Form = FormComponent

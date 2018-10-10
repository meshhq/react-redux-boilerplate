import * as React from 'react'
import {
	Button
} from 'react-bootstrap'

interface FormProps {
	handleInputChange: (e: React.FormEvent<HTMLInputElement>) => void
	inputValue?: string
}

type Props = FormProps

// ---------------------------------
//  Form for New and Edit
// ---------------------------------

class FormComponent extends React.Component<Props, any> {
	constructor(props: Props) {
		super(props)
		this.state = {}
	}

	public render() {
		return (
			<div className='form-fieldset'>
				<div className='form-group'>
					<label className='form-label'>
						Name:
					</label>
					<input
						type='text'
						name='name'
						placeholder='Enter name'
						onChange={this.props.handleInputChange}
						className='form-control'
						autoFocus={true}
						value={this.props.inputValue}
					/>
				</div>
			</div>
		)
	}
}

export const Form = FormComponent

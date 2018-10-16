import * as React from 'react'
import {
	Button
} from 'react-bootstrap'

interface FormProps {
		handleFirstNameChange: (e: React.FormEvent<HTMLInputElement>) => void
		handleLastNameChange: (e: React.FormEvent<HTMLInputElement>) => void
		handleEmailChange: (e: React.FormEvent<HTMLInputElement>) => void
	nameInput?: any
}

type Props = FormProps

// ---------------------------------
//  Form for New and Edit
// ---------------------------------

class UserFormComponent extends React.Component<Props, any> {
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
						name='first name'
						placeholder='Enter name'
						onChange={this.props.handleFirstNameChange}
						className='form-control'
						autoFocus={true}
					/>
										<label className='form-label'>
						Last Name:
					</label>
										<input
						type='text'
						name='last name'
						placeholder='Enter last name'
						onChange={this.props.handleLastNameChange}
						className='form-control'
					/>
										<label className='form-label'>
						Email:
					</label>
										<input
						type='email'
						name='email'
						placeholder='Enter email'
						onChange={this.props.handleEmailChange}
						className='form-control'
					/>
				</div>
			</div>
		)
	}
}

export const UserForm = UserFormComponent

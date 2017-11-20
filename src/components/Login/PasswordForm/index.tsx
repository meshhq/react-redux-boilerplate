import * as React from "react"
import { 
    FormGroup, InputGroup, Glyphicon, FormControl
} from 'react-bootstrap'

export interface PasswordFormOptions {
    name: string
    value: string
    placeholder: string
    onChange: any
}

const PasswordForm = (options: PasswordFormOptions) => {
    return (
        <FormGroup controlId={options.name}>
            <InputGroup>
                <InputGroup.Addon>
                    <Glyphicon glyph="lock" />
                </InputGroup.Addon>
                <FormControl
                    name={options.name}
                    value={options.value}
                    type="password"
                    placeholder={options.placeholder}
                    onChange={options.onChange}
                />
            </InputGroup>
        </FormGroup>
    )
}

export default PasswordForm

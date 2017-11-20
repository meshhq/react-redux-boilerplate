import * as React from "react"
import { 
    FormGroup, InputGroup, Glyphicon, FormControl
} from 'react-bootstrap'

export interface EmailFormOptions {
    name: string
    value: string
    placeholder: string
    onChange: any
}

const EmailForm = (options: EmailFormOptions) => {
    return (
        <FormGroup controlId={options.name}>
            <InputGroup>
                <InputGroup.Addon>
                    <Glyphicon glyph="envelope" />
                </InputGroup.Addon>
                <FormControl
                    name={options.name}
                    value={options.value}
                    type="text"
                    placeholder={options.placeholder}
                    onChange={options.onChange}
                />
            </InputGroup>
        </FormGroup>
    )
}

export default EmailForm

import * as React from 'react'

import {
	Col,
} from 'react-bootstrap'

const NoResource: React.SFC = () => {
	return (
		<div className='no-resource-container'>
            <Col lg={12}>
	            <h1 className='no-resource-title'>
                There are no organizations to display.
                </h1>
	            <h2 className='no-resource-subtitle'>
                Use the button to create one.
	            </h2>
            </Col>
		</div>
	)
}

export default NoResource

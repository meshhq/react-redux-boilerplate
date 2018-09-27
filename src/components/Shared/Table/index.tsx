// External Dependencies
import * as React from 'react'
import { connect } from 'react-redux'

import {
	Table
} from 'react-bootstrap'

// Internal Dependencies

// Interfaces
export interface TableHeader {
	title: string
}

interface TableProps {
	tableHeaders: TableHeader[]
	buildTableRows: any
}

export default class TableComponent extends React.Component<TableProps, any> {
	constructor(props: TableProps) {
		super(props)
		this.state = {}
	}

	public buildTableHeaders = () => {
		return this.props.tableHeaders.map((header: TableHeader) => {
			return <th className='' key={header.title}>{header.title}</th>
		})
	}

	public render() {
		return (
			<div className=''>
				<div className='table-container'>
					<Table className='table-content'>
							<thead>
								<tr>
									{this.buildTableHeaders()}
									{/* <th className='create-button-cell'><button onClick={this.props.createButtonHandler}>{this.props.createButtonName}</button></th> */}
								</tr>
							</thead>
							<tbody>
								{this.props.buildTableRows()}
							</tbody>
					</Table>
				</div>
			</div>
		)
	}
}

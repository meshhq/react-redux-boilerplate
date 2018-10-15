// External Dependencies
import * as React from 'react'
import {
	Table, Row, Col
} from 'react-bootstrap'

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
			<div className='table-responsive'>
				<div className='table-container'>
				<Row>
					<Col className='table-header' lg={12}>
						{ `change to users` }
					</Col>
				</Row>
					<Table className='table-content'>
							<thead>
								<tr>
									{this.buildTableHeaders()}
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

import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import './tableHeader.css';

function TableHeader() {
	return (
		<TableHead>
			<TableRow className="column-header">
				<TableCell className="header">
					ID
				</TableCell>
				<TableCell className="header">
					Zip
				</TableCell>
				<TableCell className="header">
					Street Name
				</TableCell>
			</TableRow>
		</TableHead>
	);
}

export default TableHeader;
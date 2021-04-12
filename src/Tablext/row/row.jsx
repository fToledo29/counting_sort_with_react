import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import './row.css';

function Row({id, zip,  streetName}){

	return(
		<TableRow className="row">
			<TableCell align="center" className="column">
				{id}
			</TableCell>
			<TableCell align="center" className="column">
				{zip}
			</TableCell>
			<TableCell align="center" className="column">
				{streetName}
			</TableCell>
		</TableRow>
	);

};

export default Row;
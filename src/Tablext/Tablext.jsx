import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import './Tablext.css';
import Row from './row/row';
import TableHeader from './tableHeader/tableHeader';


function Tablext({data}){

	return(
		<TableContainer>
			<Table
			className="table" 
			size="small" 
			aria-label="a dense table">
				<TableHeader />
				<TableBody>
					{data.length > 0 ? data.map((el, ind) => {
						return <Row 
						key={el.id + el.zip + ind}
						id={el.id} 
						zip={el.zip} 
						streetName={el.street_address} />
					}) : null}
				</TableBody>
			</Table>
		</TableContainer>
	);

};

export default Tablext;
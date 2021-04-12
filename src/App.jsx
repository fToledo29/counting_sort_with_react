import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import Tablext from './Tablext/Tablext';
import API from './api/addressApi';
import Helper from './utils/helper';
import './App.css';

function App() {

	let [data, changeData] = useState([]);

	const getMoreData = () => {
		API.getData().then((datax) => {
			changeData(datax.map(x => {
				return {
					street_address_num: x.street_address.split(' ')[0],
					street_address: x.street_address,
					id: x.id,
					zip: x.zip,
					street_name: x.street_name
				};
			}));
		}).catch(error => {
			console.log('Something happened: ', error);
		})
	};
	
	const sortData = () => {
		const sortedObj = Helper.sort(data, 'id');
		changeData(sortedObj.data);
		consoe.log('algorithm: ', sortedObj.algorithm)
	}

	useEffect(() => {
		getMoreData();
	}, []);



	return (
			<>
				<div className="main-body"> 
					<Button
					className="btn-refresh"
					onClick={() => getMoreData()} 
					variant="contained" 
					color="primary">
						Refresh Data
					</Button>
					<Button
					className="btn-sort"
					onClick={() => sortData()}
					variant="contained" 
					color="secondary">
						Sort Data
					</Button>
				
					<Tablext data={data}/>
				</div>
			</>
	);
}

export default App;
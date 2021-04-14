import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import Tablext from './Tablext/Tablext';
import API from './api/addressApi';
import Helper from './utils/helper';
import './App.css';
import { ALGORITHM_NAMES, ALGORITHM_NAMES_ARR } from './shared/constants';

function App() {

	const ADDRESS_DATA = 'addressData';
	const ALGO_NAME = 'algoName';

	let [data, changeData] = useState({[ADDRESS_DATA]: [], [ALGO_NAME]: ''});
	let [algoName, changeAlgo] = useState('Select');


	const getMoreData = () => {
		API.getData().then((datax) => {
			const newData = datax.map(x => {
				return {
					street_address_num: x.street_address.split(' ')[0],
					street_address: x.street_address,
					id: x.id,
					zip: x.zip,
					street_name: x.street_name
				};
			});

			updateStateProperty(newData, '');

		}).catch(error => {
			console.log('Something happened: ', error);
		})
	};

	const updateStateProperty = (newData, algoName) => {
		const dataCopy = {...data};
		dataCopy[ADDRESS_DATA] = newData;
		dataCopy[ALGO_NAME] = algoName;
		changeData({...data, ...dataCopy});
	}
	
	const sortData = () => {
		const sortedObj = Helper.sort(data.addressData, 'id', algoName);
		updateStateProperty(sortedObj.data, sortedObj.algorithm);
	}

	useEffect(() => {
		getMoreData();
	}, []);

	const onSelectChange = () => {

	}

	return (
			<>
				<div className="main-body"> 
					<Button
					className="btn-refresh elm-center"
					onClick={() => getMoreData()} 
					variant="contained" 
					color="primary">
						Refresh Data
					</Button>
					<Button
					disabled={algoName === 'Select'}
					className="btn-sort elm-center"
					onClick={() => sortData()}
					variant="contained" 
					color="secondary">
						Sort Data
					</Button>

					 <Select
					 className="elm-center"
					native
					value={algoName}
					onChange={(e => changeAlgo(e.target.value))}
					>
					<option aria-label="None" value="" />
					<option value={'Select'}>Select Algorithm</option>
					{ALGORITHM_NAMES_ARR.map((name, ind) => {
						return <option key={ind} value={name}>{name}</option>
					})}

					</Select>
					
					<label className="algo-name-lbl elm-center ">
						Algorithm: <span className="algo-name"> {data.algoName} </span>
					</label>
					
				
					<Tablext data={data.addressData}/>
				</div>
			</>
	);
}



export default App;
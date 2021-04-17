import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import Tablext from './Tablext/Tablext';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import API from './api/addressApi';
import Helper from './utils/helper';
import './App.css';
import { ALGORITHM_NAMES, ALGORITHM_NAMES_ARR } from './shared/constants';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function App() {

	const ADDRESS_DATA = 'addressData';
	const ALGO_NAME = 'algoName';
	const SELECT_KEY = 'Select';
	const classes = useStyles();
	let [data, changeData] = useState({[ADDRESS_DATA]: [], [ALGO_NAME]: ''});
	let [algoName, changeAlgo] = useState(SELECT_KEY);
	let [upToDateDataStatus, changeUpToDateDataStatus] = useState(false);
	let [open, setOpen] = React.useState(false);
	let [selectStatus, changeSelectStatus] = useState(false);
	let [dataSorted, changeDataSortedStatus] = useState(false);
	let [sortDuration, sortDurationStatus] = useState(0);

	const mapData = (comingData) => {
		return comingData.map(x => {
				return {
					street_address_num: x.street_address.split(' ')[0],
					street_address: x.street_address,
					id: x.id,
					zip: x.zip,
					street_name: x.street_name
				};
			});
	}

	const updateStateProperty = (newData, algoName) => {
		const dataCopy = {...data};
		dataCopy[ADDRESS_DATA] = newData;
		dataCopy[ALGO_NAME] = algoName;
		changeData({...data, ...dataCopy});
	}

	const getMoreData = () => {
		let newData = [];
		setOpen(true);
		updateStateProperty([], '');
		const allCalls = [API.getData(), API.getData(), API.getData(), API.getData(), API.getData()];
		Promise.all(allCalls).then((packs) => {
			packs.forEach(pack => {
				const moreData = pack ? mapData(pack) : [];
				newData = [...newData, ...moreData];
			});
			updateStateProperty(newData, '');
			changeUpToDateDataStatus(true);
			changeDataSortedStatus(false);
			setOpen(false);
			sortDurationStatus(0);
		}).catch(error => {
			setOpen(false);
			console.log('Something bad has happened :( ', error);
		});

	};
	
	const sortData = () => {
		setOpen(true);
		const t0 = performance.now()
		const sortedObj = Helper.sort(data.addressData, 'id', algoName);
		const t1 = performance.now()
		sortDurationStatus((t1 - t0))
		console.log(`Sorting with ${algoName}. took: ` + (t1 - t0) + " milliseconds.")
		updateStateProperty(sortedObj.data, sortedObj.algorithm);
		changeUpToDateDataStatus(false);
		changeDataSortedStatus(true);
		setOpen(false);
	}

	useEffect(() => {
		getMoreData();
	}, []);

	const onSelectChanges = (e) => {
		(algoName !== SELECT_KEY && dataSorted) ? changeUpToDateDataStatus(false) : null;
		changeAlgo(e.target.value);
		sortDurationStatus(0);
	}

	const isValidData = () => (algoName === SELECT_KEY) || !upToDateDataStatus;

	return (
			<>
				<Backdrop 
				className={classes.backdrop}
				open={open}>
					<CircularProgress color="inherit" />
				</Backdrop>

				<div className="main-body"> 
					<Button
					className="btn-refresh elm-center"
					onClick={() => getMoreData()} 
					variant="contained" 
					color="primary">
						Refresh Data
					</Button>
					<Button
					disabled={isValidData()}
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
					onChange={(e => onSelectChanges(e))}>
						<option aria-label="None" value="" />
						<option value={'Select'}>Select Algorithm</option>
						{ALGORITHM_NAMES_ARR.map((name, ind) => {
							return <option key={ind} value={name}>{name}</option>
						})}

					</Select>
					
					<label className="algo-name-lbl elm-center ">
						Items sorted by: <span className="font-bold"> {data.algoName} </span>
					</label>

					{sortDuration > 0 ? <label className="algo-name-lbl elm-center ">
						<div>Sorting with {algoName}. took:  {sortDuration} milliseconds.</div>
					</label> : null}

					<label className="algo-name-lbl elm-center ">
						Items: <span className="font-bold"> {data.addressData.length} </span>
					</label>

					{!upToDateDataStatus ? <label className="message elm-center ">
						<span className="font-bold"> Click on Refresh Data! </span>
					</label> : null}

					{algoName === SELECT_KEY ? <label className="message elm-center ">
						<span className="font-bold"> Select an algorithm! </span>
					</label> : null}
				
					<Tablext data={data.addressData}/>
				</div>
			</>
	);
}



export default App;
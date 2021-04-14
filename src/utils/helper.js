import { ALGORITHM_NAMES, ALGORITHM_NAMES_ARR } from '../shared/constants';

export default class Helper {

	static bucketSort(inpArr, property, pos) {

		const size = inpArr.length;

		let i = 0;
 
		const range = 10;

		let outputArr = [];

		const maxValue = inpArr.reduce((acc, val, ind) => acc > val[property] ? acc : val[property], 0);

		let bucketArr = Array.from({length: range}, () => []);

		while(i < size) {

			const index = parseInt((inpArr[i][property]  / pos) % 10, 10);

			bucketArr[index].push(inpArr[i]);

			i++;
		}

		i = 0;

		while(i < bucketArr.length) {

			let j = i;

			while(bucketArr[i].length > 0) {

				outputArr.push(bucketArr[i].shift());
			
			}

			i++;
		}

		pos = parseInt((pos * 10), 10);

		while(parseInt(maxValue / pos, 10) > 0) {
			outputArr = Helper.bucketSort(outputArr, property, pos);
			pos = parseInt((pos * 10), 10);
		}

		return outputArr;
	}

	static countingSort(arr = [], property) {
		const n = arr.length;

		let range = arr.reduce((acc, val) => acc > val[property] ? acc : val[property], 0);
	
		const countArr = Array.from({length: range + 1}, () => 0);

		const outputArr = Array.from({length: n}, () => undefined);

		let i = 0;

		while(i < n) {
			++countArr[arr[i][property]];
			i++;
		}

		i = 1;
		while(i <= range) {
			countArr[i] = countArr[i] + countArr[i - 1];
			i++;
		}

		i = n - 1;
		while(i >= 0) {
			outputArr[--countArr[arr[i][property]]] = arr[i];
			i--;
		}

		return outputArr;
	}

	static sort(data, property, algoName = '') {
		if (!data.length) {
			return { 
				data: [], 
				algorithm: `Please click "Refresh data"`,
			};
		}
	
		switch(algoName) {
			case ALGORITHM_NAMES.COUNTING_SORT:
				return {
					data: Helper.countingSort(data, property),
					algorithm: algoName
				};
			case ALGORITHM_NAMES.BUCKET_SORT:
				return {
					data: Helper.bucketSort(data, property, 1),
					algorithm: algoName
				};
			default:
				return { 
					data: [], 
					algorithm: 'Algorithm not implemented yet, please refresh and try another one!',
				};
		}
		
	}
}
import { ALGORITHM_NAMES, ALGORITHM_NAMES_ARR } from '../shared/constants';
import RadixSort from './radixSort';

export default class Helper extends RadixSort {

	static sort(data, property, algoName = '') {
		if (!data.length) {
			return { 
				data: [], 
				algorithm: `Please click "Refresh data"`,
			};
		}

		console.log('Algorithm selected: ', algoName);
	
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
			case ALGORITHM_NAMES.RADIX_SORT:
				return {
					data: Helper.radixSort(data, property),
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
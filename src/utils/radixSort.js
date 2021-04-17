import CountingSort from './countingSort';

export default class RadixSort extends CountingSort {
	static radixSort(arr, property) {

		const maxVal = arr.reduce((acc, val) => acc > val[property] ? acc : val[property], 0);           

		let base = 1;

		while(parseInt(maxVal / base, 10) > 0) {

			arr = RadixSort.countingSort(arr, property, base);

			base = parseInt((base * 10), 10);
		}

		return arr;

	}
}


import BucketSort from './bucketSort';

export default class CountingSort extends BucketSort {
	static countingSort(arr = [], property, base = 0) {

		const n = arr.length;

		let range = arr.reduce((acc, val) => acc > val[property] ? acc : val[property], 0);
	
		const countArr = Array.from({length: range + 1}, () => 0);

		const outputArr = Array.from({length: n}, () => undefined);

		let i = 0;

		while(i < n) {

			const position = base > 0 ? parseInt((arr[i][property] / base) %10, 10) : arr[i][property];

			++countArr[position];
			i++;
		}

		i = 1;
		while(i <= range) {
			countArr[i] = countArr[i] + countArr[i - 1];
			i++;
		}

		i = n - 1;
		while(i >= 0) {

			let countPoss = base > 0 ? parseInt((arr[i][property]/ base) % 10) : arr[i][property];

			outputArr[--countArr[countPoss]] = arr[i];
			i--;
		}

		return outputArr;
	}
}
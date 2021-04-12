
export default class Helper {

	static countingSort(arr = [], property) {
		const n = arr.length;

		const range = arr.reduce((acc, val) => acc > val[property] ? acc : val[property], 0);

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

	static sort(data, property) {
		return {
			data: Helper.countingSort(data, property),
			algorithm: Helper.countingSort.name
		};
	}
}
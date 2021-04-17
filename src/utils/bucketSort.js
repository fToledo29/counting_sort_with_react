
export default class BucketSort  {

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
			outputArr = BucketSort.bucketSort(outputArr, property, pos);
			pos = parseInt((pos * 10), 10);
		}

		return outputArr;
	}
}
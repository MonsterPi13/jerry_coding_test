# Jerry_coding_test

---

## Usage

**Required: Node.js environment.**

```shell
1. yarn|npm install
2. yarn|npm run start:tsc
3. yarn|npm run start:nodemon
```

**Run jest for test result**

```shell
yarn|npm run test
```

---

## Ideas

1. Storage data structure

   - Two-dimensional array
   - Define a private variable called rangeList to store rangeList in class

2. Add Function
   1. Each time, when a value want to insert into rangeList, For loop rangeList, compare currnet inserted value with current value in loop, define temporary variable called newRangeList to store refactored rangeList, at last newRangeList assigin to rangeList.
   2. Firstly, deal with boundary value, if current index in loop equals to the rangeList's length, insert into newRangeList directly and break loop. this situation occurred in rangeList is empty or reach to the end of rangeList.
   3. Secondly, deal with inserted range with current value don't have common part, using `rangeEnd < currentRangeStart` to judge, For loop the value after currentRange and insert into newRangeList.
   4. Thirdly, deal with old rangeList, when `rangeStart > currentRangeEnd`, insert current range into newRangeList.
   5. Lastly, deal with current range and inserted range have common part. Redefine rangeStart and rangeEnd with maximum range.

```JS
let rangeStart: number = range[0];
let rangeEnd: number = range[1];

const newRangeList: number[][] = [];
const rangeListLength: number = this.rangeList.length;

for (let i = 0; i <= rangeListLength; i++) {
	// When current rangeList is empty or current value should inersert after the last value in rangeList
	if (i === rangeListLength) {
		newRangeList.push([rangeStart, rangeEnd]);
		break;
	}

	const currnetRange = this.rangeList[i];
	const currentRangeStart = currnetRange[0];
	const currentRangeEnd = currnetRange[1];

	// Range and currnetRange have no common part.
	if (rangeEnd < currentRangeStart) {
		newRangeList.push([rangeStart, rangeEnd]);

		// Insert old rangeList
		while (i < rangeListLength) {
			newRangeList.push(this.rangeList[i++]);
		}
	}

	// Insert old rangeList
	else if (rangeStart > currentRangeEnd) {
		newRangeList.push(currnetRange);
	}

	// Range and currentRange have common part.
	else {
		rangeStart = Math.min(rangeStart, currentRangeStart);
		rangeEnd = Math.max(rangeEnd, currentRangeEnd);
	}
}

this.rangeList = newRangeList;
```

3. Remove Function:
   1. Like Add function, loop rangeList, first deal with uneffected range, using `rangeEnd <= currentRangeStart || rangeStart >= currentRangeEnd` to judge, insert currentRange into newRangeList.
   2. Then deal with effected range value. Calculate difference rangeList between inserted range and currentRange.

```JS
let rangeStart: number = range[0];
let rangeEnd: number = range[1];

const newRangeList: number[][] = [];
const rangeListLength: number = this.rangeList.length;

for (let i = 0; i < rangeListLength; i++) {
	const currentRange = this.rangeList[i];
	const currentRangeStart = currentRange[0];
	const currentRangeEnd = currentRange[1];

	// Like Add funcion, first deal with uneffect range
	if (rangeEnd <= currentRangeStart || rangeStart >= currentRangeEnd) {
		newRangeList.push(currentRange);
	} else {
		if (rangeStart > currentRangeStart) newRangeList.push([currentRangeStart, rangeStart]);
		if (rangeEnd < currentRangeEnd) newRangeList.push([rangeEnd, currentRangeEnd]);
	}
}

this.rangeList = newRangeList;
```

4. Print Function
   1. For loop rangeList, and convert array into string with required format.

```JS
let result = "";
this.rangeList.forEach((range) => {
	result += `[${range[0]}, ${range[1]}) `;
});
result = result.trim();

console.log(result);
```

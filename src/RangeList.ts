/**
 *
 * @description
 * =============================
 * Implement a class named 'RangeList'
 * A pair of integers define a range, for example: [1, 5).
 * This range includes integers: 1, 2, 3, and 4.
 * A range list is an aggregate of these ranges: [1, 5), [10, 11), [100, 201)
 * =============================
 * @author 阮鹏(AKA: k1ller13)
 *
 */

interface validInfo {
  isValid: Boolean;
  errorMessage?: String;
}

class RangeList {
  private rangeList: number[][] = [];

  /**
   * Check range value is valid
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   * @returns {boolean} - true: valid false: inValid
   */
  private isValidRangeFormat(range: number[]): validInfo {
    if (range.length !== 2) {
      return {
        isValid: false,
        errorMessage: `Range's length must be 2!`,
      };
    }

    if (range[0] > range[1]) {
      return {
        isValid: false,
        errorMessage: `The value in range, left value can't bigger than right value!`,
      };
    }

    return {
      isValid: true,
    };
  }

  /**
   * Adds a range to the list
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  add(range: number[]) {
    const validInfo = this.isValidRangeFormat(range);
    if (!validInfo.isValid) {
      return new Error(<string>validInfo.errorMessage);
    }

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
  }

  /**
   * Removes a range from the list
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  remove(range: number[]) {
    const validInfo = this.isValidRangeFormat(range);
    if (!validInfo.isValid) {
      return new Error(<string>validInfo.errorMessage);
    }

    let rangeStart: number = range[0];
    let rangeEnd: number = range[1];

    const newRangeList: number[][] = [];
    const rangeListLength: number = this.rangeList.length;

    for (let i = 0; i < rangeListLength; i++) {
      const currentRange = this.rangeList[i];
      const currentRangeStart = currentRange[0];
      const currentRangeEnd = currentRange[1];

      // Like Add funcion, first deal with uneffected range
      if (rangeEnd <= currentRangeStart || rangeStart >= currentRangeEnd) {
        newRangeList.push(currentRange);
      } else {
        if (rangeStart > currentRangeStart) newRangeList.push([currentRangeStart, rangeStart]);
        if (rangeEnd < currentRangeEnd) newRangeList.push([rangeEnd, currentRangeEnd]);
      }
    }

    this.rangeList = newRangeList;
  }

  /**
   * Prints out the list of ranges in the range list
   */
  print() {
    let result = "";
    this.rangeList.forEach((range) => {
      result += `[${range[0]}, ${range[1]}) `;
    });
    result = result.trim();

    console.log(result);

    return result;
  }
}

export default RangeList;

const rl = new RangeList();

rl.add([1, 5]);
rl.print();

rl.add([10, 20]);
rl.print();

rl.add([20, 20]);
rl.print();

rl.add([20, 21]);
rl.print();

rl.add([2, 4]);
rl.print();

rl.add([3, 8]);
rl.print();

rl.remove([10, 10]);
rl.print();

rl.remove([10, 11]);
rl.print();

rl.remove([15, 17]);
rl.print();

rl.remove([3, 19]);
rl.print();

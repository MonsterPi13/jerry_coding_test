import RangeList from "../src/RangeList";

describe("RangeList's remove function test", () => {
  const rl = new RangeList();
  rl.add([1, 5]);
  rl.add([10, 20]);
  rl.add([20, 20]);
  rl.add([20, 21]);
  rl.add([2, 4]);
  rl.add([3, 8]);

  it("Result should return error when inserted range's length is not equal to 2", () => {
    try {
      expect(rl.remove([10, 20, 30]));
    } catch (e) {
      expect(e).toBe(`The value in range, left value can't bigger than right value!`);
    }
  });

  it("Result should return error when inserted range's left value is bigger than right value", () => {
    try {
      const rl = new RangeList();
      rl.add([1, 5]);
      rl.add([10, 20]);
      rl.add([20, 20]);
      rl.add([20, 21]);
      rl.add([2, 4]);
      rl.add([3, 8]);

      rl.remove([20, 10]);
    } catch (e) {
      expect(e.message).toBe(`The value in range, left value can't bigger than right value!`);
    }
  });

  it("Result should return `[1, 8) [10, 21]` when removed range is `[10, 10]", () => {
    rl.remove([10, 10]);
    const result = rl.print();

    expect(result).toEqual("[1, 8) [10, 21)");
  });

  it("Result should return `[1, 8) [11, 21]` when removed range is `[10, 11]", () => {
    rl.remove([10, 11]);
    const result = rl.print();

    expect(result).toEqual("[1, 8) [11, 21)");
  });

  it("Result should return `[1, 8) [11, 15) [17, 21)` when removed range is `[15, 17]", () => {
    rl.remove([15, 17]);
    const result = rl.print();

    expect(result).toEqual("[1, 8) [11, 15) [17, 21)");
  });

  it("Result should return `[1, 8) [11, 15) [17, 21)` when removed range is `[3, 19]", () => {
    rl.remove([3, 19]);
    const result = rl.print();

    expect(result).toEqual("[1, 3) [19, 21)");
  });
});

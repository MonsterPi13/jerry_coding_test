import RangeList from "../src/RangeList";

describe("RangeList's add function test", () => {
  const rl = new RangeList();

  it("Result should return error when inserted range's length is not equal to 2", () => {
    try {
      rl.add([10, 20, 30]);
    } catch (e) {
      expect(e.message).toBe(`Range's length must be 2!`);
    }
  });

  it("Result should return error when inserted range's left value is bigger than right value", () => {
    try {
      rl.add([30, 10]);
    } catch (e) {
      expect(e.message).toBe(`The value in range, left value can't bigger than right value!`);
    }
  });

  it("Result should return `[1, 5)` when inserted range is `[1, 5]`", () => {
    rl.add([1, 5]);

    const result = rl.print();
    expect(result).toEqual("[1, 5)");
  });

  it("Result should return `[1, 5) [10, 20)` when inserted range is `[10, 20]`", () => {
    rl.add([10, 20]);

    const result = rl.print();
    expect(result).toEqual("[1, 5) [10, 20)");
  });

  it("Result should return `[1, 5) [10, 20)` when inserted range is `[20, 20]`", () => {
    rl.add([20, 20]);

    const result = rl.print();
    expect(result).toEqual("[1, 5) [10, 20)");
  });

  it("Result should return `[1, 5) [10, 21)` when inserted range is `[20, 21]`", () => {
    rl.add([20, 21]);

    const result = rl.print();
    expect(result).toEqual("[1, 5) [10, 21)");
  });

  it("Result should return `[1, 5) [10, 21)` when inserted range is `[2, 4]`", () => {
    rl.add([2, 4]);

    const result = rl.print();
    expect(result).toEqual("[1, 5) [10, 21)");
  });

  it("Result should return `[1, 8) [10, 21)` when inserted range is `[3, 8]`", () => {
    rl.add([3, 8]);

    const result = rl.print();
    expect(result).toEqual("[1, 8) [10, 21)");
  });
});

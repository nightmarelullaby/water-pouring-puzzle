import { describe, expect, test } from "vitest";
import { findOptimalPath } from "./pouringPathFinder";

describe("Water Pouring Function", () => {
  test("One of two last buckets should contain 4", () => {
    expect(findOptimalPath(10, 2, 4, true)).toStrictEqual([
      [0, 2],
      [2, 0],
      [2, 2],
      [4, 0],
    ]);
  });

  test("Large numbers", () => {
    expect(findOptimalPath(100, 236, 120, true)).toStrictEqual([
      [100, 0],
      [0, 100],
      [100, 100],
      [0, 200],
      [100, 200],
      [64, 236],
      [64, 0],
      [0, 64],
      [100, 64],
      [0, 164],
      [100, 164],
      [28, 236],
      [28, 0],
      [0, 28],
      [100, 28],
      [0, 128],
      [100, 128],
      [0, 228],
      [100, 228],
      [92, 236],
      [92, 0],
      [0, 92],
      [100, 92],
      [0, 192],
      [100, 192],
      [56, 236],
      [56, 0],
      [0, 56],
      [100, 56],
      [0, 156],
      [100, 156],
      [20, 236],
      [20, 0],
      [0, 20],
      [100, 20],
      [0, 120],
    ]);
  });
});

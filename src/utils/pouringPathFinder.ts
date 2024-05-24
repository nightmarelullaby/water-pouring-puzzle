import { Bucket, BucketState } from "../entity/bucket.entity";
import { gcd } from "./gcd";

export type resultType = BucketState[][];
export type PouringFinderType = [resultType | string, Bucket?, Bucket?];
export const findOptimalPath = (
  x: number,
  y: number,
  z: number,
  asArray?: boolean
): PouringFinderType | number[][] => {
  const a = pouringPathFinder(x, y, z);
  const b = pouringPathFinder(y, x, z);
  if (Array.isArray(b[0])) b[0].map((el) => el.reverse());
  if (asArray && Array.isArray(a[0]) && Array.isArray(b[0])) {
    if (a[0].length < b[0].length) {
      return a[0].map((bucket) => [bucket[0].current, bucket[1].current]);
    }
    if (b[0].length < a[0].length) {
      return b[0].map((bucket) => [bucket[0].current, bucket[1].current]);
    }
  }
  return a[0].length < b[0].length ? a : b;
};
export function checkIfPossible(x: number, y: number, z: number) {
  if ((x < z && y < z) || (z > x && z > y)) return false;
  if (x < z && y < z) return false;
  const isPossible = z / gcd(x, y);
  if (!Number.isInteger(isPossible)) return false;
  return true;
}
export function checkIfValid(x: number, y: number, z: number) {
  if (!Number.isInteger(x) || !Number.isInteger(y))
    return ["You must provide an integer"];
  if (x <= 0 || y <= 0) return ["Values must be greater than 0"];
  if (x < z && y < z)
    return ["Values must be greater or equal to desired amount"];
  return true;
}
export function pouringPathFinder(
  x: number,
  y: number,
  z: number
): PouringFinderType {
  const bucketX = new Bucket(x);
  const bucketY = new Bucket(y);
  const isValid = checkIfValid(x, y, z);
  if (!checkIfPossible(x, y, z)) return ["Not possible"];
  if (Array.isArray(isValid)) return [isValid[0], bucketX, bucketY];

  const acc1: resultType = [];
  const chekcIfBreak = () =>
    bucketX.getCurrent() === z || bucketY.getCurrent() === z;

  while (bucketX && bucketY) {
    if (bucketY.isEmpty()) {
      bucketY.fill();
      acc1.push([bucketX.getCurrentState(), bucketY.getCurrentState()]);
      if (chekcIfBreak()) break;
    }
    if (bucketX.isFull()) {
      bucketX.emptyBucket();
      acc1.push([bucketX.getCurrentState(), bucketY.getCurrentState()]);
      if (chekcIfBreak()) break;
    }
    if (chekcIfBreak()) break;
    bucketY.transferTo(bucketX);
    acc1.push([bucketX.getCurrentState(), bucketY.getCurrentState()]);
    if (chekcIfBreak()) break;
  }
  return [acc1, bucketX, bucketY];
}

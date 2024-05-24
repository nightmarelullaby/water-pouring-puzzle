type BucketStates = "EMPTY" | "FULL" | "PARTIAL-FULL" | "";
import { v4 as uuidv4 } from "uuid";
export type BucketState = {
  maxCapacity: number;
  current: number;
  state: string;
  key: string;
};
export class Bucket {
  maxCapacity: number;
  current: number = 0;
  state: BucketStates = "EMPTY";
  constructor(maxCapacity: number) {
    this.maxCapacity = maxCapacity;
  }
  getCurrentState(): BucketState {
    return {
      maxCapacity: this.maxCapacity,
      current: this.current,
      state: this.state,
      key: uuidv4(),
    };
  }
  fill() {
    this.setState("FULL");
    this.current = this.maxCapacity;
  }
  getState() {
    return this.state;
  }
  setState(val: BucketStates) {
    this.state = val;
  }
  transferTo(incomingBucket: Bucket) {
    if (incomingBucket.isFull()) {
      throw new Error("Provided bucket is already filled");
    }
    const inDiff = incomingBucket.maxCapacity - incomingBucket.current;
    if (this.current === 0) return;
    if (this.current <= inDiff) {
      incomingBucket.setAmount(incomingBucket.current + this.current);
      incomingBucket.setState("PARTIAL-FULL");
      this.emptyBucket();
      return this.setState("EMPTY");
    }
    this.setAmount(this.current - inDiff);
    this.setState("PARTIAL-FULL");

    incomingBucket.fill();
    return incomingBucket.setState("FULL");
  }
  public isFull() {
    return this.current === this.maxCapacity;
  }
  public isEmpty() {
    return this.current === 0;
  }
  private setAmount(val: number) {
    this.current = val;
  }
  public emptyBucket() {
    this.setState("EMPTY");
    this.current = 0;
  }
  getCurrent(): number {
    return this.current;
  }
}

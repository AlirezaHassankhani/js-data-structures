export abstract class Collection<T> implements Iterable<T> {
  abstract get size(): number;

  get isEmpty(): boolean {
    return this.size === 0;
  }

  abstract clear():void;

  abstract [Symbol.iterator](): Iterator<T>;
}

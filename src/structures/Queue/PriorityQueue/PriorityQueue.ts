import { Collection } from "../../../core/Collection";

export class PriorityQueue<T> extends Collection<T> {
  #size: number = 0;

  clear(): void {
    this.#size = 0;
  }

  get size(): number {
    return this.#size;
  }

  *[Symbol.iterator](): Iterator<T> {}
}

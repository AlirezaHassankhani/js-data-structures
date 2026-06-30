import { Collection } from "../core/Collection";

export class Stack<T> extends Collection<T> {
  #CAPACITY = 1000;
  #data: T[] = new Array(this.#CAPACITY);
  #size: number;

  constructor() {
    super();
    this.#size = -1;
  }

  get size(): number {
    return this.#size + 1;
  }

  get isEmpty(): boolean {
    return this.#size === -1;
  }

  clear(): void {
    this.#data = [];
    this.#size = -1;
  }

  *[Symbol.iterator]() {}
}

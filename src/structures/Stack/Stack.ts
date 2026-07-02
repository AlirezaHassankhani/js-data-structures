import { Collection } from "../../core/Collection";
import { EmptyCollectionError, IndexOutOfBoundError } from "../../core/errors";

export class Stack<T> extends Collection<T> {
  #CAPACITY = 1000;
  #data: (T | null)[];
  #size: number = -1;

  constructor(capacity: number) {
    super();
    let arr;
    if (capacity) arr = new Array(capacity).fill(null);
    else arr = new Array(this.#CAPACITY).fill(null);

    this.#data = arr;
  }

  get size(): number {
    return this.#size + 1;
  }

  get isEmpty(): boolean {
    return this.#size === -1;
  }

  top(): T | null {
    if (this.isEmpty) return null;
    return this.#data[this.#size];
  }

  pop(): T | null {
    if (this.isEmpty) throw new EmptyCollectionError();

    let target: T | null = this.#data[this.#size];
    this.#data[this.#size] = null;

    this.#size--;
    return target;
  }

  push(element: T) {
    if (this.#size === this.#data.length) throw new IndexOutOfBoundError();

    this.#data[++this.#size] = element;
  }

  clear(): void {
    this.#data = new Array(this.#CAPACITY).fill(null);
    this.#size = -1;
  }

  *[Symbol.iterator]() {}
}

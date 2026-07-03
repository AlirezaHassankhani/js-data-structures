import { Collection } from "../../core/Collection";
import { EmptyCollectionError, IndexOutOfBoundError } from "../../core/errors";

export class Stack<T> extends Collection<T> {
  readonly #DEFAULT_CAPACITY: number = 1000;
  #data: (T | null)[];
  #size: number = -1;

  constructor(capacity?: number) {
    super();

    this.#data = new Array(capacity ?? this.#DEFAULT_CAPACITY).fill(null);
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

  get size(): number {
    return this.#size + 1;
  }

  get isEmpty(): boolean {
    return this.#size === -1;
  }

  clear(): void {
    this.#size = -1;
    this.#data.fill(null);
  }

  *[Symbol.iterator](): Iterator<T> {
    for (let i = this.#size; i > -1; i--) {
      yield this.#data[i]!;
    }
  }
}

import { Collection } from "../../core/Collection";
import { EmptyCollectionError, IndexOutOfBoundError } from "../../core/errors";

export class Queue<T> extends Collection<T> {
  #CAPACITY: number = 1000;
  #data: (T | null)[];
  #size: number = 0;
  #f: number = 0;

  constructor(capacity: number) {
    super();

    let arr;
    if (capacity) arr = new Array(capacity).fill(null);
    else arr = new Array(this.#CAPACITY).fill(null);

    this.#data = arr;
  }

  dequeue(): T | null {
    if (this.isEmpty) throw new EmptyCollectionError();

    let target = this.#data[this.#f];
    this.#data[this.#f] = null;

    this.#f = (this.#f + 1) % this.#data.length;
    this.#size--;
    return target;
  }

  enqueue(element: T): void {
    if (this.#size === this.#data.length) throw new IndexOutOfBoundError();

    let avail = (this.#f + this.#size) % this.#data.length;
    this.#data[avail] = element;

    this.#size++;
  }

  first(): T | null {
    if (this.isEmpty) return null;
    return this.#data[this.#f];
  }

  get size(): number {
    return this.#size;
  }

  get isEmpty(): boolean {
    return this.#size === 0;
  }

  clear(): void {
    this.#size = 0;
  }

  *[Symbol.iterator]() {}
}

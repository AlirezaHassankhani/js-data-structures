import { Collection } from "../../core/Collection";
import { EmptyCollectionError, IndexOutOfBoundError } from "../../core/errors";

export class Deque<T> extends Collection<T> {
  readonly #DEFAULT_CAPACITY: number = 1000;
  #data: (T | null)[];
  #size: number = 0;
  #f: number = 0;

  constructor(capacity?: number) {
    super();

    this.#data = new Array(capacity ?? this.#DEFAULT_CAPACITY).fill(null);
  }

  addFirst(element: T): void {
    if (this.#size === this.#data.length) throw new IndexOutOfBoundError();

    const avail = (this.#f - 1 + this.#data.length) % this.#data.length;
    this.#data[avail] = element;
    this.#f = avail;

    this.#size++;
  }

  addLast(element: T): void {
    if (this.#size === this.#data.length) throw new IndexOutOfBoundError();

    let avail = (this.#f + this.#size) % this.#data.length;
    this.#data[avail] = element;

    this.#size++;
  }

  removeFirst(): T | null {
    if (this.isEmpty) throw new EmptyCollectionError();

    const target = this.#data[this.#f];
    this.#data[this.#f] = null;

    this.#f = (this.#f + 1) % this.#data.length;
    this.#size--;

    return target;
  }

  removeLast(): T | null {
    if (this.isEmpty) throw new EmptyCollectionError();

    const avail = (this.#f + this.#size - 1) % this.#data.length;
    const target = this.#data[avail];
    this.#data[avail] = null;

    this.#size--;
    return target;
  }

  first(): T | null {
    if (this.isEmpty) throw new EmptyCollectionError();
    return this.#data[this.#f];
  }

  last(): T | null {
    if (this.isEmpty) throw new EmptyCollectionError();
    const avail = (this.#f + this.#size - 1) % this.#data.length;
    return this.#data[avail];
  }

  get size(): number {
    return this.#size;
  }

  get isEmpty(): boolean {
    return this.#size === 0;
  }

  clear(): void {
    this.#size = 0;
    this.#f = 0;
    this.#data.fill(null);
  }

  *[Symbol.iterator](): Iterator<T> {
    for (let i = 0; this.#size > i; i++) {
      const avail = (this.#f + i) % this.#data.length;
      yield this.#data[avail]!;
    }
  }
}

import { Collection } from "../core/Collection";

export class Stack<T> extends Collection<T> {
  #CAPACITY = 1000;
  #data: (T | null)[] = new Array(this.#CAPACITY).fill(null);
  #size: number = -1;

  constructor() {
    super();
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
    if (this.isEmpty) return null;
    let target: T | null = this.#data[this.#size];
    this.#data[this.#size] = null;

    this.#size--;
    return target;
  }

  push(element: T) {
    this.#data[++this.#size] = element;
  }

  clear(): void {
    this.#data = new Array(this.#CAPACITY).fill(null);
    this.#size = -1;
  }

  *[Symbol.iterator]() {}
}

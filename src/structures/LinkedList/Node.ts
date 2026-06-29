export class Node<T> {
  #element: T | null;
  #next: Node<T> | null;
  #prev: Node<T> | null;

  constructor(element: T | null, next: Node<T> | null, prev: Node<T> | null) {
    this.#element = element;
    this.#next = next;
    this.#prev = prev;
  }

  get element(): T | null {
    return this.#element;
  }
  get next(): Node<T> | null {
    return this.#next;
  }
  get prev(): Node<T> | null {
    return this.#prev;
  }

  set next(next: Node<T> | null) {
    this.#next = next;
  }
  set prev(prev: Node<T> | null) {
    this.#prev = prev;
  }
}

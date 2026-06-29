export class Node<T> {
  #element: T;
  #next: Node<T>;
  #prev: Node<T>;

  constructor(element: T, next: Node<T>, prev: Node<T>) {
    this.#element = element;
    this.#next = next;
    this.#prev = prev;
  }

  get getElement(): T {
    return this.#element;
  }
  get getNext(): Node<T> {
    return this.#next;
  }
  get getPrev(): Node<T> {
    return this.#prev;
  }

  set setNext(next: Node<T>) {
    this.#next = next;
  }
  set setPrev(prev: Node<T>) {
    this.#prev = prev;
  }
}

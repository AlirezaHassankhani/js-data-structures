import { Collection } from "../core/Collection";
import { Node } from "./Node";

export class LinkedList<T> implements Collection<T> {
  #size: number;
  #header: Node<T>;
  #trailer: Node<T>;

  constructor() {
    this.#size = 0;
    this.#header = new Node<T>(null, null, null);
    this.#trailer = new Node<T>(null, this.#header, null);

    this.#header.next = this.#trailer;
  }

  get size(): number {
    return this.#size;
  }

  get isEmpty(): boolean {
    return this.#size === 0;
  }

  get first(): T | null {
    if (this.isEmpty) return null;

    return this.#header.next!.element;
  }

  get last(): T | null {
    if (this.isEmpty) return null;

    return this.#trailer.prev!.element;
  }

  addFirst(element: T): void {
    if (this.#header.next)
      this.#addBetween(element, this.#header, this.#header.next);
  }

  addLast(element: T): void {
    if (this.#trailer.prev)
      this.#addBetween(element, this.#trailer.prev, this.#trailer);
  }

  #addBetween(element: T, predecessor: Node<T>, successor: Node<T>): void {
    let newNode: Node<T> = new Node<T>(element, predecessor, successor);
    predecessor.next = newNode;
    successor.prev = newNode;
    this.#size++;
  }

  clear(): void {
    this.#size = 0;

    this.#header.next = this.#trailer;
    this.#trailer.prev = this.#header;
  }

  *[Symbol.iterator]() {}
}

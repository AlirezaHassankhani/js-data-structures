import { Collection } from "../../../core/Collection";
import { Node } from "../core/Node";

export class LinkedList<T> extends Collection<T> {
  #size: number = 0;
  #header: Node<T>;
  #trailer: Node<T>;

  constructor() {
    super();
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

  removeFirst(): T | null {
    if (this.isEmpty) return null;

    if (this.#header.next) return this.#remove(this.#header.next);
    return null;
  }

  removeLast(): T | null {
    if (this.isEmpty) return null;

    if (this.#trailer.prev) return this.#remove(this.#trailer.prev);
    return null;
  }

  #remove(node: Node<T>): T | null {
    let predecessor: Node<T> | null = node.prev;
    let successor: Node<T> | null = node.next;
    if (predecessor && successor) {
      predecessor.next = successor;
      successor.prev = predecessor;
    }

    this.#size--;
    return node.element;
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

  *[Symbol.iterator](): Iterator<T> {
    let current = this.#header.next;

    while (current !== this.#trailer) {
      yield current?.element!;
      current = current!.next;
    }
  }
}

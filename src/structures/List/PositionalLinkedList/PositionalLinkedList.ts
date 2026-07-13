import { Collection } from "../../../core/Collection";
import { IllegalArgumentException } from "../../../core/errors";
import { Position } from "../../../core/Position";
import { Node } from "../core/Node";

export class PositionalLinkedList<T> extends Collection<T> {
  #size: number = 0;
  #header: Node<T>;
  #trailer: Node<T>;

  constructor() {
    super();
    this.#header = new Node<T>(null, null, null);
    this.#trailer = new Node<T>(null, this.#header, null);

    this.#header.next = this.#trailer;
  }

  first(): Position<T> {
    return this.position(this.#header.next!);
  }

  last(): Position<T> {
    return this.position(this.#trailer.prev!);
  }

  before(p: Position<T>): Position<T> | null {
    const node = this.validate(p);
    return node.prev;
  }

  after(p: Position<T>): Position<T> | null {
    const node = this.validate(p);
    return node.next;
  }

  #addBetween(
    element: T,
    predecessor: Node<T>,
    successor: Node<T>,
  ): Position<T> {
    let newNode: Node<T> = new Node<T>(element, predecessor, successor);
    predecessor.next = newNode;
    successor.prev = newNode;
    this.#size++;

    return newNode;
  }

  addFirst(element: T): Position<T> {
    return this.#addBetween(element, this.#header, this.#header.next!);
  }
  addLast(element: T): Position<T> {
    return this.#addBetween(element, this.#trailer.prev!, this.#trailer);
  }

  addBefore(p: Position<T>, element: T): Position<T> {
    const node = this.validate(p);

    return this.#addBetween(element, node.prev!, node);
  }

  addAfter(p: Position<T>, element: T): Position<T> {
    const node = this.validate(p);

    return this.#addBetween(element, node, node.next!);
  }

  private validate(p: Position<T>): Node<T> {
    if (!(p instanceof Node))
      throw new IllegalArgumentException("Not valid position type");

    let node: Node<T> = p;

    if (node.next === null)
      throw new IllegalArgumentException("p is no longer in the tree");

    return node;
  }

  private position(p: Node<T>): Position<T> {
    if (p === this.#header || p === this.#trailer) return null;

    return p;
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

  get size(): number {
    return this.#size;
  }

  get isEmpty(): boolean {
    return this.#size === 0;
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

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

  first(): Position<T> | null {
    return this.position(this.#header.next!);
  }

  last(): Position<T> | null {
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

  private position(p: Node<T>): Position<T> | null {
    if (p === this.#header || p === this.#trailer) return null;

    return p;
  }

  remove(p: Position<T>): T | null {
    const node = this.validate(p);

    let predecessor = node.prev;
    let successor = node.next;

    if (predecessor && successor) {
      predecessor.next = successor;
      successor.prev = predecessor;
    }

    this.#size--;
    const answer = node.element;

    node.element = null;
    node.next = null;
    node.prev = null;

    return answer;
  }

  set(p: Position<T>, element: T): T | null {
    const node = this.validate(p);
    const answer = node.element;

    node.element = element;
    return answer;
  }

  *positions() {
    let current = this.#header.next;

    while (current !== this.#trailer) {
      const p: Position<T> | null = current;
      yield p;
      current = current!.next;
    }
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

import { Position } from "../core/Position";

export class BinaryTreeNode<E> implements Position<E> {
  #element: E;
  #parent: BinaryTreeNode<E> | null;
  #left: BinaryTreeNode<E> | null;
  #right: BinaryTreeNode<E> | null;

  constructor(
    element: E,
    parent: BinaryTreeNode<E> | null,
    left: BinaryTreeNode<E> | null,
    right: BinaryTreeNode<E> | null,
  ) {
    this.#element = element;
    this.#parent = parent;
    this.#left = left;
    this.#right = right;
  }

  // getter methods
  get element() {
    return this.#element;
  }

  get parent(): BinaryTreeNode<E> | null {
    return this.#parent;
  }
  get left(): BinaryTreeNode<E> | null {
    return this.#left;
  }
  get right(): BinaryTreeNode<E> | null {
    return this.#right;
  }

  // setter methods
  set element(element: E) {
    this.#element = element;
  }

  set parent(parent: BinaryTreeNode<E> | null) {
    this.#parent = parent;
  }
  set left(left: BinaryTreeNode<E> | null) {
    this.#left = left;
  }
  set right(right: BinaryTreeNode<E> | null) {
    this.#right = right;
  }
}

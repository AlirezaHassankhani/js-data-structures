import { Position } from "../core/AbstractTree";

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

  get parent() {
    return this.#parent;
  }
  get left() {
    return this.#left;
  }
  get right() {
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

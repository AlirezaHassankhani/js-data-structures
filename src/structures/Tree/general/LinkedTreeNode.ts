import { Position } from "../core/Position";

export class LinkedTreeNode<E> implements Position<E> {
  #element: E;
  #parent: LinkedTreeNode<E> | null;
  #children: LinkedTreeNode<E>[];

  constructor(
    element: E,
    parent: LinkedTreeNode<E> | null,
    children: LinkedTreeNode<E>[],
  ) {
    this.#element = element;
    this.#parent = parent;
    this.#children = children;
  }

  //getter
  get element(): E {
    return this.#element;
  }
  get parent(): LinkedTreeNode<E> | null {
    return this.#parent;
  }
  get children(): LinkedTreeNode<E>[] {
    return this.#children;
  }

  //setter
  set element(e: E) {
    this.#element = e;
  }
  set parent(arr: LinkedTreeNode<E>) {
    this.#parent = arr;
  }
}

import { IllegalArgumentException } from "../../../core/errors";
import { AbstractTree } from "../core/AbstractTree";
import { Position } from "../core/Position";
import { LinkedTreeNode } from "./LinkedTreeNode";

export class LinkedTree<T> extends AbstractTree<T> {
  #size: number = 0;
  #root: LinkedTreeNode<T> | null = null;

  protected validate(p: Position<T>): LinkedTreeNode<T> {
    if (!(p instanceof LinkedTreeNode))
      throw new IllegalArgumentException("Not valid position type");

    let node: LinkedTreeNode<T> = p;

    if (node.parent == node)
      throw new IllegalArgumentException("p is no longer in the tree");

    return node;
  }

  numChildren(p: Position<T>): number {
    return this.validate(p).children.length;
  }

  parent(p: Position<T>): Position<T> | null {
    return this.validate(p).parent;
  }

  children(p: Position<T>): Iterable<Position<T>> {
    return this.validate(p).children;
  }

  root(): Position<T> | null {
    return this.#root;
  }

  set(p: Position<T>, element: T): T {
    let node = this.validate(p);

    let temp = node.element;
    node.element = element;
    return temp;
  }

  addChildren(p: Position<T>, element: T): Position<T> {
    const parent = this.validate(p);
    const node = new LinkedTreeNode(element, parent, []);
    parent.addToChild(node);

    this.#size++;
    return node;
  }

  get size(): number {
    return this.#size;
  }

  clear(): void {
    this.#size = 0;
    this.#root = null;
  }

  *[Symbol.iterator](): Iterator<T> {}
}

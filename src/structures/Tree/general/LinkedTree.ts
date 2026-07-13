import {
  IllegalArgumentException,
  IllegalStateException,
} from "../../../core/errors";
import { AbstractTree } from "../core/AbstractTree";
import { Position } from "../../../core/Position";
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

  addRoot(element: T): Position<T> {
    if (this.#root !== null)
      throw new IllegalStateException("Tree is not empty");

    this.#root = new LinkedTreeNode(element, null, []);
    this.#size = 1;

    return this.#root;
  }

  set(p: Position<T>, element: T): T {
    let node = this.validate(p);

    let temp = node.element;
    node.element = element;
    return temp;
  }

  appendChild(p: Position<T>, element: T): Position<T> {
    const parent = this.validate(p);
    const node = new LinkedTreeNode(element, parent, []);
    parent.addChild(node);

    this.#size++;
    return node;
  }

  remove(p: Position<T>): T {
    const node = this.validate(p);

    if (node.parent) {
      const children = node.parent.children;
      const index = children.indexOf(node);

      if (index !== -1) children.splice(index, 1);
    } else {
      this.#root = null;
    }

    const removed = this.subtreeSize(node);
    this.#size -= removed;

    node.parent = node;

    return node.element;
  }

  private subtreeSize(node: LinkedTreeNode<T>): number {
    let count = 1;

    for (const child of node.children) count += this.subtreeSize(child);

    return count;
  }

  get size(): number {
    return this.#size;
  }

  clear(): void {
    this.#size = 0;
    this.#root = null;
  }
}

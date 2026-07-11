import {
  IllegalArgumentException,
  IllegalStateException,
} from "../../../core/errors";
import { Position } from "../core/Position";
import { BinaryTreeNode } from "./BinaryTreeNode";
import { AbstractBinaryTree } from "../core/AbstractBinaryTree";

export class LinkedBinaryTree<T> extends AbstractBinaryTree<T> {
  #root: BinaryTreeNode<T> | null = null;
  #size: number = 0;

  protected createNode(
    element: T,
    parent: BinaryTreeNode<T> | null,
    left: BinaryTreeNode<T> | null,
    right: BinaryTreeNode<T> | null,
  ): BinaryTreeNode<T> {
    return new BinaryTreeNode(element, parent, left, right);
  }

  protected validate(p: Position<T>): BinaryTreeNode<T> {
    if (!(p instanceof BinaryTreeNode))
      throw new IllegalArgumentException("Not valid position type");

    let node: BinaryTreeNode<T> = p;

    if (node.parent == node)
      throw new IllegalArgumentException("p is no longer in the tree");

    return node;
  }

  root(): Position<T> | null {
    return this.#root;
  }

  parent(p: Position<T>): Position<T> | null {
    let node: BinaryTreeNode<T> = this.validate(p);
    return node.parent;
  }

  left(p: Position<T>): Position<T> | null {
    let node: BinaryTreeNode<T> = this.validate(p);
    return node.left;
  }

  right(p: Position<T>): Position<T> | null {
    let node: BinaryTreeNode<T> = this.validate(p);
    return node.right;
  }

  addRoot(element: T): Position<T> {
    if (!this.isEmpty) throw new IllegalStateException("Tree is not empty");
    this.#root = this.createNode(element, null, null, null);
    this.#size = 1;

    return this.#root;
  }

  addLeft(p: Position<T>, element: T): Position<T> {
    let parent = this.validate(p);

    if (parent.left !== null)
      throw new IllegalArgumentException("p already has a left child");

    let child = this.createNode(element, parent, null, null);

    parent.left = child;
    this.#size++;

    return child;
  }

  addRight(p: Position<T>, element: T): Position<T> {
    let parent = this.validate(p);

    if (parent.right !== null)
      throw new IllegalArgumentException("p already has a right child");

    let child = this.createNode(element, parent, null, null);

    parent.right = child;
    this.#size++;

    return child;
  }

  set(p: Position<T>, element: T): T {
    let node = this.validate(p);

    let temp = node.element;
    node.element = element;
    return temp;
  }

  remove(p: Position<T>): T {
    let node = this.validate(p);

    if (this.numChildren(p) === 2)
      throw new IllegalArgumentException("p has two children");

    let child = node.left != null ? node.left : node.right;

    if (child != null) child.parent = node.parent;

    if (node === this.#root)
      this.#root = child; // if node is root
    else {
      let parent = node.parent!;
      if (node === parent.left) parent.left = child;
      else parent.right = child;
    }

    this.#size--;
    let temp = node.element;
    node.left = null;
    node.right = null;
    node.parent = node;
    return temp;
  }

  get size() {
    return this.#size;
  }

  clear() {
    this.#root = null;
    this.#size = 0;
  }

  *[Symbol.iterator](): Iterator<T> {}
}

import {
  IllegalArgumentException,
  IllegalStateException,
} from "../../../core/errors";
import { AbstractTree, Position } from "../core/AbstractTree";
import { BinaryTreeNode } from "./BinaryTreeNode";

export class BinaryTree<E> extends AbstractTree<E> {
  #root: BinaryTreeNode<E> | null = null;
  #size: number = 0;

  createNode(
    element: E,
    parent: BinaryTreeNode<E> | null,
    left: BinaryTreeNode<E> | null,
    right: BinaryTreeNode<E> | null,
  ): BinaryTreeNode<E> {
    return new BinaryTreeNode(element, parent, left, right);
  }

  validate(p: Position<E>): BinaryTreeNode<E> {
    if (!(p instanceof BinaryTreeNode))
      throw new IllegalArgumentException("Not valid position type");

    let node: BinaryTreeNode<E> = p;

    if (node.parent == node)
      throw new IllegalArgumentException("p is no longer in the tree");

    return node;
  }

  root(): Position<E> | null {
    return this.#root;
  }

  children(p: Position<E>): Iterable<Position<E>> {
    let snapshot: Position<E>[] = new Array(2);
    let left = this.left(p);
    let right = this.right(p);

    if (left != null) snapshot.push(left);
    if (right != null) snapshot.push(right);

    return snapshot;
  }

  parent(p: Position<E>) {
    let node: BinaryTreeNode<E> = this.validate(p);
    return node.parent;
  }
  left(p: Position<E>) {
    let node: BinaryTreeNode<E> = this.validate(p);
    return node.left;
  }
  right(p: Position<E>) {
    let node: BinaryTreeNode<E> = this.validate(p);
    return node.right;
  }

  addRoot(element: E): Position<E> {
    if (!this.isEmpty) throw new IllegalStateException("Tree is not empty");
    this.#root = this.createNode(element, null, null, null);
    this.#size = 1;

    return this.#root;
  }

  addLeft(p: Position<E>, element: E): Position<E> {
    let parent = this.validate(p);

    if (parent.left !== null)
      throw new IllegalArgumentException("p already has a left child");

    let child = this.createNode(element, parent, null, null);

    parent.left = child;
    this.#size++;

    return child;
  }

  addRight(p: Position<E>, element: E): Position<E> {
    let parent = this.validate(p);

    if (parent.right !== null)
      throw new IllegalArgumentException("p already has a right child");

    let child = this.createNode(element, parent, null, null);

    parent.right = child;
    this.#size++;

    return child;
  }

  set(p: Position<E>, element: E) {
    let node = this.validate(p);

    let temp = node.element;
    node.element = element;
    return temp;
  }

  numChildren(p: Position<E>): number {
    let count = 0;
    if (this.left(p) != null) count++;
    if (this.right(p) != null) count++;

    return count;
  }

  remove(p: Position<E>): E {
    let node = this.validate(p);

    if (this.numChildren(p) === 2)
      throw new IllegalArgumentException("p has two children");

    let child = node.left != null ? node.left : node.right;

    if (child != null) child.parent = node.parent;

    if (node == this.#root)
      this.#root = child; // if node is root
    else {
      let parent = node.parent!;
      if (node == parent.left) parent.left = child;
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
    this.#size = 0;
  }

  *[Symbol.iterator](): Iterator<E> {}
}

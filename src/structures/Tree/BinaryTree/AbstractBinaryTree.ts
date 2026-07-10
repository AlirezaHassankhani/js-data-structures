import { AbstractTree, Position } from "../core/AbstractTree";

export abstract class AbstractBinaryTree<T> extends AbstractTree<T> {
  abstract left(p: Position<T>): Position<T> | null;
  abstract right(p: Position<T>): Position<T> | null;

  children(p: Position<T>): Iterable<Position<T>> {
    let snapshot: Position<T>[] = new Array(2);
    let left = this.left(p);
    let right = this.right(p);

    if (left != null) snapshot[0] = left;
    if (right != null) snapshot[1] = right;

    return snapshot;
  }

  numChildren(p: Position<T>): number {
    let count = 0;
    if (this.left(p) != null) count++;
    if (this.right(p) != null) count++;

    return count;
  }
}

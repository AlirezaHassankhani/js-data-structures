import { AbstractTree } from "../core/AbstractTree";
import { Position } from "./Position";

export abstract class AbstractBinaryTree<T> extends AbstractTree<T> {
  abstract left(p: Position<T>): Position<T> | null;
  abstract right(p: Position<T>): Position<T> | null;

  children(p: Position<T>): Iterable<Position<T>> {
    let snapshot: Position<T>[] = [];
    let left = this.left(p);
    let right = this.right(p);

    if (left != null) snapshot.push(left);
    if (right != null) snapshot.push(right);

    return snapshot;
  }

  numChildren(p: Position<T>): number {
    const left = this.left(p);
    const right = this.right(p);

    let count = 0;
    if (left) count++;
    if (right) count++;

    return count;
  }

  sibling(p: Position<T>): Position<T> | null {
    let parent = this.parent(p);

    if (parent == null) return null;
    if (p == this.left(p)) return this.right(p);
    else return this.left(parent);
  }
}

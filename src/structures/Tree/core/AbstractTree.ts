import { Collection } from "../../../core/Collection";
import { Position } from "../../../core/Position";

export abstract class AbstractTree<E> extends Collection<E> {
  abstract numChildren(p: Position<E>): number;
  abstract root(): Position<E> | null;
  abstract parent(p: Position<E>): Position<E> | null;
  abstract children(p: Position<E>): Iterable<Position<E>>;

  isInternal(p: Position<E>): boolean {
    return this.numChildren(p) > 0;
  }

  isExternal(p: Position<E>): boolean {
    return this.numChildren(p) === 0;
  }

  isRoot(p: Position<E>): boolean {
    return p === this.root();
  }

  depth(p: Position<E>): number {
    if (this.isRoot(p)) return 0;
    else return 1 + this.depth(this.parent(p)!);
  }

  height(p: Position<E>): number {
    let h = 0;

    for (let c of this.children(p)) h = Math.max(h, 1 + this.height(c));

    return h;
  }

  #preorderSubtree(p: Position<E>, snapshot: Position<E>[]): void {
    snapshot.push(p);
    for (const c of this.children(p)) this.#preorderSubtree(c, snapshot);
  }

  preorder(): Iterable<Position<E>> {
    const root = this.root();

    const snapshot: Position<E>[] = [];

    if (root !== null) this.#preorderSubtree(root, snapshot);

    return snapshot;
  }

  #postorderSubtree(p: Position<E>, snapshot: Position<E>[]): void {
    for (const c of this.children(p)) this.#postorderSubtree(c, snapshot);

    snapshot.push(p);
  }

  postorder(): Iterable<Position<E>> {
    const root = this.root();

    const snapshot: Position<E>[] = [];

    if (root !== null) this.#postorderSubtree(root, snapshot);

    return snapshot;
  }

  *[Symbol.iterator](): Iterator<E> {
    for (const p of this.preorder()) {
      yield p.element;
    }
  }
}

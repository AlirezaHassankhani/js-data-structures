import { Collection } from "../../../core/Collection";
import { Position } from "./Position";

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
}

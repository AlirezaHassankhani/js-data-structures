import { Collection } from "../../../core/Collection";

export interface Position<E> {
  get element(): E;
}

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
}

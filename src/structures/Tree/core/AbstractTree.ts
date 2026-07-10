import { Collection } from "../../../core/Collection";

export interface Position<E> {
  get element(): E;
}

export abstract class AbstractTree<E> extends Collection<E> {
  abstract numChildren(p: Position<E>): number;
  abstract root(): Position<E> | null;

  isInternal(p: Position<E>) {
    return this.numChildren(p) > 0;
  }

  isExternal(p: Position<E>) {
    return this.numChildren(p) === 0;
  }

  isRoot(p: Position<E>) {
    return p == this.root();
  }
}

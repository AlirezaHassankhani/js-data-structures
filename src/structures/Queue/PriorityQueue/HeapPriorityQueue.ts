import { AbstractPriorityQueue } from "./core/AbstractPriorityQueue";

export class HeapPriorityQueue<K, V> extends AbstractPriorityQueue<K, V> {
  #heap: [] = [];

  protected parent(j: number): number {
    return (j - 1) / 2;
  }
  protected left(j: number): number {
    return 2 * j + 1;
  }
  protected right(j: number): number {
    return 2 * j + 2;
  }

  protected hasLeft(j: number): boolean {
    return this.left(j) < this.#heap.length;
  }
  protected hasRight(j: number): boolean {
    return this.right(j) < this.#heap.length;
  }

  clear(): void {
    this.#heap = [];
  }

  get size(): number {
    return this.#heap.length;
  }
}

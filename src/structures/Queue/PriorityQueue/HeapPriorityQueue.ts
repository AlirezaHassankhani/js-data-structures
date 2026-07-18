import { AbstractPriorityQueue } from "./core/AbstractPriorityQueue";
import { PQEntry } from "./core/PQEntry";

export class HeapPriorityQueue<K, V> extends AbstractPriorityQueue<K, V> {
  #heap: PQEntry<K, V>[] = [];

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

  protected swap(i: number, j: number): void {
    const temp = this.#heap[i];

    this.#heap[i] = this.#heap[j];
    this.#heap[j] = temp;
  }

  protected upHeap(i: number): void {
    while (i > 0) {
      let p = this.parent(i);
      if (this.compare(this.#heap[i], this.#heap[p]) >= 0) break;

      this.swap(i, p);
      i = p;
    }
  }

  protected downHeap(i: number): void {
    while (this.hasLeft(i)) {
      let leftIndex = this.left(i);
      let smallChildIndex = leftIndex;
      if (this.hasRight(i)) {
        let rightIndex = this.right(i);
        if (this.compare(this.#heap[leftIndex], this.#heap[rightIndex]) > 0)
          smallChildIndex = rightIndex;
      }
      if (this.compare(this.#heap[smallChildIndex], this.#heap[i]) >= 0) break;
      this.swap(i, smallChildIndex);
      i = smallChildIndex;
    }
  }

  clear(): void {
    this.#heap = [];
  }

  get size(): number {
    return this.#heap.length;
  }

  *[Symbol.iterator](): Iterator<PQEntry<K, V>> {
    for (const entry of this.#heap) yield entry;
  }
}

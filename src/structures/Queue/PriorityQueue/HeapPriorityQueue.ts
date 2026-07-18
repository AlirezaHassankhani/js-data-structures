import { Comparator } from "../../../core/Comparator";
import { AbstractPriorityQueue } from "./core/AbstractPriorityQueue";
import { PQEntry } from "./core/PQEntry";

export class HeapPriorityQueue<K, V> extends AbstractPriorityQueue<K, V> {
  #heap: PQEntry<K, V>[] = [];

  constructor(
    c: Comparator<K>,
    entries: PQEntry<K, V>[]
) {
    super(c);

    this.#heap = [...entries];
    this.heapify();
}

  protected parent(j: number): number {
    return Math.floor((j - 1) / 2);
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
    [this.#heap[i], this.#heap[j]] = [this.#heap[j], this.#heap[i]];
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

  min(): PQEntry<K, V> | null {
    if (this.isEmpty) return null;
    return this.#heap[0];
  }

  insert(key: K, value: V): PQEntry<K, V> {
    this.checkKey(key);
    const entry = new PQEntry(key, value);
    this.#heap.push(entry);
    this.upHeap(this.size - 1);

    return entry;
  }

  removeMin(): PQEntry<K, V> | null {
    if (this.isEmpty) return null;
    const entry = this.#heap[0];
    this.swap(0, this.size - 1);

    this.#heap.pop();

    if (!this.isEmpty) this.downHeap(0);

    return entry;
  }

  protected heapify(): void {
    for (let i = this.parent(this.size - 1); i >= 0; i--)
        this.downHeap(i);
}

  clear(): void {
    this.#heap.length = 0;
  }

  get size(): number {
    return this.#heap.length;
  }

  *[Symbol.iterator](): Iterator<PQEntry<K, V>> {
    for (const entry of this.#heap) yield entry;
  }
}

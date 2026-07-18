import { Comparator } from "../../../core/Comparator";
import { Position } from "../../../core/Position";
import { PositionalLinkedList } from "../../List";
import { AbstractPriorityQueue } from "./core/AbstractPriorityQueue";
import { PQEntry } from "./core/PQEntry";

export class UnsortedPriorityQueue<K, V> extends AbstractPriorityQueue<K, V> {
  #list = new PositionalLinkedList<PQEntry<K, V>>();

  constructor(c: Comparator<K>) {
    super(c);
  }

  protected findMin(): Position<PQEntry<K, V>> | null {
    let small = this.#list.first();

    for (const walk of this.#list.positions())
      if (this.compare(walk?.element!, small!.element!) < 0) small = walk;

    return small;
  }

  insert(key: K, value: V): PQEntry<K, V> {
    this.checkKey(key);

    const entry = new PQEntry(key, value);
    this.#list.addLast(entry);

    return entry;
  }

  min(): PQEntry<K, V> | null {
    if (this.isEmpty) return null;
    return this.findMin()!.element;
  }

  removeMin(): PQEntry<K, V> | null {
    if (this.isEmpty) return null;
    return this.#list.remove(this.findMin()!);
  }

  clear(): void {
    this.#list.clear();
  }

  get size(): number {
    return this.#list.size;
  }

  *[Symbol.iterator](): Iterator<PQEntry<K, V>> {
    for (const walk of this.#list) yield walk;
  }
}
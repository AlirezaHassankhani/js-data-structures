import { Comparator } from "../../../core/Comparator";
import { Position } from "../../../core/Position";
import { PositionalLinkedList } from "../../List";
import { AbstractPriorityQueue } from "./core/AbstractPriorityQueue";
import { PQEntry } from "./core/PQEntry";

export class SortedPriorityQueue<K, V> extends AbstractPriorityQueue<K, V> {
  #list = new PositionalLinkedList<PQEntry<K, V>>();

  constructor(c: Comparator<K>) {
    super(c);
  }

  insert(key: K, value: V): PQEntry<K, V> {
    this.checkKey(key);
    const entry = new PQEntry(key, value);
    let walk: Position<PQEntry<K, V>> | null = this.#list.last();

    while (walk !== null && this.compare(entry, walk.element!) < 0)
      walk = this.#list.before(walk);

    if (walk === null) this.#list.addFirst(entry);
    else this.#list.addAfter(walk, entry);

    return entry;
  }

  min(): PQEntry<K, V> | null {
    if (this.isEmpty) return null;
    return this.#list.first()?.element!;
  }

  removeMin(): PQEntry<K, V> | null {
    if (this.isEmpty) return null;
    return this.#list.remove(this.#list.first()!);
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

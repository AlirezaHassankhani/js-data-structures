import { Collection } from "../../../core/Collection";
import { Comparator } from "../../../core/Comparator";
import { IllegalArgumentException } from "../../../core/errors";
import { Position } from "../../../core/Position";
import { PositionalLinkedList } from "../../List";
import { PQEntry } from "./PQEntry";

export class PriorityQueue<K, V> extends Collection<PQEntry<K, V>> {
  #comp: Comparator<K>;
  #list = new PositionalLinkedList<PQEntry<K, V>>();

  constructor(c: Comparator<K>) {
    super();
    this.#comp = c;
  }

  protected compare(a: PQEntry<K, V>, b: PQEntry<K, V>): number {
    return this.#comp.compare(a.key, b.key);
  }

  #checkKey(key: K) {
    try {
      return this.#comp.compare(key, key);
    } catch (e) {
      throw new IllegalArgumentException("Incompatible key");
    }
  }

  insert(key: K, value: V): PQEntry<K, V> {
    this.#checkKey(key);
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

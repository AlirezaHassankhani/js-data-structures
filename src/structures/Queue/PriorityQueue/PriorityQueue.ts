import { Collection } from "../../../core/Collection";
import { Comparator } from "../../../core/Comparator";
import { IllegalArgumentException } from "../../../core/errors";
import { Position } from "../../../core/Position";
import { PositionalLinkedList } from "../../List";
import { PQEntry } from "./PQEntry";

export class PriorityQueue<K, V>
  extends Collection<PQEntry<K, V>>
  implements Comparator<PQEntry<K, V>>
{
  #size: number = 0;
  #comp: Comparator<K>;
  #list = new PositionalLinkedList<PQEntry<K, V>>();

  constructor(c: Comparator<K>) {
    super();
    this.#comp = c;
  }

  compare(a: PQEntry<K, V>, b: PQEntry<K, V>): number {
    return this.#comp.compare(a.key, b.key);
  }

  #checkKey(key: K) {
    try {
      return this.#comp.compare(key, key);
    } catch (e) {
      throw new IllegalArgumentException("Incompatible key");
    }
  }

  #findMin(): Position<PQEntry<K, V>> | null {
    let small = this.#list.first();
    let a = this.#list.positions();

    for (const walk of a)
      if (this.compare(walk?.element!, small?.element!) < 0) small = walk;

    return small;
  }

  clear(): void {
    this.#size = 0;
  }

  get size(): number {
    return this.#size;
  }

  *[Symbol.iterator](): Iterator<PQEntry<K, V>> {}
}

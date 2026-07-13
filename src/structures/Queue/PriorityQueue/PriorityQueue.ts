import { Collection } from "../../../core/Collection";
import { Comparator } from "../../../core/Comparator";
import { PQEntry } from "./PQEntry";

export class PriorityQueue<K, V>
  extends Collection<PQEntry<K, V>>
  implements Comparator<PQEntry<K, V>>
{
  #size: number = 0;
  #comp: Comparator<K>;

  constructor(c: Comparator<K>) {
    super();
    this.#comp = c;
  }

  compare(a: PQEntry<K, V>, b: PQEntry<K, V>): number {
    return this.#comp.compare(a.key, b.key);
  }

  clear(): void {
    this.#size = 0;
  }

  get size(): number {
    return this.#size;
  }

  *[Symbol.iterator](): Iterator<PQEntry<K, V>> {}
}

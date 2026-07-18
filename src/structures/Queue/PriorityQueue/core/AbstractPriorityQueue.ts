import { Collection } from "../../../../core/Collection";
import { Comparator } from "../../../../core/Comparator";
import { IllegalArgumentException } from "../../../../core/errors";
import { PQEntry } from "./PQEntry";

export abstract class AbstractPriorityQueue<K, V> extends Collection<
  PQEntry<K, V>
> {
  #comp: Comparator<K>;

  constructor(c: Comparator<K>) {
    super();
    this.#comp = c;
  }

  protected compare(a: PQEntry<K, V>, b: PQEntry<K, V>): number {
    return this.#comp.compare(a.key, b.key);
  }

  protected checkKey(key: K) {
    try {
      return this.#comp.compare(key, key);
    } catch (e) {
      throw new IllegalArgumentException("Incompatible key");
    }
  }
}

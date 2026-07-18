export class PQEntry<K, V> {
  #key: K;
  #value: V;

  constructor(key: K, value: V) {
    this.#key = key;
    this.#value = value;
  }

  //getter
  get key(): K {
    return this.#key;
  }
  get value(): V {
    return this.#value;
  }

  //setter
  set value(v: V) {
    this.#value = v;
  }
}

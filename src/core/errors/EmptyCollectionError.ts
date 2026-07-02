import { CollectionError } from "./CollectionError";

export class EmptyCollectionError extends CollectionError {
  constructor() {
    super(`The collection is empty.`);
  }
}

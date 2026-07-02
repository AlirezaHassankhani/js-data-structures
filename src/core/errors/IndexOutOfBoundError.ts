import { CollectionError } from "./CollectionError";

export class IndexOutOfBoundError extends CollectionError {
  constructor() {
    super(`Index is out of bounds.`);
  }
}

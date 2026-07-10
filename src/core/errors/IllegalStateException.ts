import { CollectionError } from "./CollectionError";

export class IllegalStateException extends CollectionError {
  constructor(message: string) {
    super(message);
  }
}

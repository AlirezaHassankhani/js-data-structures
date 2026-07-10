import { CollectionError } from "./CollectionError";

export class IllegalArgumentException extends CollectionError {
  constructor(message: string) {
    super(message);
  }
}

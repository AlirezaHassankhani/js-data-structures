import { CollectionError } from "./CollectionError";

export class NoSuchElementException extends CollectionError {
    constructor() {
        super("")
    }
}
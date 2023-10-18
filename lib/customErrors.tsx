export class InvalidCollectionId extends Error {
  constructor() {
    super("Invalid Collection Id");
    this.name = "InvalidCollectionId";
  }
}

export class InvalidCollectionId extends Error {
  constructor() {
    super("Invalid Collection Id");
    this.name = "InvalidCollectionId";
  }
}

export class InvalidEntityId extends Error {
  constructor() {
    super("Invalid Entity Id");
    this.name = "InvalidEntityId";
  }
}

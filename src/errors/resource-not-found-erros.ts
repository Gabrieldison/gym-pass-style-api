export class ResourceNotFoundError extends Error {
  constructor() {
    super("This resource not found");
  }
}

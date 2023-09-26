export class UserAlreadyExistsError extends Error {
  constructor() {
    super("This Email already exists");
  }
}

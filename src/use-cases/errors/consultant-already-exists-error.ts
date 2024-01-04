export class ConsultantAlreadyExistsError extends Error {
  constructor() {
    super("Consultant already exists.");
  }
}

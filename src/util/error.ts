export class ValidationError extends Error {
  readonly name = `ValidationError`;
  readonly errors: string[]
  constructor(errors: string[]) {
    super(`ValidationError`);
    this.errors = errors;
  }
}

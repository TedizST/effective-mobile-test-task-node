export class AppError extends Error {
  constructor(
    public readonly method: string,
    public readonly message: string,
    public readonly error: Error,
  ) {
    super(message);
  }
}

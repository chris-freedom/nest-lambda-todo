export class ConnectionError extends Error {
  readonly name = 'ConnectionError';

  constructor(readonly message: string) {
    super(message);
  }
}
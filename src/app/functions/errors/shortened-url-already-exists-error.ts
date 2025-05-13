export class ShortenedUrlAlreadyExistsError extends Error {
  constructor() {
    super('Shortened URL already taken.')
  }
}

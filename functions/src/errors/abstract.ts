export default abstract class AbstractError extends Error {
  httpStatus: number

  constructor(message: string, httpStatus: number) {
    super(message)
    this.httpStatus = httpStatus
  }
}

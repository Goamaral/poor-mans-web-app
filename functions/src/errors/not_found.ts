import { NOT_FOUND } from '../codes'
import AbstractError from './abstract'

export default class NotFoundError extends AbstractError {
  constructor () {
    super('Not Found', NOT_FOUND)
  }
}

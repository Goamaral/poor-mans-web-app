import { NOT_IMPLEMENTED } from '../codes'
import AbstractError from './abstract'

export default class NotImplementedError extends AbstractError {
  constructor () {
    super('Not Implemented', NOT_IMPLEMENTED)
  }
}

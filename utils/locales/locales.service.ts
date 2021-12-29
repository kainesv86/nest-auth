import { ValidationError } from 'joi';

export class LocalesService {
  /**
   * @description convert joi error message to object
   */
  static mapJoiError(errors: ValidationError) {
    const errorObj = {};
    for (const item of errors.details)
      errorObj[item.context.key] = item.message;
    return errorObj;
  }
}

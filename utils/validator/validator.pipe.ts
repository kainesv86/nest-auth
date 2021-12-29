import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';
import { LocalesService } from 'utils/locales/locales.service';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(input: any) {
    const { error, value } = this.schema.validate(input, { abortEarly: false });
    if (error) {
      // throw new BadRequestException(error);
      throw new BadRequestException(LocalesService.mapJoiError(error));
    }
    return value;
  }
}
